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
    WebView
  } from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfWebScreenStyle');
import {StackActions} from 'react-navigation';
import cfn from '../../base/commonFun/commonFun';
var Global = require('../../WsSupport/connecting');
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from "react-native-splash-screen";

class AfWebScreen extends React.Component {
   
  constructor(props) {
    super(props);
    
    this.state = { 
      website_url:  Global.website_url,
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
      SplashScreen.hide();

  }
  componentWillMount(){

  }
  componentDidUpdate() {
    
  }

  componentWillUnmount() {


  }
  


render() {
    const { navigate } = this.props.navigation;
    var that = this;
console.warn(that.state.website_url);
    return (
        <WebView
    // source={{html: '<h1>这是加载的代码段</h1>'}}
    source={{uri: that.state.website_url}}
    //加载状态显示
    startInLoadingState={true}
    //存储 IOS是默认支持的
    domStorageEnabled={true}
    //是否支持javascript
    javaScriptEnabled={true}
        />

    );
  }
}

export default AfWebScreen
