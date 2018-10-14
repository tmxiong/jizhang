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
    FlatList
} from 'react-native';
import NavBar from '../../component/NavBar'
import utils from "../../utils/utils";

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state={
            modalVisible: true,
            name: '添加理财提醒',
            data:[],
        }

    }

    static defaultProps={

    };


    _renderItem({item,index}) {

        return(
            <TouchableOpacity activeOpacity={0.8} style={styles.itemContainer}>
                <Icon name={item.icon} style={styles.itemIcon}/>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={[styles.itemText,{fontSize:18,color:'#111',position:'absolute',right:10}]}>{item.money}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={this.props.navigation.state.params.name}
                    leftFn={()=>utils.goBack(this)}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const daikuanConfig = [
    {name: '融360', icon:''},
    {name: '平安好贷', icon:''},
    {name: '新浪有借', icon:''},
    {name: '小赢卡贷', icon:''},
    {name: '宜人贷', icon:''},
    {name: '小鲨易贷', icon:''},
    {name: '万达惠普', icon:''},
    {name: '拍拍贷', icon:''},
    {name: '你我货', icon:''},
    {name: '马上贷', icon:''},
    {name: '立即贷', icon:''},
    {name: '捷信金融', icon:''},
    {name: '嗨付-海尔金融', icon:''},
    {name: '包银消费金融', icon:''},
    {name: '百度有钱花', icon:''},
    {name: '安逸花', icon:''},
    {name: '51人品贷', icon:''},
    {name: '中国工商银行', icon:''},
    {name: '中国银行', icon:''},
    {name: '中国邮政储蓄银行', icon:''},
    {name: '中国农业银行', icon:''},
    {name: '中国民生银行', icon:''},
    {name: '中国光大银行', icon:''},
    {name: '中国建设银行', icon:''},
    {name: '招商银行', icon:''},
    {name: '兴业银行', icon:''},
    {name: '浦发银行', icon:''},
    {name: '交通银行', icon:''},
    {name: '徽商银行', icon:''},
    {name: '华夏银行', icon:''},
    {name: '广发银行', icon:''},
    {name: '其它平台', icon:''},
]