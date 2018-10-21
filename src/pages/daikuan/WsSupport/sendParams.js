import {
    Alert,
} from 'react-native';
var dateBase = require('../base/aboutDate/dateBase');
let Global = require('./connecting');
var localstore = require('../base/aboutLocalStorage/localStore');
const connection=require('./webConnection');
function sendParams() {

}
sendParams.prototype = {
    send: function (methodName, params) {
        try {
            if (Global.ws.readyState !== 1) {
                connection.getSpeed();
            }
            var currentDate = dateBase.getCurrentDate("/");
            var params =
                {
                    "DtoType": 1,
                    "MethodName": methodName,
                    "TransferDate": currentDate,
                    "EncryptionKey": "jiami",
                    "Parameters": params
                };
            params = JSON.stringify(params);
            Global.ws.send(params);

        }
        catch (ex){

        }
    },
    sendTo: function (methodName, param) {
        try {
            if (Global.ws.readyState !== 1) {
                connection.getSpeed();
            }
                var MsgID = '';
                var currentDate = dateBase.getCurrentDate("/");
                var SessionID = Global.SessionID;
                var params =
                    {
                        "DtoType": 1,
                        "Owner": localstore.getOwner("Owner"),
                        "MethodName": methodName,
                        "SessionID": SessionID,
                        "TransferDate": currentDate,
                        "EncryptionKey": "jiami",
                        "Parameters": param
                    };
                if (param[0] === 'GameName') {
                    MsgID = 'game';
                    params.MsgID = MsgID;
                }
                else if (param[0] === 'OrderState') {
                    MsgID = 'order';
                    params.MsgID = MsgID;
                }
                params = JSON.stringify(params);
                Global.ws.send(params);
        }
        catch (ex){

        }
    },
    sendToDrawVideo: function (methodName, params) {
        try {
            if (Global.ws.readyState !== 1) {
                connection.getSpeed();
            }
                var currentDate = dateBase.getCurrentDate("/");
                var params =
                    {
                        "DtoType": 1,
                        "Owner": localstore.getOwner("Owner"),
                        "MethodName": methodName,
                        "ExtendObj": "1",
                        "SessionID": localstore.getSession("SessionID"),
                        "TransferDate": currentDate,
                        "EncryptionKey": "jiami",
                        "Parameters": params
                    };
                params = JSON.stringify(params);
                Global.ws.send(params);

        }
        catch (ex){

        }
    },
}
var sendParams = new sendParams();
module.exports = sendParams;
