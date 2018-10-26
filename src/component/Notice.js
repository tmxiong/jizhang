//https://github.com/cheng-kang/react-native-lahk-marquee-label

import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native';
import noticeIcon from '../imgs/notice_icon.png'
import commonFn from '../utils/utils';

export default class Notice extends PureComponent {
    constructor(props) {
        super();
        this.state = {
        };

        this.noticeHeight = commonFn.picHeight(50);
        this.toValue = this.noticeHeight;
        this.animatedTransformY = new Animated.Value(0);
        this.noticeData = null;
        this.dataLength = 1;
    };

    static defaultProps = {
        noticeData: [
            {text:'1111111111111111',color:'#f90'},
        ],
        toToPage : ()=>{}
    };

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(props) {
        if(this.noticeData == props.noticeData) return;
        this.noticeData = props.noticeData;
        this.dataLength = this.noticeData.length;
        if(this.dataLength > 1){
            this.startAnim()
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.noticeData !== nextProps.noticeData;
    // }
    startAnim() {
        this.clearTimer();
        this.timer = setInterval(()=> {
            Animated.timing(this.animatedTransformY, {
                toValue: -this.toValue,
                isInteraction: false
            }).start(()=> {
                this.setValue();
                this.startAnim();
                //this.clearTimer();
            });
        }, 2000);
    }

    clearTimer() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }

    setValue() {
        const {noticeData} = this.props;
        if (this.toValue / this.noticeHeight < noticeData.length - 1) {
            this.animatedTransformY.setValue(-this.toValue);
            this.toValue = this.toValue + this.noticeHeight;
        } else {
            this.animatedTransformY.setValue(0);
            this.toValue = this.noticeHeight;
        }
    }

    renderText() {
        let {noticeData} = this.props;
        if(this.dataLength == noticeData.length) {
            noticeData[noticeData.length] = noticeData[0];//首位呼应，避免出现空白
        }
        let arr = [];
        for (let i = 0; i < noticeData.length; i++) {
            arr.push(
                <View key={i} style={styles.noticeTextContainer} >
                    <Text allowFontScaling={false} style={[styles.noticeText,{color:noticeData[i].color}]} numberOfLines={1}>
                        {noticeData[i].text}
                    </Text>
                </View>
            )
        }
        return arr;
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.noticeIcon} source={noticeIcon}/>
                {/*<TouchableOpacity*/}
                    {/*style={styles.moreStyle}*/}
                    {/*//onPress={()=>this.props.goToPage()}*/}
                {/*>*/}
                    {/*<Text style={{color:'#fff'}}>*/}
                        {/*查看>>*/}
                    {/*</Text>*/}
                {/*</TouchableOpacity>*/}

                <Animated.View
                    style={{
                        flexDirection: 'column',
                        alignSelf: 'flex-start',
                        transform: [{translateY: this.animatedTransformY}],
                        zIndex: 5
                    }}>
                    {this.renderText()}
                </Animated.View>
            </View>
        );
    }
}



module.exports = Notice;
const styles = StyleSheet.create({

    container: {
        height: commonFn.picHeight(50),
        width: commonFn.deviceWidth(),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#85503a',
        overflow:'hidden'
    },
    noticeIcon: {
        width: commonFn.picHeight(26),
        resizeMode:'contain',
        marginLeft: commonFn.picWidth(20),
        alignSelf:'center'
    },
    noticeTextContainer: {
        marginRight: 10,
        marginLeft: 10,
        width: commonFn.deviceWidth()-commonFn.picWidth(10),
        height: commonFn.picHeight(50),
        justifyContent:'center'
    },
    noticeText: {
        fontSize: 13,
        color:'#fff',
    },
    moreStyle: {
        backgroundColor:'transparent',
        height: commonFn.picHeight(50),
        position:'absolute',
        right:5,
        zIndex:99,
        alignItems:'center',
        justifyContent:'center'
    }

})
