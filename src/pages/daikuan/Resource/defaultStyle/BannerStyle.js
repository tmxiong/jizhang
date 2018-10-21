/**
 * Created by Administrator on 2017/5/18.
 */
import {StyleSheet,} from 'react-native';
import commonFun from '../../base/commonFun/commonFun'

module.exports = StyleSheet.create({
    container: {
        width: commonFun.deviceWidth(),
        height: commonFun.picHeight(160),
        overflow:"hidden",
        //borderBottomColor:'rgba(255,255,255,0.7)',
        //borderBottomWidth:1,

       // marginBottom:-1
    },
    bannerScroll:{
        width:commonFun.deviceWidth(),
        height:commonFun.picWidth(160),

    },
    bannerImageBoxOpac:{
        width:commonFun.deviceWidth(),
        height:commonFun.picWidth(180),

    },

    imageStyle: {
        //width: commonFun.deviceWidth(),
        //height: commonFun.picHeight(365),
        width:commonFun.deviceWidth(),
        height:commonFun.picWidth(180),

    },
});