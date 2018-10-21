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
   Linking
  } from 'react-native';
const styles = require('../../Resource/defaultStyle/BeLoan/BeLoginScreenStyle');
import {StackActions} from 'react-navigation';
import cfn from '../../base/commonFun/commonFun';


class BeLoginScreen extends React.Component {
   
  constructor(props) {
    super(props);
    
    this.state = { 
      backData: '',
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
        <View style={styles.mastOuterBox}>
        <Text  style={styles.checkBt}>审核</Text>

        </View>
    );
  }
}

export default BeLoginScreen
