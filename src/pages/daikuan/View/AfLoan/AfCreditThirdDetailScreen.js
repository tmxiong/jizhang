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
    WebView,Alert
  } from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfCreditThirdDetailScreenStyle');
import {StackActions} from 'react-navigation';
import cfn from '../../base/commonFun/commonFun';
var Global = require('../../WsSupport/connecting');
import Icon from 'react-native-vector-icons/Ionicons';

class AfCreditThirdDetailScreen extends React.Component {
   
  constructor(props) {
    super(props);
    //console.warn(this.props.navigation.state);
    this.state = { 
      website_url:  this.props.navigation.state.params.third_website_url,
      title:  this.props.navigation.state.params.title,
    };


  };

  // static navigationOptions = ({ navigation }) => ({
  //     title:navigation.state.params.title
  // });

    // textAlign:'center',
    // justifyContent: 'center',
    // alignItems:'center',

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

export default AfCreditThirdDetailScreen
