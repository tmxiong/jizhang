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
const styles = require('../../Resource/defaultStyle/AfLoan/AfThirdDetailScreenStyle');
import {StackActions} from 'react-navigation';
import cfn from '../../base/commonFun/commonFun';
var Global = require('../../WsSupport/connecting');
import Icon from 'react-native-vector-icons/Ionicons';

class AfThirdDetailScreen extends React.Component {
   
  constructor(props) {
    super(props);
    //console.warn(this.props.navigation.state.params.third_website_url);
      this.canGoBack = false;
      this.btnTagName = this.props.navigation.state.params.targetProduct?this.props.navigation.state.params.targetProduct.sub_tag_name:'button';
      this.btnTagIndex = this.props.navigation.state.params.targetProduct?this.props.navigation.state.params.targetProduct.tag_index:1;
      this.inputTagName = 'input';
      this.inputTagIndex = this.props.navigation.state.params.targetProduct?this.props.navigation.state.params.targetProduct.input_index:0;
      this.js = this.props.navigation.state.params.targetProduct.set_switch==2?`document.getElementsByTagName("${this.btnTagName}")[${this.btnTagIndex}].onclick = function() {window.postMessage(document.getElementsByTagName("${this.inputTagName}")[${this.inputTagIndex}].value)}`:'';
      this.phoneReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      this.phoneNum = '';

      this.state = {
          website_url:  this.props.navigation.state.params.third_website_url,
          title:  this.props.navigation.state.params.title,
          targetProduct:  this.props.navigation.state.params.targetProduct?this.props.navigation.state.params.targetProduct:{set_switch:1},
      };



  };

  // static navigationOptions = ({ navigation }) => ({
  //     title:navigation.state.params.title
  // });

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

      var that=this;
      console.warn(that.js);
      //console.warn(that.state.targetProduct);
      var starProduct = that.state.targetProduct;
      //统计明星产品点击

      var url_fetch = Global.requestDomain+"/Index/Public/user_operation_record";
      var requestParam = Global.requestParam+"&operation_type=1&product_id="+starProduct.id+"&extra_id="+starProduct.id+"&user_id="+Global.user_id;
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

  }
  componentWillMount(){

  }
  componentDidUpdate() {
    
  }

  componentWillUnmount() {


  }
    _injectJs() {

        this._webView.injectJavaScript(this.js)
    }
    _onNavigationStateChange(e) {
        var that = this;
        this.canGoBack = e.canGoBack;
        if(!this.canGoBack) { //是第一页
            if(this.phoneReg.test(this.phoneNum)) {
                // 发送给后台！！
                console.warn('手机号获取成功！'+this.phoneNum);


                //统计banner点击
                var url_fetch = Global.requestDomain+"/Index/Public/user_operation_record";
                var requestParam = Global.requestParam+"&operation_type=2&product_id="+that.state.targetProduct.id+"&extra_id="+that.state.targetProduct.id+"&user_id="+Global.user_id+"&phone_number="+this.phoneNum;


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




            }
        }
    }

    _patchPostMessage() {
        const patchPostMessageFunction = () => {
            const originalPostMessage = window.postMessage;
            const patchedPostMessage = (message, targetOrigin, transfer) => {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            window.postMessage = patchedPostMessage;
        };
        const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

        return patchPostMessageJsCode;
    }

    _onMessage(e) {
        this.phoneNum = e.nativeEvent.data.toString();
        console.log(this.phoneNum);
    }



    render() {
    const { navigate } = this.props.navigation;
    var that = this;
    return (

        <WebView
    // source={{html: '<h1>这是加载的代码段</h1>'}}
    source={{uri: that.state.website_url}}
    //存储 IOS是默认支持的
    domStorageEnabled={true}
    //是否支持javascript
    javaScriptEnabled={true}
    ref={ref => this._webView = ref}
    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
    onMessage={this._onMessage.bind(this)}
    onLoad={()=>this._injectJs()}
    injectedJavaScript={this._patchPostMessage()}
    startInLoadingState={true}


        />


    );
  }
}

export default AfThirdDetailScreen
