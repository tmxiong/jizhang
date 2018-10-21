/*****
 * 首页轮播图
 * ****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

const styles=require('../../Resource/defaultStyle/BannerStyle');
import commonFn from '../../base/commonFun/commonFun';
import emptyBannerImage from '../../Resource/images/banner/emptyBannerImage.jpg';
//import emptyBannerImage from '../../Resource/images/Af/emptyProduct.png';

import Indicator from './Indicator';

export default class BannerComponent extends PureComponent {
    componentDidMount() {
        this.startScroll();
    }

    componentWillUnmount() {
        clearInterval(this.scrollTimer);
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.nextPage = 0;
        this.isAutoScroll = true;
    };

    static defaultProps = {
        bannerList:[],
        onPrFunc:function(){},
    };

    renderBanner() {

        let bannerList = this.props.bannerList;
        let onPrFunc = this.props.onPrFunc;
        let bannerNavigator = this.props.bannerNavigator;

        //console.warn(this.props);
        if (bannerList.length>0) {

            let arr = [];
            for (let i = 0; i < bannerList.length; i++) {
                arr.push(<TouchableOpacity activeOpacity={0.8} style={styles.bannerImageBoxOpac} onPress={()=>onPrFunc(bannerNavigator,bannerList[i])}>
                           <Image key={i} style={styles.imageStyle} source={{uri:bannerList[i].picture_url_qiniu}} resizeMode='stretch'/>
                         </TouchableOpacity>
                         );
            }
            return arr;
        }else{

            let arr = [];
            arr.push(<Image key={0} style={styles.imageStyle} source={emptyBannerImage}  resizeMode='stretch'/>);
            return arr;
        }

    }

    onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        this.nextPage = Math.round(offsetX / commonFn.deviceWidth());
        this.nextPagePixel = offsetX / commonFn.deviceWidth();

        //指示器滚动效果--自动滚动
        // if (this.isAutoScroll) {
        //     this.ref.indecator.setNativeProps(
        //         {style: {right: this.ref.rightX - this.nextPage * commonFn.picWidth(24)}}
        //     )
        // } else {
        //     //指示器滚动效果--手动滑动
        //     this.ref.indecator.setNativeProps(
        //         {style: {right: this.ref.rightX - this.nextPagePixel * commonFn.picWidth(24)}}
        //     )
        // }
    }

    onTouchStart() {
        this.isAutoScroll = false;
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
    }

    startScroll() {
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
        this.isAutoScroll = true;
        this.scrollTimer = setInterval(()=> {
            this.scrollView.scrollTo({x: this.nextPage * commonFn.deviceWidth()}, true);
            this.nextPage++;
            if (this.nextPage >= this.props.bannerList.length) {
                this.nextPage = 0;
            }
        }, 2000);
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={styles.bannerScroll}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onScroll={this.onScroll.bind(this)}
                    onTouchStart={()=>this.onTouchStart()}
                    onScrollEndDrag={()=>this.startScroll()}
                    onTouchEnd={()=>this.startScroll()}
                    ref={(ref)=>this.scrollView = ref}
                >
                    {this.renderBanner()}
                </ScrollView>
                {/*<Indicator*/}
                    {/*pointCount={this.props.bannerList.length}*/}
                    {/*ref={(ref)=>this.ref = ref}*/}
                {/*/>*/}
            </View>
        );






    }
}



module.exports = BannerComponent;
