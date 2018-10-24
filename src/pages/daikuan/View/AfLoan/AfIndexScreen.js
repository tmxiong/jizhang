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
    StausBar,Alert

  } from 'react-native';

import {NavigationActions,StackActions} from 'react-navigation';
const styles = require('../../Resource/defaultStyle/AfLoan/AfIndexScreenStyle');
import cfn from '../../base/commonFun/commonFun';
import Global from '../../WsSupport/connecting';
import BannerComponent from '../Components/BannerComponent';
import NoticeComponent from '../Components/NoticeComponent';
const noticeIcon=require('../../Resource/images/Af/noticeIcon.png');
const dae=require('../../Resource/images/Af/dae.png');
const gaot=require('../../Resource/images/Af/gaot.png');
const zuix=require('../../Resource/images/Af/zuix.png');
const mingx=require('../../Resource/images/Af/mingx.png');
const xiaoe=require('../../Resource/images/Af/xiaoe.png');
const emptyProduct=require('../../Resource/images/Af/emptyProduct.png');
const startProApply=require('../../Resource/images/Af/startProApply.png');
const productApply=require('../../Resource/images/Af/productApply.png');
const bottomNotice=require('../../Resource/images/Af/bottomNotice.png');
const creditCardEmpty=require('../../Resource/images/Af/creditCardEmpty.png');
const creditCardApply=require('../../Resource/images/Af/creditCardApply.png');
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from "react-native-splash-screen";



class AfIndexScreen extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      pageData: {
        notice_list:['热烈庆祝借贷花App上线！'],
        notice_list_switch:1,
        advertise_list:'',
        advertise_list_switch:1,
        product_list_attr_1:'',
        product_list_attr_1_switch:1,
        product_list_attr_2:'',
        product_list_attr_2_switch:1,
        product_list_attr_3:'',
        product_list_attr_3_switch:1,
        product_list_attr_4:'',
        product_list_attr_4_switch:1,
        product_list_attr_5:'',
        product_list_attr_5_switch:1,
        product_list_attr_6:'',
        product_list_attr_6_switch:1,
        article_list:'',
        article_list_switch:1,
        credit_card_list:'',
        credit_card_list_switch:0,
      },
      bannerPressFunc:this.bannerPressFunc
    };
    this.getProductIndexListNew();

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

  randomNum(len) {
    len = len || 32;
    var $chars = '1234567';
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
      SplashScreen.hide();
  }
  componentDidUpdate() {
    
  }

  componentWillUnmount() {


  }



  //获取首页数据
  getProductIndexListNew(){
    var that = this;
    var url_fetch = Global.requestDomain+"/Index/Product/getProductIndexListNew";
    //var url_fetch = Global.requestDomain+"/Index/ZTest/test";
    //var requestParam = Global.requestParam+"&user_id="+Global.user_id;
    var requestParam = Global.requestParam;

    fetch(url_fetch, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestParam
    }).then((response) => response.json()).then((responseJson) => {

      if(typeof(responseJson.back_status) !="undefied" && parseInt(responseJson.back_status) ==1){
        var newPageData = responseJson.back_data;
        that.setState({pageData:newPageData});


      }else{
        if(typeof(responseJson.back_status) !="undefied" && parseInt(responseJson.back_status) ==-1){

           that.navToPage('AfSignIn');
        }else{

          Alert.alert(responseJson.back_msg);
        }

      }


    }).catch((error) => {
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



  trim(str) {
    str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
  }

  //轮播图点击回调 跳转第三方页面
  bannerPressFunc(bannerNavigator,advertise){

      //统计banner点击
      var url_fetch = Global.requestDomain+"/Index/Public/user_operation_record";
      var requestParam = Global.requestParam+"&operation_type=4&product_id="+advertise.product_id+"&extra_id="+advertise.id+"&user_id="+Global.user_id;


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

      //跳转第三方页面
      //如果未登录则跳登录页面
      if(!Global.user_id){
        bannerNavigator.navigate('AfSignIn');
      }else{

        bannerNavigator.navigate('AfTrDe',{third_website_url:advertise.link_url,title:advertise.desc,targetProduct:advertise.product});

      }

  }

  //明星产品
  getStarProduct(){
    var that = this;
    let starList = ['','','',''];
    let  product_list_attr_5 = that.state.pageData.product_list_attr_5;
    if(typeof(product_list_attr_5)=='object'){
      starList = that.state.pageData.product_list_attr_5.attr_list;
    }

    var starSingleBox = [];

    for(var i=0;i<starList.length;i++){
      let thisProData =starList[i];
      if(!thisProData){
        starSingleBox.push(
            <TouchableOpacity style={styles.starProBottomSingle}>
                <Image style={styles.emptyProductImage}   resizeMode='stretch' source={emptyProduct}/>
                <View style={styles.starProTextBox}><Text  style={styles.starProText}>钱管家</Text></View>
                <Image style={styles.starApplyBtn}   resizeMode='stretch'  source={startProApply}></Image>
            </TouchableOpacity>
        );
      }else{

        starSingleBox.push(
        <TouchableOpacity style={styles.starProBottomSingle}  onPress={()=>that.starProductClick(thisProData)}>
          <Image style={styles.emptyProductImage}   resizeMode='stretch' source={{url:thisProData.product_picture_url_qiniu}}/>
              <View style={styles.starProTextBox}><Text  style={styles.starProText}>{thisProData.product_name}</Text></View>
          <Image style={styles.starApplyBtn}   resizeMode='stretch'  source={startProApply}></Image>
        </TouchableOpacity>
        );

      }
    }

    return(
        <View style={styles.starProOuterBoxBottom}>{starSingleBox}</View>
    );

  }
  //产品点击
  starProductClick(starProduct){
    //统计明星产品点击
    var that=this;
    var url_fetch = Global.requestDomain+"/Index/Public/user_operation_record";
    var requestParam = Global.requestParam+"&operation_type=3&product_id="+starProduct.id+"&extra_id="+starProduct.id+"&user_id="+Global.user_id;
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

    //跳转第三方页面
    //如果未登录则跳登录页面
    if(!Global.user_id){
      this.props.navigation.navigate('AfSignIn');
    }else{
      //如果该产品设置为直接跳转到H5页面，则直接跳第三方申请页面
      if(parseInt(starProduct.jump_type)==2){
          this.props.navigation.navigate('AfTrDe',{third_website_url:starProduct.jump_url,title:starProduct.product_name,targetProduct:starProduct});

      }else{

         //跳转到产品详情页
          this.props.navigation.navigate('AfProDe',{product:starProduct});

      }
    }

  }

  //更换明星产品
  changeStarProduct(){

    var that = this;
    if(typeof(that.state.pageData.product_list_attr_5.last_id)=="undefined"){
      return;
    }
    var last_id =that.state.pageData.product_list_attr_5.last_id;
    var url_fetch = Global.requestDomain+"/Index/Product/getStarProduct";
    var requestParam = Global.requestParam+"&last_id="+last_id;

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

        if(typeof(responseJson.back_data.product_list_attr_5)!="undefied"){
          if(typeof(responseJson.back_data.product_list_attr_5.attr_list)!="undefied"){
            var newPageData = that.state.pageData;
            newPageData.product_list_attr_5 = responseJson.back_data.product_list_attr_5

            that.setState({'pageData':newPageData});

          }

        }


    }


  }).catch((error) => {
      console.error(error);


  });




  }


  //获取各个分类产品
  getSignleBox(attr_id,blank_id){
       var that = this;
    if(!attr_id){
        return;
    }
    var thisField = "product_list_attr_"+attr_id;
    var thisSwitchField = "product_list_attr_"+attr_id+"_switch";
    var theSwitch = 0;
        theSwitch = that.state.pageData[thisSwitchField];
    var attrData = '';
        attrData = that.state.pageData[thisField];


    if((parseInt(theSwitch)!=1||typeof(attrData.attr_list)=="undefined")){
        if(blank_id!=1){
            return;
        }
        return(
            <View style={styles.productAttrBox}>
                <View style={styles.productAttrBoxTop}>
                    <View style={styles.productAttrBoxLeft}></View>
                    <View style={styles.productAttrBoxRightTextBox}><Text  style={styles.productAttrBoxRightText}>今日爆款</Text></View>
                </View>

                    <View style={styles.productAttrSingleBox}>
                      <View style={styles.productAttrSingleBoxLeft}>
                          <View style={styles.productAttrSingleBoxLeftTop}>
                              <View style={styles.productAttrSingleBoxLeftTopImageBox}>
                                  <Image source={emptyProduct} style={styles.productAttrSingleBoxLeftTopImage}  resizeMode='stretch'/>
                              </View>
                              <View style={styles.productAttrSingleBoxLeftTop1}>
                                  <View style={styles.productAttrSingleBoxLeftTopProName}>
                                      <Text  style={styles.productAttrSingleBoxLeftTopProNameText}>钱管家</Text>
                                  </View>
                                  <View style={styles.productAttrSingleBoxLeftTopProTagBox}>
                                      <View  style={styles.productAttrSingleBoxLeftTopProTagTextBox} ><Text  style={styles.productAttrSingleBoxLeftTopProTagText} >下款快</Text></View>
                                  </View>
                              </View>
                          </View>
                          <View style={styles.productAttrSingleBoxLeftBottom}>
                              <View style={styles.productAttrSingleBoxLeftBottom1}>
                                  <View style={styles.productAttrSingleBoxLeftBottom1Top}><Text style={styles.loanAmount}>五千～一万</Text></View>
                                  <View style={styles.productAttrSingleBoxLeftBottom1Bottom}><Text style={styles.loanFields}>额度范围(元)</Text></View>
                              </View>
                              <View style={styles.productAttrSingleBoxLeftBottom2}>
                                  <View style={styles.productAttrSingleBoxLeftBottom2Top}><Text style={styles.loanRate}>日利率 <Text  style={styles.loanRateNotice}>0.07%</Text></Text></View>
                                  <View style={styles.productAttrSingleBoxLeftBottom2Bottom}><Text style={styles.loanFields}>30分钟下款</Text></View>
                              </View>
                          </View>
                      </View>
                      <View style={styles.productAttrSingleBoxRight}>
                          <View style={styles.productAttrSingleBoxRightTop}><Text style={styles.applyPeople} numberOfLines={10} >1200人已经贷款</Text></View>
                          <TouchableOpacity style={styles.productAttrSingleBoxRightBottom}>
                              <Image source={productApply}   resizeMode='stretch' style={styles.productAttrSingleBoxRightBottomApplyImage}/>
                          </TouchableOpacity>

                      </View>
                    </View>
            </View>

        );
    }



      var attrDataList = attrData.attr_list;
      if(typeof(attrDataList)=='undefined'){
          return;
      }
      //console.warn(attrDataList);
      var singleProduct = [];

      for(var i=0;i<attrDataList.length;i++){
          let thisProData = attrDataList[i];
          let tagDesString = thisProData.tag_des;
          let tagDesArray = tagDesString.split(",");
          let tagView = [];
          for(var n=0;n<tagDesArray.length;n++){

              tagView.push(
                  <View  style={styles.productAttrSingleBoxLeftTopProTagTextBox} ><Text  style={styles.productAttrSingleBoxLeftTopProTagText} >{tagDesArray[n]}</Text></View>
              );
          }

          singleProduct.push(
              <View style={styles.productAttrSingleBox}>
                  <View style={styles.productAttrSingleBoxLeft}>
                      <View style={styles.productAttrSingleBoxLeftTop}>
                          <View style={styles.productAttrSingleBoxLeftTopImageBox}>
                              <Image source={{uri:thisProData.product_picture_url_qiniu}} style={styles.productAttrSingleBoxLeftTopImage}  resizeMode='stretch'/>
                          </View>
                          <View style={styles.productAttrSingleBoxLeftTop1}>
                              <View style={styles.productAttrSingleBoxLeftTopProName}>
                                  <Text  style={styles.productAttrSingleBoxLeftTopProNameText}>{thisProData.product_name}</Text>
                              </View>
                              <View style={styles.productAttrSingleBoxLeftTopProTagBox}>
                                  {tagView}
                              </View>
                          </View>
                      </View>
                      <View style={styles.productAttrSingleBoxLeftBottom}>
                          <View style={styles.productAttrSingleBoxLeftBottom1}>
                              <View style={styles.productAttrSingleBoxLeftBottom1Top}><Text style={styles.loanAmount}>{thisProData.amount_low}～{thisProData.amount_high}</Text></View>
                              <View style={styles.productAttrSingleBoxLeftBottom1Bottom}><Text style={styles.loanFields}>额度范围(元)</Text></View>
                          </View>
                          <View style={styles.productAttrSingleBoxLeftBottom2}>
                              <View style={styles.productAttrSingleBoxLeftBottom2Top}><Text style={styles.loanRate}>日利率 <Text  style={styles.loanRateNotice}>{thisProData.daily_rate}%</Text></Text></View>
                              <View style={styles.productAttrSingleBoxLeftBottom2Bottom}><Text style={styles.loanFields}>{thisProData.loan_release_time}分钟下款</Text></View>
                          </View>
                      </View>
                  </View>
                  <View style={styles.productAttrSingleBoxRight}>
                      <View style={styles.productAttrSingleBoxRightTop}><Text style={styles.applyPeople} numberOfLines={10} >{thisProData.pass_number}人已经贷款</Text></View>
                      <TouchableOpacity style={styles.productAttrSingleBoxRightBottom}  onPress={()=>that.starProductClick(thisProData)}>
                          <Image source={productApply}   resizeMode='stretch' style={styles.productAttrSingleBoxRightBottomApplyImage}/>
                      </TouchableOpacity>

                  </View>
              </View>

          );

      }




      return(
          <View style={styles.productAttrBox}>
              <View style={styles.productAttrBoxTop}>
                  <View style={styles.productAttrBoxLeft}></View>
                  <View style={styles.productAttrBoxRightTextBox}><Text  style={styles.productAttrBoxRightText}>{attrData.name}</Text></View>
              </View>
              {singleProduct}
              <TouchableOpacity style={styles.attrToMore} onPress={()=>that.props.navigation.navigate('AfLoanListMode',{attr_id:attr_id,title:attrData.name})}><Text style={styles.attrToMoreText}>查看更多>>></Text></TouchableOpacity>
          </View>

      );




  }

  navToCreditCard(thisCreditCard){



      //统计明星产品点击
      var that=this;
      var url_fetch = Global.requestDomain+"/Index/Public/user_operation_record";
      var requestParam = Global.requestParam+"&operation_type=7&extra_id="+thisCreditCard.id+"&user_id="+Global.user_id;
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

      //跳转第三方页面
      //如果未登录则跳登录页面
      if(!Global.user_id){
          this.props.navigation.navigate('AfSignIn');
      }else{

          this.props.navigation.navigate('AfCreditTrDe',{third_website_url:thisCreditCard.jump_url,title:thisCreditCard.card_name});
      }

  }
  //信用卡
    getCreditCard(){
        var that = this;
        if(parseInt(that.state.pageData.credit_card_list_switch)==0){
            return ;
        }
        var creditCardList = [];
        var pageCreditCardList = that.state.pageData.credit_card_list;

        for(var i=0;i<pageCreditCardList.length;i++){

            let thisCreditCard = pageCreditCardList[i];

            creditCardList.push(
                <View style={styles.singleCreditCardBox}>
                    <Image style={styles.creditCardImage} source={{uri:thisCreditCard.card_picture_url_qiniu}}  resizeMode='stretch'/>
                    <View style={styles.creditCardNameBox}><Text style={styles.creditCardNameText}>{thisCreditCard.card_name}</Text></View>
                    <View style={styles.creditCardDesBox}><Text style={styles.creditCardDesText}>{thisCreditCard.desc}</Text></View>
                    <TouchableOpacity style={styles.creditCardApplyBox} onPress={()=>that.navToCreditCard(thisCreditCard)}><Image style={styles.creditCardApplyImage} source={creditCardApply}  resizeMode='stretch'/></TouchableOpacity>
                </View>

            );
        }



        return(
            <View style={styles.productAttrBox}>
                <View style={styles.productAttrBoxTop}>
                    <View style={styles.productAttrBoxLeft}></View>
                    <View style={styles.productAttrBoxRightTextBox}><Text  style={styles.productAttrBoxRightText}>信用卡</Text></View>

                </View>
                <View style={styles.creditCard}>
                    {creditCardList}
                </View>

                <TouchableOpacity style={styles.attrToMore}  onPress={()=>that.props.navigation.navigate('AfCreList')}><Text style={styles.attrToMoreText}>查看更多>>></Text></TouchableOpacity>
            </View>

        );

    }


    navToPage(targetRouteName){



        const {dispatch} = this.props.navigation;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: targetRouteName}),
            ]
        });
        dispatch(resetAction);
    }


    navToPageMode(routeName,attr_id,title){



        const {dispatch} = this.props.navigation;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                //NavigationActions.navigate({routeName: targetRouteName}),
                NavigationActions.navigate({routeName:routeName,params:{attr_id:attr_id,title:title}}),
            ]
        });
        dispatch(resetAction);
    }




    onscrollThisEnd(e){
        var that = this;
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight+20 >= contentSizeHeight){
            //console.warn('上传滑动到底部事件');

            //that.props.navigation.navigate('lists');
        }


    }

  _header(){
    var that = this;

      return(

          <View style={styles.indexBox}>

          <ScrollView style={styles.outerContainer}
                      bounces={false}
                      onMomentumScrollEnd = {(e)=>that.onscrollThisEnd(e)}
            >
                <BannerComponent
          bannerList={that.state.pageData.advertise_list} bannerNavigator={this.props.navigation} onPrFunc={that.state.bannerPressFunc}
        />


                <View style={styles.noticeBox}>
                  <NoticeComponent
                      NoticeList={that.state.pageData.notice_list} NoticeNavigator={this.props.navigation}
                  />
                  <Image  source={noticeIcon} style={styles.noticeIcon}  resizeMode='stretch'/>
                </View>

              <View style={styles.topFourIconbox}>
                  <TouchableOpacity style={styles.topIconSinglebox}  onPress={()=>that.props.navigation.navigate('AfLoanListMode',{attr_id:1,title:'最新上线'})}>
                      <Image style={styles.topIconSingleInnerIcon} source={zuix}   resizeMode='stretch'></Image>
                      <View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>最新上线</Text></View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.topIconSinglebox}   onPress={()=>that.props.navigation.navigate('AfLoanListMode',{attr_id:2,title:'小额极速贷'})}>
                      <Image style={styles.topIconSingleInnerIcon} source={gaot}   resizeMode='stretch'></Image>
                      <View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>小额极速贷</Text></View>

                  </TouchableOpacity>

                  <TouchableOpacity style={styles.topIconSinglebox}    onPress={()=>that.props.navigation.navigate('AfLoanListMode',{attr_id:3,title:'大额低息贷'})}>
                      <Image style={styles.topIconSingleInnerIcon} source={dae}   resizeMode='stretch'></Image>
                      <View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>大额低息贷</Text></View>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.topIconSinglebox}    onPress={()=>that.props.navigation.navigate('AfLoanListMode',{attr_id:4,title:'高通过率'})}>
                      <Image style={styles.topIconSingleInnerIcon} source={xiaoe}   resizeMode='stretch'></Image>
                      <View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>高通过率</Text></View>
                  </TouchableOpacity>
              </View>




              {/*<View style={styles.topFourIconbox}>*/}
                    {/*<TouchableOpacity style={styles.topIconSinglebox}  onPress={()=>that.navToPageMode('AfLoanListMode',1,'最新上线')}>*/}
                         {/*<Image style={styles.topIconSingleInnerIcon} source={zuix}   resizeMode='stretch'></Image>*/}
                         {/*<View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>最新上线</Text></View>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity style={styles.topIconSinglebox}   onPress={()=>that.navToPageMode('AfLoanListMode',2,'小额极速贷')}>*/}
                         {/*<Image style={styles.topIconSingleInnerIcon} source={gaot}   resizeMode='stretch'></Image>*/}
                         {/*<View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>小额极速贷</Text></View>*/}

                    {/*</TouchableOpacity>*/}

                     {/*<TouchableOpacity style={styles.topIconSinglebox}   onPress={()=>that.navToPageMode('AfLoanListMode',3,'大额低息贷')}>*/}
                         {/*<Image style={styles.topIconSingleInnerIcon} source={dae}   resizeMode='stretch'></Image>*/}
                         {/*<View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>大额低息贷</Text></View>*/}

                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={styles.topIconSinglebox}   onPress={()=>that.navToPageMode('AfLoanListMode',4,'高通过率')}>*/}
                         {/*<Image style={styles.topIconSingleInnerIcon} source={xiaoe}   resizeMode='stretch'></Image>*/}
                         {/*<View  style={styles.topFourIconDesBox}><Text style={styles.topFourIconDesText}>高通过率</Text></View>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}



                <View style={styles.starProOuterBox}>
                  <View style={styles.starProOuterBoxTop}>
                      <Image style={styles.starIcon} source={mingx}   resizeMode='stretch'/>
                      <View style={styles.starTextBox}><Text style={styles.starText}>据统计,同时申请4家产品,审批通过率高达<Text style={styles.percent90}>90%</Text></Text></View>
                      <TouchableOpacity style={styles.changeStarBtn}  onPress={()=>that.changeStarProduct()}><Text style={styles.changeText}>换一批</Text></TouchableOpacity>
                  </View>
                  {that.getStarProduct()}
                </View>
                <View style={styles.attrTopBlank}></View>


              {that.getSignleBox(6,1)}
              {that.getSignleBox(2,0)}
              {that.getSignleBox(3,0)}
              {that.getSignleBox(4,0)}
              {that.getCreditCard()}


                <Image style={styles.bottomNotice} source={bottomNotice}   resizeMode='stretch'/>
                <View style={styles.bottomBlank}></View>
               </ScrollView>
          </View>

    );

  }


  getFlatList(item){
    var that = this;
    var thisData=item.item;
    console.warn(thisData);
    return(
        <View></View>
    );
  }
  _onEndReached(){


  }

render() {
    const { navigate } = this.props.navigation;
    var that = this;

    return (
      <View style={styles.mastOuterBox}>
          <View style={styles.topStatusBar}><Text style={styles.topStatusBarText}></Text></View>
          {that._header()}
      </View>

    );
    //  return (
    //   <View style={styles.mastOuterBox}>
    //     <FlatList style={styles.flatListStyle}
    //       horizontal={false}
    //       ListHeaderComponent={()=>that._header()}
    //       numColumns={4}
    //       onEndReachedThreshold = {0.5}
    //       data={that.state.pageData.a}
    //       onEndReached={()=>that._onEndReached()}
    //       renderItem={(item) => that.getFlatList(item)}
    //     />
    //   </View>
    //
    // );
    //


  }


}

export default AfIndexScreen
