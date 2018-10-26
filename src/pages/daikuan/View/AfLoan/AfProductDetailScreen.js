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
    Alert
} from 'react-native';
const styles = require('../../Resource/defaultStyle/AfLoan/AfProductDetailScreenStyle');
import {NavigationActions,StackActions} from 'react-navigation';

import cfn from '../../base/commonFun/commonFun';
import Global from '../../WsSupport/connecting';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/Ionicons';

class AfProductDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    let targetProduct = this.props.navigation.state.params.product;
    let defaultAmountTotal = parseFloat(targetProduct.amount_low*targetProduct.divide_period_min*(parseFloat(targetProduct.daily_rate)*0.01))+parseFloat(targetProduct.amount_low);
    this.state = {
      backData: '',
      targetProduct:targetProduct,
      loanAmount:targetProduct.amount_low,
      defaultSelectPeriod:targetProduct.divide_period_min,
      defaultAmountTotal:defaultAmountTotal,
    };

  };

  // static navigationOptions = {
  //   header: null,
  // };
  static navigationOptions = ({ navigation }) => ({
    title:navigation.state.params.product.product_name+"-详情",
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


  trim(str) {
    str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
  }

  changeTargetLoan(thisValue){
    //console.warn(thisValue);
    var that = this;
    var  newLoanAmount = parseInt(thisValue);
          newLoanAmount = newLoanAmount.toString().replace(/[^\d]+/, '');
    if(newLoanAmount<=0){
      //newLoanAmount=that.state.targetProduct.amount_low;
      newLoanAmount=0;
    }
    if(newLoanAmount>=100000000){
      //newLoanAmount=that.state.targetProduct.amount_low;
      newLoanAmount=100000000;
    }

        newLoanAmount = newLoanAmount.toString()
    //console.warn(newLoanAmount);
    //this.setState({loanAmount:newLoanAmount});

    let newAmountTotal = parseFloat(newLoanAmount)+parseFloat(newLoanAmount)*parseInt(that.state.defaultSelectPeriod)*(that.state.targetProduct.daily_rate*0.01);
    newAmountTotal = newAmountTotal.toFixed(2);
    that.setState({
      loanAmount:newLoanAmount,
      defaultAmountTotal:newAmountTotal,
    });
  }


  _showTimePicker() {
    var that =this;


    let periodArray = that.state.targetProduct.divide_period.split(',');


    let pickerData = periodArray;
    let date = new Date();
    let selectedValue = [that.state.targetProduct.divide_period_min];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText:'确认',
      pickerCancelBtnText:'取消',
      pickerTitleText: '选择期限',
      wheelFlex: [2],
      onPickerConfirm: pickedValue => {
        //console.warn('area', pickedValue);
        let newAmountTotal = parseFloat(that.state.loanAmount)+parseFloat(that.state.loanAmount)*parseInt(pickedValue)*(that.state.targetProduct.daily_rate*0.01);
        newAmountTotal = newAmountTotal.toFixed(2);
        that.setState({
          defaultSelectPeriod:pickedValue,
          defaultAmountTotal:newAmountTotal,
        });
      },
      onPickerCancel: pickedValue => {
        console.warn('area', pickedValue);
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

//明星产品点击
  starProductClick(starProduct){
    // //统计明星产品点击
    // var that=this;
    // var url_fetch = Global.requestDomain+"/Index/Public/user_operation_record";
    // var requestParam = Global.requestParam+"&operation_type=1&product_id="+starProduct.id+"&extra_id="+starProduct.id+"&user_id="+Global.user_id;
    // fetch(url_fetch, {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: requestParam
    // }).then((response) => response.json()).then((responseJson) => {
    //   //console.warn(responseJson);
    //   if(typeof(responseJson.back_status) !="undefied" && parseInt(responseJson.back_status) ==1){
    //
    //   }
    //
    //
    // }).catch((error) => {
    //   console.warn(error);
    //
    //
    // });

    //跳转第三方页面
    //如果未登录则跳登录页面
    if(!Global.user_id){
      this.props.navigation.navigate('AfSignIn');
    }else{

        //this.props.navigation.navigate('AfTrDe',{third_website_url:starProduct.jump_url,title:starProduct.product_name});
       this.props.navigation.navigate('AfTrDe',{third_website_url:starProduct.jump_url,title:starProduct.product_name,targetProduct:starProduct});

    }

  }

  //收藏
  setCollect(targetProduct){

    //console.warn(targetProduct);
    var that=this;
    var url_fetch = Global.requestDomain+"/Index/Product/setCollect";
    var requestParam = Global.requestParam+"&type=1&item_id="+targetProduct.id+"&user_id="+Global.user_id;
    //console.warn(requestParam);return;
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

        Alert.alert('收藏成功');
      }else{
        Alert.alert(responseJson.back_msg);
      }


    }).catch((error) => {
      console.warn(error);


    });

  }

  render() {
    const { navigate } = this.props.navigation;
    var that = this;

    let thisProData = that.state.targetProduct;
    let tagDesString = thisProData.tag_des;
    let tagDesArray = tagDesString.split(",");
    let tagView = [];
    for(var n=0;n<tagDesArray.length;n++){

      tagView.push(
          <View style={styles.detailTagBox}><Text style={styles.detailTagText}>{tagDesArray[n]}</Text></View>
      );
    }

    let applyCondition = that.state.targetProduct.apply_condition.replace(/；/g, ';').split(";");
    //console.warn(applyCondition);
    let applyConditionView = [];
    for(var m=0;m<applyCondition.length;m++){

      applyConditionView.push(
          <View style={styles.detailTagBox}><Text style={styles.detailTagText}>{applyCondition[m]}</Text></View>
      );
    }

    return (
        <ScrollView bounces={false} style={styles.mastOuterBox}>

          <View style={styles.detailTopBox}>
            <View style={styles.detailTopImageBox}>
              <Image style={styles.detailTopImage} source={{uri:that.state.targetProduct.product_picture_url_qiniu}}   resizeMode='stretch'/>
            </View>
            <View style={styles.detailTopRightBox}>
              <View style={styles.detailTopRightBox1}>
                <View style={styles.detailTopRightBox1Left}>
                  <Text style={styles.detailTopRightBox1LeftText}>{that.state.targetProduct.product_name}</Text>
                </View>
                <View style={styles.detailTopRightBox1Right}>
                  <Text style={styles.detailTopRightBox1RightText}>额度<Text style={styles.topRightInner}>{that.state.targetProduct.amount_low}~{that.state.targetProduct.amount_high}</Text>元</Text>
                </View>

              </View>
              <View style={styles.detailTopRightBox2}>
                <View style={styles.detailTopRightBox2Left}>
                  <Text style={styles.detailTopRightBox2LeftText}>成功申请<Text style={{color:'red'}}>{that.state.targetProduct.pass_number}人</Text></Text>
                </View>
                <View style={styles.detailTopRightBox2Right}>
                  <Text style={styles.detailTopRightBox2RightText}>成功率<Text style={{color:'red'}}>{that.state.targetProduct.success_rate}%</Text></Text>
                </View>

              </View>
              <View style={styles.detailTopRightBox3}>
                {tagView}
                <TouchableOpacity style={styles.collect} onPress={()=>that.setCollect(that.state.targetProduct)}><Text style={styles.collectText}>收藏</Text></TouchableOpacity>
              </View>
            </View>
          </View>


          <View style={styles.detailMiddleBox}>
            <View style={styles.detailMiddleBox1}>
              <View style={styles.detailMiddleBox1Left}>
                  <View style={styles.detailMiddleBoxTop}><Text  style={{color:'#000000',fontSize:16}}>贷款金额(元)</Text></View>
                  <View style={styles.detailMiddleBoxBottom}>
                    <TextInput
                        keyboardType="numeric"
                        onFocus={()=>that.setState({loanAmount:0})}
                        onChangeText ={(thisValue) => that.changeTargetLoan(thisValue)}
                        value={that.state.loanAmount}
                        style={{color:'red'}}
                        placeholder={that.state.targetProduct.amount_low}
                    />

                  </View>
              </View>
              <View style={styles.detailMiddleBox1Right}>
                  <View style={styles.detailMiddleBoxTop}><Text  style={{color:'#000000',fontSize:16}}>分期期限(天)</Text></View>
                  <TouchableOpacity style={styles.detailMiddleBoxBottom} onPress={this._showTimePicker.bind(this)}>
                    <Text  style={{color:'red'}}>{that.state.defaultSelectPeriod}</Text>
                  </TouchableOpacity>
              </View>

            </View>
            <View style={styles.detailMiddleBox2}>
                 <View style={styles.detailMiddleBox2A1Outer}>
                   <View style={styles.detailMiddleBox2A1}><Text style={styles.detailMiddleBox2A1Text}>预估还款</Text></View>
                   <View style={styles.detailMiddleBox2A2}><Text style={styles.detailMiddleBox2A2Text}>{that.state.defaultAmountTotal}</Text></View>
                 </View>

                 <View style={styles.detailMiddleBox2A1Outer}>
                   <View style={styles.detailMiddleBox2A1}><Text style={styles.detailMiddleBox2A1Text}>参考日率</Text></View>
                   <View style={styles.detailMiddleBox2A2}><Text style={styles.detailMiddleBox2A2Text}>{that.state.targetProduct.daily_rate}</Text></View>
                 </View>
                 <View style={styles.detailMiddleBox2A1Outer}>
                   <View style={[styles.detailMiddleBox2A1,{borderRightWidth:0}]} ><Text style={styles.detailMiddleBox2A1Text}>最快放款时间</Text></View>
                   <View style={[styles.detailMiddleBox2A2,{borderRightWidth:0}]}><Text style={styles.detailMiddleBox2A2Text}>{that.state.targetProduct.loan_release_time} 小时</Text></View>
                 </View>
            </View>
          </View>


          <View style={styles.productAttrBox}>
            <View style={styles.productAttrBoxTop}>
              <View style={styles.productAttrBoxLeft}></View>
              <View style={styles.productAttrBoxRightTextBox}><Text  style={styles.productAttrBoxRightText}>申请条件</Text></View>
            </View>
            <View style={styles.detailOtherInfoBox}>
              {applyConditionView}

            </View>
          </View>

          <View style={styles.productAttrBoxNew}>
            <View style={styles.productAttrBoxTop}>
              <View style={styles.productAttrBoxLeft}></View>
              <View style={styles.productAttrBoxRightTextBox}><Text  style={styles.productAttrBoxRightText}>所需材料</Text></View>
            </View>
            <View style={styles.detailOtherInfoBox}>
              <View style={styles.detailTagBox}><Text style={styles.docText}>{that.state.targetProduct.apply_doc}</Text></View>
            </View>
          </View>

         <TouchableOpacity  onPress={()=>that.starProductClick(that.state.targetProduct)} style={styles.detailApplyBtn}><Text style={styles.detailApplyBtnText}>立 即 申 请</Text></TouchableOpacity>

        </ScrollView>

  );
  }
}

export default AfProductDetailScreen
