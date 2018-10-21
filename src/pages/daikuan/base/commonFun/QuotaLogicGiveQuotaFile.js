/**
 * Created by zoufeng on 2017/6/21.
 */
import {count} from './mathNum';
function QuotaLogicGiveQuota(){

}

QuotaLogicGiveQuota.prototype = {
    /// <summary>
    /// 如果存在要使用的配额,则存储到该集合中
    /// keys:
    ///     userID  --被使用配额的用户,
    ///     quotaID --被使用的配额ID,
    ///     numbers --被使用的数量
    /// </summary>
    shiyongList:null,

    /// <summary>
    /// 把被使用的配额增加到哪个配额上.
    /// keys:
    ///     userID  --要增加的用户,
    ///     quotaID --要增加的配额ID,   (如果是新增的配额,没有该项)
    ///     bonusBegin --新增的配额     (如果不是新增的配额,没有该项)
    ///     bonusEnd   --新增的配额     (如果不是新增的配额,没有该项)
    ///     numbers
    /// </summary>
    zengjiaList:null,
    /// <summary>
    /// 上级配额信息
    /// </summary>
    parentQuotaList:null,
    /// <summary>
    /// 下级配额信息
    /// </summary>
    userQuotaList:null,

    /// <summary>
    /// 下级返点
    /// </summary>
    initReturnRate:0,

    /// <summary>
    /// 当前是否有错误信息
    /// 1 = 没有错误
    /// 0 = 初始状态
    /// -1 = 有错误
    /// -2 = 有警告
    /// </summary>
    hasError:0,
    /// <summary>
    /// 错误信息
    /// </summary>
    errorMsg:"",
    /// <summary>
    /// 警告信息
    /// </summary>
    warningMsg:"",

    /// <summary>
    /// 上级用户名
    /// </summary>
    parentUserID:"",
    /// <summary>
    /// 被操作用户名
    /// </summary>
    userID:"",
    /// <summary>
    /// 初始化方法
    /// </summary>
    /// <param name="userReturnRate"></param>
    /// <param name="parentQuotaList"></param>
    /// <param name="parentUserID"></param>
    /// <param name="userQuotaList"></param>
    /// <param name="userID"></param>
    Init:function(userReturnRate, parentQuotaList, parentUserID, userQuotaList, userID)
    {
        this.initReturnRate = userReturnRate;
        this.parentQuotaList = parentQuotaList;
        this.parentUserID = parentUserID;
        this.userQuotaList = userQuotaList;
        this.userID = userID;
        this.shiyongList = [];
        this.zengjiaList = [];
    },

    /// <summary>
    /// 当修改返点范围时或者修改授予数量时调用该方法.
    /// </summary>
    /// <param name="useUsers"></param>
    /// <param name="bonusBegin"></param>
    /// <param name="bonusEnd"></param>
    /// <param name="quotaID"></param>
    /// <returns></returns>
    /**
     * @return {string}
     */
    GetDesc:function(useUsers, bonusBegin, bonusEnd, quotaID)
    {
        this.shiyongList = [];
        this.zengjiaList = [];

        var returnStr = "";
        var selectedQuota = null;

        if (bonusBegin <= bonusEnd)
        {
            selectedQuota = this.parentQuotaList.IndexByID(quotaID);

            if (selectedQuota != null)
            {
                if (selectedQuota.BonusBegin > this.initReturnRate)
                {
                    this.hasError = -1;
                    this.errorMsg = "所选配额大于当前用户返点,请重新选择";
                }
                else
                {
                    var rtnValue1 = this.userQuotaList.Validate_IncludeOtherQuota(bonusBegin, bonusEnd);
                    var rtnValue2 = this.userQuotaList.Validate_InOtherQuota(bonusBegin, bonusEnd);
                    if (rtnValue1 == 1 || rtnValue2 > 0)
                    {
                        if (selectedQuota.SeqNum == 9999)
                        {
                            returnStr = "用户" +
                                this.userID.toString() +
                                "将会得到" +
                                useUsers.toString() +
                                "个"+
                                bonusBegin.toFixed(2).toString()+
                                "~"+
                                bonusBegin.toFixed(2).toString()+
                                "配额";
                        }
                        else
                        {
                            returnStr = "您将会消耗"+
                                useUsers.toString()+
                                "个"+
                                selectedQuota.BonusBegin.toFixed(2).toString()+
                                "~"+
                                selectedQuota.BonusEnd.toFixed(2).toString()+
                                "配额,\n"+
                                "用户"+
                                this.userID.toString()+
                                "将会得到"+
                                useUsers.toString()+
                                "个"+
                                bonusBegin.toFixed(2).toString()+
                                "~"+
                                bonusEnd.toFixed(2).toString()+
                                "配额";
                        }

                        this.shiyongList["type"]    = "2";
                        this.shiyongList["quotaID"] =  quotaID.toString();
                        this.shiyongList["numbers"] = useUsers.toString();

                        ///新增的配额
                        if (rtnValue1 == 1)
                        {
                            this.zengjiaList["type"]       = "3";
                            this.zengjiaList["userID"]     = this.userID;
                            this.zengjiaList["bonusBegin"] = bonusBegin.toFixed(2).toString();
                            this.zengjiaList["bonusEnd"]   = bonusEnd.toFixed(2).toString();
                            this.zengjiaList["numbers"]    = useUsers.toString();
                        }
                        ///给现有配额增加配额
                        else
                        {
                            this.zengjiaList["type"]    = "1";
                            this.zengjiaList["quotaID"] = rtnValue2.toString();
                            this.zengjiaList["numbers"] = useUsers.toString();
                        }

                        this.hasError = 1;
                        this.errorMsg = "";
                    }
                    else
                    {
                        this.hasError = -1;
                        this.errorMsg =
                            bonusBegin.toFixed(2).toString()+
                            "~"+
                            bonusEnd.toFixed(2).toString()+
                            "范围内包含其他配额,无法授予";
                    }
                }
            }
            else
            {
                this.hasError = -1;
                this.errorMsg = "未能找到指定配额,配额异常";
            }
        }
        else
        {
            this.hasError = -1;
            this.errorMsg = "最小返点不能大于最大返点";
        }

        if (this.HasError())
        {
            returnStr = this.GetError();
        }

        return returnStr;
    },

    /// <summary>
    /// 更改当前选中的配额时调用该方法
    /// </summary>
    /// <param name="quotaID">选中的配额</param>
    /// <param name="beginBonus_minValue">最低返点的minValue</param>
    /// <param name="beginBonus_maxValue">最低返点的maxValue</param>
    /// <param name="endBonus_minValue">最高返点的minValue</param>
    /// <param name="endBonus_maxValue">最高返点的maxValue</param>
    /// <returns>
    /// -1 = 失败
    ///  1 = 成功
    /// </returns>
    //NumValue[0] = beginBonus_minValue;
    //NumValue[1] = beginBonus_maxValue;
    //NumValue[2] = beginBonus_curValue;
    //NumValue[3] = endBonus_minValue;
    //NumValue[4] = endBonus_maxValue;
    //NumValue[5] = endBonus_curValue;
    //NumValue[6] = remainUser_minValue;
    //NumValue[7] = remainUser_maxValue;
    /**
     * @return {number}
     */
    ChangeQuota:function(quotaID,NumValue)
    {
        var returnValue = -1;
        var beginBonus_minValue = 0.00;
        var beginBonus_maxValue = 0.00;
        var beginBonus_curValue = 0.00;

        var endBonus_minValue = 0.00;
        var endBonus_maxValue = 0.00;
        var endBonus_curValue = 0.00;

        var remainUser_minValue = 0;
        var remainUser_maxValue = 0;

        var selectedQuota = this.parentQuotaList.IndexByID(quotaID);

        if (selectedQuota != null)
        {
            /////选择的配额必须小于当前用户的返点
            beginBonus_minValue = parseFloat(selectedQuota.BonusBegin.toFixed(2));
            endBonus_minValue = parseFloat(beginBonus_minValue.toFixed(2));

            if (this.initReturnRate >= selectedQuota.BonusBegin &&
                this.initReturnRate <= selectedQuota.BonusEnd)
            {
                beginBonus_maxValue = parseFloat(this.initReturnRate.toFixed(2));
                endBonus_maxValue   = parseFloat(beginBonus_maxValue.toFixed(2));
            }
            else
            {
                beginBonus_maxValue = parseFloat(selectedQuota.BonusEnd.toFixed(2));
                endBonus_maxValue   = parseFloat(beginBonus_maxValue.toFixed(2));
            }


            beginBonus_curValue = parseFloat(beginBonus_minValue.toFixed(2));
            endBonus_curValue   = parseFloat(endBonus_maxValue.toFixed(2));

            remainUser_minValue = 1;
            remainUser_maxValue = selectedQuota.RemainUsers;
            this.hasError = 1;
            this.errorMsg = "";
            returnValue = 1;
        }
        else
        {
            this.hasError = -1;
            this.errorMsg = "未能找到指定配额,配额异常";
        }

        NumValue[0] = beginBonus_minValue;
        NumValue[1] = beginBonus_maxValue;
        NumValue[2] = beginBonus_curValue;
        NumValue[3] = endBonus_minValue;
        NumValue[4] = endBonus_maxValue;
        NumValue[5] = endBonus_curValue;
        NumValue[6] = remainUser_minValue;
        NumValue[7] = remainUser_maxValue;
        return returnValue;
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
            if (count(this.shiyongList) > 0)
            {
                list.push(this.shiyongList);
            }

            if (count(this.zengjiaList) > 0)
            {
                list.push(this.zengjiaList);
            }
        }
        return list;
    }
};

module.exports=QuotaLogicGiveQuota;