/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import utils from '../../utils/utils'
import Navbar from '../../component/NavBar'
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};
export default class App extends Component<Props> {



  render() {
    return (
      <View style={styles.container}>
        <Navbar
          leftIcon={null}
          middleText={'我的'}
        />

          <ScrollView style={{width:'100%'}}>
              <TouchableOpacity
                  style={styles.items}
                  activeOpacity={0.8}
                  onPress={()=>utils.goToPage(this,'CalculatePage')}>
                  <Icon style={styles.icon} name={"ios-log-in"} size={25}/>
                  <Text style={styles.itemText}>贷款管理</Text>
                  <Icon style={styles.arrowRight} name={'ios-arrow-forward'} size={25}/>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.items}
                  activeOpacity={0.8}
                  onPress={()=>utils.goToPage(this,'CalculatePage')}>
                  <Icon style={styles.icon} name={"ios-log-out"} size={25}/>
                  <Text style={styles.itemText}>投资管理</Text>
                  <Icon style={styles.arrowRight} name={'ios-arrow-forward'} size={25}/>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.items}
                  activeOpacity={0.8}
                  onPress={()=>utils.goToPage(this,'CalculatePage')}>
                  <Icon style={styles.icon} name={"ios-calculator"} size={25}/>
                  <Text style={styles.itemText}>计算器</Text>
                  <Icon style={styles.arrowRight} name={'ios-arrow-forward'} size={25}/>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[styles.items,{marginTop:20}]}
                  activeOpacity={0.8}
                  onPress={()=>utils.goToPage(this,'AboutPage')}>
                  <Icon style={styles.icon} name={"ios-alert"} size={25}/>
                  <Text style={styles.itemText}>关于</Text>
                  <Icon style={styles.arrowRight} name={'ios-arrow-forward'} size={25}/>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.items}
                  activeOpacity={0.8}
                  onPress={()=>utils.goToPage(this,'FeedbackPage')}>
                  <Icon style={styles.icon} name={"ios-create"} size={25}/>
                  <Text style={styles.itemText}>反馈</Text>
                  <Icon style={styles.arrowRight} name={'ios-arrow-forward'} size={25}/>
              </TouchableOpacity>
          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
      // width:utils.deviceWidth()
  },
    items:{
        width:"100%",
        height:utils.picHeight(100),
        backgroundColor:'#fff',
        borderBottomColor:'#e9e9e9',
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',

    },
    icon:{
        width:50,
        textAlign:'center',
        color:'#666'
    },
    arrowRight:{
      color:'#999',
        position:'absolute',
        right:10
    },
    itemText:{
      color:'#333'
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
