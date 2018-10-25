import React, { Component } from 'react';
import { AppRegistry, Button,Text, View ,Image,Platform} from 'react-native';

import {StackNavigator,createBottomTabNavigator} from "react-navigation";
import AppOneIndexScreen from './AppOneIndexScreen'
import AppOneMinePage from './AppOneMinePage'

import TabStyle from '../../Resource/defaultStyle/TabNavigatorStyle';
import Global from '../../WsSupport/connecting';
import Icon from 'react-native-vector-icons/Ionicons';




const Main = createBottomTabNavigator({
    home: {
        screen: AppOneIndexScreen,
        navigationOptions: {
            title: '贷款大全',
            tabBarLabel: '贷款大全',
            header: null,
            tabBarIcon: ({tintColor})=> (<Icon name="logo-usd" size={25} style={{color:tintColor}}/>),
            tabBarOnPress: (({navigation, defaultHandler})=>{

                defaultHandler()

            }),
        }
    },
    mine: {
        screen: AppOneMinePage,
        navigationOptions: {
            header: null,
            title: '我的',
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor})=> (<Icon name="ios-person" size={25} style={{color:tintColor}}/>),

            tabBarOnPress: (({navigation, defaultHandler})=>{

                defaultHandler()

            }),
        }
    },
}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    allowFontScaling: false,
    tabBarOptions: {
        activeTintColor: '#ba6a43', // 文字和图片选中颜色
        inactiveTintColor: '#939393', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#f5f5f5', // TabBar 背景色
            height:50,
            paddingTop:Platform.OS == 'ios' ? 0 : 6
        },
        labelStyle: Platform.OS == 'ios' ?
            {
                fontSize: 12,
                //marginTop: 0,
            } :
            {
                fontSize: 12,
                marginTop: 0,
            },
        tabStyle: {
            height: 50,

        },
    },
});

module.exports = Main;

