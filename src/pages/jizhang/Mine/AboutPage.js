/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import cfn from "../../../utils/utils";
import NavBar from '../../../component/NavBar'
import DeviceInfo from 'react-native-device-info'
import appIcon from '../../../imgs/app_icon.png'

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={'关于'}
                    leftFn={()=>cfn.goBack(this)}
                    leftIcon={'ios-arrow-back'}
                />
                <View style={{width:'100%',height:'100%',alignItems:'center'}}>
                    <Image source={appIcon} style={{width:60,height:60,borderRadius:6,marginTop:100}}/>
                    <Text style={styles.welcome}>钱包管家</Text>
                    <Text style={styles.instructions}>v {DeviceInfo.getVersion()}</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
