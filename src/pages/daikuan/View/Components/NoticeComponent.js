/*****
 * 首页轮播图
 * ****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

const styles=require('../../Resource/defaultStyle/NoticeStyle');
import commonFn from '../../base/commonFun/commonFun';



export default class NoticeComponent extends PureComponent {
    componentDidMount() {
        this.startScroll();
    }

    componentWillUnmount() {
        clearInterval(this.scrollTimerNotice);
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.nextPage = 0;
        this.isAutoScroll = true;
    };

    static defaultProps = {
        NoticeList:[],
        onPrFunc:function(){},
    };

    renderNotice() {

        let NoticeList = this.props.NoticeList;
        let NoticeNavigator = this.props.NoticeNavigator;


        if (NoticeList.length>0) {

            let arr = [];
            for (let i = 0; i < NoticeList.length; i++) {
                arr.push(<View style={styles.bannerTextBox}><Text style={styles.NoticeText}>{NoticeList[i].desc}</Text></View>);
            }
            return arr;
        }else{

            let arr = [];
            arr.push(<View style={styles.bannerTextBox}><Text style={styles.NoticeText}>热烈庆祝借贷花App上线</Text></View>);
            return arr;
        }

        return arr;


    }

    onScroll(event) {
        let offsetY = event.nativeEvent.contentOffset.y;
        //this.nextPage = Math.round(offsetY / 22);
        //this.nextPagePixel = offsetY / commonFn.deviceWidth();


    }

    onTouchStart() {
        this.isAutoScroll = false;
        if (this.scrollTimerNotice) {
            clearInterval(this.scrollTimerNotice);
        }
    }

    startScroll() {
        if (this.scrollTimerNotice) {
            clearInterval(this.scrollTimerNotice);
        }
        this.isAutoScroll = true;
        this.scrollTimerNotice = setInterval(()=> {
            this.scrollView.scrollTo({y: this.nextPage * commonFn.deviceWidth()*0.06}, true);
            this.nextPage++;
            if (this.nextPage >= this.props.NoticeList.length) {
                this.nextPage = 0;
            }
        }, 2000);
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onScroll={this.onScroll.bind(this)}
                    onTouchStart={()=>this.onTouchStart()}
                    onScrollEndDrag={()=>this.startScroll()}
                    onTouchEnd={()=>this.startScroll()}
                    ref={(ref)=>this.scrollView = ref}
                >
                    {this.renderNotice()}
                </ScrollView>

            </View>
        );
    }
}



module.exports = NoticeComponent;
