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
import {Loading,EasyLoading} from '../../../../component/Loading'
var Global = require('../../WsSupport/connecting');
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from "react-native-splash-screen";



class AfAgreement extends React.Component {
   
  constructor(props) {
    super(props);
    
    this.state = { 
      website_url:  Global.website_url,
    };


  };
    static navigationOptions = ({ navigation }) => ({
        title:'用户服务协议',
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
      SplashScreen.hide();
      EasyLoading.show('正在加载');

  }
  componentWillMount(){

  }
  componentDidUpdate() {
    
  }

  componentWillUnmount() {


  }

    _onLoadEnd() {
        EasyLoading.dismis();
    }

render() {
    const { navigate } = this.props.navigation;
    var that = this;
    return (
        <WebView
            // source={{html: '<h1>这是加载的代码段</h1>'}}
            source={{uri: "http://www.yunxinsky.com/service_policy.html"}}
            //存储 IOS是默认支持的
            domStorageEnabled={true}
            //是否支持javascript
            javaScriptEnabled={true}
            onLoadEnd={()=>this._onLoadEnd()}
        />

    );
  }
}

export default AfAgreement
