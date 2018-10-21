/**
 * Created by Administrator on 2017/5/18.
 */
import {StyleSheet,} from 'react-native';
import commonFun from '../../base/commonFun/commonFun'

module.exports = StyleSheet.create({
    container: {
        width: commonFun.deviceWidth(),
        height: commonFun.deviceWidth()*0.06,
        borderBottomColor:'rgba(255,255,255,0.7)',
        borderBottomWidth:1,

       // marginBottom:-1
    },
    imageStyle: {
        //width: commonFun.deviceWidth(),
        //height: commonFun.picHeight(365),
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.06,
    },
    bannerTextBox:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.06,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    bannerText:{
        fontSize:12
    },
});