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
    TouchableOpacity, AsyncStorage, DeviceEventEmitter,
    ImageBackground
} from 'react-native';
import Navbar from '../../component/NavBar'
import Echarts from 'native-echarts';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from '../../utils/utils';
import DatePicker from 'react-native-datepicker'
import {bg} from '../../imgs/imgs'

let option = {
    title : {
        // text: '某站点用户访问来源',
        // subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: '15px',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '类型',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:-335, name:'直接访问'},
                {value:-310, name:'邮件营销'},
                {value:-234, name:'联盟广告'},
                {value:-135, name:'视频广告'},
                {value:-1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

type Props = {};
export default class App extends Component<Props> {

  static defaultProps = {

  };

  constructor(props){
    super(props);
      this.currentDate = new Date().Format("yyyy-MM");
      this.incomeSortData = [];
      this.outlaySortData = [];
    this.state = {
        outlayActive:true,
        date: this.currentDate,
        data: [],
        option:null,
        chartType: 'pie'
    }
  }

  componentDidMount() {
      this._getData(this.state.date);
      this.ls = DeviceEventEmitter.addListener('update',(data, date)=>{
          setTimeout(()=>{
              this._getData(date.substring(0,7));
          },700);

      })
  }

  componentWillUnmount() {
      this.ls.remove();
  }

    _getData(date) {
        AsyncStorage.getItem('itemData',(err,result)=>{
            if(result) {
                result = JSON.parse(result);
                let array = [];
                for(let i = 0; i < result.length; i++) {
                    if(result[i].date.substring(0,7) === date) {
                        array = array.concat(result[i].datas)
                    }
                }
                this._setData(array)
            }else{
                this._setData([])
            }
        });
    }

    _setData(data) {
      // 合并重复类型
      let _sortData = (data) => {
          let sortData = [];
          for(let i = 0; i < data.length; i++) {
              let name = data[i].name;
              let index = -1;
              if(sortData.length === 0) {
                  sortData.push(data[i])
              }else{
                  for(let j = 0; j < sortData.length; j++) {
                      // 已合并的数组中是否存在该名称；
                      if(sortData[j].name === name) {
                          index = j;
                          break;
                      }
                  }

                  if(index > -1) {
                      let money = sortData[index].money;
                      money = data[i].money + money;
                      sortData[index].money = eval(money).toString();
                  } else {
                      sortData.push(data[i]);
                  }

              }

          }
          return sortData;
      };


      if(data.length > 0) {
          let outlayData = [];
          let incomeData = [];
          data.map((item, index) => {
              if(item.type === 'income') {
                  incomeData.push(item);
              }else if(item.type === 'outlay') {
                  outlayData.push(item);
              }
          });

          this.outlaySortData = _sortData(outlayData);
          this.incomeSortData = _sortData(incomeData);
          if(this.state.outlayActive) {
              this._setOption(this.outlaySortData, option);
          }else{
              this._setOption(this.incomeSortData, option);
          }
      }
        this.setState({
            data: data
        })

    }

    _setOption(data,option) {

      let nameArray = [];
      let dataArray = data.map((item,index)=>{
          nameArray.push(item.name);
          return {
              name: item.name,
              value: Number(item.money)
          }
      });
        option.series[0].data = dataArray;
        option.legend.data = nameArray;
        console.log(option);
        this.setState({option: JSON.parse(JSON.stringify(option)),data:data})
    }

  onMiddleItemPress(lr) {
    let isOutlayActive = true;
    if(lr === 'r') {
        isOutlayActive = false;
        this._setOption(this.incomeSortData, option);
    }else{
        this._setOption(this.outlaySortData, option);
    }
    this.setState({
        outlayActive: isOutlayActive
    })
  }

  renderMiddleView() {
    return(
        <View style={styles.middleContent}>
            <TouchableOpacity onPress={()=>this.onMiddleItemPress('l')} activeOpacity={0.8}
                              style={[styles.middleTextContent,this.state.outlayActive && styles.middleActive]}>
                <Text style={[styles.middleText,this.state.outlayActive && styles.middleTextActive]}>支出</Text>
            </TouchableOpacity>
           <TouchableOpacity onPress={()=>this.onMiddleItemPress('r')} activeOpacity={0.8}
                             style={[styles.middleTextContent,!this.state.outlayActive && styles.middleActive]}>
                <Text style={[styles.middleText,!this.state.outlayActive && styles.middleTextActive]}>收入</Text>
            </TouchableOpacity>
        </View>
    )
  }

    _onDateChange(date) {
        this.setState({date: date,data:[]});
        this.incomeSortData = this.outlaySortData = [];
        this._getData(date);
    }

  render() {
    return (
      <ImageBackground source={bg} style={styles.container}>
          <Navbar
              leftIcon={null}
              leftText={this.state.date}
              middleView={this.renderMiddleView()}
              // rightIcon={'ios-stats'}
              //rightIcon={'ios-pie'}
          />
          <View style={{
              width: utils.picWidth(130),
              height: utils.picHeight(60),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf:'flex-start',
              position:'absolute',
              left:10,
              top:30,
              backgroundColor:'transparent'
          }}>
              <DatePicker
                  style={{width: 80,borderColor:'transparent'}}
                  // date={this.state.date}
                  mode="date"
                  //placeholder="select date"
                  format="YYYY-MM"
                  minDate="1999-01-01"
                  maxDate={new Date().Format("yyyy-MM-dd")}
                  confirmBtnText="确定"
                  cancelBtnText="取消"
                  showIcon={false}
                  customStyles={{
                      dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                      },
                      dateInput: {
                          borderColor:'transparent'
                      },
                      dateText: {
                          color:'transparent',
                      }
                      // ... You can check the source to find the other keys.
                  }}
                  onDateChange={this._onDateChange.bind(this)}
              />
          </View>

          <View style={{marginTop:20,width:'100%',height:'100%'}}>
              {this.state.data.length === 0 ?
                  <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=>DeviceEventEmitter.emit('showJiyibi')}
                      style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
                      <Icon name='ios-paper' style={{fontSize:50,color:'#000529'}}/>
                      <Text style={{color:'#000529',marginTop:5}}>没有数据哦~</Text>
                      <Text style={{color:'#000529',marginTop:5}}>点此去记一笔</Text>
                  </TouchableOpacity> :
              <Echarts option={this.state.option} height={utils.deviceHeight()-100}/>}
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  middleContent:{
      width:utils.picWidth(250),
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
        width:utils.picWidth(246/2),
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
    }
});
