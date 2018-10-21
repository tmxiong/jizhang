import React, { Component } from 'react';
import { AppRegistry,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    View ,
    Button,
    FlatList,
    Image,
    DeviceEventEmitter,
    StatusBar,
    ScrollView,
    ListView,
    Platform,
    AppState,
    Linking,
    Alert
} from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfCreditCardListScreenStyle');
import {NavigationActions,StackActions} from 'react-navigation';
import cfn from '../../base/commonFun/commonFun';
import Global from '../../WsSupport/connecting';
const creditCardApply=require('../../Resource/images/Af/creditCardApply.png');
const bottomNotice=require('../../Resource/images/Af/bottomNotice.png');
import Icon from 'react-native-vector-icons/Ionicons';
class AfCreditCardListScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageData: {
        credit_card_list:[]
      },
    };

  };

  static navigationOptions = {
    header: null,
  };

  randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }



  componentDidMount() {

     this.getCreditCardTotalList()
  }
  componentWillMount(){

  }
  componentDidUpdate() {

  }

  componentWillUnmount() {


  }


  trim(str) {
    str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
  }

  static navigationOptions = ({ navigation }) => ({
    title:"信用卡",
    headerStyle:{backgroundColor:'#d66129'},
    headerTitleStyle:{color:"#ffffff"},
      headerLeft:(<TouchableOpacity onPress={()=>navigation.goBack()}
                                    style={{width:50,height:"100%",justifyContent:'center',alignItem:"center",paddingLeft:20}}>
          <Icon name={'ios-arrow-back'} size={30} style={{color:'#fff'}}/>
      </TouchableOpacity>),
  });

  _header(){

  }
  navToCreditCard(thisCreditCard){



    //统计明星产品点击
    var that=this;
    var url_fetch = Global.requestDomain+"/Index/Public/user_operation_record";
    var requestParam = Global.requestParam+"&operation_type=7&extra_id="+thisCreditCard.id+"&user_id="+Global.user_id;
    fetch(url_fetch, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestParam
    }).then((response) => response.json()).then((responseJson) => {
      //console.warn(responseJson);
      if(typeof(responseJson.back_status) !="undefied" && parseInt(responseJson.back_status) ==1){

      }


    }).catch((error) => {
      console.warn(error);


    });

    //跳转第三方页面
    //如果未登录则跳登录页面
    if(!Global.user_id){
      this.props.navigation.navigate('AfSignIn');
    }else{

      this.props.navigation.navigate('AfCreditTrDe',{third_website_url:thisCreditCard.jump_url,title:thisCreditCard.card_name});
    }

  }
  navToPage(targetRouteName){



    const {dispatch} = this.props.navigation;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: targetRouteName}),
      ]
    });
    dispatch(resetAction);
  }


  //获取首页数据
  getCreditCardTotalList(){
    var that = this;
    var url_fetch = Global.requestDomain+"/Index/Product/getCreditCardTotalList";

    var requestParam = Global.requestParam+"&p=1"+"&user_id="+Global.user_id;


    fetch(url_fetch, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestParam
    }).then((response) => response.json()).then((responseJson) => {

      if(typeof(responseJson.back_status) !="undefied" && parseInt(responseJson.back_status) ==1){
        var newPageData = responseJson.back_data;
        that.setState({pageData:newPageData});


      }else{
        if(typeof(responseJson.back_status) !="undefied" && parseInt(responseJson.back_status) ==-1){

          that.navToPage('AfSignIn');
        }else{

          Alert.alert(responseJson.back_msg);
        }

      }


    }).catch((error) => {
      console.error(error);


    });


  }

  //信用卡
  getCreditCard(){
    var that = this;

    var creditCardList = [];
    var pageCreditCardList = that.state.pageData.credit_card_list;

    for(var i=0;i<pageCreditCardList.length;i++){

      let thisCreditCard = pageCreditCardList[i];

      creditCardList.push(
          <View style={styles.singleCreditCardBox}>
            <Image style={styles.creditCardImage} source={{uri:thisCreditCard.card_picture_url_qiniu}}  resizeMode='stretch'/>
            <View style={styles.creditCardNameBox}><Text style={styles.creditCardNameText}>{thisCreditCard.card_name}</Text></View>
            <View style={styles.creditCardDesBox}><Text style={styles.creditCardDesText}>{thisCreditCard.desc}</Text></View>
            <TouchableOpacity style={styles.creditCardApplyBox}  onPress={()=>that.navToCreditCard(thisCreditCard)}><Image style={styles.creditCardApplyImage} source={creditCardApply}  resizeMode='stretch'/></TouchableOpacity>
          </View>

      );
    }



    return(

          <View style={styles.creditCard}>
            {creditCardList}
          </View>

    );

  }




  render() {
    const { navigate } = this.props.navigation;
    var that = this;

    return (
        <View style={styles.mastOuterBox}>
          <ScrollView style={styles.outerContainer}
                      bounces={false}
                      onMomentumScrollEnd = {(e)=>that.onscrollThisEnd(e)}
          >
          {that.getCreditCard()}

            <Image style={styles.bottomNotice} source={bottomNotice}   resizeMode='stretch'/>
            <View style={styles.bottomBlank}></View>
          </ScrollView>
        </View>

  );
  }
}

export default AfCreditCardListScreen
