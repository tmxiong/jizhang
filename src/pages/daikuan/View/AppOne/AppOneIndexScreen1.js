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

import {NavigationActions,StackActions} from 'react-navigation';
import commonFun from '../../base/commonFun/commonFun';
var Global = require('../../WsSupport/connecting');
import Icon from "react-native-vector-icons/Ionicons"
import SplashScreen from 'react-native-splash-screen';

class AppOneIndexScreen extends React.Component {
   
  constructor(props) {
    super(props);

    this.state = {
      pageData: {
        product_list:''
      },
      wechatPublicAccount:Global.wechatPublicAccount,
      wechatPublicGuideImage:Global.wechatPublicGuideImage,
      bannerPressFunc:this.bannerPressFunc,
      showCover:0,
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
    this.getProductIndexListNew();

  }
  componentWillMount(){

  }
  componentDidUpdate() {
    
  }

  componentWillUnmount() {


  }

//获取首页数据
  getProductIndexListNew(){
    var that = this;
    var url_fetch = Global.requestDomain+"/Index/ProductYx/getProductIndexList";
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
      console.error(error);


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





getProductBox(){

  var that = this;
  var productList = that.state.pageData.product_list;
  var productSingleBoxArray = [];
  if(productList.length==0){

    for(var i=0;i<10;i++){

      productSingleBoxArray.push(
          <TouchableOpacity style={styles.singleProductBox} activeOpacity={0.6}  >
            <View style={styles.productInnerBox}>
              <View style={styles.productInnerTop}>
                <View style={styles.productInnerTopInner}>
                  <View style={styles.productInnerTopInnerLeft}>
                    <View style={styles.productInnerTopInnerLeftImage}></View>
                  </View>
                  <View style={styles.productInnerTopInnerRight}>
                    <View style={styles.productInnerTopInnerRightA}>
                      <View style={styles.productInnerTopInnerRightA1}><Text style={styles.A1Text}>钱包管家</Text></View>
                      <View style={styles.productInnerTopInnerRightA2}>
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />


                      </View>
                      <View style={styles.productInnerTopInnerRightA3}>
                        <View style={styles.applyCondition1}><Text style={styles.applyCondition1Text}>有身份证可贷</Text></View>
                        <View style={styles.applyCondition2}><Text style={styles.applyCondition2Text}>有身份证可贷</Text></View>
                        <View style={styles.applyCondition2}><Text style={styles.applyCondition2Text}>有身份证可贷</Text></View>
                      </View>
                    </View>
                    <View style={styles.productInnerTopInnerRightB}>
                      <View style={styles.productInnerTopInnerRightB1}>
                        <Icon name="ios-thumbs-up" style={styles.iconStyle} size={12} color="#b4e2b1" />
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
                    <Icon name="md-alarm" style={styles.iconStyle} size={12} color="#ee9433" />
                    <Text style={styles.productInnerBottomMiddleRightText}>平均0.3小时放款</Text>
                  </View>
                </View>
                <View style={styles.halfCircleRight}></View>

              </View>

            </View>
          </TouchableOpacity>

      );
    }

  }else{

    for(var i=0;i<productList.length;i++){
      let thisProduct = productList[i];

      let tagDesString = thisProduct.tag_des;
      let tagDesArray = tagDesString.split(",");
      let tagView = [];
      for(var n=0;n<tagDesArray.length;n++){
        if(n==0){
          tagView.push(
              <View style={styles.applyCondition1}><Text style={styles.applyCondition1Text}>{tagDesArray[n]}</Text></View>
          );
        }else{
          tagView.push(
              <View style={styles.applyCondition2}><Text style={styles.applyCondition2Text}>{tagDesArray[n]}</Text></View>
          );
        }
      }
      var rankText = null;
      if(i+1<=5){
        var m = i+1;
        var topRank = "topRank"+m;
        rankText = <Text style={styles[topRank]}>TOP{i+1}</Text>;
      }


      productSingleBoxArray.push(
          <TouchableOpacity style={styles.singleProductBox} activeOpacity={0.6} onPress={()=>that.starProductClick(thisProduct)}>
            <View style={styles.productInnerBox}>
              <View style={styles.productInnerTop}>
                <View style={styles.productInnerTopInner}>
                  <View style={styles.productInnerTopInnerLeft}>
                    <View style={styles.productInnerTopInnerLeftImage}>
                      <Image source={{uri:thisProduct.product_picture_url_qiniu}} style={styles.productImage} />
                    </View>
                  </View>
                  <View style={styles.productInnerTopInnerRight}>
                    <View style={styles.productInnerTopInnerRightA}>
                      <View style={styles.productInnerTopInnerRightA1}><Text style={styles.A1Text}>{thisProduct.product_name}</Text></View>
                      <View style={styles.productInnerTopInnerRightA2}>
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                        <Icon name="md-heart" style={styles.iconStyle} size={12} color="#fec844" />
                      </View>
                      <View style={styles.productInnerTopInnerRightA3}>
                        {tagView}
                      </View>
                    </View>
                    <View style={styles.productInnerTopInnerRightB}>
                      <View style={styles.productInnerTopInnerRightB1}>
                        <Icon name="ios-thumbs-up" style={styles.iconStyle} size={12} color="#b4e2b1" />
                        {rankText}


                      </View>
                      <View style={styles.productInnerTopInnerRightB2}>
                        <Text style={styles.productInnerTopInnerRightB2Text}>{thisProduct.pass_number}人已申请</Text>

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
                    <Icon name="md-alarm" style={styles.iconStyle} size={12} color="#ee9433" />
                    <Text style={styles.productInnerBottomMiddleRightText}>平均{thisProduct.loan_release_time}小时放款</Text>
                  </View>
                </View>
                <View style={styles.halfCircleRight}></View>

              </View>

            </View>
          </TouchableOpacity>

      );
    }

  }

  return(
      <View>
        {productSingleBoxArray}
      </View>
  );



}







render() {
    const { navigate } = this.props.navigation;
    var that = this;

    return (
     <ScrollView style={styles.container}>
       {that.getProductBox()}


     </ScrollView>
    );
  }
}

export default AppOneIndexScreen


const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  singleProductBox:{
    width: commonFun.deviceWidth()*0.94,
    height: commonFun.deviceWidth()*0.25,
    marginTop:commonFun.deviceWidth()*0.03,
    marginLeft:commonFun.deviceWidth()*0.03,
    borderRadius:2,
    borderTopWidth:5,
    borderTopColor:'orange',
    backgroundColor:'#ffffff',
  },
  productInnerTop:{
    width:'100%',
    height:'75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage:{
    width:'100%',
    height:'100%',
  },
  productInnerTopInner:{
    width:'94%',
    height:'100%',
    borderBottomWidth:1,
    borderBottomColor:"#f8f8f8",
    display:'flex',
    flexDirection:'row',
  },
  productInnerTopInnerLeft:{
    width:'22%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInnerTopInnerLeftImage:{
    width:commonFun.deviceWidth()*0.94*0.22*0.7,
    height:commonFun.deviceWidth()*0.94*0.22*0.7,
    marginTop:-3,
    borderRadius:15,
    borderWidth:0,
    borderColor:'#e2e2e2',
    overflow:'hidden',

  },
  productInnerTopInnerRight:{
    width:'78%',
    height:'100%',
    display:'flex',
    flexDirection:'row',
  },
  productInnerTopInnerRightA:{
    width:'70%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInnerTopInnerRightA1:{
    width:'100%',
    height:'33%',
    overflow:'hidden',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  A1Text:{
    fontSize:14,
    color:'#000000',
  },
  iconStyle:{
    marginRight:4,
  },
  productInnerTopInnerRightA2:{
    width:'100%',
    height:'25%',
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  productInnerTopInnerRightA3:{
    width:'100%',
    height:'42%',
    marginTop:-3,
    flexDirection:'row',
    flexWrap:'wrap',
    overflow:'hidden',
  },
  applyCondition1:{
    width:'auto',
    height:12,
    paddingLeft:3,
    paddingRight:3,
    marginTop:2,
    marginLeft:1,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#e88fa0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyCondition1Text:{
    fontSize:9,
    color:'#e88fa0',
    //color:'#a9a65d',

  },

  applyCondition2:{
    width:'auto',
    height:12,
    paddingLeft:3,
    paddingRight:3,
    marginTop:2,
    marginLeft:1,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#a9a65d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyCondition2Text:{
    fontSize:9,
    color:'#a9a65d',
    //color:'#a9a65d',

  },



  productInnerTopInnerRightB:{
    width:'30%',
    height:'100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:'blue',
  },
  productInnerTopInnerRightB1:{
    width:'100%',
    height:'33%',
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },

  topRank1:{
    fontSize:13,
    fontStyle:'italic',
    fontWeight:'700',
    color:'#e23b2d'
  },
  topRank2:{
    fontSize:13,
    fontStyle:'italic',
    fontWeight:'700',
    color:'#f05328'
  },
  topRank3:{
    fontSize:13,
    fontStyle:'italic',
    fontWeight:'700',
    color:'#6d6afb'
  },
  topRank4:{
    fontSize:13,
    fontStyle:'italic',
    fontWeight:'700',
    color:'#f5b744'
  },
  topRank5:{
    fontSize:13,
    fontStyle:'italic',
    fontWeight:'700',
    color:'#57daf6'
  },

  productInnerTopInnerRightB2:{
    width:'100%',
    height:'33%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  productInnerTopInnerRightB2Text:{
    fontSize:10,
    color:"#979797"
  },
  productInnerBottom:{
    width:'100%',
    height:'25%',
    overflow:'hidden',
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow:'hidden',
  },
  productInnerBottomMiddle:{
    width:commonFun.deviceWidth()*0.85,
    height:'100%',
    overflow:'hidden',
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow:'hidden',
  },
  productInnerBottomMiddleLeft:{
    width:commonFun.deviceWidth()*0.85*0.6,
    height:'100%',
    overflow:'hidden',
    flexDirection:'row',

    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow:'hidden',
  },
  productInnerBottomMiddleRight:{
    width:commonFun.deviceWidth()*0.85*0.4,
    height:'100%',
    overflow:'hidden',
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow:'hidden',
  },

  productInnerBottomMiddleLeftText:{
    fontSize:10,
    color:'#979797',
  },
  productInnerBottomMiddleRightText:{
    fontSize:10,
    color:'#ee9433',
  },


  halfCircleLeft:{
    width:commonFun.deviceWidth()*0.94*0.22*0.2,
    height:commonFun.deviceWidth()*0.94*0.22*0.2,
    borderRadius:commonFun.deviceWidth()*0.94*0.22*0.2,
    backgroundColor:'#f7f7f7',
    marginLeft:-commonFun.deviceWidth()*0.94*0.22*0.15,
  },
  halfCircleRight:{
    width:commonFun.deviceWidth()*0.94*0.22*0.2,
    height:commonFun.deviceWidth()*0.94*0.22*0.2,
    borderRadius:commonFun.deviceWidth()*0.94*0.22*0.2,
    backgroundColor:'#f7f7f7',
    marginRight:-commonFun.deviceWidth()*0.94*0.22*0.15,
  },


});