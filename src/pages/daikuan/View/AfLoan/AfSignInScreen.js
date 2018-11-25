import React, { Component } from 'react';
import {
   TouchableOpacity,
   Text,
   TextInput,
   View ,
   Image,
   StatusBar,
   ScrollView,
    ImageBackground,
   AsyncStorage,Alert
  } from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfSignInScreenStyle');
import {NavigationActions,StackActions} from 'react-navigation';
import cfn from '../../base/commonFun/commonFun';
const signBg = require('../../Resource/images/Af/signBg.png');
const signInnerBg = require('../../Resource/images/Af/signInnerBg.png');
const loginAgreeImage = require('../../Resource/images/Af/loginAgree.png');
const loginUnAgreeImage = require('../../Resource/images/Af/loginUnAgree.png');
const clearPhoneImage = require('../../Resource/images/Af/clearPhoneImage.png');
const verifyCodeBtnImage = require('../../Resource/images/Af/verifyCodeBtnImage.png');
var Global = require('../../WsSupport/connecting');
import Icon from 'react-native-vector-icons/Ionicons';
import {Loading,EasyLoading} from '../../../../component/Loading'
import SplashScreen from 'react-native-splash-screen';
class AfSignInScreen extends React.Component {
   
  constructor(props) {
    super(props);

      this.state = {
          user_id:'',
          phone_number:'',
          verify_code:'',
          is_agree:1,
          AgreeImage:loginAgreeImage,
          loginPhoneNumber:'',
          verifyCode:'',
          verifyCodeNotice:'获取验证码',
          codeNoticeColor:'#ffffff',
          notice_switch:1,
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


      var _that = this;


      //_that.save();
      //_that.clear();


  }
  componentWillMount(){
      SplashScreen.hide();
  }
  componentDidUpdate() {
    
  }

  componentWillUnmount() {


  }

    //保存数据
  save(keyValuePairs) {
        //设置多项

        AsyncStorage.multiSet(keyValuePairs, function(errs){
            if(errs){
                //TODO：存储出错
                return;
            }
            //Alert.alert('数据保存成功!');
        });
  }

    //清除数据
  clear() {
        var _that = this;
        AsyncStorage.clear(function(err){
            if(!err){
                _that.setState({
                    user_id: "",
                    phone_number: ""
                });
                //Alert.alert('存储的数据已清除完毕!');
            }
        });
  }
  //
  setAgree(){


      var that = this;
      if(that.state.is_agree==1){
          that.setState({'is_agree':0,'AgreeImage':loginUnAgreeImage});
      }else{

          that.setState({'is_agree':1,'AgreeImage':loginAgreeImage});

      }
  }



  //捕获登录手机号
    setLoginInPhoneNumber(loginPhoneNumber){

        var  newLoginPhoneNumber = parseInt(loginPhoneNumber);
             newLoginPhoneNumber = newLoginPhoneNumber.toString().replace(/[^\d]+/, '');

        if (newLoginPhoneNumber.toString().length>11){
            newLoginPhoneNumber = newLoginPhoneNumber.toString().substring(0,11);

        }
        this.setState({ loginPhoneNumber: newLoginPhoneNumber});

    }
    //捕获登录手机号
    setLoginInVerifyCode(verifyCode){

        var  newVerifyCode = verifyCode.toString().replace(/\s+/g,"");

        if (newVerifyCode.toString().length>6){
            newVerifyCode = newVerifyCode.toString().substring(0,6);
        }
        this.setState({ verifyCode: newVerifyCode});

    }

    //清除手机号
    clearPhoneInput(){

        this.setState({ loginPhoneNumber: ''});
    }

    //获取验证码--->计时器
    getVerifyCode(){
        var that = this;
        if(that.state.notice_switch==0){

            return;
        }
        if(that.state.loginPhoneNumber.toString().length!=11){
            Alert.alert('请输入正确手机号');
            return;
        }
        that.setState({
            'notice_switch':0
        });

        var countDown = 60;
        var getCode=setInterval(function(){
            countDown--;
            var notice_str = '等待('+countDown+'秒)';
            var notice_color_str = '#fdcb42';
            var notice_switch = 0;
            if(countDown==0){
                clearInterval(getCode);
                notice_str = "发送验证码";
                notice_color_str = '#ffffff';
                notice_switch = 1;
            }
            that.setState({
                'codeNoticeColor':notice_color_str,
                'verifyCodeNotice':notice_str,
                'notice_switch':notice_switch
            });
        },1000);
        that.sendMsg();
    }

    //发送验证码
    sendMsg(){

        var that=this;
        if(that.state.notice_switch==0){
            return;
        }
        if(that.state.loginPhoneNumber.toString().length!=11){
            Alert.alert('请输入正确手机号');
            return;
        }


        var url_fetch = Global.requestDomain+"/Index/Public/sendSms";
        var requestParam = Global.requestParam;
        requestParam += "&phone_number="+that.state.loginPhoneNumber;
        console.warn(requestParam);
        fetch(url_fetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestParam
        }).then((response) => response.json()).then((responseJson) => {
            console.warn(responseJson);

            if( typeof(responseJson.status) !="undefied" && parseInt(responseJson.status) ==1){


            }else{
                if(responseJson.back_msg){
                    Alert.alert(responseJson.back_msg);
                }

            }

        }).catch((error) => {
                console.warn(error);

        });


    }


    //登录
    setLogin(){
        console.warn(this.state.loginPhoneNumber);
        var that=this;
        if(that.state.is_agree==0){
            Alert.alert('请阅读并同意用户协议');
            return;
        }
        if(that.state.loginPhoneNumber.toString().length!=11){
            Alert.alert('请输入正确手机号');
            return;
        }
        if(that.state.verifyCode.toString().length==0){
            Alert.alert('请输入验证码');
            return;
        }
        EasyLoading.show('正在登录');
        var url_fetch = Global.requestDomain+"/Index/User/userReg";
        var requestParam = Global.requestParam;
        requestParam += "&phone_number="+that.state.loginPhoneNumber+"&verify_code="+that.state.verifyCode;
        console.warn(requestParam);
        fetch(url_fetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestParam
        }).then((response) => response.json()).then((responseJson) => {
            EasyLoading.dismis();

            if( typeof(responseJson.back_status) !="undefied" && parseInt(responseJson.back_status) ==1){
                Global.user_id=responseJson.back_data.id;
                Global.phone_number=responseJson.back_data.phone_number;
                AsyncStorage.clear();
                var keyValuePairs = [['user_id', responseJson.back_data.id],['phone_number', responseJson.back_data.phone_number]];
                //存储会话信息
                that.save(keyValuePairs);
                //Alert.alert(responseJson.back_msg);
                //判断全局审核开关
                if( Global.app_version_status == 2){
                    //跳转贷超首页
                    that.navToPage('AfNav');
                }else{
                    //跳转记账首页
                    that.navToPage('TabContainer');
                }




            }else{

                Alert.alert(responseJson.back_msg);
            }

        }).catch((error) => {
            EasyLoading.dismis();
                console.warn(error);

        });


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
    gotoAgreement(){

      this.props.navigation.navigate('agreement');


    }


render() {
    const { navigate } = this.props.navigation;
    var that = this;
    // console.warn(that.state.user_id);
    // console.warn(that.state.phone_number);
    return (
        <ScrollView bounces={false}>
            <View style={styles.container}>
                <Image source={signBg} style={styles.bgImage} resizeMode='stretch'/>
                <View style={styles.signBox}>
                    <ImageBackground style={styles.signBoxInner} source={signInnerBg} resizeMode='stretch'>
                        <View style={styles.signBoxInnerText}>
                            <View style={styles.signBoxInnerInputBox1}>
                                <View style={styles.Input1Box}>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.input1Sty}  value={that.state.loginPhoneNumber}
                                        placeholder="请 输 入 手 机 号"  underlineColorAndroid='transparent'
                                        onChangeText ={(thisValue) => that.setLoginInPhoneNumber(thisValue)}
                                    />
                                </View>
                                <TouchableOpacity style={styles.clearPhoneInput} onPress={()=>that.clearPhoneInput()}>
                                    <Image source={clearPhoneImage} style={styles.clearPhoneImage} resizeMode='stretch'></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signBoxInnerInputBox2}>
                                <View style={styles.Input2Box}>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.input2Sty}  value={that.state.verifyCode}
                                        placeholder="请 输 入 验 证 码"  underlineColorAndroid='transparent'
                                        onChangeText ={(thisVerifyCode) => that.setLoginInVerifyCode(thisVerifyCode)}
                                    />
                                </View>
                                <TouchableOpacity style={styles.getVerifyCodeBtn} onPress={()=>that.getVerifyCode()}>
                                    <ImageBackground source={verifyCodeBtnImage} style={styles.verifyCodeBtnImage} resizeMode='stretch'>
                                        <View style={styles.verifyCodeNoticeBox}>
                                            <Text  style={[styles.verifyCodeNotice,{'color':that.state.codeNoticeColor}]} >{that.state.verifyCodeNotice}</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.signBoxInnerInputBox3} onPress={()=>that.setLogin()}></TouchableOpacity>
                            <View style={styles.signBoxInnerInputBox4}>
                                <TouchableOpacity style={styles.loginAgree} onPress={()=>that.setAgree()}><Image source={that.state.AgreeImage} style={styles.loginAgree} resizeMode='stretch'></Image></TouchableOpacity>
                                <View style={styles.agreeTextBox}><Text style={styles.agreeText}>我已经阅读并同意</Text><TouchableOpacity onPress={()=>that.gotoAgreement()}><Text style={[styles.agreeText,{color:"blue",marginLeft:0}]}>《用户服务协议》</Text></TouchableOpacity></View>

                            </View>

                        </View>
                    </ImageBackground>
                </View>
            </View>
            <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
        </ScrollView>


    );
  }
}

export default AfSignInScreen
