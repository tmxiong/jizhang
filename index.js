/** @format */

import {AppRegistry,Platform} from 'react-native';
// import App from './App';
import App from './src/router';
import {name as appName} from './app.json';
import Global from './src/pages/daikuan/WsSupport/connecting.js'

import {appApiConfigIOS,requestDomainIOS,requestParamIOS} from './src/config/appIOS.json';
import {appApiConfigAndroid,requestDomainAndroid,requestParamAndroid} from './src/config/appAndroid.json';

if(Platform.OS=='ios'){
    Global.appApiConfig = appApiConfigIOS;
    Global.requestDomain = requestDomainIOS;
    Global.requestParam ="pubkey="+appApiConfigIOS.pubkey+"&app_platform="+appApiConfigIOS.app_platform+"&app_version_id="+appApiConfigIOS.app_version_id+"&app_version="+appApiConfigIOS.app_version+"&app_id="+appApiConfigIOS.app_id+"&app_name_en="+appApiConfigIOS.app_name_en+"&install_source_channel_id="+appApiConfigIOS.install_source_channel_id+"&source_channel_name_en="+appApiConfigIOS.source_channel_name_en+"&platform="+appApiConfigIOS.platform;

}else{
    Global.appApiConfig = appApiConfigAndroid;
    Global.requestDomain = requestDomainAndroid;
    Global.requestParam ="pubkey="+appApiConfigAndroid.pubkey+"&app_platform="+appApiConfigAndroid.app_platform+"&app_version_id="+appApiConfigAndroid.app_version_id+"&app_version="+appApiConfigAndroid.app_version+"&app_id="+appApiConfigAndroid.app_id+"&app_name_en="+appApiConfigAndroid.app_name_en+"&install_source_channel_id="+appApiConfigAndroid.install_source_channel_id+"&source_channel_name_en="+appApiConfigAndroid.source_channel_name_en+"&platform="+appApiConfigAndroid.platform;
}

AppRegistry.registerComponent(appName, () => App);
