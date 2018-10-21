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
    creditCard:{
        width:commonFun.deviceWidth()*0.94,
        marginLeft:commonFun.deviceWidth()*0.03,
        height:'auto',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    singleCreditCardBox:{
        width:commonFun.deviceWidth()*0.94*0.5,
        height:'auto',

    },
    creditCardImage:{
        width:commonFun.deviceWidth()*0.94*0.5*0.9,
        marginTop:commonFun.deviceWidth()*0.94*0.5*0.05,
        marginBottom:commonFun.deviceWidth()*0.94*0.5*0.02,
        marginLeft:commonFun.deviceWidth()*0.94*0.5*0.05,
        height:commonFun.deviceWidth()*0.94*0.5*0.9*70/115,
        backgroundColor:'blue'
    },
    creditCardNameBox:{
        width:commonFun.deviceWidth()*0.94*0.5,
        height:commonFun.deviceWidth()*0.04,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        overflow:'hidden',
    },
    creditCardDesBox:{
        width:commonFun.deviceWidth()*0.94*0.5,
        height:commonFun.deviceWidth()*0.04,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        overflow:'hidden',
    },
    creditCardApplyBox:{
        width:commonFun.deviceWidth()*0.94*0.2,
        marginLeft:commonFun.deviceWidth()*0.94*0.15,
        marginBottom:3,
        height:commonFun.deviceWidth()*0.05,


    },
    creditCardApplyImage:{
        width:commonFun.deviceWidth()*0.94*0.2,
        height:commonFun.deviceWidth()*0.05,

    },
    creditCardNameText:{
        fontSize:12,
        color:'black'
    },
    creditCardDesText:{
        fontSize:9,
        color:'gray'
    },
    outerContainer:{
        flexDirection: 'column',backgroundColor:'white',
        width:commonFun.deviceWidth(),
        height:'auto',
    },
    bottomBlank:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.35,
        backgroundColor:"#eeeeee",
    },
    bottomNotice:{
        width:commonFun.deviceWidth(),
        height:35,
    },
});