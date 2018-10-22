import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';

import NavBar from '../../../component/NavBar'
import utils from '../../../utils/utils'
import DatePicker from 'react-native-datepicker'
import Picker from 'react-native-picker';
import Global from "../../daikuan/WsSupport/connecting";
type Props = {};
export default class Index extends Component<Props> {

    constructor(props) {
        super(props);
        this.currentDate = new Date().Format('yyyy-MM-dd');
        this.data = props.navigation.state.params.data || null;
        this.state={
            qixiDate: this.currentDate,
            tixingDate: '',
            moshi:'整存整取',
            qixian:'1年'
        };
    }

    static defaultProps={

    };

    componentDidMount() {
    }

    _onDateChange(date, type) {
        if(type === 'qixi') {
            this.setState({qixiDate: date})
        }else {
            this.setState({tixingDate: date})
        }
    }

    _showQixianPicker() {
        Picker.init({

            pickerTitleText:'选择投资期限',
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerData: [

                   ['年','月','日'],

                [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

            ],
            onPickerConfirm: pickedValue => {
                pickedValue = pickedValue.reverse();
                this.setState({qixian:pickedValue})
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();
    }

    _showMoshiPicker() {
        Picker.init({

            pickerTitleText:'选择收益模式',
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',

            pickerData: ['整存整取','零存整取','存本取息','等额本息','等额本金'],
            onPickerConfirm: pickedValue => {
                this.setState({moshi:pickedValue})
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();
    }

    saveData() {
        if(!this.name) {
            Alert.alert('请输入项目名称');
            return;
        } else if(!this.money || this.money === '元') {
            Alert.alert('请输入投入本金');
            return;
        }else if(!this.yuqi || this.yuqi === '%') {
            Alert.alert('请输入预期年化');
            return;
        }else if(!this.note) {
            Alert.alert('请输入备注');
            return;
        }else if(this.state.tixingDate === '') {
            Alert.alert('请输入提醒时间');
            return;
        }
        // 理财提醒
        let licaiTx = {
            name: this.name, // 项目名称
            money: this.money, // 投入本金
            yuqi: this.yuqi, // 预期年化
            moshi: this.state.moshi, // 收益模式
            qixian: this.state.qixian, // 投资期限
            qixiTime: this.state.qixiDate, // 起息时间
            note: this.note, // 备注
            tixingDate: this.state.tixingDate, //提醒
        };

        // AsyncStorage.getItem('licaiTixing',(err,result) => {
        let result = Global.licaiTixing;
        result.push(licaiTx);
        //     AsyncStorage.setItem('licaiTixing',JSON.stringify(result))
        // });
        //console.log(licaiTx,JSON.stringify(result));
        this.fetchData(false, 4, JSON.stringify(result));
        setTimeout(()=>{
            this.props.navigation.state.params.update('licaiTixing');
            utils.goBack(this);
        },300);

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

    renderData() {
        return(
            <ScrollView>
                <View style={styles.itemContainer}>
                    <Text>项目名称</Text>
                    <Text style={styles.rightText}>{this.data.name}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>投入本金</Text>
                    <Text style={styles.rightText}>{this.data.money}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>预期年化</Text>
                    <Text style={styles.rightText}>{this.data.yuqi}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>收益模式</Text>
                    <Text style={styles.rightText}>{this.data.moshi}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>投资期限</Text>
                    <Text style={styles.rightText}>{this.data.qixian}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>起息时间</Text>
                    <Text style={styles.rightText}>{this.data.qixiTime}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>备注</Text>
                    <Text style={styles.rightText}>{this.data.note}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>提醒</Text>
                    <Text style={styles.rightText}>{this.data.tixingDate}</Text>
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={()=> utils.goBack(this)}
                    middleText={this.props.navigation.state.params.name}
                />
                {this.data ? this.renderData() : <ScrollView>
                    <View style={styles.itemContainer}>
                        <Text>项目名称</Text>
                        <TextInput
                            style={styles.rightText}
                            placeholder={'输入项目名称'}
                            onChangeText={text => this.name = text}
                            maxLength={20}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>投入本金</Text>
                        <TextInput
                            style={[styles.rightText,{paddingRight:20}]}
                            placeholder={'输入金额'}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={text => this.money = text + '元'}
                        />
                        <Text style={{position:'absolute',right:10}}>元</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>预期年化</Text>
                        <TextInput
                            style={[styles.rightText,{paddingRight:20}]}
                            placeholder={'0.00'}
                            maxLength={6}
                            keyboardType={'numeric'}
                            onChangeText={text => this.yuqi = text + '%'}
                        />
                        <Text style={{position:'absolute',right:10}}>%</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>收益模式</Text>
                        <TouchableOpacity onPress={()=>this._showMoshiPicker()}>
                            <Text style={styles.rightText}>{this.state.moshi}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>投资期限</Text>
                        <TouchableOpacity onPress={()=>this._showQixianPicker()}>
                            <Text style={styles.rightText}>{this.state.qixian}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>起息时间</Text>
                        <DatePicker
                            style={{width: utils.deviceWidth()/2,borderColor:'transparent'}}
                            date={this.state.qixiDate}
                            mode="date"
                            //placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.currentDate}
                            maxDate={'3000-12-31'}
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
                                    borderColor:'transparent',
                                    textAlign:'right',
                                    alignItems:'flex-end'
                                },
                                dateText: {
                                    color:'#888',
                                    textAlign:'right'
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date)=>this._onDateChange(date,'qixi')}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>备注</Text>
                        <TextInput
                            style={styles.rightText}
                            placeholder={'输入备注，30字以内'}
                            maxLength={30}
                            onChangeText={text => this.note = text}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>提醒</Text>
                        <DatePicker
                            style={{width: utils.deviceWidth()/2,borderColor:'transparent'}}
                            date={this.state.tixingDate}
                            mode="date"
                            placeholder="设置提醒时间"
                            format="YYYY-MM-DD"
                            minDate={this.currentDate}
                            maxDate={'3000-12-31'}
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
                                    borderColor:'transparent',
                                    alignItems:'flex-end'
                                },
                                dateText: {
                                    color:'#888',
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date)=>this._onDateChange(date,'tixing')}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>this.saveData()} activeOpacity={0.8} style={styles.btn}>
                        <Text style={{color:'#fff'}}>保存</Text>
                    </TouchableOpacity>
                </ScrollView>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    itemContainer: {
        width:utils.deviceWidth(),
        height: utils.picHeight(110),
        borderBottomWidth:1,
        borderBottomColor:"#dedede",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        position:'relative'
    },
    leftText:{

    },
    rightText: {
        color:'#888',
        width:utils.deviceWidth()/2,
        textAlign:'right',
        padding:0,
        backgroundColor:'transparent'
    },
    btn: {
        width:utils.deviceWidth() - 40,
        height:utils.picHeight(90),
        backgroundColor: utils.baseColor,
        borderRadius:5,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    }
});

// 理财提醒
// let licaiTx = {
//     name: '', // 项目名称
//     benjin: '', // 投入本金
//     yuqi: '', // 预期年化
//     moshi: '', // 收益模式
//     qixian: '', // 投资期限
//     qixiTime: '', // 起息时间
//     note: '', // 备注
//     tixingTime: '', //提醒
// };
