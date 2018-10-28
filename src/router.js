import React, {Component} from 'react';
import {
    Platform,
    View,
    TouchableOpacity,
    Easing,
    StatusBar,
    Animated,
    StyleSheet,
    Image,
} from 'react-native';
// import NetInfo from './utils/NetInfo';
// NetInfo.registNetworkStateListener((netState)=>{console.log('netState',netState)},(netChange)=>{console.log('netChange',netChange)})
import { createStackNavigator,createBottomTabNavigator,NavigationActions } from 'react-navigation';
import handleError from './pages/daikuan/base/tools/handleError'
handleError();
import {Loading,EasyLoading} from './component/Loading'
import {tabIcon} from './imgs/imgs'
import Icon from 'react-native-vector-icons/Ionicons';
import utils from './utils/utils'
import Tab from './component/Tab'
import LaunchScreen from './pages/LaunchScreen/LaunchScreen'
import HomePage from './pages/jizhang/Home/HomePage'
import TongjiPage from "./pages/jizhang/Tongji/TongjiPage";
import TixingPage from './pages/jizhang/Tixing/TixingPage'
import MinePage from './pages/jizhang/Mine/MinePage'
import CalculatePage from './pages/jizhang/Mine/CalculatePage'
import JiyibiPage from './pages/jizhang/Jiyibi/JiyibiPage';
import FeedbackPage from './pages/jizhang/Mine/FeedbackPage'
import AboutPage from './pages/jizhang/Mine/AboutPage';
import DkListPage from './pages/jizhang/Tixing/DkListPage'
import AddDkPage from './pages/jizhang/Tixing/AddDkPage'
import AddLcPage from './pages/jizhang/Tixing/AddLcPage'

import DetailPage from './pages/jizhang/Home/DetailPage'

import WebView from './pages/jizhang/DK/WebView';





import BeLoginScreen from './pages/daikuan/View/BeLoan/BeLoginScreen';
import AfSignInScreen from './pages/daikuan/View/AfLoan/AfSignInScreen';
import AfNavScreen from './pages/daikuan/View/AfLoan/AfNavScreen.js';
import AfIndexScreen from './pages/daikuan/View/AfLoan/AfIndexScreen';
import AfLoanListScreen from './pages/daikuan/View/AfLoan/AfLoanListScreen';
import AfLoanListModeScreen from './pages/daikuan/View/AfLoan/AfLoanListModeScreen';
import AfMyScreen from './pages/daikuan/View/AfLoan/AfMyScreen';
import AfMyCollectScreen from './pages/daikuan/View/AfLoan/AfMyCollectScreen';
import AfMyApplyScreen from './pages/daikuan/View/AfLoan/AfMyApplyScreen';
import AfMySettingScreen from './pages/daikuan/View/AfLoan/AfMySettingScreen';
import AfProductDetailScreen from './pages/daikuan/View/AfLoan/AfProductDetailScreen';
import AfCreditCardListScreen from './pages/daikuan/View/AfLoan/AfCreditCardListScreen';
import AfCreditThirdDetailScreen from './pages/daikuan/View/AfLoan/AfCreditThirdDetailScreen';
import AfThirdDetailScreen from './pages/daikuan/View/AfLoan/AfThirdDetailScreen';
import AfWebScreen from './pages/daikuan/View/AfLoan/AfWebScreen';
import AfNormalWebScreen from './pages/daikuan/View/AfLoan/AfNormalWebScreen';
import AfAgreement from './pages/daikuan/View/AfLoan/AfAgreement';



import AppOneIndexScreen from './pages/daikuan/View/AppOne/AppOneIndexMain';

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

// const StackOptions = ({navigation}) => {
//     const gesturesEnabled = false;
//     const header = null
//     return {gesturesEnabled,header}
// };


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
    LaunchScreen:{screen: LaunchScreen,navigationOptions:{header:null}},
    TabContainer:{screen: TabContainer,navigationOptions:{header:null}},
    DetailPage:{screen:DetailPage,navigationOptions:{header:null}},
    CalculatePage:{screen:CalculatePage,navigationOptions:{header:null}},
    FeedbackPage:{screen:FeedbackPage,navigationOptions:{header:null}},
    AboutPage:{screen:AboutPage,navigationOptions:{header:null}},
    DkListPage:{screen:DkListPage,navigationOptions:{header:null}},
    AddDkPage:{screen:AddDkPage,navigationOptions:{header:null}},
    AddLcPage:{screen:AddLcPage,navigationOptions:{header:null}},



    BeLogin:{
        screen: BeLoginScreen
    },
    AfSignIn:{
        screen: AfSignInScreen
    },
    AfNav:{
        screen: AfNavScreen,
        navigationOptions: {
            header:null
        }
    },
    AfIndex:{
        screen: AfIndexScreen
    },
    AfLoanList:{
        screen: AfLoanListScreen
    },
    AfLoanListMode:{
        screen: AfLoanListModeScreen
    },
    AfProDe:{
        screen: AfProductDetailScreen
    },
    AfCreList:{
        screen: AfCreditCardListScreen
    },
    AfMy:{
        screen: AfMyScreen
    },
    AfMyCol:{
        screen: AfMyCollectScreen
    },
    AfMyApply:{
        screen: AfMyApplyScreen
    },
    AfMySetting:{
        screen: AfMySettingScreen
    },
    AfCreditTrDe:{
        screen: AfCreditThirdDetailScreen
    },
    AfTrDe:{
        screen: AfThirdDetailScreen
    },
    AfWeb:{
        screen: AfWebScreen
    },
    AfNorWeb:{
        screen: AfNormalWebScreen
    },
    agreement:{
        screen: AfAgreement
    },

    AppOneIndex: {
        screen: AppOneIndexScreen,
        navigationOptions:{header:null}
    }

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
            LaunchScreen: LaunchScreen,
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
                //header: null,
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
    // console.log(action, state);
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
        let Navigator= AppNavigator('LaunchScreen');
        return <View style={{flex:1}}>
            <Navigator/>
            <JiyibiPage/>
            <Loading background={'transparent'} topOffset={utils.picHeight(150)}/>
        </View>

    }

    // render() {
    //     return(
    //         <WebView/>
    //     )
    // }

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