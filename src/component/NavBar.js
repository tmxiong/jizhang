/*****
 * 导航栏
 * *****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';

import cfn from '../utils/utils'
import Icon from 'react-native-vector-icons/Ionicons';
export default class navBar extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            leftView : null,
            rightView: null,
        };
    };

    static defaultProps = {
        bgColor: cfn.baseColor,
        leftText: null,
        leftIcon: 'arrow-back',
        middleText: null,
        middleView: null,
        rightText: null,
        rightIcon: null,
        textColor: '#fff',
        leftFn: ()=>{},
        rightFn: ()=>{},
        middleFn: ()=>{},
        modalState: false,
        isFloat: false,
        navBarHeight: cfn.picHeight(200),// 导航栏 的高度

    };


    renderLeft() {
        const{props} = this;
        let leftView = null;
        if(props.leftIcon != null){
            leftView = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.content,{left:5,}]}
                    onPress={()=>props.leftFn()}>
                    <View style={[styles.content,{left:5}]}>
                        <Icon name={props.leftIcon} size={25} source={props.leftIcon}/>
                    </View>
                </TouchableOpacity>);
        }else if(props.leftText != null){
            leftView = (<TouchableOpacity
                activeOpacity={0.8}
                style={[styles.content,{left:5}]}
                onPress={()=>props.leftFn()}
            >
                <Text style={[styles.TextStyle,{color:props.textColor},{alignSelf:'flex-start'}]}>{props.leftText}</Text>
            </TouchableOpacity>);
        }

        return leftView
    }
    renderRight() {
        const{props} = this;
        let rightView = null;
        if(props.rightIcon != null){
            rightView = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.content,{right:5,}]}
                    onPress={()=>props.rightFn()}>
                    <View style={[styles.content,{right:5}]}>
                        <Icon name={props.rightIcon} size={25} source={props.rightIcon}/>
                    </View>
                </TouchableOpacity>
            )
        }else if(props.rightText != null){
            rightView = (<TouchableOpacity
                activeOpacity={0.8}
                style={[styles.content,{right:5,}]}
                onPress={()=>props.rightFn()}>
                <Text style={[styles.TextStyle,{color:props.textColor},{alignSelf:'flex-end'}]}>{props.rightText}</Text>
            </TouchableOpacity>)
        }
        return rightView;
    }
    renderMiddle() {
        let props = this.props;
        let middle = null;
        if(props.middleText != null){
            middle = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>props.middleFn()}>
                    <Text style={[styles.TextStyle,{color:props.textColor}]}>
                        {props.middleText}
                    </Text>
                </TouchableOpacity>
            )
        } else if (props.middleView != null){
            middle = (
                <View style={{alignSelf:'center',
                    //top:commonFun.picWidth(10)
                }}>
                    {props.middleView}
                </View>
            )
        }
        return middle;
    }
    render() {
        let props = this.props;
        let statusBarHeight = Platform.OS == 'ios' ? cfn.picHeight(46) : StatusBar.currentHeight;
        const{navBarHeight}=this.props;
        if(this.props.modalState && Platform.OS == 'android') statusBarHeight = 0;
        return (

            <View
                style={[
                    {backgroundColor: props.bgColor,width:cfn.deviceWidth(),
                        height:cfn.picHeight(navBarHeight) + statusBarHeight,
                        justifyContent:'flex-end'
                    },
                ]}>
                <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={{height:cfn.picHeight(navBarHeight),width:cfn.deviceWidth(),
                    flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>

                    {this.renderLeft()}
                    {this.renderMiddle()}
                    {this.renderRight()}

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: cfn.deviceWidth(),
        height: cfn.deviceHeight(),
        justifyContent: 'center'
    },
    content: {
        position: 'absolute',
        width:cfn.picWidth(150),
        height:cfn.picWidth(100),
        justifyContent:'center',
        alignItems:'center',
    },
    TextStyle: {
        fontSize: 14,
        backgroundColor:'transparent'
        //top:commonFun.picWidth(20)
    },
});