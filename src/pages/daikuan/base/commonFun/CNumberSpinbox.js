/**
 * Created by zoufeng on 2017/6/12.
 */
function CNumberSpinbox() {
    this._Max=0;
    this._Min=0;
    this._Step=0.1;
    this._Value=0;
}
CNumberSpinbox.prototype={
    fix:function (Max,Min,Step) {
        this._Max=Max;
        this._Min=Min;
        this._Step=Step;
    },
    get:function () {
        return this._Value;
    },
    set:function (value) {
        return this.SetValue(value);
    },
    AddValue:function(){
        var value = this._Value + this._Step;

        if(!this.CheckValue(value)){
            value = this._Value;
        }
        return this.SetValue(value);

    },

    SubValue:function(){
        var value = this._Value - this._Step;

        if(!this.CheckValue(value)){
            value = this._Value;
        }
        return this.SetValue(value);
    },
    SetValue:function (value) {
        if(!this.CheckValue(value)){
            return this._Value;
        }
        else if(this._Step%1===0){
            this._Value=parseInt(value);
        }
        else {
            this._Value=this.getFloatNum(value);
        }
        return this._Value;
    },
    CheckValue:function (value) {
        return this._Max>=value&&value>=this._Min;
    },
    getFloatNum:function (value) {
        let digits=(this._Step+"").split('.')[1].length;
        let multiple=Math.pow(10,digits);
        value=Math.round(value*multiple)/multiple;
        value=parseFloat(value);
        return value;
    }
};
//const CNumberSpinbox=new CNumberSpinbox();
module.exports=CNumberSpinbox;