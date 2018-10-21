
import {StyleSheet,} from 'react-native';
import commonFun from '../../../base/commonFun/commonFun'

module.exports = StyleSheet.create({
    mastOuterBox:{
        display:'flex',
        flexDirection: 'column',backgroundColor:'white',
        width:commonFun.deviceWidth(),
        height:'auto',
        backgroundColor:'#ffffff'
        // borderTopWidth:commonFun.deviceWidth()*0.08,
        // borderTopColor:'#d66129',
    },
    topStatusBar:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.16,
        backgroundColor:'#d66129',
        textAlign:'center',
        justifyContent: 'flex-end',
        alignItems:'center',
        //borderTopWidth:20,
        borderTopColor:'#d66129',
        paddingBottom:5,
    },
    topStatusBarText:{
        fontSize:17,
        color:'#ffffff',
    },
    selectOuterBox:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.11,
        display:'flex',
        flexDirection: 'row',
    },
    selectBox:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.11,
        flex:1,
        flexDirection: 'row',
    },
    selectSingleBox:{
        flex:1,
        height:commonFun.deviceWidth()*0.11,
    },
    listsBox:{
        width:commonFun.deviceWidth(),
        height:'auto',
        minHeight:commonFun.deviceWidth()*0.25,
        backgroundColor:'#ffffff',
    },
    listInnerBox:{
        width:commonFun.deviceWidth(),
        height:'auto',
        display:'flex',
        flexDirection: 'column',
    },
    topNoticeBox:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.1,
        textAlign:'center',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#f7af30',
        borderBottomWidth:8,
        borderBottomColor:'#e2e2e2'
    },
    topNoticeText:{
        fontSize:14,
        color:'#ffffff'
    },
    listScroll:{
        width:commonFun.deviceWidth(),
        height:commonFun.deviceHeight(),
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

        display:'flex',
        width:commonFun.deviceWidth(),
        height:commonFun.deviceWidth()*0.45,
        backgroundColor:"#eeeeee",
    },
    bottomNotice:{
        display:'flex',
        width:commonFun.deviceWidth(),
        height:35,
    },

});