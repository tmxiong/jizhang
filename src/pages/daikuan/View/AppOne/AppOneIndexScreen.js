import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    View,
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
    WebView, ImageBackground, Clipboard, AsyncStorage, Alert
} from 'react-native';

import {NavigationActions, StackActions} from 'react-navigation';
import commonFun from '../../base/commonFun/commonFun';

var Global = require('../../WsSupport/connecting');
import Icon from "react-native-vector-icons/Ionicons"
import SplashScreen from 'react-native-splash-screen';
import Navbar from '../../../../component/NavBar';
import Notice from '../../../../component/Notice';
import cfn from "../../../../utils/utils";
import ActionSheet from 'react-native-actionsheet'
import {EasyLoading} from "../../../../component/Loading";
import {Buttons} from "react-native/Libraries/Alert/Alert";
import type {AlertType} from "react-native/Libraries/Alert/AlertIOS";

const wechatPublicImage = require('../../Resource/images/Af/wechatPublicImage.jpg');
const weixinNoticeImage = require('../../Resource/images/Af/weixinNoticeImage.jpg');

class AppOneIndexScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pageData: {
                product_list: [],
                order_options: []
            },
            clickSwitch: 0,
            wechatPublicAccount: Global.wechat_account,
            text_des: Global.text_des,
            bannerPressFunc: this.bannerPressFunc,
            showCover: 0,
            orderOptions: []
        };

        this.selectedOption = 0;

    };

    static navigationOptions = {
        header: null,
    };

    randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }


    componentDidMount() {

        this.getProductIndexListNew(1);
        this.setRegLogin();

    }

    componentWillMount() {
        SplashScreen.hide();

        if (Global.user_id) {
            this.setState({clickSwitch: 1});
        }
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        EasyLoading.dismis();

    }


//保存数据
    save(keyValuePairs) {
        //设置多项

        AsyncStorage.multiSet(keyValuePairs, function (errs) {
            if (errs) {
                //TODO：存储出错
                return;
            }
            //Alert.alert('数据保存成功!');
        });
    }

//清除数据
    clear() {
        var _that = this;
        AsyncStorage.clear(function (err) {
            if (!err) {
                _that.setState({
                    user_id: "",
                    phone_number: ""
                });
                //Alert.alert('存储的数据已清除完毕!');
            }
        });
    }


//获取首页数据
    getProductIndexListNew(optionid) {
        EasyLoading.show('正在加载');
        var that = this;
        var url_fetch = Global.requestDomain + "/Index/ProductYx/getProductIndexList";
        var requestParam = Global.requestParam+"&option_id="+optionid;
        fetch(url_fetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestParam
        }).then((response) => response.json()).then((responseJson) => {
            EasyLoading.dismis();
            console.warn(responseJson);
            if (typeof(responseJson.back_status) != "undefied" && parseInt(responseJson.back_status) == 1) {
                var newPageData = responseJson.back_data;
                let orderOptions = this.setActionSheetOption(newPageData.order_options);
                that.setState({pageData: newPageData, orderOptions: orderOptions});


            } else {
                if (typeof(responseJson.back_status) != "undefied" && parseInt(responseJson.back_status) == -1) {

                    that.navToPage('AfSignIn');
                } else {

                    Alert.alert(responseJson.back_msg);
                }

            }


        }).catch((error) => {
            EasyLoading.dismis();
            console.error(error);


        });


    }

    navToPage(targetRouteName) {

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


    //登录
    setRegLogin() {

        var that = this;


        var url_fetch = Global.requestDomain + "/Index/User/userNewReg";
        var requestParam = Global.requestParam;

        fetch(url_fetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestParam
        }).then((response) => response.json()).then((responseJson) => {
            console.warn(responseJson);

            if (typeof(responseJson.back_status) != "undefied" && parseInt(responseJson.back_status) == 1) {
                that.setState({clickSwitch: 1});
                Global.user_id = responseJson.back_data.id;
                Global.phone_number = "";
                AsyncStorage.clear();
                var keyValuePairs = [['user_id', responseJson.back_data.id], ['phone_number', ""]];
                //存储会话信息
                that.save(keyValuePairs);


            }

        }).catch((error) => {


        });


    }


    //产品点击
    starProductClick(starProduct) {

        //统计明星产品点击
        var that = this;
        if (!that.state.clickSwitch) {
            console.warn('not login ');
            return;
        }
        var url_fetch = Global.requestDomain + "/Index/Public/user_operation_record";
        var requestParam = Global.requestParam + "&operation_type=3&product_id=" + starProduct.id + "&extra_id=" + starProduct.id + "&user_id=" + Global.user_id;
        fetch(url_fetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestParam
        }).then((response) => response.json()).then((responseJson) => {
            //console.warn(responseJson);
            if (typeof(responseJson.back_status) != "undefied" && parseInt(responseJson.back_status) == 1) {

            }


        }).catch((error) => {
            console.warn(error);


        });

        //跳转第三方页面
        //如果未登录则跳登录页面
        if (!Global.user_id) {
            this.props.navigation.navigate('AfSignIn');
        } else {
            //如果该产品设置为直接跳转到H5页面，则直接跳第三方申请页面
            if (parseInt(starProduct.jump_type) == 2) {
                this.props.navigation.navigate('AfTrDe', {
                    third_website_url: starProduct.jump_url,
                    title: starProduct.product_name,
                    targetProduct: starProduct
                });

            } else {

                //跳转到产品详情页
                this.props.navigation.navigate('AfProDe', {product: starProduct});

            }
        }

    }


    getProductBox() {

        var that = this;
        var productList = that.state.pageData.product_list;
        var productSingleBoxArray = [];
        if (productList.length == 0) {

            for (var i = 0; i < 10; i++) {

                productSingleBoxArray.push(
                    <TouchableOpacity key={i} style={styles.singleProductBox} activeOpacity={0.8}>
                        <View style={styles.productInnerBox}>
                            <View style={styles.productInnerTop}>
                                <View style={styles.productInnerTopInner}>
                                    <View style={styles.productInnerTopInnerLeft}>
                                        <View style={styles.productInnerTopInnerLeftImage}></View>
                                    </View>
                                    <View style={styles.productInnerTopInnerRight}>
                                        <View style={styles.productInnerTopInnerRightA}>
                                            <View style={styles.productInnerTopInnerRightA1}><Text
                                                style={styles.A1Text}>钱包管家</Text></View>
                                            <View style={styles.productInnerTopInnerRightA2}>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>


                                            </View>
                                            <View style={styles.productInnerTopInnerRightA3}>
                                                <View style={styles.applyCondition1}><Text
                                                    style={styles.applyCondition1Text}>有身份证可贷</Text></View>
                                                <View style={styles.applyCondition2}><Text
                                                    style={styles.applyCondition2Text}>有身份证可贷</Text></View>
                                                <View style={styles.applyCondition2}><Text
                                                    style={styles.applyCondition2Text}>有身份证可贷</Text></View>
                                            </View>
                                        </View>
                                        <View style={styles.productInnerTopInnerRightB}>
                                            <View style={styles.productInnerTopInnerRightB1}>
                                                <Icon name="ios-thumbs-up" style={styles.iconStyle} size={12}
                                                      color="#b4e2b1"/>
                                                <Text style={styles.topRank1}>TOP1</Text>


                                            </View>
                                            <View style={styles.productInnerTopInnerRightB2}>
                                                <Text style={styles.productInnerTopInnerRightB2Text}>13457人已申请</Text>

                                            </View>


                                        </View>

                                    </View>
                                </View>
                            </View>
                            <View style={styles.productInnerBottom}>
                                <View style={styles.halfCircleLeft}></View>
                                <View style={styles.productInnerBottomMiddle}>
                                    <View style={styles.productInnerBottomMiddleLeft}>
                                        <Text style={styles.productInnerBottomMiddleLeftText}>人人可贷，快速下款，轻松到手</Text>
                                    </View>
                                    <View style={styles.productInnerBottomMiddleRight}>
                                        <Icon name="md-alarm" style={styles.iconStyle} size={12} color="#ee9433"/>
                                        <Text style={styles.productInnerBottomMiddleRightText}>平均0.3小时放款</Text>
                                    </View>
                                </View>
                                <View style={styles.halfCircleRight}></View>

                            </View>

                        </View>
                    </TouchableOpacity>
                );
            }

        } else {

            for (var i = 0; i < productList.length; i++) {
                let thisProduct = productList[i];

                let tagDesString = thisProduct.tag_des;
                let tagDesArray = tagDesString.split(",");
                let tagView = [];
                for (var n = 0; n < tagDesArray.length; n++) {
                    if (n == 0) {
                        tagView.push(
                            <View key={n} style={styles.applyCondition1}><Text
                                style={styles.applyCondition1Text}>{tagDesArray[n]}</Text></View>
                        );
                    } else {
                        tagView.push(
                            <View key={n} style={styles.applyCondition2}><Text
                                style={styles.applyCondition2Text}>{tagDesArray[n]}</Text></View>
                        );
                    }
                }
                var rankText = null;
                if (i + 1 <= 5) {
                    var m = i + 1;
                    var topRank = "topRank" + m;
                    rankText = <Text style={styles[topRank]}>TOP{i + 1}</Text>;
                }


                productSingleBoxArray.push(
                    <TouchableOpacity key={i} style={styles.singleProductBox} activeOpacity={0.6}
                                      onPress={() => that.starProductClick(thisProduct)}>
                        <View style={styles.productInnerBox}>
                            <View style={styles.productInnerTop}>
                                <View style={styles.productInnerTopInner}>
                                    <View style={styles.productInnerTopInnerLeft}>
                                        <View style={styles.productInnerTopInnerLeftImage}>
                                            <Image source={{uri: thisProduct.product_picture_url_qiniu}}
                                                   style={styles.productImage}/>
                                        </View>
                                    </View>
                                    <View style={styles.productInnerTopInnerRight}>
                                        <View style={styles.productInnerTopInnerRightA}>
                                            <View style={styles.productInnerTopInnerRightA1}><Text
                                                style={styles.A1Text}>{thisProduct.product_name}<Text style={{fontSize:14,color:"red"}}> {thisProduct.amount_low}~{thisProduct.amount_high}元</Text></Text></View>
                                            <View style={styles.productInnerTopInnerRightA2}>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Icon name="md-heart" style={styles.iconStyle} size={12}
                                                      color="#fec844"/>
                                                <Text style={{fontSize:10,color:'gray'}}>还款期限:{thisProduct.divide_period_min}~{thisProduct.divide_period_max}天</Text>
                                            </View>
                                            <View style={styles.productInnerTopInnerRightA3}>
                                                {tagView}
                                            </View>
                                        </View>
                                        <View style={styles.productInnerTopInnerRightB}>
                                            <View style={styles.productInnerTopInnerRightB1}>
                                                <Icon name="ios-thumbs-up" style={styles.iconStyle} size={12}
                                                      color="#b4e2b1"/>
                                                {rankText}


                                            </View>
                                            <View style={styles.productInnerTopInnerRightB2}>
                                                <Text
                                                    style={styles.productInnerTopInnerRightB2Text}>{thisProduct.pass_number}人已申请</Text>

                                            </View>


                                        </View>

                                    </View>
                                </View>
                            </View>
                            <View style={styles.productInnerBottom}>
                                <View style={styles.halfCircleLeft}></View>
                                <View style={styles.productInnerBottomMiddle}>
                                    <View style={styles.productInnerBottomMiddleLeft}>
                                        <Text style={styles.productInnerBottomMiddleLeftText}>{thisProduct.desc}</Text>
                                    </View>
                                    <View style={styles.productInnerBottomMiddleRight}>
                                        <Icon name="md-alarm" style={styles.iconStyle} size={12} color="#ee9433"/>
                                        <Text
                                            style={styles.productInnerBottomMiddleRightText}>平均{thisProduct.loan_release_time}小时放款</Text>
                                    </View>
                                </View>
                                <View style={styles.halfCircleRight}></View>

                            </View>

                        </View>
                    </TouchableOpacity>
                );
            }

        }

        return (
            <View>
                {productSingleBoxArray}
            </View>
        );


    }

    cancelToWeiXin() {
        this.setState({showCover: 0});

    }

    confirmWeiXin() {
        this.setState({showCover: 0});

        Linking.canOpenURL('weixin://').then((support) => {
            if (support) {
                Linking.openURL('weixin://');
            } else {
                Alert.alert('请先安装微信');
            }
        });
    }


    copyWechat() {
        var that = this;

        var wechatPublicAccount = that.state.wechatPublicAccount;
        Clipboard.setString(wechatPublicAccount);
        let str = Clipboard.getString();
        console.warn(str);//我是文本
        // that.setState({showCover: 1});

        Alert.alert('复制成功',
            that.state.text_des?that.state.text_des:'微信号（公众号）"'+wechatPublicAccount+'"已经复制，请前往微信粘贴搜索加贷款资源群',
            [

                {
                    text: '取消',
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: '去微信粘贴',
                    onPress: () =>{that.confirmWeiXin()}
                },
            ],
            {
                cancelable: true,
                onDismiss: () => {}
            });
    }

    getCover() {
        var that = this;
        if (that.state.showCover == 0) {
            return;
        }

        return (
            <View style={styles.modeCoverOut}>
                <View style={styles.modeCoverInner}>
                    <View style={styles.modeCover1}>

                    </View>
                    <View style={styles.modeCover2}>
                        <View style={styles.wechatCoverBox}>
                            <View style={styles.jumpToWeixinBox}>
                                <Image style={styles.weixinNoticeImage} source={weixinNoticeImage}
                                       resizeMode='stretch'></Image>
                                <View style={styles.weixinbtnBox}>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.weixinbtnBox1}
                                                      onPress={() => that.cancelToWeiXin()}><Text
                                        style={styles.weixinbtnBox1Text}> 取消</Text></TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.weixinbtnBox2}
                                                      onPress={() => that.confirmWeiXin()}><Text
                                        style={styles.weixinbtnBox2Text}> 去微信</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        );

    }

    getPhoneNum() {
        var phoneStart = new Array("150", "131", "158", "133", "159", "137", "138", "170", "187", "188", "189");

        function getRandom(start, end) {
            return Math.floor(Math.random() * end + start);
        }

        function getPhoneNum() {
            var start = phoneStart[getRandom(0, 10)];
            var end = getRandom(1000, 8999);
            return start + "****" + end;
        }

        function getMoney() {
            return getRandom(1, 10) * 1000;
        }

        return `恭喜${getPhoneNum()}用户成功申请${getMoney()}元贷款！`;
    }

    getNotice() {
        let a = [];
        for (let i = 0; i < 25; i++) {
            a.push({text:'小技巧：申请3个以上产品，成功率高达99%哦！',color:'#25ff73'});
            a.push({text:this.getPhoneNum(),color:'#f3f3f3'})
        }
        return a;
    }

    sortList(index) {
        if(index === this.state.orderOptions.length - 1) {
            return;
        }
        this.selectedOption = index;
        this.getProductIndexListNew(index+1);
        // console.warn(index);
    }

    showActionSheet = () => {
        this.actionSheet.show()
    };

    setActionSheetOption(options) {

        let op = [];
        if (options.length === 0) {
            op = ['取消']
        } else {
            op = options.map((item, index) => {
                return item.des
            });
            op[op.length] = '取消'
        }
        // console.log(op);

        return op
    }

    render() {
        var that = this;
        //console.warn(this.state.pageData.order_options);
        return (
            <View style={{flex: 1}}>
                {that.getCover()}
                <Navbar
                    leftIcon={null}
                    middleText={'贷款大全'}
                    bgColor={'#c86739'}
                    navBarHeight={cfn.picHeight(150)}
                    rightText={'排序'}
                    rightFn={() => this.showActionSheet()}
                />
                <Notice
                    noticeData={this.getNotice()}
                />
                <ScrollView style={styles.container}>
                    {that.getProductBox()}


                    <TouchableOpacity onPress={() => {
                        that.copyWechat()
                    }} activeOpacity={0.9}>
                        <ImageBackground style={styles.wechatBox} source={wechatPublicImage} resizeMode='stretch'>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={{width: '100%', height: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: '#999'}}>———— 更多新品 敬请期待 ————</Text>
                    </View>
                </ScrollView>
                <ActionSheet
                    ref={o => this.actionSheet = o}
                    title={'排序方式'}
                    options={this.state.orderOptions}
                    cancelButtonIndex={this.state.orderOptions.length - 1}
                    destructiveButtonIndex={this.selectedOption}
                    onPress={this.sortList.bind(this)}
                />
            </View>

        );
    }
}

export default AppOneIndexScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    singleProductBox: {
        width: commonFun.deviceWidth() * 0.94,
        height: commonFun.deviceWidth() * 0.25,
        marginTop: commonFun.deviceWidth() * 0.03,
        marginLeft: commonFun.deviceWidth() * 0.03,
        borderRadius: 2,
        borderTopWidth: 5,
        borderTopColor: 'orange',
        backgroundColor: '#ffffff',
    },
    productInnerTop: {
        width: '100%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    productInnerTopInner: {
        width: '94%',
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: "#f8f8f8",
        display: 'flex',
        flexDirection: 'row',
    },
    productInnerTopInnerLeft: {
        width: '22%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInnerTopInnerLeftImage: {
        width: commonFun.deviceWidth() * 0.94 * 0.22 * 0.7,
        height: commonFun.deviceWidth() * 0.94 * 0.22 * 0.7,
        marginTop: -3,
        borderRadius: 15,
        borderWidth: 0,
        borderColor: '#e2e2e2',
        overflow: 'hidden',

    },
    productInnerTopInnerRight: {
        width: '78%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    productInnerTopInnerRightA: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInnerTopInnerRightA1: {
        width: '100%',
        height: '33%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    A1Text: {
        fontSize: 14,
        color: '#000000',
    },
    iconStyle: {
        marginRight: 4,
    },
    productInnerTopInnerRightA2: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    productInnerTopInnerRightA3: {
        width: '100%',
        height: '42%',
        marginTop: -3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
    applyCondition1: {
        width: 'auto',
        height: 12,
        paddingLeft: 3,
        paddingRight: 3,
        marginTop: 2,
        marginLeft: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e88fa0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyCondition1Text: {
        fontSize: 9,
        color: '#e88fa0',
        //color:'#a9a65d',

    },

    applyCondition2: {
        width: 'auto',
        height: 12,
        paddingLeft: 3,
        paddingRight: 3,
        marginTop: 2,
        marginLeft: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#a9a65d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyCondition2Text: {
        fontSize: 9,
        color: '#a9a65d',
        //color:'#a9a65d',

    },


    productInnerTopInnerRightB: {
        width: '30%',
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor:'blue',
    },
    productInnerTopInnerRightB1: {
        width: '100%',
        height: '33%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },

    topRank1: {
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: '700',
        color: '#e23b2d'
    },
    topRank2: {
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: '700',
        color: '#f05328'
    },
    topRank3: {
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: '700',
        color: '#6d6afb'
    },
    topRank4: {
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: '700',
        color: '#f5b744'
    },
    topRank5: {
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: '700',
        color: '#57daf6'
    },

    productInnerTopInnerRightB2: {
        width: '100%',
        height: '33%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    productInnerTopInnerRightB2Text: {
        fontSize: 10,
        color: "#979797"
    },
    productInnerBottom: {
        width: '100%',
        height: '25%',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    productInnerBottomMiddle: {
        width: commonFun.deviceWidth() * 0.85,
        height: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    productInnerBottomMiddleLeft: {
        width: commonFun.deviceWidth() * 0.85 * 0.6,
        height: '100%',
        overflow: 'hidden',
        flexDirection: 'row',

        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    productInnerBottomMiddleRight: {
        width: commonFun.deviceWidth() * 0.85 * 0.4,
        height: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    productInnerBottomMiddleLeftText: {
        fontSize: 10,
        color: '#979797',
    },
    productInnerBottomMiddleRightText: {
        fontSize: 10,
        color: '#ee9433',
    },


    halfCircleLeft: {
        width: commonFun.deviceWidth() * 0.94 * 0.22 * 0.2,
        height: commonFun.deviceWidth() * 0.94 * 0.22 * 0.2,
        borderRadius: commonFun.deviceWidth() * 0.94 * 0.22 * 0.2,
        backgroundColor: '#f7f7f7',
        marginLeft: -commonFun.deviceWidth() * 0.94 * 0.22 * 0.15,
    },
    halfCircleRight: {
        width: commonFun.deviceWidth() * 0.94 * 0.22 * 0.2,
        height: commonFun.deviceWidth() * 0.94 * 0.22 * 0.2,
        borderRadius: commonFun.deviceWidth() * 0.94 * 0.22 * 0.2,
        backgroundColor: '#f7f7f7',
        marginRight: -commonFun.deviceWidth() * 0.94 * 0.22 * 0.15,
    },
    modeCoverOut: {
        position: 'absolute',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        zIndex: 100,

    },
    modeCoverInner: {
        position: 'relative',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        borderRadius: 5,
        overflow: 'hidden'

    },
    modeCover1: {
        position: 'absolute',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        zIndex: 101,
        backgroundColor: "#000000",
        opacity: 0.7,
    },
    modeCover2: {
        position: 'absolute',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        zIndex: 102,
    },
    wechatBox: {
        width: commonFun.deviceWidth(),
        height: commonFun.deviceWidth() * 0.33,
        marginTop: 10,

    },
    wechatCoverBox: {
        width: commonFun.deviceWidth(),
        height: commonFun.deviceWidth(),
        marginTop: commonFun.deviceWidth() * 0.4,
        overflow: 'hidden'

    },
    jumpToWeixinBox: {
        width: commonFun.deviceWidth() * 0.8,
        height: commonFun.deviceWidth() * 1,
        marginLeft: commonFun.deviceWidth() * 0.1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5

    },
    weixinNoticeImage: {
        width: commonFun.deviceWidth() * 0.8,
        height: commonFun.deviceWidth() * 0.8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    weixinbtnBox: {
        width: commonFun.deviceWidth() * 0.8,
        height: commonFun.deviceWidth() * 0.1,

        //marginTop:10,
        display: 'flex',
        flexDirection: 'row',
    },
    weixinbtnBox1: {
        width: commonFun.deviceWidth() * 0.4,
        height: commonFun.deviceWidth() * 0.12,
        //borderRadius:10,
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e2e2e2',
    },
    weixinbtnBox1Text: {
        fontSize: 18,
        color: '#000000'
    },
    weixinbtnBox2: {
        width: commonFun.deviceWidth() * 0.4,
        height: commonFun.deviceWidth() * 0.12,
        //marginLeft:commonFun.deviceWidth()*0.2,
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        //borderRadius:10,
    },
    weixinbtnBox2Text: {
        fontSize: 18,
        color: '#ffffff'

    },

});