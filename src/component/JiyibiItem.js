/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {PureComponent} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import utils from "../utils/utils";
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};
export default class JiyibiItem extends PureComponent<Props> {

    static defaultPros = {
        name: "",
        icon: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelect: false,
        }
    }

    componentDidMount() {
        this.ls = DeviceEventEmitter.addListener('setItem', () => {
            this.setState({isSelect:false});
        })
    }

    _onItemPress(name, icon) {
        DeviceEventEmitter.emit('setItem', {name: name, icon: icon});
        this.setState({isSelect:true});
    }

    render() {
        const {name, icon} = this.props;
        const {isSelect} = this.state;
        return (
            <TouchableOpacity
                onPress={() => this._onItemPress(name, icon)}
                activeOpacity={0.8}
                style={styles.item}>
                <Icon name={icon} style={[styles.icon,
                    {
                        color: isSelect ? selectedIconColor : unselectIconColor,
                        backgroundColor: isSelect ? selectedBgColor : unselectBgColor
                    }]}/>
                <Text style={styles.itemText}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

const unselectBgColor = '#efeff4', unselectIconColor = '#333';
const selectedBgColor = utils.baseColor, selectedIconColor = '#fff';

const styles = StyleSheet.create({
    item: {
        width: utils.deviceWidth() / 4,
        height: utils.deviceWidth() / 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: unselectBgColor,
        textAlign: 'center',
        overflow: 'hidden',
        lineHeight: 44,
        color: unselectIconColor,
        fontSize: 25,
    },
    itemText: {
        color: '#333',
        marginTop: 10,
        fontSize: 12
    }
});