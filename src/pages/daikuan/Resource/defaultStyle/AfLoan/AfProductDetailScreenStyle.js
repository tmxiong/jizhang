
import {StyleSheet,} from 'react-native';
import commonFun from '../../../base/commonFun/commonFun'

module.exports = StyleSheet.create({
    mastOuterBox:{
        flexDirection: 'column',backgroundColor:'white',
        width:commonFun.deviceWidth(),
        height:commonFun.deviceHeight()-50,
        position:'relative',
        backgroundColor:'#eeeeee',
    },
    detailTopBox:{
        width:commonFun.deviceWidth(),
        height:'auto',
        minHeight:commonFun.deviceWidth()*0.3,
        backgroundColor:'#eeeeee',
        display:'flex',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:"#e2e2e2"
    },
    detailTopImageBox:{
        width:commonFun.deviceWidth()*0.3,
        height:commonFun.deviceWidth()*0.3,

    },
    detailTopImage:{
        width:commonFun.deviceWidth()*0.22,
        height:commonFun.deviceWidth()*0.22,
        marginTop:commonFun.deviceWidth()*0.04,
        marginLeft:commonFun.deviceWidth()*0.04,
        borderRadius:10
    },
    detailTopRightBox:{
        width:commonFun.deviceWidth()*0.7,
        height:'auto',
        minHeight:commonFun.deviceWidth()*0.26,
        marginTop:commonFun.deviceWidth()*0.04,
    },
    detailTopRightBox1:{
        width:commonFun.deviceWidth()*0.7,
        height:commonFun.deviceWidth()*0.06,
        display:'flex',
        flexDirection:'row',
    },

    detailTopRightBox1Left:{
        width:commonFun.deviceWidth()*0.7*0.3,
        height:commonFun.deviceWidth()*0.06,
        textAlign:'left',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
    },
    detailTopRightBox1LeftText:{
        fontSize:16,
        color:'#000000'
    },
    detailTopRightBox1Right:{
        width:commonFun.deviceWidth()*0.45,
        height:commonFun.deviceWidth()*0.06,
        textAlign:'right',
        justifyContent: 'flex-start',
        alignItems:'flex-end',

    },
    detailTopRightBox1RightText:{
        fontSize:13,
        color:'gray'
    },
    topRightInner:{
        color:'red'
    },

    detailTopRightBox2:{
        width:commonFun.deviceWidth()*0.7,
        height:commonFun.deviceWidth()*0.06,
        display:'flex',
        flexDirection:'row',
    },

    detailTopRightBox2Left:{
        width:commonFun.deviceWidth()*0.7*0.6,
        height:commonFun.deviceWidth()*0.06,
        textAlign:'left',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
    },
    detailTopRightBox2LeftText:{
        fontSize:14,
        color:'gray'
    },
    detailTopRightBox2Right:{
        width:commonFun.deviceWidth()*0.24,
        height:commonFun.deviceWidth()*0.06,
        textAlign:'right',
        justifyContent: 'flex-start',
        alignItems:'flex-end',

    },
    detailTopRightBox2RightText:{
        fontSize:12,
        color:'gray'
    },


    detailTopRightBox3:{
        width:commonFun.deviceWidth()*0.7,
        height:'auto',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',

    },
    detailTagBox:{
        width:'auto',
        height:'auto',
        marginLeft:2,
        marginTop:1,
    },
    detailTagText:{
        padding:1,
        overflow:'hidden',
        borderRadius:8,
        borderColor:'#3ecead',
        borderWidth:1,
        fontSize:10,
        color:'#3ecead',
    },

    detailMiddleBox:{
        width:commonFun.deviceWidth(),
        height:'auto',
        minHeight:commonFun.deviceWidth()*0.3,
        marginLeft:commonFun.deviceWidth()*0.03,
        backgroundColor:'#eeeeee',

    },
    detailMiddleBox1:{
        width:commonFun.deviceWidth()*0.94,
        height:commonFun.deviceWidth()*0.16,
        marginTop:commonFun.deviceWidth()*0.03,
        display:'flex',
        flexDirection:'row',
    },
    detailMiddleBox1Left:{
        width:commonFun.deviceWidth()*0.94*0.5,
        height:commonFun.deviceWidth()*0.16,
        borderRightWidth:1,
        borderRightColor:'#e2e2e2',
    },
    detailMiddleBox1Right:{
        width:commonFun.deviceWidth()*0.94*0.49,
        height:commonFun.deviceWidth()*0.16,
    },
    detailMiddleBoxTop:{
        width:commonFun.deviceWidth()*0.94*0.5,
        height:commonFun.deviceWidth()*0.08,
        textAlign:'center',
        justifyContent: 'flex-start',
        alignItems:'center',
    },
    detailMiddleBoxBottom:{
        width:commonFun.deviceWidth()*0.94*0.5,
        height:'auto',
        textAlign:'center',
        justifyContent: 'flex-start',
        alignItems:'center',
    },

    detailMiddleBox2:{
        width:commonFun.deviceWidth()*0.94,
        height:'auto',
        paddingBottom:10,

        borderTopWidth:1,
        borderTopColor:'#e2e2e2',
        marginTop:commonFun.deviceWidth()*0.02,
        display:'flex',
        flexDirection:'row',

    },
    detailMiddleBox2A1Outer:{
        width:commonFun.deviceWidth()*0.94/3,
        height:'auto'
    },
    detailMiddleBox2A1:{
        width:commonFun.deviceWidth()*0.94/3,
        height:commonFun.deviceWidth()*0.05,
        marginTop:commonFun.deviceWidth()*0.02,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        borderRightWidth:1,
        borderRightColor:'#e2e2e2',
    },
    detailMiddleBox2A1Text:{
        fontSize:14,
        color:"black"
    },

    detailMiddleBox2A2:{
        width:commonFun.deviceWidth()*0.94/3,
        height:commonFun.deviceWidth()*0.04,
        textAlign:'center',
        justifyContent: 'flex-start',
        alignItems:'center',
        borderRightWidth:1,
        borderRightColor:'#e2e2e2',
    },
    detailMiddleBox2A2Text:{
        fontSize:12,
        color:"red"
    },


    productAttrBox:{
        paddingBottom:10,
        borderTopWidth:10,
        borderTopColor:"#e2e2e2",
        borderBottomWidth:1,
        borderBottomColor:"#e2e2e2",
        width:commonFun.deviceWidth(),
        height:'auto',

    },
    productAttrBoxNew:{
        paddingBottom:10,

        borderBottomWidth:1,
        borderBottomColor:"#e2e2e2",
        width:commonFun.deviceWidth(),
        height:'auto',

    },
    productAttrBoxTop:{
        width:commonFun.deviceWidth()*0.94,
        height:commonFun.deviceWidth()*0.09,
        marginLeft:commonFun.deviceWidth()*0.03,
        display:'flex',
        flexDirection:'row',

    },
    productAttrBoxLeft:{
        width:commonFun.deviceWidth()*0.015,
        height:commonFun.deviceWidth()*0.06,
        marginTop:commonFun.deviceWidth()*0.015,
        backgroundColor:'#d66129',
    },
    productAttrBoxRightTextBox:{
        width:commonFun.deviceWidth()*0.9,
        height:commonFun.deviceWidth()*0.088,
        marginLeft:commonFun.deviceWidth()*0.015,
        textAlign:'left',
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    productAttrBoxRightText:{
        fontSize:16,
    },
    detailOtherInfoBox:{
        width:commonFun.deviceWidth()*0.94,
        marginLeft:commonFun.deviceWidth()*0.03,
        height:'auto',
        minHeight:30,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',

    },
    docText:{
        color:'black',
        fontSize:15
    },
    detailApplyBtn:{
        //position:'absolute',
        marginTop:50,
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.13,
        backgroundColor:'#d66129',
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    detailApplyBtnText:{
        color:'#ffffff',
        fontSize:20,
        fontWeight:'700'
    },
    collect:{
        position:'absolute',
        top:commonFun.deviceWidth()*0.03,
        right:5,
        width:commonFun.deviceWidth()*0.1,
        height:commonFun.deviceWidth()*0.05,
        borderWidth:1,
        borderColor:'orange',
        borderRadius:10,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    collectText:{
        color:'orange',
        fontSize:10,
        fontWeight:'700'
    },


});