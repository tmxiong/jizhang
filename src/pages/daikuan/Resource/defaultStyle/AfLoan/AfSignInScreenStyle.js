import {StyleSheet,} from 'react-native';
import commonFun from '../../../base/commonFun/commonFun'

module.exports = StyleSheet.create({
    container: {
        alignItems:'center',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        justifyContent: 'flex-end',
        zIndex:-1
    },
    bgImage:{
        flex:1,
        alignItems:'center',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        justifyContent: 'flex-end',
        zIndex:-1
    },
    signBox:{
        position:"absolute",
        width: commonFun.deviceWidth(),
        height: commonFun.deviceWidth(),
        zIndex:2,
        top:commonFun.deviceWidth()*0.4,

    },
    signBoxInner:{
        position:"absolute",
        width: commonFun.deviceWidth()*0.9,
        height: commonFun.deviceWidth()*0.8,
        top:commonFun.deviceWidth()*0.01,
        left:commonFun.deviceWidth()*0.05,
    },
    signBoxInnerText:{
        width: '100%',
        height: '100%',

    },
    signBoxInnerInputBox1:{
        width: '72%',
        height: '10%',
        marginLeft:'20%',
        marginTop:'33%',
        display:'flex',
        flexDirection:'row',
    },
    Input1Box:{
        width:"90%",
        height:"70%",
        display:'flex',


    },
    input1Sty:{
        width:"100%",
        height:"100%",
        fontSize:15,
        padding:0,

    },
    clearPhoneInput:{
        width:15,
        height:"65%",

        marginTop:5
    },
    clearPhoneImage:{
        width:15,
        height:15,
    },
    signBoxInnerInputBox2:{
        width: '72%',
        height: '10%',

        marginLeft:'20%',
        marginTop:'11%',
        display:'flex',
        flexDirection:'row',
    },

    Input2Box:{
        width:"55%",
        height:"70%",
    },
    input2Sty:{
        width:"100%",
        height:"100%",
        fontSize:15,
        padding:0

    },
    getVerifyCodeBtn:{
        width:"42%",
        height:"70%",

    },
    verifyCodeBtnImage:{
        width:"100%",
        height:"100%",
    },
    verifyCodeNoticeBox:{
        width:"100%",
        height:"100%",
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    verifyCodeNotice:{
        width:"100%",

        color:'#ffffff',
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },

    signBoxInnerInputBox3:{
        width: '70%',
        height: '15%',
        marginLeft:'15%',
        marginTop:'12%',
    },
    signBoxInnerInputBox4:{
        width: '100%',
        height: 25,
        marginTop:'2%',
        display:'flex',
        flexDirection:'row',

    },
    loginAgree:{
        width: 15,
        height: 15,
        marginTop:3
    },
    agreeTextBox:{
        width: "100%",
        height: 25,
        display:'flex',
        flexDirection:'row',
    },
    agreeText:{
        height: 25,
        lineHeight: 25,
        marginLeft:10,
        fontSize:14,
        color:'#ffffff'
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