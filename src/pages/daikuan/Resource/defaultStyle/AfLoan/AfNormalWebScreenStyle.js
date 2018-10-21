import {StyleSheet,} from 'react-native';
import commonFun from '../../../base/commonFun/commonFun'

module.exports = StyleSheet.create({

    mastOuterBox:{
        flexDirection: 'column',backgroundColor:'white',
        width:commonFun.deviceWidth(),
        height:'auto',

    },
    checkBt:{
        display:'flex',
        width:commonFun.deviceWidth(),
        height:commonFun.picWidth(50),
        lineHeight:commonFun.picWidth(50),
        textAlign:'center',
        backgroundColor:'blue',
        margin:'auto'
    },

});