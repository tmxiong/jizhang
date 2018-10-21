/**
 * Created by Administrator on 2017/5/18.
 */
import {StyleSheet,} from 'react-native';
import commonFun from '../../base/commonFun/commonFun'

module.exports = StyleSheet.create({
    container: {
        width: commonFun.deviceWidth(),
        height: commonFun.picHeight(20),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'transparent',
        bottom: commonFun.picHeight(5),
        right: commonFun.picWidth(10),
        paddingRight: commonFun.picWidth(16)
    },
    pointStyle: {
        width: commonFun.picWidth(6),
        height: commonFun.picWidth(6),
        borderRadius: commonFun.picWidth(3),
        marginLeft: commonFun.picWidth(3),
    },
    activePoint: {
        position: 'absolute',
    }
});