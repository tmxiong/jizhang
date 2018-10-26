
/*
* 依赖包：
* 1."react-native-keyboard-spacer"
* 2."react-native-device-info"
* */
import {
    Alert,
    DeviceEventEmitter
} from 'react-native';
import {setJSExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';
var DeviceInfo = require('react-native-device-info');
import{EasyLoading} from '../../../../component/Loading'
module.exports = function () {
    setJSExceptionHandler((e, isFatal)=>{
        if(isFatal) {
            // let deviceInfo = '';
            // // 手机品牌 e.g. "Apple / htc / Xiaomi"
            // deviceInfo += '手机品牌：' + DeviceInfo.getBrand() + '\n';
            // // 手机型号 e.g. "iPhone 6"
            // deviceInfo += '手机型号：' + DeviceInfo.getModel() + '\n';
            // //deviceInfo += DeviceInfo.getDeviceId() + '\n';
            // // 系统类型 e.g. "iPhone OS"
            // deviceInfo += '系统类型：' + DeviceInfo.getSystemName() + '\n';
            // // 系统版本 e.g. "9.0"
            // deviceInfo += '系统版本：' + DeviceInfo.getSystemVersion() + '\n';
            // // app版本 e.g. "1.1.0.89"
            // deviceInfo += 'app版本：' + DeviceInfo.getVersion() + '\n';
            EasyLoading.show('请稍候');
            setTimeout(()=>{
              EasyLoading.dismis()
            },1000)

        }

    },true);
};