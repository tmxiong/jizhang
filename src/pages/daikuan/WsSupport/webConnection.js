'use strict';
import{
    DeviceEventEmitter
} from 'react-native';

import {NavigationActions} from 'react-navigation'
let IpConfig = require('../Resource/IpConfig');
let Global = require('./connecting');
var dateBase = require('../base/aboutDate/dateBase');
var getSession = require('../Business/UserInfo/getSession');
var getOwner = require('../Business/UserInfo/getOwner');
var returnResult = require('./messageRoute');
var localstore = require('../base/aboutLocalStorage/localStore');

function connectSocketServer() {

}
connectSocketServer.prototype = {
    heartBeatIntervalCode: null,
    autoConnectIntervalCode: null,
    navigator: null,
    dropalert:null,
    connectState:false,
    /*开始连接服务器*/
    initWs: function () {
        try {
            //Global.ws = new WebSocket('ws://' + IpConfig.defaultRoad);


            Global.ws.onopen = () => {
                this.initConnection();

                //this.startAutoConnect();
                DeviceEventEmitter.emit("loading", false);
                this.dropalert.alertWithType('success','','连接服务器OK！');
                //this.startRelogin();
            };
            Global.ws.onmessage = (evt) => {
                returnResult.returnResult(evt);
            };
            Global.ws.onclose = () => {

                this.getSpeed();
                // this.initConnection();
                // this.startAutoConnect();
            };
            Global.ws.onerror = () => {
                this.initConnection();
                this.startAutoConnect();
            };
        }
        catch(ex) {

        }
    },
    getSpeed:function(){
        try {
            this.connectState=false;
            Global.roadInfo=[];
            let loadData=JSON.parse(Global.roadData);

            for(let i=0;i<loadData.length;i++){
                Global.roadInfo.push({});
                Global.roadInfo[i].road=loadData[i];
                Global.roadInfo[i].speed="";
                this.getServerDelay(loadData[i],Global.roadInfo[i]);
            }
        }
        catch (ex){

        }
    },
    getServerDelay:function(data,rf){
        try {
            let ServerStart=new Date().getTime();
            let socket=new WebSocket('wss://'+data);

            socket.onopen=(()=>{
                let ServerEnd=new Date().getTime();
                rf.speed=ServerEnd-ServerStart;
                Global.roadInfo.sort(function (x,y) {
                    return x.speed<y.speed?-1:1;
                });
                if(!this.connectState){
                    Global.road=rf.road;
                    //todo
                    //rf.road = '192.168.10.12:2012';
                    Global.ws=new WebSocket('wss://'+rf.road);
                    //console.log(rf.road);
                    this.initWs();
                    this.connectState=true;
                }
                //console.log(Global.roadInfo);
                socket.close();
            });
            socket.onerror=(error)=>{
                Global.roadInfo.remove(rf);

                //console.log(Global.roadInfo);
            }
        }
        catch (ex){

        }
    },
    connectOK: function () {

    },
    /*心跳*/
    initConnection: function () {
        /*login.login();*/
        this.startHeartBeat();
    },

    startHeartBeat: function () {
        if (this.heartBeatIntervalCode == null) {
            this.heartBeatIntervalCode = setInterval(function () {
                connectSocketServer.heartBeat();
                //connectSocketServer.getSpeed();
            }, 60 * 10000)
        }
    },
    heartBeat: function () {
        if (Global.ws) {
            var currentDate = dateBase.getCurrentDate("/");
            var SessionID = localstore.getSession("SessionID");
            var Owner = localstore.getOwner("Owner");
            if (SessionID == null || Owner == null || SessionID == "" || Owner == "") {
                return;
            }
            var userInfo = {
                "UserID": Owner + "",
                "SessionID": SessionID + "",
                "CurrentServer": "",
                "IP": "",
                "IsDuplexUser": true
            };
            var p = this.getParameters("UIEntity", JSON.stringify(userInfo));

            var params = {
                "DtoType": 1, "MethodName": "HelloServer",
                "TransferDate": currentDate, "EncryptionKey": "jiami",
                "SessionID": "" + SessionID, "Owner": "" + Owner, "Parameters": [p]
            };

            params = JSON.stringify(params);
            Global.ws.send(params);
        }
    },

    getParameters: function (type, value) {
        var typeS = "[type]";
        var typeE = "[/type]";
        var valueS = "[value]";
        var valueE = "[/value]";
        var tmp = typeS + type + typeE + valueS + value + valueE;
        return tmp;
    },
    /*重连*/
    startAutoConnect: function () {
        this.getSpeed();
        // if (this.autoConnectIntervalCode == null) {
        //     this.autoConnectIntervalCode = setInterval(function () {
        //         if (!Global.ws || Global.ws == null || typeof(Global.ws) == "undefined") {
        //             connectSocketServer.getSpeed();
        //             //connectSocketServer.startRelogin();
        //         }
        //     }, 2 * 1000);
        // }
    },
    disconnectWebSocket: function () {
        if(this.navigator!=null){
            //const {dispatch} = this.navigator;
            //退出之前，先关闭连接
            Global.ws.close();
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Login'}),
                ]
            });
            this.navigator(resetAction);
        }
        // if (Global.ws) {
        //      Global.ws.close();
        //      Global.ws = null;
        // }
    },
    startRelogin: function () {
        /*必须是已经登录之后*/
        var SessionID = getSession.Session();
        var Owner = getOwner.Owner();
        if (SessionID == null || Owner == null) {
            return;
        }
        this.relogin();
    },

    /*重连或换线时调用*/
    relogin: function () {
        if (Global.ws) {
            // 获取余额 积分等配置信息
            var currentDate = dateBase.getCurrentDate("/");
            var SessionID = getSession.Session();
            var Owner = getOwner.Owner();
            if (SessionID == null || Owner == null) {
                return;
            }
            var params = {
                "DtoType": 1,
                "MethodName": "Relogin",
                "TransferDate": currentDate,
                "EncryptionKey": "jiami",
                "SessionID": "" + SessionID,
                "Parameters": [Owner, SessionID]
            };
            params = JSON.stringify(params);

            Global.ws.send(params);
        }
    },
    reloginReturn: function (jsonObj) {
        var data = jsonObj.ReturnValue;
        if (jsonObj.HasError || data == null) {
            /*跳到主页*/
            /*parent.location.href = "index.html";*/
            return;
        }
        try {
            var MethodName = jsonObj.MethodName;
            var SelectCmd = MethodName.trim();
            if (SelectCmd != "") {
                var error = [];
                error[0] = jsonObj.HasError;
                error[1] = jsonObj.ErrorMsg;
                error[2] = jsonObj.ErrorCode;
                DeviceEventEmitter.emit(SelectCmd, jsonObj.ReturnValue, error);
            }
        } catch (ex) {
        }
        /*重新读取SessionID*/
        try {
            this.readSessionID();
        } catch (ex) {
        }
        /*读取websocket*/
        try {
            this.readWebSocket();
        } catch (ex) {
        }
    },
    readSessionID: function () {

    },
    readWebSocket: function () {

    }
}

var connectSocketServer = new connectSocketServer();
module.exports = connectSocketServer;
