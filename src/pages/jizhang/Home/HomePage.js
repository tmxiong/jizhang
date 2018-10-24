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
    AsyncStorage,
    Alert,
    ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from '../../../utils/utils'
import DatePicker from 'react-native-datepicker';
import {bg} from '../../../imgs/imgs'
import Global from '../../daikuan/WsSupport/connecting.js'
import SplashScreen from "react-native-splash-screen";
import {Loading,EasyLoading} from '../../../component/Loading'
type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.currentDate = new Date().Format("yyyy-MM-dd");
        this.state = {
            data:[], // 需要展示列表的数据
            income:'0',
            outlay:'0',
            date: this.currentDate,
        }
    }

    componentDidMount() {
        //AsyncStorage.clear();
        EasyLoading.show('正在加载');
        this.fetchData(true, 1, null, (data) => {
            EasyLoading.dismis();
            if(data) {
                data = data.data_json_str;
                let jsonData = JSON.parse(data);
                Global.itemData = jsonData;
            }else {
                Global.itemData = [];
            }
            this._setData(this.state.date);

        });


        this.ls = DeviceEventEmitter.addListener('update',(data, date)=>{
            console.log('date',date);
            Global.itemData = data;
            console.log('data',data);
            this.fetchData(false, 1, JSON.stringify(data));
            this.setState({date:date});
            this._setData(date);
        });

        console.log(Global);
    }

    componentWillMount() {
        SplashScreen.hide();
    }

    componentWillUnmount() {
        this.ls.remove();
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
            EasyLoading.dismis();
                console.log(e)
            })
    }

    _setData(date) {
        let result = Global.itemData;
        try{
            if(result) {
                let dataIndex = -1;
                for(let i = 0; i < result.length; i++) {
                    if(result[i].date === date) {
                        dataIndex = i;
                        break;
                    }
                }
                if(dataIndex >= 0) {
                    this.setState({data:result[dataIndex].datas});
                    this._setMoneyCount(result[dataIndex].datas);
                }else{
                    this.setState({data:[]});
                    this._setMoneyCount([]);
                }
            }else{
                this.setState({data:[]});
                this._setMoneyCount([]);
            }
        }catch(e){
            //this.setState({data:[]});
            //this._setMoneyCount([]);
        }

        // AsyncStorage.getItem('itemData',(err,result)=>{
        //     if(result) {
        //         result = JSON.parse(result);
        //         let dataIndex = -1;
        //         for(let i = 0; i < result.length; i++) {
        //             if(result[i].date === date) {
        //                 dataIndex = i;
        //                 break;
        //             }
        //         }
        //         if(dataIndex >= 0) {
        //             this.setState({data:result[dataIndex].datas});
        //             this._setMoneyCount();
        //         }else{
        //             this.setState({data:[]});
        //             this._setMoneyCount();
        //         }
        //     }else{
        //         this.setState({data:[]});
        //         this._setMoneyCount();
        //     }
        // });
    }

    deleteData(index) {
        Alert.alert('是否删除？',"",[
            {text:'取消',onPress: ()=>{}},
            {text:'确定',onPress:()=>{
                let result = Global.itemData;
                    if(result) { // 有数据
                        let dataIndex = -1;
                        let{date} = this.state;
                        for(let i = 0; i < result.length; i++) {
                            if(result[i].date === date) {
                                dataIndex = i;
                                break;
                            }
                        }
                        if(dataIndex >= 0) { // 有今天的存储记录
                            result[dataIndex].datas.splice(index,1);
                        }
                        //AsyncStorage.setItem('itemData',JSON.stringify(result));
                        DeviceEventEmitter.emit('update',result, date);
                    }
                    // AsyncStorage.getItem('itemData',(err, result) => {
                    //     if(result) { // 有数据
                    //         result = JSON.parse(result);
                    //         let dataIndex = -1;
                    //         let{date} = this.state;
                    //         for(let i = 0; i < result.length; i++) {
                    //             if(result[i].date === date) {
                    //                 dataIndex = i;
                    //                 break;
                    //             }
                    //         }
                    //         if(dataIndex >= 0) { // 有今天的存储记录
                    //             result[dataIndex].datas.splice(index,1);
                    //         }
                    //         //AsyncStorage.setItem('itemData',JSON.stringify(result));
                    //         DeviceEventEmitter.emit('update',result, date);
                    //     }
                    //
                    // })
                }}
            ]
        );
    }

    _renderItem({item,index}) {

        return(
            <TouchableOpacity activeOpacity={0.8} onLongPress={()=>this.deleteData(index)} style={styles.itemContainer}>
                <Icon name={item.icon} style={styles.itemIcon}/>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={[styles.itemText,{fontSize:18,color:'#111',position:'absolute',right:10}]}>{item.money}</Text>
            </TouchableOpacity>
        );
    }
    _setMoneyCount(data) {
        try{
            let income = "0";
            let outlay = "0";
            if(data.length === 0) {
                income = outlay = '0';
            }else{
                for(let i = 0; i < data.length; i++) {
                    let item = data[i];
                    if(item.type === 'outlay'){ // 支出
                        // outlay += item.money;
                        outlay = Number(outlay) + Number(item.money);
                    }else{
                        // income += item.money;
                        income = Number(income) + Number(item.money);
                    }
                }
            }
            this.setState({
                income: income == 0 ? "0" : '+' + income.toString(),
                outlay: outlay.toString()
            })
        }catch(e){}

    }

    _onDateChange(date) {
        this.setState({date: date});
        this._setData(date);
    }

    render() {
        return (
            <ImageBackground source={bg} style={styles.container}>
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
                        <Icon name='ios-paper' style={{fontSize:50,color:'#000529',marginTop:100}}/>
                        <Text style={{color:'#000529',marginTop:5}}>没有数据哦~</Text>
                        <Text style={{color:'#000529',marginTop:5}}>点此去记一笔</Text>
                    </TouchableOpacity>}
                />

                <StatusBar hidden={false} translucent={true} backgroundColor={'transparent'}
                           barStyle={'light-content'}/>
            </ImageBackground>
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
        // backgroundColor: '#3d95f7',
        backgroundColor: 'rgba(212,56,42,0.6)'
    },
    itemContainer: {
        width: '100%',
        height: utils.picHeight(120),
        backgroundColor: 'rgba(255,255,255,0.8)',
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
