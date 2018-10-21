
import React,{PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Image,
    DeviceEventEmitter,
    StatusBar,
    TouchableOpacity,
    Text,

}from 'react-native';

const styles=require('../../Resource/defaultStyle/netInfoModalPageStyle');

export default class netInfoModalPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            btnView: null,
        };

    }

    componentWillMount(){

        this.netInfoModelListener=DeviceEventEmitter.addListener("showNetInfoModel",(modalVisible)=>{
            if(modalVisible) {

                this._showModal();
            } else {
                this._closeModal();
            }

        })
    }

    componentWillUnmount() {
        this.netInfoModelListener.remove();
        this.clearTimer();
    }


    _closeModal() {
        this.setState({visible:false});
        this.clearTimer();
    }
    _showModal() {
        this.setState({visible:true,btnView:null});

        this.timer = setTimeout(()=>{
            this.setState({
                btnView: this.btnView
            })
        },5*1000)
    }

    clearTimer() {
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        return (
            <Modal
                style={styles.container}
                animationType={"fade"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {}}
            >
                <StatusBar hidden={false}  translucent= {true} barStyle={'light-content'} backgroundColor={'rgba(0,0,0,0.8)'}/>
                <View style={styles.modalBg}>
                    <View style={styles.textBox}>

                        <Text
                            allowFontScaling={false}
                            style={styles.loadText}>网络已经断开，请检查网络状态！</Text>


                    </View>

                    <View style={styles.btnBox}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnNew}
                        onPress={()=>this._closeModal()}>
                        <Text
                            style={styles.btnNewText}
                            allowFontScaling={false}>知道了</Text>
                    </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}
