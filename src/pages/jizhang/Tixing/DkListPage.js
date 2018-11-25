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
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import NavBar from '../../../component/NavBar'
import utils from "../../../utils/utils";
import {dkIcon,bg} from '../../../imgs/imgs';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state={
            modalVisible: true,
            name: '添加理财提醒',
            data:dkConfig,
        }

    }

    static defaultProps={

    };


    _renderItem({item,index}) {
        const {state} = this.props.navigation;
        return(
            <TouchableOpacity
                onPress={()=>utils.goToPage(this,'AddDkPage',{name: item.name, update: state.params.update,key:state.key})}
                activeOpacity={0.8}
                style={styles.itemContainer}>
                <Image source={item.icon} style={styles.itemIcon}/>
                <Text style={styles.itemText}>{item.name}</Text>
                <Icon style={styles.rightIcon} name={'ios-arrow-forward'}/>
            </TouchableOpacity>
        );
    }

    render() {
        console.log(this.props.navigation)
        return (
            <ImageBackground source={bg} style={styles.container}>
                <NavBar
                    middleText={this.props.navigation.state.params.name}
                    leftFn={()=>utils.goBack(this)}
                />

                <FlatList
                    style={{width:'100%',flex:1}}
                    keyExtractor={(item,index)=>item}
                    data={this.state.data}
                    renderItem={this._renderItem.bind(this)}
                    ListEmptyComponent={()=><Text style={{color:'#aaa',alignSelf:'center',marginTop:200}}>暂无添加记录</Text>}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    itemContainer: {
        width: '100%',
        height: utils.picHeight(120),
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        width:30,
        height:30,
        resizeMode:'contain',
        marginLeft:10
    },
    itemText: {
        fontSize: 16,
        color: '#666',
        marginLeft:10,
    },
    rightIcon: {
        color:'#bbb',
        fontSize: 30,
        position:'absolute',
        right:15
    }
});

const dkConfig = [
    {name: '融360', icon:dkIcon.rong360},
    {name: '平安好贷', icon: dkIcon.pinganhaodai},
    {name: '新浪有借', icon:dkIcon.xinlangyoujie},
    {name: '小赢卡贷', icon:dkIcon.xiaoyinkadai},
    {name: '宜人贷', icon:dkIcon.yirendai},
    {name: '小鲨易贷', icon:dkIcon.xiaoshayidai},
    {name: '万达惠普', icon:dkIcon.wandahuipu},
    {name: '拍拍贷', icon:dkIcon.paipaidai},
    {name: '你我贷', icon:dkIcon.niwodai},
    {name: '马上贷', icon:dkIcon.mashangdai},
    {name: '立即贷', icon:dkIcon.lijidai},
    {name: '捷信金融', icon:dkIcon.jiexinjinrong},
    {name: '嗨付-海尔金融', icon:dkIcon.haifu_haierjinrong},
    {name: '包银消费金融', icon:dkIcon.baoyinxiaofeijinrong},
    {name: '百度有钱花', icon:dkIcon.baiduyouqianhua},
    {name: '安逸花', icon:dkIcon.anyihua},
    {name: '51人品贷', icon:dkIcon.renpingdai},
    {name: '其它平台', icon:dkIcon.other},
    // {name: '中国工商银行', icon:dkIcon.中国工商银行},
    // {name: '中国银行', icon:dkIcon.},
    // {name: '中国邮政储蓄银行', icon:dkIcon.},
    // {name: '中国农业银行', icon:dkIcon.},
    // {name: '中国民生银行', icon:dkIcon.},
    // {name: '中国光大银行', icon:dkIcon.},
    // {name: '中国建设银行', icon:dkIcon.},
    // {name: '招商银行', icon:dkIcon.},
    // {name: '兴业银行', icon:dkIcon.},
    // {name: '浦发银行', icon:dkIcon.},
    // {name: '交通银行', icon:dkIcon.},
    // {name: '徽商银行', icon:dkIcon.},
    // {name: '华夏银行', icon:dkIcon.},
    // {name: '广发银行', icon:dkIcon.},
    // {name: '其它平台', icon:dkIcon.},
]