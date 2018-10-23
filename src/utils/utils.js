const picHeight = 1334;
const picWidth = 750;

const {width} = require('Dimensions').get('window');
const {height} = require('Dimensions').get('window');

import{
    PixelRatio,
    StatusBar,
    Platform
} from 'react-native'

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


module.exports = {

    /**
     * 获取切图的宽高
     * */
    picHeight(pixel) {
        return pixel / picHeight * height;
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

    baseColor: '#d4382a',
    // baseColor: '#0094ff',

    goToPage(_this,route,params={}) {
        _this.props.navigation.navigate(route, params)
    },
    goBack(_this){
        _this.props.navigation.goBack();
    },
    px2dp(px) {
        return PixelRatio.roundToNearestPixel(px);
    },

    statusBarHeight() {
        return StatusBar.currentHeight;
    },

    // 是不是iPhoneX
    isIphoneX() {
        // iPhoneX
        const X_WIDTH = 375;
        const X_HEIGHT = 812;

        const XR_WIDTH = 414;
        const XR_HEIGHT = 896;

        const XS_WIDTH = 375;
        const XS_HEIGHT = 812;

        const XS_MAX_WIDTH = 414;
        const XS_MAX_HEIGHT = 896;

        return (
            Platform.OS === 'ios' &&
            ((height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT)) ||
            (height === XR_HEIGHT && width === XR_WIDTH) ||
            (height === XS_HEIGHT && width === XS_WIDTH) ||
            (height === XS_MAX_HEIGHT && width === XS_MAX_WIDTH)
        );
    },
};