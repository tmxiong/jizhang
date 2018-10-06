/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, View, TouchableOpacity,
    StatusBar, ScrollView,
    DeviceEventEmitter,
    FlatList,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from '../../utils/utils'
import DatePicker from 'react-native-datepicker'


type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.currentDate = new Date().Format("yyyy-MM-dd")
        this.state = {
            data:[], // 需要展示列表的数据
            income:'0',
            outlay:'0',
            date: this.currentDate,
        }
    }

    componentDidMount() {
        //AsyncStorage.clear();
        this._setData(this.state.date);

        this.ls = DeviceEventEmitter.addListener('updateHome',(data)=>{
            this._setData(this.currentDate);
        })
    }

    componentWillUnmount() {
        this.ls.remove();
    }

    _setData(date) {
        AsyncStorage.getItem('itemData',(err,result)=>{
            if(result) {
                result = JSON.parse(result);
                let dataIndex = -1;
                for(let i = 0; i < result.length; i++) {
                    if(result[i].date === date) {
                        dataIndex = i;
                        break;
                    }
                }
                if(dataIndex >= 0) {
                    this.setState({data:result[dataIndex].datas});
                    this._setMoneyCount();
                }else{
                    this.setState({data:[]});
                    this._setMoneyCount();
                }
            }else{
                this.setState({data:[]});
                this._setMoneyCount();
            }
        });
    }

    _renderItem({item,index}) {

        return(
            <View style={styles.itemContainer}>
                <Icon name={item.icon} style={styles.itemIcon}/>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={[styles.itemText,{fontSize:18,color:'#111',position:'absolute',right:10}]}>{item.money}</Text>
            </View>
        );
    }
    _setMoneyCount() {
        let {data} = this.state;
        let income, outlay = "0";
        if(data.length === 0) {
            income = outlay = '0';
        }else{
            for(let i = 0; i < data.length; i++) {
                let item = data[i];
                if(item.type === 'outlay'){ // 支出
                    outlay += item.money;
                }else{
                    income += item.money;
                }
            }
        }
        this.setState({
            income: eval(income),
            outlay: eval(outlay)
        })
    }

    _onDateChange(date) {
        this.setState({date: date});
        this._setData(date);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{
                        height: utils.picHeight(150),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: utils.picHeight(50)
                    }}>
                        <View style={{
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 5,
                            width: utils.picWidth(210),
                            height: utils.picHeight(60),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {/*<Text style={{color: '#fff'}}>2018-12-12</Text>*/}
                            <DatePicker
                                style={{width: 200,borderColor:'transparent'}}
                                date={this.state.date}
                                mode="date"
                                //placeholder="select date"
                                format="YYYY-MM-DD"
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
                                        color:'#fff',
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={this._onDateChange.bind(this)}
                            />
                        </View>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{
                            width: '50%',
                            height: utils.picHeight(200),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View>
                                <Text style={{color: '#fff'}}>收入(元)</Text>
                                <Text style={{
                                    fontSize: 30,
                                    marginTop: 10,
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>{this.state.income}</Text>
                            </View>
                        </View>
                        <View style={{
                            width: '50%',
                            height: utils.picHeight(200),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View>
                                <Text style={{color: '#fff'}}>支出(元)</Text>
                                <Text style={{
                                    fontSize: 30,
                                    marginTop: 10,
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>{this.state.outlay}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <FlatList
                    style={{width:'100%',marginBottom:utils.picWidth(100),flex:1}}
                    keyExtractor={(item,index)=>index.toString()}
                    data={this.state.data}
                    renderItem={this._renderItem.bind(this)}
                    ListEmptyComponent={()=><TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>DeviceEventEmitter.emit('showJiyibi')}
                        style={{width:'100%',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Icon name='ios-paper' style={{fontSize:50,color:'#888',marginTop:100}}/>
                        <Text style={{color:'#888',marginTop:5}}>没有数据哦~</Text>
                        <Text style={{color:'#888',marginTop:5}}>点此去记一笔</Text>
                    </TouchableOpacity>}
                />

                <StatusBar hidden={false} translucent={true} backgroundColor={'transparent'}
                           barStyle={'light-content'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        width: '100%',
        height: utils.picHeight(400),
        backgroundColor: '#f90'
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
