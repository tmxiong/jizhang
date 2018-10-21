import {
  AsyncStorage
} from 'react-native';
let Global=require('../../WsSupport/connecting');
function localstore(){

}
localstore.prototype={
    SessionID:null,
    Owner:null,
    GameVersion:null,
    GameList:null,
    setPrefix:function(_prefixKey){
      Global.prefixKey=_prefixKey;
    },
    getInternalKey:function(key){
      if (key.noPrefix) {
        return key.key;
      }

      if (Global.prefixKey) {
        return Global.prefixKey + "_" + key;
      } else {
        return key;
      }
    },
    put:function(key,value){
      key=this.getInternalKey(key);

      AsyncStorage.setItem(key,value,()=>{});
    },
    putOwner:function(key,value){
        key=this.getInternalKey(key);
        AsyncStorage.setItem(key,value,()=>{});
    },
    putVersion:function(key,value){
        key=this.getInternalKey(key);
        Global.GameVersion=value;
        if(this.getVersion("localVersion")){
          this.remove(key);
        }
        AsyncStorage.setItem(key,value,()=>{});
    },
    putGameList:function(key,value){
        key=this.getInternalKey(key);
        Global.GameList=value;
        if(this.getGames("localgame")){
          this.remove(key);
        }
        AsyncStorage.setItem(key,value,()=>{});
    },
    getSession:function(key){
      key=this.getInternalKey(key);
      // this.getSessionValue(key,(value)=>{
      //     this.SessionID=value;
      // });
      // if(this.SessionID==null){
          this.SessionID=Global.SessionID;
      //}
      return this.SessionID;
    },
    getOwner:function(key){
        key=this.getInternalKey(key);
        // this.getOwnerValue(key,(value)=>{
        //     this.Owner=value;
        // });
        // if(this.Owner==null){
            this.Owner=Global.Owner;
        //}

        return this.Owner;
    },
    getSessionValue:function (key,callback) {
        AsyncStorage.getItem(key,(err,value)=>{
            callback(value);
        });
    },
    getOwnerValue:function (key,callback) {
        AsyncStorage.getItem(key,(err,value)=>{
            callback(value);
        });
    },
    getVersion:function(key){
       key=this.getInternalKey(key);
       return this.getVersionValue(key).then((value)=>{
         return this.GameVersion=value;
       });
    },
    getVersionValue:function(key,callback){
      return AsyncStorage.getItem(key,(err,value)=>{

      });
    },
    getGames:function(key){
      key=this.getInternalKey(key);
      return this.getGamesValue(key).then((value)=>{
        return this.GameList=value;
      });
    },
    getGamesValue:function(key){
        return AsyncStorage.getItem(key,(err,value)=>{
      });
    },
    remove:function(key){
      key=this.getInternalKey(key);
      AsyncStorage.removeItem(key,(err)=>{
          //console.log(err);
      });
    },
    clear:function(){
      AsyncStorage.clear(()=>{});
    },
    getAllKeys:function () {
        AsyncStorage.getAllKeys((err,keys)=>{
            console.log(keys);
        });
    }
}

var localstore=new localstore();
module.exports=localstore;
