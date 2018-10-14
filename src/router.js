import React, {Component} from 'react';
import {
    Platform,
    View,
    I18nManager,
    TouchableOpacity,
    Easing,
    StatusBar,
    Animated,
    StyleSheet,
    Image,
} from 'react-native';
import { createStackNavigator,createBottomTabNavigator,NavigationActions } from 'react-navigation';
// import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import {tabIcon} from './imgs/imgs'
import Icon from 'react-native-vector-icons/Ionicons';
import utils from './utils/utils'
import Tab from './component/Tab'
import HomePage from './pages/Home/HomePage'
import TongjiPage from "./pages/Tongji/TongjiPage";
import TixingPage from './pages/Tixing/TixingPage'
import MinePage from './pages/Mine/MinePage'
import CalculatePage from './pages/Mine/CalculatePage'
import JiyibiPage from './pages/Jiyibi/JiyibiPage';
import FeedbackPage from './pages/Mine/FeedbackPage'
import AboutPage from './pages/Mine/AboutPage';
import AddTixingPage from './pages/Tixing/AddTixingPage'

import DetailPage from './pages/Home/DetailPage'
// import Page1 from './page/Page1'
// import PageList from './page/PageList'
// import Page3 from './page/Page3'
// import Page4 from './page/Page4'
// import Web from "./page/Web";
// import WebAndroid from './component/WebViewAndroid'
// import HomePage from './Tab/HomePage'
// import ProjectPage from "./Tab/ProjectPage";
// import MinePage from './Tab/MinePage'
// import InputPage from './page/InputPage'
// import WaterFall from "./page/WaterFall";


//实现定义某个页面的动画效果
const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.linear(),
            timing: Animated.timing,
        },
        // screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    };
};

const StackOptions = ({navigation}) => {
    const gesturesEnabled = false;
    const header = null
    return {gesturesEnabled,header}
};


const TabContainer = createBottomTabNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions:{
                tabBarLabel: '首页',
                tabBarIcon: ({tintColor})=> (<Icon name="ios-home" size={25} style={{color:tintColor}}/>)
                //tabBarIcon: ({tintColor})=> (<Image source={tabIcon.homeIcon} style={[styles.icon,{tintColor:tintColor}]}/>)

            }
        },
        TongjiPage: {
            screen: TongjiPage,
            navigationOptions:({tintColor})=> ({
                tabBarLabel: '统计',
                tabBarIcon: ({tintColor})=> (<Icon name="ios-podium" size={25} style={{color:tintColor}}/>)

            })
        },
        JiyibiPage: {
            screen: JiyibiPage,
            navigationOptions:({tintColor})=> ({
                tabBarLabel: '记一笔',
                tabBarIcon: ({tintColor})=> (<Icon name="ios-add" size={45} style={{color:'#eee',height:45}}/>)

            })
        },
        TixingPage: {
            screen: TixingPage,
            navigationOptions:({tintColor})=> ({
                tabBarLabel: '提醒',
                tabBarIcon: ({tintColor})=> (<Icon name="ios-notifications" size={25} style={{color:tintColor}}/>)

            })
        },
        MinePage: {
            screen: MinePage,
            navigationOptions:({tintColor})=> ({
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor})=> (<Icon name="ios-person" size={25} style={{color:tintColor}}/>)

            })
        },
    },
    {
        lazy: true,
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        //configureTransition:TransitionConfiguration,
        tabBarComponent:props => <Tab {...props}/>,
        tabBarOptions: {
            activeTintColor: utils.baseColor,
            inactiveTintColor: '#888888',

        },
    });

const Routes = {
    TabContainer:{screen: TabContainer},
    DetailPage:{screen:DetailPage},
    CalculatePage:{screen:CalculatePage},
    FeedbackPage:{screen:FeedbackPage},
    AboutPage:{screen:AboutPage},
    AddTixingPage:{screen:AddTixingPage},
    // PageList:{screen:PageList},
    // Page3:{screen:Page3},
    // Page4:{screen:Page4},
    // Web:{screen:Web},
    // WebAndroid:{screen:WebAndroid},
    // InputPage:{screen:InputPage},
    // WaterFall:{screen:WaterFall},
};


const AppNavigator = (initialRoute = "Index")=>{//通过参数动态配置初始化路由
    return createStackNavigator(
        {
            Index: {
                screen: TabContainer,
            },
            ...Routes,
        },
        {
            initialRouteName: initialRoute,
            headerMode: 'screen',
            gesturesEnabled:'true',
            mode: 'card',
            //transitionConfig: TransitionConfiguration,
            // navigationOptions: ({navigation}) => {
            //     const gesturesEnabled = true;
            //     const header = null;
            //     return {gesturesEnabled,header}
            // },
            navigationOptions: {
                header: null,
            }

        }
    );
}



const defaultStateAction = AppNavigator().router.getStateForAction;

AppNavigator().router.getStateForAction = (action, state) => {
    if (state && action.key && action.type === 'Navigation/BACK') {
        const desiredRoute = state.routes.find((route) => route.routeName === action.key)
        if (desiredRoute) {
            const index = state.routes.indexOf(desiredRoute);
            const finalState = {
                ...state,
                routes: state.routes.slice(0, index + 1),
                index: index,
            };
            return finalState
        } else {
            if (state.routes.length > action.key) {
                const stacksLength = state.routes.length - action.key
                const stacks = state.routes.slice(0, stacksLength)
                const finalState = {
                    ...state,
                    routes: stacks,
                    index: stacksLength - 1,
                };
                return finalState
            }
        }
    }
    console.log(action, state);
    return defaultStateAction(action, state)
}

export default class Root extends Component{

    constructor(){
        super();
        // this.readFile();
    }

    componentDidMount() {

    }


    render(){
        let Navigator= AppNavigator('Index');
        return <View style={{flex:1}}>
            <Navigator/>
            <JiyibiPage/>
        </View>

    }

}

const styles = StyleSheet.create({
    icon:{
        width:utils.picWidth(50),
        height:utils.picWidth(50),
        resizeMode:'contain'
    }
})

// https://mwy.ahjuejinren.com/PageNew/index2.html
// document.getElementsByTagName("input")[0].value