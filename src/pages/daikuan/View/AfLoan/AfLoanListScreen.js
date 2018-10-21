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
    ImageBackground,
    Alert
  } from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfLoanListScreenStyle');
import {NavigationActions,StackActions} from 'react-navigation';
import cfn from '../../base/commonFun/commonFun';
import Global from '../../WsSupport/connecting';
import Picker from 'react-native-picker';
const listSelectBg=require('../../Resource/images/Af/listSelectBg.png');
const emptyProduct=require('../../Resource/images/Af/emptyProduct.png');
const startProApply=require('../../Resource/images/Af/startProApply.png');
const productApply=require('../../Resource/images/Af/productApply.png');
const bottomNotice=require('../../Resource/images/Af/bottomNotice.png');
import Icon from 'react-native-vector-icons/Ionicons';
class AfLoanListScreen extends React.Component {
   
  constructor(props) {
    super(props);
    let attr_id = 0;
    if(typeof(this.props.navigation.state.params)!="undefined"){
      attr_id = this.props.navigation.state.params.attr_id;
    }

    this.state = { 
      backData: '',
      attr_id:attr_id,
      pageData:{
        search_options:'',
        product_list:''
      },
      search_order_condition:'',
      selectedValue:'',
      attr_id:attr_id,
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
    
      this.getProductTotalListNew();
  }
  componentWillMount(){

  }
  componentDidUpdate() {
    
  }

  componentWillUnmount() {
    Picker.hide();

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


  //获取首页数据
  getProductTotalListNew(){
    var that = this;
    var url_fetch = Global.requestDomain+"/Index/Product/getProductTotalListNew";
    //var url_fetch = Global.requestDomain+"/Index/ZTest/test";
    //console.warn(that.state.search_order_condition);
    var requestParam = Global.requestParam+"&p=1&search_order_condition="+JSON.stringify(that.state.search_order_condition);
    //console.warn(requestParam);
    fetch(url_fetch, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestParam
    }).then((response) => response.json()).then((responseJson) => {
      //console.warn(responseJson.back_data.product_list.length);
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

  //设置搜索筛选条件
  setSearchSelectedValue(pickedValue){


    var that = this;

    if(typeof(pickedValue.length)=="undefined"){
      return;
    }
    if(pickedValue.length==0){
      return;
    }
    let search_order_condition = [];
    for(var m=0;m<pickedValue.length;m++){
        let thisPickedValue = pickedValue[m];
        let targetOptionArray = that.state.pageData.search_options[m].options;
        for(var t=0;t<targetOptionArray.length;t++){
          let thisSelectedOption = targetOptionArray[t];
          let targetDes = targetOptionArray[t].des;
          if(thisPickedValue==targetDes){
            search_order_condition.push(thisSelectedOption);
          }
        }

    }

    that.setState({search_order_condition:search_order_condition,selectedValue:pickedValue});

    that.getProductTotalListNew();

  }

  initSelectedOption(){
    var that = this;
    this.setState({search_order_condition:'',selectedValue:'',attr_id:0});
    that.getProductTotalListNew();
  }


  //选择器
  _showSelectOptions(targetSelectOption) {
    var that =this;

    if(!targetSelectOption){

      return;
    }
    let pickerData = [];
    let selectedValue = [];
    for(var i=0;i<targetSelectOption.length;i++){

      let signleOptionArray = [];
      let singleOptionObj = targetSelectOption[i].options;
      for(var n=0;n<singleOptionObj.length;n++){
        let optionValue = singleOptionObj[n];
        signleOptionArray.push(optionValue.des);
        if(n==0){
          if(!that.state.selectedValue){
            selectedValue.push(optionValue.des);
          }

        }
      }

      pickerData.push(signleOptionArray);
    }

    if(that.state.selectedValue){
      selectedValue = that.state.selectedValue;
    }

    // console.warn(pickerData);
    // return;

    //let pickerData = periodArray;

    //let date = new Date();

    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText:'确认',
      pickerCancelBtnText:'重置',
      pickerBg:[255,255,255,1],
      pickerTitleText: '筛选条件',
      pickerRowHeight:34,
      wheelFlex: [1,3,2,3],
      onPickerConfirm: pickedValue => {
        //console.warn('area', pickedValue);
        that.setSearchSelectedValue(pickedValue);

      },
      onPickerCancel: pickedValue => {
        that.initSelectedOption();
        //console.warn('area', pickedValue);
      },
      onPickerSelect: pickedValue => {
        let targetValue = [...pickedValue];
        if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if(k !== 3){
              targetValue[k] = parseInt(v);
            }
          });
          Picker.select(targetValue);
          pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }
  onscrollThisEnd(e){

  }
  
  trim(str) { 
    str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
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
        //this.props.navigation.navigate('AfTrDe',{third_website_url:starProduct.jump_url,title:starProduct.product_name});
        this.props.navigation.navigate('AfTrDe',{third_website_url:starProduct.jump_url,title:starProduct.product_name,targetProduct:starProduct});

      }else{

        //跳转到产品详情页
        this.props.navigation.navigate('AfProDe',{product:starProduct});

      }
    }

  }




  //获取各个分类产品
  getSignleBox(){
    var that = this;


    var attrData = that.state.pageData.product_list;


    if(!attrData.length){

      let emptyProductList = [];

      for(var r=0;r<6;r++){

        emptyProductList.push(

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

        )
      }

      return(
          <View style={styles.productAttrBox}>

            {emptyProductList}
          </View>

      );
    }



    var attrDataList = attrData;
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
          {singleProduct}

        </View>

    );




  }







  _getList(){

    var that = this;

    return(
        <View style={styles.listsBox}>
          <View style={styles.topNoticeBox}><Text style={styles.topNoticeText}>据统计,同时申请4个产品,审批通过率高达90%</Text></View>
          <View>
            {that.getSignleBox()}


          </View>


        </View>
    );


  }


render() {
    const { navigate } = this.props.navigation;
    var that = this;  

    return (
        <View style={styles.mastOuterBox}>
          <View style={styles.topStatusBar}><Text style={styles.topStatusBarText}>贷款大全</Text></View>


          <View style={styles.listInnerBox}>
            <View style={styles.selectOuterBox}>
              <ImageBackground style={styles.selectBox} source={listSelectBg}   resizeMode='stretch'>
                <TouchableOpacity style={styles.selectSingleBox}  onPress={()=>that._showSelectOptions(that.state.pageData.search_options)}></TouchableOpacity>
              </ImageBackground>
            </View>
            <ScrollView style={styles.listScroll}
                        bounces={false}
                        onMomentumScrollEnd = {(e)=>that.onscrollThisEnd(e)}
            >
            {that._getList()}
            <Image style={styles.bottomNotice} source={bottomNotice}   resizeMode='stretch'/>
            <View style={styles.bottomBlank}></View>
            </ScrollView>
          </View>


        </View>

     
    );
  }
}

export default AfLoanListScreen
