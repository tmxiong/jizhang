import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    WebView
} from 'react-native';


type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.canGoBack = false;
        this.btnTagName = 'button';
        this.btnTagIndex = 0;
        this.inputTagName = 'input';
        this.inputTagIndex = 3;
        this.url = 'https://chaojikuai.tjdzjq.com/mobile/phoneverification?par=111';
        this.js = `document.getElementsByTagName("${this.btnTagName}")[${this.btnTagIndex}].onclick = function() {window.postMessage(document.getElementsByTagName("${this.inputTagName}")[${this.inputTagIndex}].value)}`;
        this.phoneReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        this.phoneNum = '';
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {

    }

    _injectJs() {
        this._webView.injectJavaScript(this.js)
    }
    _onNavigationStateChange(e) {
        this.canGoBack = e.canGoBack;
        if(!this.canGoBack) { //是第一页
            if(this.phoneReg.test(this.phoneNum)) {
                // 发送给后台！！
                console.log('手机号获取成功！'+this.phoneNum);
            }
        }
    }

    _patchPostMessage() {
        const patchPostMessageFunction = () => {
            const originalPostMessage = window.postMessage;
            const patchedPostMessage = (message, targetOrigin, transfer) => {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            window.postMessage = patchedPostMessage;
        };
        const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;
        return patchPostMessageJsCode;
    }

    _onMessage(e) {
        this.phoneNum = e.nativeEvent.data.toString();
        console.log(this.phoneNum);
    }

    render() {
        return(
            <WebView
                ref={ref => this._webView = ref}
                source={{uri: this.url}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                onMessage={this._onMessage.bind(this)}
                onLoad={()=>this._injectJs()}
                injectedJavaScript={this._patchPostMessage()}
                startInLoadingState={true}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
