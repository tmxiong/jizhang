
import QuotaLogicCommon from'./QuotaLogicCommonFile';
import {count} from './commonFun';
function QuotaLogicDownRate(){
}

QuotaLogicDownRate.prototype = {
    /// <summary>
    /// 如果存在回收的配额,则储存到该集合中
    /// keys:
    ///     toUserID    --回收到指定用户,
    ///     toQuotaID   --回收到指定配额,
    ///     numbers     --要回收的数量
    /// </summary>
    huishouList:null,

    /// <summary>
    /// 如果存在要使用的配额,则存储到该集合中
    /// keys:
    ///     userID  --被使用配额的用户,
    ///     quotaID --被使用的配额ID,
    ///     numbers --被使用的数量
    /// </summary>
    shiyongList:null,
    /// <summary>
    /// 原返点所属当前上级用户的配额ID
    /// </summary>
    initQuotaID:-1,
    /// <summary>
    /// 原返点
    /// </summary>
    initReturnRate:0,
    /// <summary>
    /// 原配额
    /// </summary>
    initQuota:null,
    /// <summary>
    /// 上级配额信息
    /// </summary>
    parentQuotaList:null,
    /// <summary>
    /// 当前用户配额信息
    /// </summary>
    userQuotaList:null,
    /// <summary>
    /// 与被操作用户返点最接近的被操作用户的配额
    /// </summary>
    secQuota:null,
    /// <summary>
    /// 最终选择返点
    /// </summary>
    finalReturnRate:0,
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
    /// 上级配额中是否包含下级现有的返点
    /// </summary>
    parentQuotaHasUserRate:true,

    /// <summary>
    /// 初始化
    /// </summary>
    /// <param name="userReturnRate">当前用户返点</param>
    /// <param name="parentQuotaList">上级的配额信息</param>
    /// <param name="userQuotaList">当前用户的配额信息</param>
    Init:function(userReturnRate, parentQuotaList, parentUserID, userQuotaList, userID)
    {
        this.initReturnRate = userReturnRate;
        this.parentQuotaList = parentQuotaList;
        this.parentUserID = parentUserID;
        this.userQuotaList = userQuotaList;
        this.userID = userID;

        this.IniSecQuota();

        this.shiyongList = [];
        this.huishouList = [];

        var qb = parentQuotaList.IndexByReturnRate(this.initReturnRate);

        if (qb == null)
        {
            this.parentQuotaHasUserRate = false;
        }
        else
        {
            this.initQuotaID = qb.QuotaID;
            this.initQuota = qb;
            this.hasError = 1;
        }
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
        var returnStr = "";

        if (this.HasError())
        {
            returnStr = this.GetError();
        }
        else
        {
            if (currentReturnRate > this.initReturnRate)
            {
                returnStr = "";
                this.hasError = -1;
                this.errorMsg = "未找到与"+currentReturnRate.toString()+"返点相匹配的配额信息" ;
                this.warningMsg = "";
            }
            else if(currentReturnRate < this.secQuota.BonusEnd)
            {
                returnStr = "";
                this.hasError = -1;
                this.errorMsg = "下级存在大于返点的配额区间,请回收该区间再降点" ;
                this.warningMsg = "";
            }
            else
            {
                var qb = this.parentQuotaList.IndexByReturnRate(currentReturnRate);

                if (!this.CurrentQuotaIsNull(qb))
                {
                    if (qb.SeqNum == 9999)
                    {
                        returnStr = "";
                    }
                    else
                    {
                        if (qb.QuotaID == this.initQuotaID)
                        {

                        }
                        else
                        {
                            returnStr = "您将消耗1个"+qb.BonusBegin.toString()+"~"+qb.BonusEnd.toString()+"配额";

                            if (count(this.shiyongList) == 0)
                            {
                                this.shiyongList["type"]    = "2";
                                ///如果seq == 9999,则不对Remain数量进行处理
                                this.shiyongList["quotaID"] = qb.QuotaID.toString();
                                this.shiyongList["numbers"] = "1";
                            }
                        }
                    }

                    if (count(this.huishouList) > 0)
                    {
                        returnStr =
                            returnStr.toString()+
                            returnStr=="" ? "" : "\n" +
                            "回收1个"+
                            (this.parentQuotaHasUserRate ? this.initQuota.BonusBegin : this.initReturnRate).toString() +
                            "~"+
                            (this.parentQuotaHasUserRate ? this.initQuota.BonusEnd : this.initReturnRate).toString() +
                            "配额";
                    }

                    this.finalReturnRate = currentReturnRate;

                    this.hasError = 1;
                    this.errorMsg = "";
                    this.warningMsg = "";
                }
                else
                {
                    returnStr = "未找到与"+currentReturnRate.toString()+"返点相匹配的配额信息";
                    this.hasError = -1;
                    this.errorMsg = "未找到与"+currentReturnRate.toString()+"返点相匹配的配额信息";
                    this.warningMsg = "";
                }
            }
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
    //NumValue[0] = minValue
    //NumValue[1] = maxValue
    /**
     * @return {number}
     */
    ChangeQuota:function(quotaID, NumValue)
    {
        this.huishouList = [];
        this.shiyongList = [];
        var minValue = 0;
        var maxValue = 0;
        var returnValue = -1;

        var qb = this.parentQuotaList.IndexByID(quotaID);

        if (!this.CurrentQuotaIsNull(qb))
        {
            var error = false;

            if (qb.BonusBegin > this.initReturnRate)
            {
                minValue = 0;
                maxValue = 0;
                returnValue = -1;
                this.hasError = -1;
                this.errorMsg = "无法选择最低返点高于"+this.initReturnRate.toString()+"的配额";
                this.warningMsg = "";
                error = true;
            }
            else if (qb.BonusBegin <= this.initReturnRate && qb.BonusEnd >= this.initReturnRate)
            {
                maxValue = this.initReturnRate;

                if (qb.BonusBegin <= this.secQuota.BonusEnd && qb.BonusEnd >= this.secQuota.BonusEnd)
                {
                    minValue = this.secQuota.BonusBegin;
                }
                else
                {
                    minValue = qb.BonusBegin;
                }
                returnValue = 1;
                error = false;
            }
            else if (qb.BonusEnd < this.initReturnRate)
            {
                maxValue = qb.BonusEnd;

                if (qb.BonusBegin <= this.secQuota.BonusEnd && qb.BonusEnd >= this.secQuota.BonusEnd)
                {
                    minValue = this.secQuota.BonusBegin;
                }
                else
                {
                    minValue = qb.BonusBegin;
                }
                returnValue = 1;
                error = false;
            }


            if ((!this.CurrentQuotaHasRemain(qb)) && quotaID != this.initQuotaID)
            {
                returnValue = -1;
                this.hasError = -1;
                this.errorMsg = qb.BonusBegin.toString()+"~"+qb.BonusEnd.toString()+"配额剩余数量不足";
                minValue = 0;
                maxValue = 0;
            }
            else
            {
                if (!error)
                {
                    if (this.parentQuotaHasUserRate)
                    {
                        if (quotaID == this.initQuotaID)
                        {
                            maxValue = this.initReturnRate;
                        }
                        else
                        {
                            var q = this.parentQuotaList.IndexByID(this.initQuotaID);
                            ///回收配额
                            //if (q.SeqNum != 9999)
                            //{
                            this.huishouList = QuotaLogicCommon.QuotaRetrieveProcess(q.BonusBegin, q.BonusEnd, 1, this.parentQuotaList);
                            //this.huishouList.Add("toUserID", this.parentUserID);
                            //this.huishouList.Add("toQuotaID", this.initQuotaID.ToString());
                            //this.huishouList.Add("numbers", "1");
                            //}
                        }
                    }
                    else
                    {
                        this.huishouList = QuotaLogicCommon.QuotaRetrieveProcess(this.initReturnRate, this.initReturnRate, 1, this.parentQuotaList);
                    }

                    this.hasError = 1;
                    this.errorMsg = "";
                    this.warningMsg = "";
                }
            }
        }
        else
        {
            returnValue = -1;
            this.hasError = -1;
            this.errorMsg = "未能找到指定配额";
        }

        NumValue[0] = minValue;
        NumValue[1] = maxValue;
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

    /**
     * @return {boolean}
     */
    CurrentQuotaHasRemain:function(qb)
    {
        var rtnValue = false;
        if (!this.CurrentQuotaIsNull(qb))
        {
            if (qb.SeqNum == 9999)
            {
                rtnValue = true;
            }
            else
            {
                rtnValue = qb.RemainUsers > 0;
            }
        }
        return rtnValue;
    },

    /**
     * @return {boolean}
     */
    CurrentQuotaIsNull:function(qb)
    {
        return qb == null;
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
            if (qb.SeqNum == 9999)
            {
                rtnValue = true;
            }
            else
            {
                rtnValue = qb.RemainUsers > 0;
            }
        }
        return rtnValue;
    },
    /// <summary>
    /// 初始化secQuota对象
    /// </summary>
    IniSecQuota:function()
    {
        var qb = this.userQuotaList.IndexByReturnRate(this.initReturnRate);

        if (qb== null)
        {
            if (this.userQuotaList.GetList().length == 1)
            {
                qb = this.userQuotaList.GetList()[0];
            }
            else
            {
                qb = this.userQuotaList.IndexBySeq(1);
            }
        }

        this.secQuota = qb;
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
            if (count(this.shiyongList)>0)
            {
                list.push(this.shiyongList);
            }

            if (count(this.huishouList)>0)
            {
                list.push(this.huishouList);
            }
        }
        return list;
    }
};
module.exports=QuotaLogicDownRate;