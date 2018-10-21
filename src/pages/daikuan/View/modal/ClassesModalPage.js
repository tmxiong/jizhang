
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
import Global from '../../WsSupport/connecting';
const styles=require('../../Resource/defaultStyle/ClassesModalPageStyle');

export default class ClassesModalPage extends PureComponent {
    constructor(props) {
        super(props);
      
        this.state={
            visible:false,
            btnView: null,
        };

    }

    componentWillMount(){

        this.classModelListener=DeviceEventEmitter.addListener("showClassModel",(modalVisible)=>{
            if(modalVisible) {

                this._showModal();
            } else {
                this._closeModal();
            }

        })
    }

    componentWillUnmount() {
        this.classModelListener.remove();
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
    goToNewClassPage(str){
        this.props.navigation.navigate('MoreList',{info:str});
        this._closeModal();

    }
    setNewClassData(){
        console.log(Global);
        var thatClass = this;
        if(typeof(Global.goods_cate_list)=='undefined'){
            return;
        }

        if(typeof(Global.goods_cate_list.length)=='undefined'||Global.goods_cate_list.length<=0){
            return ;
        }
        var classBox = new Array();
        
        for(var i=0;i<Global.goods_cate_list.length;i++){
            var targetClassId = Global.goods_cate_list[i].id;
            classBox.push(
                <TouchableOpacity key={'classes_key_'+i} style={styles.classOpacity} onPress={()=>thatClass.goToNewClassPage(targetClassId)}>
                   
                    <Text style={styles.classInnerText}>{Global.goods_cate_list[i].name}</Text>
                    
                </TouchableOpacity>
            );
        }
        return(
            <View style={styles.textBox}>
            {classBox}
            </View>
        );
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
                    {this.setNewClassData()}           
                    <View style={styles.btnBox}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btnNew}
                            onPress={()=>this._closeModal()}>
                            <View style={styles.btnNewTextBox}>
                                <Text
                                    style={styles.btnNewText}
                                    allowFontScaling={false}>收起分类</Text>                        
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}
