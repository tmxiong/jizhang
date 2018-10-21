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
    ImageBackground,
    Alert,
    AsyncStorage
} from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfMySettingScreenStyle');
import {NavigationActions,StackActions} from 'react-navigation';

import cfn from '../../base/commonFun/commonFun';
import Global from '../../WsSupport/connecting';
const myBigBg = require('../../Resource/images/Af/myBigBg.png');
const userCenterClickBg = require('../../Resource/images/Af/userCenterClickBg.png');
import Icon from 'react-native-vector-icons/Ionicons';

class AfMySettingScreen extends React.Component {

  constructor(props) {
    super(props);


    if(!Global.user_id){

      this.props.navigation.navigate('AfSignIn');
    }
    this.state = {
      userAccount: '',
      appApiConfig:'',
    };



  };



  static navigationOptions = ({ navigation }) => ({
    title:navigation.state.params.title,
    headerStyle:{backgroundColor:'#d66129'},
    headerTitleStyle:{color:"#ffffff"},
      headerLeft:(<TouchableOpacity onPress={()=>navigation.goBack()}
                                    style={{width:50,height:"100%",justifyContent:'center',alignItem:"center",paddingLeft:20}}>
          <Icon name={'ios-arrow-back'} size={30} style={{color:'#fff'}}/>
      </TouchableOpacity>),
  });



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
    var that = this;
    if(typeof(Global.phone_number)!='undefined'){
      console.warn(Global.phone_number);
      that.setState({userAccount:Global.phone_number,appApiConfig:Global.appApiConfig});
    }

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

  signOut(){
    var that = this;
    //清除缓存
    AsyncStorage.clear();
    that.navToPage('AfSignIn');
  }
  navToPage(targetRouteName){

    const {dispatch} = this.props.navigation;
    //旧版本
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: targetRouteName}),
      ]
    });
    dispatch(resetAction);
  }

  render() {
    const { navigate } = this.props.navigation;
    var that = this;

    return (
        <View style={styles.mastOuterBox}>
          <View style={styles.settingView}><Text style={styles.settingViewText}>版本号:{that.state.appApiConfig.app_version}</Text></View>
          <TouchableOpacity style={styles.logout} onPress={()=>that.signOut()}><Text style={styles.logoutText}>退出登录</Text></TouchableOpacity>
        </View>

  );
  }
}

export default AfMySettingScreen
