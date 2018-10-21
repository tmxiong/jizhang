/// <summary>
    /// 1.Init
    /// 2.更改当前选中的配额时调用ChangeQuota
    /// 3.改变返点时调用GetDesc
    /// </summary>
function QuotaLogicCreateNewUser(){
}

QuotaLogicCreateNewUser.prototype =
{
    /// <summary>
    /// 修改fandian
    /// </summary>
    //public event EventHandler ReturnRateChangeEvent;

    /// <summary>
    /// 选择的配额改变时,出发该事件
    /// 设置返点的最大最小值
    /// </summary>
    //public event EventHandler QuotaSelectChangeEvent;

    shiyongList:[],

    /// <summary>
    /// 父级配额
    /// </summary>
    parentQuotaList:null,
    /// <summary>
    /// 父级返点
    /// </summary>
    parentReturnRate:0,
    /// <summary>
    /// -1 = 有错误
    /// 1 = 没错误
    /// </summary>
    hasError:-1,
    /// <summary>
    /// 错误信息
    /// </summary>
    errorMsg:"",

    Init:function(parentReturnRate,parentQuotaList)
    {
        this.parentQuotaList = parentQuotaList;
        this.parentReturnRate = parentReturnRate;
        this.shiyongList = [];
    },

    /// <summary>
    /// 改变返点时,生成的描述信息
    /// </summary>
    /// <param name="currentReturnRate"></param>
    /// <returns></returns>
    /**
     * @return {string}
     */
    GetDesc:function(currentReturnRate)
    {
        this.shiyongList = [];
        var returnStr = "";
        var qb = this.parentQuotaList.IndexByReturnRate(currentReturnRate);

        if (this.CurrentQuotaCanUse(qb))
        {
            this.shiyongList["type"]    =  "2";
            this.shiyongList["quotaID"] =  qb.toString();
            this.shiyongList["numbers"] =  "1";

            if (qb.SeqNum == 9999)
            {
                returnStr = "";
            }
            else
            {
                returnStr = "您将消耗1个"+ qb.BonusBegin.toString() +"~" +qb.BonusEnd.toString() + "配额";
            }
            this.hasError = 1;
            this.errorMsg = "";
        }
        else
        {
            returnStr = "";
            this.hasError = -1;
            this.errorMsg = "返点"+ currentReturnRate.toString() +"没有对应的配额信息,或剩余配额不足";
        }
        return returnStr;
    },

    /// <summary>
    /// 更改当前选中的配额时调用该方法,
    /// 通过传出的minValue&maxValue来设置返点的最大值和最小值
    /// </summary>
    /// <param name="quotaID"></param>
    /// <param name="minValue"></param>
    /// <param name="maxValue"></param>
    /// <returns></returns>
    //NumValue[0] = minValue;
    //NumValue[1] = maxValue;
    /**
     * @return {number}
     */
    ChangeQuota:function(quotaID, NumValue)
    {
        var qb = this.parentQuotaList.IndexByID(quotaID);
        var returnValue = -1;
        var minValue = 0;
        var maxValue = 0;

        if (this.CurrentQuotaCanUse(qb))
        {
            minValue = qb.BonusBegin;
            maxValue = qb.BonusEnd;
            returnValue = 1;

            this.hasError = 1;
            this.errorMsg = "";

        }
        else
        {
            returnValue = -1;
            this.hasError = -1;
            this.errorMsg = qb.BonusBegin.toString()+ "~" + qb.BonusEnd.toString() + "剩余配额不足";
        }

        NumValue[0] = minValue;
        NumValue[1] = maxValue;
        return returnValue;
    },

    /**
     * @return {boolean}
     */
    CurrentQuotaCanUse:function(qb)
    {
        var rtnValue = false;

        if (qb == null)
        {
            rtnValue = false;
        }
        else
        {
            rtnValue = qb.RemainUsers > 0;
        }
        return rtnValue;
    },

    /// <summary>
    /// 是否有错误
    /// </summary>
    /**
     * @return {boolean}
     */
    HasError:function()
    {
        return this.hasError != 1;
    },
    /// <summary>
    /// 如果HasError = true,获取错误信息
    /// </summary>
    /**
     * @return {string}
     */
    GetError:function()
    {
        if (this.HasError())
        {
            return this.errorMsg;
        }
        else
        {
            return "";
        }
    },

    /// <summary>
    /// 获取要更新的对象集合
    /// </summary>
    /// <returns></returns>
    GetUpdateResult:function()
    {
        var list = [];
        if (!this.HasError())
        {
            list.push(this.shiyongList);
        }
        return list;
    }
};

const QuotaLogicCreateNewUser=new QuotaLogicCreateNewUser();
module.exports=QuotaLogicCreateNewUser;