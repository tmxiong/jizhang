/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text, View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import utils from "../../utils/utils";
import NavBar from '../../component/NavBar'
import AddTixingPage from './AddTixingPage'

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
        leftActive: true,
    }
  }

    renderMiddleView() {
        return(
            <View style={styles.middleContent}>
                <TouchableOpacity onPress={()=>this.onMiddleItemPress('l')} activeOpacity={0.8}
                                  style={[styles.middleTextContent,this.state.leftActive && styles.middleActive]}>
                    <Text style={[styles.middleText,this.state.leftActive && styles.middleTextActive]}>贷款提醒</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onMiddleItemPress('r')} activeOpacity={0.8}
                                  style={[styles.middleTextContent,!this.state.leftActive && styles.middleActive]}>
                    <Text style={[styles.middleText,!this.state.leftActive && styles.middleTextActive]}>理财提醒</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onMiddleItemPress(lr){
      if(lr === 'l') {
        this.setState({
            leftActive:true
        })
      }else{
          this.setState({
              leftActive:false
          })
      }
    }

    _add() {
        let type = this.state.leftActive ? '添加贷款提醒' : '添加理财提醒';
        utils.goToPage(this,'AddTixingPage',{name:type})
    }

    _renderItem({item, index}) {

    }

  render() {
    return (
      <View style={styles.container}>
          <NavBar
              middleView={this.renderMiddleView()}
              leftIcon={null}
              rightText={'添加'}
              rightFn={()=>this._add()}
          />
          <FlatList
              style={{width:'100%',marginBottom:utils.picWidth(100),flex:1}}
              keyExtractor={(item,index)=>index.toString()}
              data={this.state.data}
              renderItem={this._renderItem.bind(this)}
              ListEmptyComponent={()=><Text style={{color:'#aaa',alignSelf:'center',marginTop:200}}>暂无添加记录</Text>}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:utils.deviceWidth(),
      height:utils.deviceHeight(),
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    middleContent:{
        width:utils.picWidth(320),
        height:utils.picHeight(60),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius:utils.picHeight(30),
        borderColor:'#ddd',
        borderWidth:1
    },
    middleText: {
        textAlign:'center',
        color:'#ddd'
    },
    middleTextContent:{
        width:utils.picWidth(316/2),
        alignItems:'center',
        justifyContent:'center',
        height:utils.picHeight(56),
        borderRadius:utils.picHeight(30),
    },
    /*
    document.getElementsByClassName("input-section")[0].getElementsByTagName("input")[0].value
    * */
    middleActive:{
        backgroundColor:'#f5f5f5',
    },
    middleTextActive:{
        color:utils.baseColor
    },
    itemContainer: {
        width: '100%',
        height: utils.picHeight(120),
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        fontSize: 30,
        color: utils.baseColor,
        marginLeft: 10,
        width:40,
        textAlign:'center'
    },
    itemText: {
        fontSize: 16,
        color: '#666',
        marginLeft:10,
    }
});
