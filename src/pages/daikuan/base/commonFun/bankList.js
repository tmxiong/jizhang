/**
 * Created by zoufeng on 2017/6/8.
 */
import {
    DeviceEventEmitter,
} from 'react-native';
const sendParams=require('../../WsSupport/sendParams');
const Global=require('../../WsSupport/connecting');
export function getBank() {
    let methodName='GetDictionary';
    this.GetDictionaryListener=DeviceEventEmitter.addListener(methodName,(jsonObj,error)=>{
        Global.bankList=jsonObj;
        this.GetDictionaryListener.remove();
    });
    let params=['BankType'];
    sendParams.sendTo(methodName,params);
}
export function getBankName(bankID) {
    let bankName='';
    for(let i=0;i<Global.bankList.length;i++){
        if(Global.bankList[i].Code===bankID){
            bankName=Global.bankList[i].Name;
        }
    }
    return bankName;
}