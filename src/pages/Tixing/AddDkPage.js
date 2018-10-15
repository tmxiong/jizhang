import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity

} from 'react-native';

import NavBar from '../../component/NavBar'
import utils from '../../utils/utils'
import DatePicker from 'react-native-datepicker'
type Props = {};
export default class Index extends Component<Props> {

    constructor(props) {
        super(props);
        this.currentDate = new Date().Format('yyyy-MM-dd');
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

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={()=>utils.goBack(this)}
                    middleText={'添加'+this.name}
                />
                <ScrollView>
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
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text>贷款账号</Text>
                        <TextInput
                            style={styles.rightText}
                            placeholder={'输入贷款金额'}
                            maxLength={20}
                            keyboardType={'numeric'}
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
                            keyboardType={'numeric'}
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
                    <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                        <Text style={{color:'#fff'}}>保存</Text>
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
