var connectSocketServer = require('./webConnection');
var receive = require('../Business/Result/receive');
const Global=require('../WsSupport/connecting');
function returnResult() {

}
returnResult.prototype = {
    jsonObj: null,
    Result: true,
    returnResult: function (evt) {
        this.jsonObj = JSON.parse(evt.data);
        //this.Result = true;\
        if(this.jsonObj.MethodName==='Login'){
            this.Result=true;
        }
        if (this.jsonObj.DtoType == 3) {
            /*强制退出*/
            if (this.jsonObj.NotifyType == 82) {
                try {
                    /*parent.window.frames["mainFrame"].location.href = Login;*/
                    /*parent.window.frames["html5"].disconnectWebSocket();*/
                    connectSocketServer = require('./webConnection');
                    connectSocketServer.disconnectWebSocket();
                }
                catch (ex) {

                }
                /*不提交到主页returnResult方法*/
                this.Result = false;
            }
        }
        else if (this.Result&&this.jsonObj.ErrorMsg === "当前连接无效") {
            connectSocketServer = require('./webConnection');
            connectSocketServer.disconnectWebSocket();
            this.Result = false;
        }
        else if (this.jsonObj.MethodName === 'HelloServer') {
            try {
                Global.ws=new WebSocket('wss://'+Global.road);
                //connectSocketServer.initWs();
            }
            catch (ex) {

            }
        }
        else if (this.jsonObj.DtoType == 2) {
            var MethodName = this.jsonObj.MethodName;
            /*Relogin*/
            if (MethodName.trim() == "Relogin") {
                connectSocketServer = require('./webConnection');
                connectSocketServer.reloginReturn(this.jsonObj);

                /*不提交到主页returnResult方法*/
                this.Result = false;
            }
        }
        if (this.Result) {
            try {
                receive.returnResult(this.jsonObj);
                /*parent.window.frames["mainFrame"].returnResult1(jsonObj);*/
            } catch (ex) {
            }
        }
    }
}

var returnResult = new returnResult();
module.exports = returnResult;
