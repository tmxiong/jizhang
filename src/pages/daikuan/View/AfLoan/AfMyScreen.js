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
    Alert
} from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfMyScreenStyle');
import {NavigationActions,StackActions} from 'react-navigation';

import cfn from '../../base/commonFun/commonFun';
import Global from '../../WsSupport/connecting';
const myBigBg = require('../../Resource/images/Af/myBigBg.png');
const userCenterClickBg = require('../../Resource/images/Af/userCenterClickBg.png');
import Icon from 'react-native-vector-icons/Ionicons';

class AfMyScreen extends React.Component {

  constructor(props) {
    super(props);


    if(!Global.user_id){

      this.props.navigation.navigate('AfSignIn');
    }
    this.state = {
      userAccount: '',
        costumerTel:''
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
    var that = this;
    if(typeof(Global.phone_number)!='undefined'){
      console.warn(Global.phone_number);
      that.setState({userAccount:Global.phone_number,costumerTel:Global.costumerTel});
    }


  }
  componentWillMount(){

  }
  componentDidUpdate() {

  }

  componentWillUnmount() {


  }


    //拨打电话
    linking=(url)=>{

        console.warn(url);

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));

    }

  trim(str) {
    str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
  }



  render() {
    const { navigate } = this.props.navigation;
    var that = this;
    var helpcenter_url = Global.requestDomain+"/Index/Index/helpCenterJdh";
    return (
        <View style={styles.mastOuterBox}>
          <View style={styles.topStatusBar}><Text style={styles.topStatusBarText}></Text></View>
          <ImageBackground style={styles.topImageBox} source={myBigBg}  >
              <View style={styles.userAccount}><Text style={styles.userAccountText}>帐号：{that.state.userAccount}</Text></View>
          </ImageBackground>
          <ImageBackground style={styles.userCenterClickBg} source={userCenterClickBg}  resizeMode='stretch'>
            <TouchableOpacity style={styles.userCenterClickBgSignle}  onPress={()=>that.props.navigation.navigate('AfMyCol',{title:'我的收藏'})}></TouchableOpacity>
            <TouchableOpacity style={styles.userCenterClickBgSignle}  onPress={()=>that.props.navigation.navigate('AfMyApply',{title:'申请记录'})}></TouchableOpacity>
            <TouchableOpacity style={styles.userCenterClickBgSignle} onPress={()=>that.props.navigation.navigate('AfNorWeb',{third_website_url:helpcenter_url,title:"帮助中心"})}></TouchableOpacity>
            <TouchableOpacity style={styles.userCenterClickBgSignle} onPress={()=>that.linking('tel:'+that.state.costumerTel)}></TouchableOpacity>

            <TouchableOpacity style={styles.userCenterClickBgSignle}  onPress={()=>that.props.navigation.navigate('AfMySetting',{title:'设置'})}></TouchableOpacity>
          </ImageBackground>
        </View>

  );
  }
}

export default AfMyScreen
