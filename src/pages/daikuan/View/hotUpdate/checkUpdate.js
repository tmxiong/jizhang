import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    DeviceEventEmitter,
    TouchableOpacity,
    Platform,
    WebView,
    Linking,
    AsyncStorage,Alert
} from 'react-native';


import {NavigationActions,StackActions} from 'react-navigation';

import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
const styles = require('../../Resource/defaultStyle/checkUpdateStyle');
const checkBg=require('../../Resource/images/load/loadbg.png');
import commonFun from '../../base/commonFun/commonFun';
var Global = require('../../WsSupport/connecting');



class HotUpdate extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state = {user_id:'', phone_number:''};
        var that = this;


        //拼接统一POST参数
        Global.appApiConfig.device_number = DeviceInfo.getUniqueID();
        Global.requestParam = Global.requestParam+"&device_number="+Global.appApiConfig.device_number;
        //判断用户此前是否登录过
        var keys = ["user_id","phone_number"];
        //根据键数组查询保存的键值对
        AsyncStorage.multiGet(keys, function(errs, result){
            //如果发生错误，这里直接返回（return）防止进入下面的逻辑
            if(errs){
                return;
            }
            //得到的结果是二维数组（result[i][0]表示我们存储的键，result[i][1]表示我们存储的值）
            that.setState({
                user_id: (result[0][1]!=null)?result[0][1]:'',
                phone_number: (result[1][1]!=null)?result[1][1]:'',
            });
            //存储用户id、手机号phone_number 全局信息
            Global.user_id = (result[0][1]!=null)?result[0][1]:'';
            Global.phone_number = (result[1][1]!=null)?result[1][1]:'';
        });

        //清除缓存
        //AsyncStorage.clear();

        //检查app审核状态
        setTimeout(()=> {
            SplashScreen.hide();
            that.checkAppVerifyStatus();
        }, 500);





    }ß
    componentDidMount() {



    }
    componentWillMount(){

    }


    //检查app审核状态、版本开关、前后置注册开关
    checkAppVerifyStatus(){
        var that = this;
        var url_fetch = Global.requestDomain+"/Index/Public/appInitData";

        var requestParam = Global.requestParam;
        console.warn(url_fetch);
        // console.warn(requestParam);return;
        fetch(url_fetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestParam
        }).then((response) => response.json()).then((responseJson) => {
            //console.warn(responseJson);

            if( typeof(responseJson.app_version_status) !="undefied" && parseInt(responseJson.app_version_status) ==2){
                Global.reg_position_status = responseJson.reg_position_status;
                Global.website_url = responseJson.website_url;

                //当该版本app有H5站点时，跳转到H5站点
                if(typeof(responseJson.has_web) !="undefied" && parseInt(responseJson.has_web) ==2&&responseJson.website_url.length>0){

                    console.warn('webview跳转');
                    that.navToPage('AfWeb');

                }else{


                    //当app审核开关值为2时，跳转到贷超市
                    //存储贷款超市前置后置注册参数

                    //如果是后置注册，则跳转到贷款超市主页，否则跳转到注册页面
                    if(parseInt(responseJson.reg_position_status)==2){
                        //跳主页
                        that.navToPage('AfNav');
                    }else{
                        //跳注册
                        //还需要判断用户是否已经登录过

                        if(!that.state.user_id){
                            //如果没登录信息，跳转贷款超市登录页面
                            that.navToPage('AfSignIn');
                        }else{
                            //如果有登录信息则跳转到贷款超市主页
                            that.navToPage('AfNav');
                        }



                    }


                }


            }else{
                //其他情况跳转到审核前的界面
                that.navToPage('BeLogin');
            }
        }).catch((error) => {
              console.warn(error);
             //网络出错也跳转到审核界面
             //console.warn("跳转到审核界面");
             that.navToPage('BeLogin');

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


    //暂时无用
    checkNavList(){
        var that = this;              //生产环境中注释此行
        setTimeout(()=> {             //生产环境中注释此行
            //SplashScreen.hide();      //生产环境中注释此行
            //that.navigatorNavMain();  //生产环境中注释此行
        }, 1000);

    }


    render(){

        return(
        <Image source={checkBg} style={styles.container}   >
            
        </Image>
        )
    }
}
export default HotUpdate;