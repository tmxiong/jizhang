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
    FlatList,
    AsyncStorage,
    Alert,
    ImageBackground
} from 'react-native';
import utils from "../../../utils/utils";
import NavBar from '../../../component/NavBar'
import AddTixingPage from './DkListPage';
import {bg} from '../../../imgs/imgs'
import Global from "../../daikuan/WsSupport/connecting";
import {Loading,EasyLoading} from '../../../component/Loading'
type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
        leftActive: true,
        data:[]
    };
    Global.licaiTixing = [];
    Global.daikuanTixing = [];
      this.licaiTixing = null;
      this.daikuanTixing = null;
  }

  componentDidMount() {
      //this.fetchData(false, 4, '[]');
      EasyLoading.show('正在加载');
      let _this = this;
      this.fetchData(true, 3, null ,(daikuan)=>{
          if(daikuan) {
              daikuan = JSON.parse(daikuan.data_json_str)
          }else{
              daikuan = []
          }
          this.daikuanTixing = Global.daikuanTixing = daikuan;
          this._update('daikuanTixing');
          _this.fetchData(true, 4, null, (licai) => {
              console.log(licai);
              EasyLoading.dismis();
              if(licai) {
                  console.log('licai',licai);
                  licai = JSON.parse(licai.data_json_str)
              }else{
                  licai = [];
              }
              _this.licaiTixing = Global.licaiTixing = licai;
          })
      })
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
              leftActive:true,
          });
          if(!this.daikuanTixing) {
              EasyLoading.show('正在加载');
              this.fetchData(true, 3, null, (data)=>{
                  EasyLoading.dismis();
                  if(data) {
                      this.daikuanTixing = Global.daikuanTixing = JSON.parse(data.data_json_str);
                      this._update('daikuanTixing')
                  }else{
                      this.daikuanTixing = Global.daikuanTixing=[];
                  }
              })
          }else{
              this.setState({
                  data: Global.daikuanTixing
              });
          }

      }else{
          this.setState({
              leftActive:false,
          });
          if(!this.licaiTixing) {
              EasyLoading.show('正在加载');
              this.fetchData(true, 3, null, (data)=>{
                  EasyLoading.dismis();
                  if(data) {
                      this.licaiTixing = Global.licaiTixing = JSON.parse(data.data_json_str);
                      this._update('licaiTixing')
                  }else{
                      this.licaiTixing = Global.licaiTixing=[];
                  }
              })

          }else{
              console.log(Global.licaiTixing);
              this.setState({
                  data:Global.licaiTixing
              })
          }

      }
    }

    fetchData(isGet,type, data, callback) {
        // isGet = true, data不填，
        // isGet = false, callback不填

        // get or set
        // type = 1 ; 支出
        // type = 2; 收入
        // type = 3; 贷款提醒
        // type = 4; 理财
        let url = '';
        let body = `type=${type}&phone_number=${Global.phone_number}`;
        if(isGet) {
            url = Global.requestDomain + "/Index/ZTest/getCostDetail";
        } else {
            url = Global.requestDomain + "/Index/ZTest/setCostDetail";
            body = body + "&data_json_str=" + data;
        }

        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body
        }).then((responseJson)=>responseJson.json())
            .then((responseJson)=>{
                console.log(responseJson);
                if(responseJson.back_status == 1) {
                    callback && callback(responseJson.back_data);
                }

            }).catch((e)=>{
            console.log(e)
        })
    }

    _add() {
        let type = this.state.leftActive ? '添加贷款提醒' : '添加理财提醒';
        this.state.leftActive ?
            utils.goToPage(this,'DkListPage',{name:type, update:this._update.bind(this)}) :
            utils.goToPage(this,'AddLcPage',{name:type, update:this._update.bind(this)})
    }

    _update(key) {
      this.setState({data: key === 'licaiTixing' ? Global.licaiTixing : Global.daikuanTixing})
      // key licaiTixing  daikuanTixing
      //AsyncStorage.getItem(key,(err,result) => {
          //console.warn(result);
        // let result = Global.daikuanTixing;
        //   if(result){
        //       try{
        //           if(result.length > 0) {
        //               this.setState({data: result});
        //               key === 'licaiTixing' ? this.licaiTixing = result : this.daikuanTixing = result;
        //           }else{
        //               this.setState({data:[]});
        //               key === 'licaiTixing' ? this.licaiTixing = [] : this.daikuanTixing = [];
        //           }
        //       }catch(e){
        //           this.setState({data:[]});
        //           key === 'licaiTixing' ? this.licaiTixing = [] : this.daikuanTixing = [];
        //       }
        //   }else{
        //       this.setState({data:[]});
        //       key === 'licaiTixing' ? this.licaiTixing = [] : this.daikuanTixing = [];
        //   }
      //})
    }
    _deleteItem(index) {
      Alert.alert('是否删除？','',[
          {text:'取消',onPress:()=>{}},
          {text:'确定',onPress:()=>{
              if(this.state.leftActive) {
                  Global.daikuanTixing.splice(index,1);
                  this.fetchData(false, 3, JSON.stringify(Global.daikuanTixing))
                  //AsyncStorage.setItem('daikuanTixing',JSON.stringify(this.daikuanTixing));
                  this.setState({data: Global.daikuanTixing});
              }else{
                  Global.licaiTixing.splice(index,1);
                  this.fetchData(false, 4, JSON.stringify(Global.licaiTixing))
                  //AsyncStorage.setItem('licaiTixing',JSON.stringify(this.licaiTixing));
                  this.setState({data: Global.licaiTixing});
              }}},
      ])
    }

    _renderItem({item, index}) {
      let {leftActive} = this.state;
      let page = leftActive ? 'AddDkPage' : 'AddLcPage';
      let name = leftActive ? '我的贷款提醒' : '我的理财提醒';
        return(
            <TouchableOpacity
                onLongPress={()=>this._deleteItem(index)}
                onPress={()=>utils.goToPage(this,page,{data:item, name:name})}
                activeOpacity={0.8}
                style={styles.itemContainer}>
                <View style={styles.cellRow}>
                    <Text>项目名称:</Text>
                    <Text style={{color:'#888'}}>{item.name}</Text>
                </View>
                <View style={styles.cellRow}>
                    <Text>提醒时间:</Text>
                    <Text style={{color:'#888'}}>{item.tixingDate}</Text>
                </View>
                <View style={[styles.cellRow,{borderBottomWidth:0}]}>
                    <Text>金额：{item.money}</Text>
                    <Text style={{color:'#888'}}>查看详细>></Text>
                </View>
            </TouchableOpacity>
        )
    }

  render() {
    return (
      <ImageBackground source={bg} style={styles.container}>
          <NavBar
              middleView={this.renderMiddleView()}
              leftIcon={null}
              rightText={'添加'}
              rightFn={()=>this._add()}
          />

          <FlatList
              style={{width:'100%',marginBottom:utils.picWidth(100),flex:1}}
              keyExtractor={(item,index)=>item.name + index}
              data={this.state.data}
              renderItem={this._renderItem.bind(this)}
              ListEmptyComponent={()=><TouchableOpacity onPress={()=>this._add()} style={{marginTop:200}}>
                  <Text style={{color:'#000529',alignSelf:'center',}}>暂无添加记录</Text>
                  <Text style={{color:'#000529',alignSelf:'center',marginTop:5}}>点我添加提醒</Text>
              </TouchableOpacity>}
          />

      </ImageBackground>
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
    middleActive:{
        backgroundColor:'#f5f5f5',
    },
    middleTextActive:{
        color:utils.baseColor
    },
    itemContainer: {
        width: '100%',
        height: utils.picHeight(180),
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
        alignItems: 'center',
        marginBottom:10,

    },
    cellRow:{
      flexDirection: 'row',
        justifyContent: 'space-between',
        width:utils.deviceWidth() - 20,
        height:utils.picHeight(60),
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#f3f3f3'
    },

});
