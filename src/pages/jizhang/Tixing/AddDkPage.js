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
            note: this.state.note, // 备注
            tixingDate: this.state.tixingDate, // 提醒时间
        };

        AsyncStorage.getItem('daikuanTixing',(err,result) => {
            if(result) {
                try{
                    result = JSON.parse(result);
                }catch(e){
                    result = []
                }
            }else{
                result = [];
            }
            result.push(daikuanTx);
            AsyncStorage.setItem('daikuanTixing',JSON.stringify(result))
        });
        setTimeout(()=>{
            const {navigation} = this.props;
            navigation.state.params.update('daikuanTixing');
            navigation.goBack(navigation.state.params.key);
        },300);

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
