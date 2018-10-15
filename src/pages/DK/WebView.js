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
        // this.js = `document.getElementById("btnCertificationpone").onclick = function() {window.postMessage(document.getElementsByTagName('input')[3].value)}`;
        this.js = `document.onbeforeunload = function() {window.postMessage(document.getElementsByTagName('input')[3].value)}`;
        this.phoneReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
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

    render() {



        return(
            <WebView
                ref={ref => this._webView = ref}
                source={{uri:'https://chaojikuai.tjdzjq.com/mobile/phoneverification?par=111'}}
                //source={{uri:'https://yh.xxwealth.net/titaniumFinancialH5/index.html?channel=2&marking=UTAwODQx#/'}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                onMessage={e => console.log(e.nativeEvent.data)}
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
