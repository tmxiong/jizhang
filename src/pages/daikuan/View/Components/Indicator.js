/****
 * 指示器
 * ****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

const styles=require('../../Resource/defaultStyle/IndicatorStyle');
import cfn from '../../base/commonFun/commonFun'

export default class ReportPage extends PureComponent {
    componentWillMount() {
        this.initActivePointPosition();
    }

    constructor(props) {
        super();
        this.state = {

        };

        this.pointWidth = cfn.picWidth(16);
        this.pointMargin = cfn.picWidth(8);
    };

    static defaultProps = {
        pointCount: 6,
        activePointColor: '#fff',
        bottomPointsColor: 'rgba(255,255,255,0.6)',
    };

    initActivePointPosition() {
        this.rightX = this.props.pointCount * this.pointWidth + (this.props.pointCount - 1) * this.pointMargin
    }
    renderActivePoint() {
        return (<View
            style={[
                styles.pointStyle,
                styles.activePoint,
                {right: this.rightX,backgroundColor: this.props.activePointColor}
                ]}
            ref={(ref)=> {
                this.indecator = ref
            }}
        />);
    }

    renderBottomPoints() {
        let points = [];
        for (let i = 0; i < this.props.pointCount; i++) {
            points.push(<View key={i} style={[styles.pointStyle, {backgroundColor: this.props.bottomPointsColor}]}/>)
        }
        return (points);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderBottomPoints()}
                {this.renderActivePoint()}
            </View>
        );
    }
}


module.exports = ReportPage;
