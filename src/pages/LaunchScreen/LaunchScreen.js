import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,AsyncStorage,
    NetInfo,ImageBackground,
    Alert
} from 'react-native';

import {NavigationActions,StackActions} from 'react-navigation';
import Global from '../daikuan/WsSupport/connecting.js';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import utils from '../../utils/utils';
const checkBg=require('../daikuan/Resource/images/load/loadbg.png');
const checkBgX=require('../daikuan/Resource/images/load/loadbg_x.png');
import {Loading,EasyLoading} from '../../component/Loading'
type Props = {};
//isIphoneX
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        //SplashScreen.hide();
        //拼接统一POST参数
        Global.appApiConfig.device_number = DeviceInfo.getUniqueID();
        Global.requestParam = Global.requestParam+"&device_number="+Global.appApiConfig.device_number;

        this.state = {user_id:'', phone_number:''};
         var that=this;

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

    }

    static defaultProps = {};

    componentWillMount() {

    }

    componentDidMount() {

        // this.handleNetError();
        this.checkAppVerifyStatus();
    }

    handleNetError() {
        SplashScreen.hide();
        Alert.alert('网络连接失败，请检查网络后重试',"",[{text:'好的',onPress:()=>{this.checkAppVerifyStatus();}}])
    }

    //检查app审核状态、版本开关、前后置注册开关
    checkAppVerifyStatus(){
        EasyLoading.show('正在加载');
        var that = this;
        var url_fetch = Global.requestDomain+"/Index/Public/appInitData";

        var requestParam = Global.requestParam;
        //console.warn(url_fetch);
        // console.warn(requestParam);return;
        fetch(url_fetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestParam
        }).then((response) => response.json()).then((responseJson) => {
            EasyLoading.dismis();
            // /that.navToPage('AppOneIndex');return;
             console.warn(responseJson);
            Global.app_version_status = 1;
            Global.app_route_index = 1;
            Global.costumerTel = '';
            Global.wechat_account = '';
            if( typeof(responseJson.app_version_status) !="undefied" && parseInt(responseJson.app_version_status) ==2){
                Global.app_version_status = responseJson.app_version_status;  //app审核状态 1 审核前 2 审核后
                Global.reg_position_status = responseJson.reg_position_status; //1前置注册 2后置注册
                Global.website_url = responseJson.website_url; //h5 网站
                Global.app_route_index = responseJson.app_route_index;  //daichao板式 索引 1 默认 2 简化
                Global.costumerTel = responseJson.customer_tel;  //客服电话
                Global.wechat_account = responseJson.wechat_account;  //微信


                //当该版本app有H5站点时，跳转到H5站点
                if(typeof(responseJson.has_web) !="undefied" && parseInt(responseJson.has_web) ==2&&responseJson.website_url.length>0){

                    console.warn('webview跳转');
                    that.navToPage('AfWeb');

                }else{
                    //跳简化版
                    if(responseJson.app_route_index==2){
                        that.navToPage('AppOneIndex');
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
                }


            }else{
                //其他情况跳转到审核前的界面


               if(!that.state.user_id){
                 
                    that.navToPage('AfSignIn');
                }else{
                    
                    that.navToPage('TabContainer');
                }

                //that.navToPage('AfSignIn');
                //that.navToPage('TabContainer');

            }
        }).catch((error) => {
            console.warn(error);
            EasyLoading.dismis();
            this.handleNetError();
            //网络出错也跳转到审核界面
            //console.warn("跳转到审核界面");

            //that.navToPage('AfSignIn');
            //that.navToPage('TabContainer');

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

    render() {
        return (
            <Image source={utils.isIphoneX() ? checkBgX : checkBg} style={styles.container}  resizeMode='stretch' />

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
