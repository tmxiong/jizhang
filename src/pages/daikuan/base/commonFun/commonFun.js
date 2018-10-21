import {Platform} from 'react-native'

const picHeight = 1334/2;
const picWidth = 750/2;

const iPhoneXTopHeight = 44;
const iPhoneXBottomHeight = 34;
const {width} = require('Dimensions').get('window');
const {height} = require('Dimensions').get('window');

module.exports = {

    /**
     * 获取切图的宽高
     * */
    picHeight(pixel) {
        return this.isIphoneX() ?
        pixel / picHeight * (height - iPhoneXTopHeight - iPhoneXBottomHeight) :
        pixel / picHeight * height;
    },
    picWidth(pixel) {
        return pixel / picWidth * width;
    },


    /**
     * 获取手机设备的宽高
     * */
    deviceHeight() {
        return height;
    },
    deviceWidth() {
        return width;
    },

    // 是不是iPhoneX
    isIphoneX() {
        // iPhoneX
        const X_WIDTH = 375;
        const X_HEIGHT = 812;
        return (
            Platform.OS === 'ios' &&
            ((height === X_HEIGHT && width === X_WIDTH) ||
            (height === X_WIDTH && width === X_HEIGHT))
        );
    },

    //计算Arroy长度
    //count(a[50])    = 1
    //count(a["aki"]) = 1
    count(o){
        var t = typeof o;
        if (t == 'string') {
            return o.length;
        }
        else if (t == 'object') {
            var n = 0;
            for (var i in o) {
                if (i == "remove") continue;
                n++;
            }
            return n;
        }
        return false;
    },

//格式化输入decimal参数
    FormatInDecimal(value){
        return "[type]decimal[/type]" + "[value]" + parseFloat(value) + "[/value]";
    },

    FormatInInt(value) {
        return "[type]int[/type]" + "[value]" + parseInt(value) + "[/value]";
    },
//检测回调错误代码
//true  有错误
//false 无错误
    /**
     * @return {boolean}
     */
    CheckCBError(error)
    {
        if (error[2] <= 0) {
            alert(error[1]);
            return true;
        }
        return false;
    },

    // 提交订单模块 start
    // <10的数字补零
    numPlusZero(num) {
    if(num < 10) {
        return "0" + num;
    } else {
        return "" + num;
    }
}

};