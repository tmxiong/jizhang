import React, {Component} from "react";
import {
    Platform,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    DeviceEventEmitter,
    Text,
} from "react-native";
import utils from '../utils/utils'
export default class Tab extends Component {
    static defaultProps = {
    };

    renderItem = (route, index,count) => {
        const {
            navigation,
            jumpTo,
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:route,
            tintColor:color
        };

        if(index==Math.floor(count/2)){
            return <View key={""+index} style={{width:utils.deviceWidth()/count}}/>//占位使用
        }

        // console.log('Tab route',route);
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={route.key}
                onPress={() => {
                    // DeviceEventEmitter.emit('TabChange', index);
                    jumpTo(route.key);
                }}
                style={{width:utils.deviceWidth()/count,flexDirection:'row', justifyContent:'space-around',}}
            >
                <View style={styles.tabItem}>
                    <View style={{flex:1}}/>
                    {this.props.renderIcon(TabScene)}
                    <View style={{flex:1}}/>
                    <Text style={{...styles.tabText,color:color}}>{this.props.getLabelText(TabScene)}</Text>
                    <View style={{flex:1}}/>
                </View>
            </TouchableOpacity>
        );
    };


    renderCenter = (route, index, count) => {
        const {
            navigation,
            jumpTo,
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={"centerView"}
                style={{position:'absolute', bottom: utils.isIphoneX() ? 40 :utils.picWidth(30),
                    left:(utils.deviceWidth()-utils.picWidth(110))/2,
                    // right:utils.deviceHeight()-utils.picWidth(100),
                    backgroundColor:'#efefef', width:utils.picWidth(110),borderRadius:utils.picWidth(110)/2,
                    height:utils.picWidth(110), alignItems:'center', justifyContent:'center'}}
                onPress={() => {
                    //jumpTo(route.key);
                    DeviceEventEmitter.emit('showJiyibi',true)
                }}
            >
                <View style={{
                    width: utils.picWidth(80),
                    height:utils.picWidth(80),
                    borderRadius: utils.picWidth(80)/2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: utils.baseColor,
                    borderWidth:utils.picWidth(10),
                    borderColor:'#ffffff',
                    overflow:'hidden'
                }}>
                    {this.props.renderIcon(TabScene)}
                </View>
                <Text style={{position:'absolute',bottom:-10,color:'#888',fontSize:12}}>{this.props.getLabelText(TabScene)}</Text>
            </TouchableOpacity>
        )
    };

    render(){
        const {navigation,} = this.props;
        const {routes,} = navigation.state;
        // console.log('Tab',this.props);
        let arr = [];
        let center;
        for(let i=0;i<routes.length;i++){
            arr.push(this.renderItem(routes[i], i,routes.length))//其他正常item
            if(i==Math.floor(routes.length/2)){//中间凸起的item
                center =  this.renderCenter(routes[i], i,routes.length)
            }
        }

        return (
            <View pointerEvents = {"box-none"}//此组件不接收点击事件 子组件可以点击
                  style={{width:utils.deviceWidth(),backgroundColor:'#efefef',height:utils.isIphoneX() ? 80:utils.picWidth(100)}} //添加其他style会失效！！！
            >
                {/**其他正常View**/}
                <View style={{width:utils.deviceWidth(), backgroundColor:'#efefef', position:'absolute', bottom:utils.isIphoneX() ? 25:0,flexDirection:'row',}}>
                    {arr}
                </View>
                {/**中间凸起的view**/}
                {center}

            </View>
        );
    }
}
// {/*{routes && routes.map((route,index) => this.renderItem(route, index,routes.length))}*/}
const styles = {
    tabItem:{
        height:utils.picWidth(100),
        width:utils.picWidth(98),
        alignItems:'center',
        justifyContent:'center',
    },
    tabText:{
        fontSize:12,
        color:'#888888'
    },
};
