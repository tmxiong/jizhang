
import {StyleSheet,} from 'react-native';
import commonFun from '../../../base/commonFun/commonFun'

module.exports = StyleSheet.create({
    mastOuterBox:{
        flexDirection: 'column',backgroundColor:'white',
        width:commonFun.deviceWidth(),
        height:'auto',
        // borderTopWidth:commonFun.deviceWidth()*0.08,
        // borderTopColor:'#d66129',
    },
    topStatusBar:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.08,
        backgroundColor:'#d66129',
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    topStatusBarText:{
        fontSize:17,
        color:'#ffffff',
    },
    topImageBox:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.5,
    },
    userAccount:{
        width:commonFun.deviceWidth()*0.5,
        height:commonFun.deviceWidth()*0.1,
        marginLeft:commonFun.deviceWidth()*0.25,
        marginTop:commonFun.deviceWidth()*0.4,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        overflow:'hidden',
    },
    userAccountText:{
        fontSize:16,
        color:'#ffffff'
    },
    userCenterClickBg:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.72,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    userCenterClickBgSignle:{
        width:commonFun.deviceWidth()*0.5,
        height:commonFun.deviceWidth()*0.24,

    },
});