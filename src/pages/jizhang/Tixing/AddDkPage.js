import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity, AsyncStorage,
    Alert

} from 'react-native';

import NavBar from '../../../component/NavBar'
import utils from '../../../utils/utils'
import DatePicker from 'react-native-datepicker'
import Global from "../../daikuan/WsSupport/connecting";
type Props = {};
export default class Index extends Component<Props> {

    constructor(props) {
        super(props);
        this.currentDate = new Date().Format('yyyy-MM-dd');
        this.data = props.navigation.state.params.data || null;
        this.state={
            daoqiDate: this.currentDate,
            tixingDate: '',
        };

        this.name = props.navigation.state.params.name
    }

    static defaultProps={

    };

    _onDateChange(date, type) {
        if(type === 'daoqi') {
            this.setState({daoqiDate: date})
        }else {
            this.setState({tixingDate: date})
        }
    }

    saveData() {

        if(!this.name) {
            Alert.alert('请输入项目名称');
            return;
        } else if(!this.count) {
            Alert.alert('请输入贷款账号');
            return;
        }else if(!this.money) {
            Alert.alert('请输入贷款金额');
            return;
        }else if(!this.state.daoqiDate){
            Alert.alert('请输入到期时间')
        }else if(!this.note) {
            Alert.alert('请输入备注');
            return;
        }else if(this.state.tixingDate === '') {
            Alert.alert('请输入提醒时间');
            return;
        }
        // 理财提醒
        let daikuanTx = {
            name: this.name, // 项目名称
            count: this.count, //贷款账号
            money: this.money, // 贷款金额
            daoqiDate: this.state.daoqiDate, // 到期时间
            note: this.note, // 备注
            tixingDate: this.state.tixingDate, // 提醒时间
        };

            let result = Global.daikuanTixing;
            result.push(daikuanTx);
            this.fetchData(false, 3, JSON.stringify(result));
            //AsyncStorage.setItem('daikuanTixing',JSON.stringify(result))

        setTimeout(()=>{
            const {navigation} = this.props;
            navigation.state.params.update('daikuanTixing');
            navigation.goBack(navigation.state.params.key);
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
                    <Text>贷款账号</Text>
                    <Text style={styles.rightText}>{this.data.count}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>贷款金额</Text>
                    <Text style={styles.rightText}>{this.data.money}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>到期时间</Text>
                    <Text style={styles.rightText}>{this.data.daoqiDate}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>备注</Text>
                    <Text style={styles.rightText}>{this.data.note}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text>提醒时间</Text>
                    <Text style={styles.rightText}>{this.data.tixingDate}</Text>
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={()=>utils.goBack(this)}
                    middleText={this.name}
                />
                {this.data ? this.renderData() : <ScrollView>
                    <View style={styles.itemContainer}>
                        <Text>贷款平台</Text>
                        <Text style={styles.rightText}>{this.name}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>贷款账号</Text>
                        <TextInput
                            style={styles.rightText}
                            placeholder={'输入贷款账号'}
                            maxLength={20}
                            keyboardType={'numeric'}
                            onChangeText={text => this.count = text}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>贷款金额</Text>
                        <TextInput
                            style={styles.rightText}
                            placeholder={'输入贷款金额'}
                            maxLength={20}
                            keyboardType={'numeric'}
                            onChangeText={text => this.money = text}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>到期时间</Text>
                        <DatePicker
                            style={{width: utils.deviceWidth()/2,borderColor:'transparent'}}
                            date={this.state.daoqiDate}
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
                            onDateChange={(date)=>this._onDateChange(date,'daoqi')}
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
