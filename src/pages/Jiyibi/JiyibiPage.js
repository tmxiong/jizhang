/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    DeviceEventEmitter,
    TouchableOpacity,
    ScrollView,
    Animated,
    AsyncStorage,
    Alert
} from 'react-native';

import utils from '../../utils/utils'
import NavBar from '../../component/NavBar';
import JiyibiItem from '../../component/JiyibiItem';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {};
export default class App extends Component<Props> {
  static defaultProps = {

  };
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        items:null,
        moneyCount: '0',
        doneText:'完成',
        doneBgColor: utils.baseColor,
        doneTextColor: '#fff'
    };
    this.inputAnim = new Animated.Value(0);
    this.itemData = null; // 记账的数据
      this.jizhangType = 'outlay' // outlay or income
  }

  componentDidMount() {
      this.renderItems();
    this.ls = DeviceEventEmitter.addListener('showJiyibi',(isShow)=>{
      this.setState({
          modalVisible: isShow
      });
      if(!isShow) {
          this.startInputAnim(0);
      }
    })
      this.ls1 = DeviceEventEmitter.addListener('setItem',(data)=>{
          this.itemData = data;
          this.startInputAnim(1);
      })
  }

  componentWillUnmount() {
    this.ls.remove();
    this.ls1.remove();
  }

  renderItems() {
      let items = itemsConfig.map((item, index) => {
          return <JiyibiItem key={index} name={item.name} icon={item.icon} />
      });

      this.setState({items:items})
  }

  startInputAnim(value) {
      Animated.timing(
          this.inputAnim,
          {
              toValue: value, // 0 or 1
              // useNativeDriver: true,
              duration: 300,
              // isInteraction:false
          }
      ).start(()=>{
          if(value === 0) {
              this.setState({moneyCount:'0'})
          }
      });

  }

  startCalc(str) {
      // 89089+787
      try{
          return eval(str).toFixed(2);
      }catch(e){
          return '0'
      }


  }

  // 切换按钮
    changeDoneBtn(type) {
      if(type === '=') {
          this.setState({
              doneText: '=',
              doneBgColor: '#fff',
              doneTextColor: '#111'
          });
      }else if(type === "完成") {
          this.setState({
              doneText: '完成',
              doneBgColor: utils.baseColor,
              doneTextColor: '#fff'
          });
      }
    }

    closeModal() {
        let value = this.inputAnim.__getValue();
        if(value === 1) {
            this.startInputAnim(0);
            setTimeout(()=>{
                DeviceEventEmitter.emit('showJiyibi',false);
            },350)
        }else {
            DeviceEventEmitter.emit('showJiyibi',false);
        }

    }

    saveData(data) {
      AsyncStorage.getItem('itemData',(err, result) => {
          let date = data.date;
          let obj = {
              date: date,
              datas: [data]
          };

          if(result) { // 有数据
              result = JSON.parse(result);
              let dataIndex = -1;
              for(let i = 0; i < result.length; i++) {
                  if(result[i].date === date) {
                      dataIndex = i;
                      break;
                  }
              }
              if(dataIndex >= 0) { // 有今天的存储记录
                  result[dataIndex].datas.push(data);
              }else{
                  result.push(obj)
              }
          } else {
              result = [obj];
          }

          AsyncStorage.setItem('itemData',JSON.stringify(result));
          DeviceEventEmitter.emit('updateHome',result, date);
          //AsyncStorage.getItem('itemData',(err,result)=>{console.warn(result)})

      })
    }

  onItemPress(itemType) {

      itemType = itemType.toString();
      let moneyCount = this.state.moneyCount.toString();
      let exceptLastInput = moneyCount.substring(0, moneyCount.length - 1);
      let lastInput = moneyCount.substr(-1);
      let isFushu = false; // 是否是负数
      let symbol = '+' // 运算符号
      let temp = moneyCount;
      let symbolBeforReg = /(^(\-)?(0|[1-9]{1,8}))(\.(\d){1,2})?$/ // 运算符的前半部分（不包括运算符）；
      let symbolAfterReg = /(^(0|[1-9]{1,8}))(\.(\d){1,2})?$/ // 运算符的后半部分（不包括运算符）；


      // var obj = [
      //     {
      //         date: '2018-09-09',
      //         datas: [
      //             {
      //                 name:'',
      //                 icon:'',
      //                 date:'',
      //                 type:'',
      //                 money:'',
      //             },
      //             {
      //                 name:'',
      //                 icon:'',
      //                 date:'',
      //                 type:'',
      //                 money:'',
      //             },
      //         ]
      //     }
      // ];

      if(itemType === 'done') { // 显示"=" 或 "完成"
              if(this.state.doneText === "=") {
                  moneyCount = this.startCalc(moneyCount);
                  this.changeDoneBtn('完成');
              }else{
                  moneyCount = this.startCalc(moneyCount);

                  if(moneyCount === '0.00' || moneyCount === "0") {
                      return Alert.alert('金额不能为0')
                  }

                  // 关闭并保存记账数据
                  this.closeModal();
                  this.itemData.date = new Date().Format('yyyy-MM-dd');
                  this.itemData.money = this.jizhangType === "outlay" ? "-"+moneyCount : "+"+moneyCount;
                  this.itemData.type = this.jizhangType;
                  this.saveData(this.itemData);
                  // AsyncStorage.setItem('itemData',{})
              }

          }else if(itemType === '删除') {
              if(moneyCount.length === 1) {
                  moneyCount = 0;
              }else {
                  moneyCount = moneyCount.substring(0,moneyCount.length - 1);
              }
          }else if(/^[+|\-]$/.test(itemType)) {

                if(/^-/.test(moneyCount)) { // 负数运算,去除负号-
                    temp = moneyCount.substring(1,moneyCount.length-1);
                    isFushu = true;
                } else {
                    temp = moneyCount;
                }

                if(/[+|\-|\.]/.test(temp)) {
                    if(/[+|\-|\.]$/.test(temp)) { // 最后一位是运算符
                        if(/\./.test(temp)){
                            return;
                        }
                        moneyCount = moneyCount.replace(lastInput, itemType);
                    } else {
                        moneyCount = this.startCalc(moneyCount) + itemType;
                    }

                }else {
                    moneyCount = moneyCount + itemType;
                }
          if(this.state.doneText === '完成') {
              this.changeDoneBtn('=');
          }

          }else if(itemType === ".") {
              if(!(/[\.|+|\-]$/.test(lastInput)) && !temp.substr(-2).match(/\./) && !temp.substr(-3).match(/\./)) {
                  //if(this.state.doneText === "=") {
                  //    moneyCount = '0' + itemType;
                  //}else {
                      moneyCount = moneyCount + ".";
                 // }

              }
          }else if(itemType.match(/\d/)) { // 输入的是数字

              let matchResult = moneyCount.match(/-/);
              if(matchResult && matchResult.index === 0) { // 负数运算, 先去除最前面的负号-
                  isFushu = true;
                  moneyCount = moneyCount.substring(1, moneyCount.length);
              }

              symbol = moneyCount.match(/[\+|\-]/);
              if(symbol) { // 有运算符,取运算符后面的字符串
                  symbol = symbol[0];
                  temp = moneyCount.split(symbol);
                  temp[1] = temp[1] + itemType;
                  if(symbolAfterReg.test(temp[1])) {
                      moneyCount = temp.join(symbol);
                      if(isFushu) {
                          moneyCount = '-' + moneyCount;
                      }
                  }
              }else{
                  if(moneyCount === '0') {
                      moneyCount = itemType;
                  }else {
                      temp = moneyCount + itemType;
                      if(symbolBeforReg.test(temp)) {
                          moneyCount = temp;
                      }
                  }

              }

          }
        this.setState({
            moneyCount: moneyCount
        })

  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
        >
            <NavBar
              leftIcon={null}
              middleText={'记一笔'}
              rightText={'取消'}
              rightFn={()=>this.closeModal()}
            />
            <ScrollView>
              <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                  {this.state.items}
              </View>
            </ScrollView>
                <Animated.View style={[styles.inputContainer,
                    {marginBottom:this.inputAnim.interpolate({
                            inputRange:[0,1],
                            outputRange:[-utils.picHeight(500),0]
                    })
                    }]}>
                    <View style={styles.inputRow}>
                        <Text style={[styles.inputItemText,{position:'absolute',right:10,fontWeight:'normal'}]}>
                            ￥{this.state.moneyCount}
                        </Text>
                    </View>
                    <View style={styles.inputRow}>
                        <TouchableOpacity onPress={()=>this.onItemPress(1)} activeOpacity={0.8} style={[styles.inputItem,{border:'none'}]}>
                            <Text style={styles.inputItemText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress(2)} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress(3)} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress('删除')} activeOpacity={0.8} style={styles.inputItem}>
                            <Icon name='ios-backspace' style={[styles.inputItemText,{fontSize:30}]}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputRow}>
                        <TouchableOpacity onPress={()=>this.onItemPress(4)} activeOpacity={0.8} style={[styles.inputItem,{border:'none'}]}>
                            <Text style={styles.inputItemText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress(5)} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress(6)} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress("+")} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputRow}>
                        <TouchableOpacity onPress={()=>this.onItemPress(7)} activeOpacity={0.8} style={[styles.inputItem,{border:'none'}]}>
                            <Text style={styles.inputItemText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress(8)} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress(9)} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress("-")} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputRow,{border:'none'}]}>
                        <TouchableOpacity onPress={()=>{}} activeOpacity={0.8} style={[styles.inputItem,{border:'none'}]}>
                            <Text style={styles.inputItemText}> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress(0)} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress('.')} activeOpacity={0.8} style={styles.inputItem}>
                            <Text style={styles.inputItemText}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onItemPress('done')} activeOpacity={0.8} style={[styles.inputItem,{backgroundColor:this.state.doneBgColor}]}>
                            <Text style={[styles.inputItemText,{color:this.state.doneTextColor}]}>{this.state.doneText}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
      position:'absolute',
      top:0,
      left:0,
      zIndex:999
  },
  navBar: {
    width:utils.deviceWidth(),
      height:utils.picHeight(120),
      backgroundColor:utils.baseColor,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      paddingTop:utils.picHeight(30)
  },
    item: {
      width: utils.deviceWidth()/4,
        height: utils.deviceWidth()/4,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
      width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#efeff4',
        textAlign:'center',
        overflow:'hidden',
        lineHeight:44,
        color: '#333',
        fontSize:25,
    },
    itemText: {
      color: '#333',
        marginTop: 10,
        fontSize:12
    },
    inputContainer: {
      width:'100%',
        borderTopWidth:1,
        borderTopColor:'#e9e9e9',
        height:utils.picHeight(500),
        marginBottom:-utils.picHeight(500),
    },
    inputRow: {
        width:'100%',
        height: utils.picHeight(100),
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#e9e9e9',
        flexDirection:'row',
        alignItems:'center',
    },
    inputItem: {
      width:utils.deviceWidth()/4,
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderLeftColor:'#e9e9e9',
        borderLeftWidth:1,
    },
    inputItemText: {
      fontSize:22,
        color:'#111',
        fontWeight:'bold'
    }

});

const itemsConfig = [
    {
        name:'餐饮',
        icon:'ios-restaurant'
    },
    {
        name:'日常',
        icon:'ios-today'
    },
    {
        name:'购物',
        icon:'ios-pricetags'
    },
    {
        name:'果蔬',
        icon:'ios-egg'
    },
    {
        name:'日用',
        icon:'ios-basket'
    },
    {
        name:'学习',
        icon:'ios-book'
    },
    {
        name:'服饰',
        icon:'ios-shirt'
    },
    {
        name:'通讯',
        icon:'ios-call'
    },
    {
        name:'还款',
        icon:'ios-card'
    },
    {
        name:'医疗',
        icon:'ios-medkit'
    },
    {
        name:'烟酒',
        icon:'ios-wine'
    },
    {
        name:'娱乐',
        icon:'ios-happy'
    },
    {
        name:'红包',
        icon:'ios-wallet'
    },
    {
        name:'汽车',
        icon:'ios-car'
    },
    {
        name:'美容',
        icon:'ios-woman'
    },
    {
        name:'理财',
        icon:'ios-calculator'
    },
    {
        name:'水电',
        icon:'ios-water'
    },
    {
        name:'住房',
        icon:'ios-home'
    },
    {
        name:'运动',
        icon:'ios-bicycle'
    },

]