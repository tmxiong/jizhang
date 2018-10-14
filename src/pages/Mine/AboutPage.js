/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import cfn from "../../utils/utils";
import NavBar from '../../component/NavBar'


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
                <Text style={styles.welcome}>现金管家</Text>
                <Text style={styles.instructions}>1.0.1</Text>
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
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
