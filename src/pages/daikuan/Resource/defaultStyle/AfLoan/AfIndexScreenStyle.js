
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
    indexBox:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceHeight(),

    },
    flatListStyle:{
        //width:commonFun.deviceWidth(),
        //height:commonFun.deviceHeight(),
        //flexDirection:'row',
        //flexWrap:'wrap',
    },
    starProOuterBox:{
        width:commonFun.deviceWidth(),
        height:'auto',
        borderTopWidth:commonFun.deviceWidth()*0.02,
        borderTopColor:'#e2e2e2',

        borderBottomWidth:commonFun.deviceWidth()*0.03,
        borderBottomColor:'#ffffff',

    },
    attrTopBlank:{
        width:commonFun.deviceWidth(),
        height:5,
        borderTopWidth:commonFun.deviceWidth()*0.02,
        borderTopColor:'#e2e2e2',
    },
    starProOuterBoxTop:{
        width:commonFun.deviceWidth()*0.94,
        height:commonFun.deviceWidth()*0.1,
        marginLeft:commonFun.deviceWidth()*0.03,
        borderBottomWidth:1,
        borderBottomColor:'#e2e2e2',
        display:'flex',
        flexDirection:'row',
    },
    starIcon:{
        width:commonFun.deviceWidth()*0.09,
        height:commonFun.deviceWidth()*0.09,
        display:'flex',
    },
    starTextBox:{
        width:commonFun.deviceWidth()*0.7,
        height:commonFun.deviceWidth()*0.09,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
    },
    starText:{
        fontSize:12,
    },
    changeStarBtn:{
        width:commonFun.deviceWidth()*0.15,
        height:commonFun.deviceWidth()*0.09,
        justifyContent: 'center',
        alignItems:'center',
    },
    percent90:{
        color:"#d66129",
    },
    changeText:{
        fontSize:12,
        color:"#f86847",
    },
    outerContainer:{
        flexDirection: 'column',backgroundColor:'white',
        width:commonFun.deviceWidth(),
        height:'auto',
    },
    noticeBox:{
        width:commonFun.deviceWidth(),
        height:'auto',
        position:'relative'
    },
    noticeIcon:{
        position:'absolute',
        width:commonFun.deviceWidth()*0.04,
        height:commonFun.deviceWidth()*0.04,
        top:commonFun.deviceWidth()*0.01,
        left:commonFun.deviceWidth()*0.06,
    },
    topFourIconbox:{
        width:commonFun.deviceWidth(),
        height:'auto',
        borderTopWidth:commonFun.deviceWidth()*0.01,
        borderTopColor:'#e2e2e2',
        display:'flex',
        flexDirection:'row',

    },
    topIconSinglebox:{
        width:commonFun.deviceWidth()*0.25,
        height:'auto',

    },
    topIconSingleInnerIcon:{
        width:commonFun.deviceWidth()*0.125,
        height:commonFun.deviceWidth()*0.125,
        marginLeft:commonFun.deviceWidth()*0.0625,
        marginTop:commonFun.deviceWidth()*0.02,

    },
    topFourIconDesBox:{
        width:'100%',
        height:commonFun.deviceWidth()*0.05,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    topFourIconDesText:{
        fontSize:12,
    },
    starProOuterBoxBottom:{
        width:commonFun.deviceWidth()*0.94,
        height:'auto',
        marginLeft:commonFun.deviceWidth()*0.03,
        display:'flex',
        flexDirection:'row',

    },
    starProBottomSingle:{
        width:commonFun.deviceWidth()*0.235,
        height:'auto',

    },
    emptyProductImage:{
        width:commonFun.deviceWidth()*0.17,
        height:commonFun.deviceWidth()*0.17,
        borderRadius:commonFun.deviceWidth()*0.085,
        marginTop:commonFun.deviceWidth()*0.0325,
        marginLeft:commonFun.deviceWidth()*0.0325,
    },
    starProTextBox:{
        width:commonFun.deviceWidth()*0.235,
        height:commonFun.deviceWidth()*0.06,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    starProText:{
        fontSize:13,
        color:'gray'
    },
    starApplyBtn:{
        width:commonFun.deviceWidth()*0.14,
        height:commonFun.deviceWidth()*0.06,
        marginLeft:commonFun.deviceWidth()*0.05,

    },
    attrToMore:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.08,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'#e2e2e2',
        borderBottomWidth:1,
        borderBottomColor:'#e2e2e2',
    },
    attrToMoreText:{
        fontSize:14,
        color:"gray",

    },
    productAttrBox:{
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
    productAttrSingleBox:{
        width:commonFun.deviceWidth()*0.94,
        height:'auto',
        marginLeft:commonFun.deviceWidth()*0.03,
        borderTopWidth:1,
        borderTopColor:'#e2e2e2',
        display:'flex',
        flexDirection:'row',
    },
    productAttrSingleBoxLeft:{
        width:commonFun.deviceWidth()*0.94*0.7,
    },
    productAttrSingleBoxRight:{
        width:commonFun.deviceWidth()*0.94*0.3,
        height:'auto',


    },
    productAttrSingleBoxLeftTop:{
        width:commonFun.deviceWidth()*0.94*0.7,
        height:'auto',
        minHeight:commonFun.deviceWidth()*0.18,
        display:'flex',
        flexDirection:'row',
    },
    productAttrSingleBoxLeftTop1:{
        width:commonFun.deviceWidth()*0.44,
        height:'auto',
        minHeight:commonFun.deviceWidth()*0.2,
    },
    productAttrSingleBoxLeftTopProName:{
        width:commonFun.deviceWidth()*0.44,
        height:commonFun.deviceWidth()*0.08,
        justifyContent: 'flex-end',
        alignItems:'baseline',

    },
    productAttrSingleBoxLeftTopProNameText:{
        fontSize:15,
    },
    productAttrSingleBoxLeftTopProTagBox:{
        width:commonFun.deviceWidth()*0.44,
        height:'auto',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        paddingBottom:5
    },
    productAttrSingleBoxLeftTopProTagTextBox:{
        width:'auto',
        height:'auto',
        marginLeft:1,
        marginTop:1,
    },
    productAttrSingleBoxLeftTopProTagText:{
        padding:1,
        overflow:'hidden',
        borderRadius:3,
        backgroundColor:'#66c1f8',

        fontSize:10,
        color:'#ffffff',
    },
    productAttrSingleBoxLeftTopImageBox:{
        width:commonFun.deviceWidth()*0.17,
        height:commonFun.deviceWidth()*0.17,

    },
    productAttrSingleBoxLeftTopImage:{
        width:commonFun.deviceWidth()*0.13,
        height:commonFun.deviceWidth()*0.13,
        marginTop:commonFun.deviceWidth()*0.02,
        marginLeft:commonFun.deviceWidth()*0.02,
        borderRadius:commonFun.deviceWidth()*0.0625,
        backgroundColor:'black',
    },
    productAttrSingleBoxLeftBottom:{
        width:commonFun.deviceWidth()*0.94*0.7,
        height:commonFun.deviceWidth()*0.12,
        display:'flex',
        flexDirection:'row',
        paddingBottom:5,
    },
    productAttrSingleBoxLeftBottom1:{
        width:commonFun.deviceWidth()*0.94*0.4,
        height:commonFun.deviceWidth()*0.1,
        borderRightWidth:1,
        borderRightColor:'#e2e2e2',
    },
    productAttrSingleBoxLeftBottom1Top:{
        width:commonFun.deviceWidth()*0.94*0.4,
        height:commonFun.deviceWidth()*0.05,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        overflow:'hidden',
        marginTop:-3,

    },
    loanAmount:{
      fontSize:16,
        fontWeight:'700',
      color:"#f86847"
    },
    productAttrSingleBoxLeftBottom1Bottom:{
        width:commonFun.deviceWidth()*0.94*0.4,
        marginTop:commonFun.deviceWidth()*0.01,
        height:commonFun.deviceWidth()*0.04,
        overflow:'hidden',
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',

    },
    loanFields:{
        fontSize:13,
        color:'gray'
    },
    productAttrSingleBoxLeftBottom2:{
        width:commonFun.deviceWidth()*0.94*0.34,
        height:commonFun.deviceWidth()*0.1,

    },

    productAttrSingleBoxLeftBottom2Top:{
        width:commonFun.deviceWidth()*0.94*0.35,
        height:commonFun.deviceWidth()*0.05,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        overflow:'hidden',
        marginTop:-3,

    },
    productAttrSingleBoxLeftBottom2Bottom:{
        width:commonFun.deviceWidth()*0.94*0.35,
        marginTop:commonFun.deviceWidth()*0.01,
        height:commonFun.deviceWidth()*0.04,
        overflow:'hidden',
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',

    },
    loanRate:{
        fontSize:13,
        color:'gray'
    },
    loanRateNotice:{
        fontSize:13,
        color:'#f86847'
    },
    productAttrSingleBoxRightTop:{
        width:commonFun.deviceWidth()*0.94*0.3,
        height:'auto',
        minHeight:commonFun.deviceWidth()*0.1,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',

    },
    applyPeople:{

        fontSize:12,
        color:'gray',

    },
    productAttrSingleBoxRightBottom:{
        width:commonFun.deviceWidth()*0.94*0.28,
        height:commonFun.deviceWidth()*0.24,

    },
    productAttrSingleBoxRightBottomApplyImage:{
        width:commonFun.deviceWidth()*0.18,
        height:commonFun.deviceWidth()*0.18,
        marginTop:commonFun.deviceWidth()*0.05,
        marginLeft:commonFun.deviceWidth()*0.05,
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

    wechatBox: {
        width: commonFun.deviceWidth(),
        height: commonFun.deviceWidth() * 0.33,
        marginTop: 10,

    },

});