/**
 * Created by zoufeng on 2017/11/14.
 */
import {StyleSheet,} from 'react-native';
import commonFun from '../../base/commonFun/commonFun';
module.exports = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        justifyContent: 'flex-end',
        zIndex:-1
    },
    newUpdate:{
        bottom:commonFun.picHeight(220),
        color:"#fff",
        backgroundColor:'transparent'
    }
});
