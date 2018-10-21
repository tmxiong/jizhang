function QuotaLogicAdjRate(){
}

QuotaLogicAdjRate.prototype =
{
    /// <summary>
    /// 上级配额
    /// </summary>
    parentQuotaList:null,
    /// <summary>
    /// 下级配额
    /// </summary>
    userQuotaList:null,
    /// <summary>
    /// 下级返点
    /// </summary>
    initReturnRate:0,
    /// <summary>
    /// 最终起始返点
    /// </summary>
    finalBeginBonus:0,
    /// <summary>
    /// 最终最大返点
    /// </summary>
    finalEndBonus:0,
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

    currentQuotaID:-1,

    /// <summary>
    /// 初始化方法
    /// </summary>
    /// <param name="userReturnRate"></param>
    /// <param name="parentQuotaList"></param>
    /// <param name="parentUserID"></param>
    /// <param name="userQuotaList"></param>
    /// <param name="userID"></param>
    Init:function(userReturnRate,parentQuotaList,parentUserID,userQuotaList,userID)
    {
        this.initReturnRate = userReturnRate;
        this.parentQuotaList = parentQuotaList;
        this.parentUserID = parentUserID;
        this.userQuotaList = userQuotaList;
        this.userID = userID;
    },
    /// <summary>
    /// 提交前的验证方法
    /// </summary>
    /// <param name="bonusBegin"></param>
    /// <param name="bonusEnd"></param>
    /**
     * @return {number}
     */
    Check:function(bonusBegin,bonusEnd)
    {
        var returnValue = -1;

        if (this.HasError())
        {
            return returnValue;
        }
        else
        {
            if (bonusBegin > bonusEnd)
            {
                returnValue = -1;
                this.hasError = -1;
                this.errorMsg = "最低返点不能大于最高返点";
            }
            else
            {
                this.finalBeginBonus = bonusBegin;
                this.finalEndBonus = bonusEnd;
                returnValue = 1;
            }
        }

        return returnValue;
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
    /**
     * @return {number}
     */
    //Bonus[0] = beginBonus_minValue
    //Bonus[1] = beginBonus_maxValue
    //Bonus[2] = endBonus_minValue
    //Bonus[3] = endBonus_maxValue
    ChangeQuota:function(quotaID, Bonus)
    {
        var returnValue = -1;
        var beginBonus_minValue = 0;
        var beginBonus_maxValue = 0;

        var endBonus_minValue = 0;
        var endBonus_maxValue = 0;
        ///当前选择的下级配额是否是返点最高的
        var isTopmost = false;
        ///当前选择的下级配额是否是返点最低的
        var isLowest = false;

        var userQb = this.userQuotaList.IndexByID(quotaID);

        if (userQb != null)
        {
            this.currentQuotaID = quotaID;
            ///通过选择的下级配来匹配上级相应的配额
            var parentMin = this.parentQuotaList.IndexByReturnRate(userQb.BonusBegin);
            var parentMax = this.parentQuotaList.IndexByReturnRate(userQb.BonusEnd);

            ///如果在上级的配额信息中，匹配到一个完全包含下级所选的配额
            if (parentMin != null && parentMax != null && parentMin.QuotaID == parentMax.QuotaID)
            {
                //获取高于下级被选中的配额
                var maxTmpQb = null;
                if (userQb.SeqNum == 9999)
                {
                    if (this.userQuotaList.GetList().length == 1)
                    {
                        maxTmpQb = userQb;
                        isTopmost = true;
                    }
                    else
                    {
                        maxTmpQb = this.userQuotaList.list[this.userQuotaList.GetList().length - 2];
                    }

                    this.hasError = 1;
                    this.errorMsg = "";
                    returnValue = 1;
                }
                else if (userQb.SeqNum == 1)
                {
                    maxTmpQb = userQb;
                    this.hasError = 1;
                    this.errorMsg = "";
                    returnValue = 1;
                    isTopmost = true;
                }
                else
                {
                    maxTmpQb = this.userQuotaList.IndexBySeq(userQb.SeqNum - 1);

                    if (maxTmpQb == null)
                    {
                        this.hasError = -1;
                        this.errorMsg = "下级配额序号有误(-101),请联系管理员";
                        returnValue = -1;
                    }
                    else
                    {
                        this.hasError = 1;
                        this.errorMsg = "";
                        returnValue = 1;
                    }
                }

                //获取低于下级被选中的配额
                var minTmpQb = null;

                if (!this.HasError())
                {
                    if (userQb.SeqNum == 9999)
                    {
                        minTmpQb = userQb;
                        this.hasError = 1;
                        this.errorMsg = "";
                        returnValue = 1;
                        isLowest = true;
                    }
                    else
                    {
                        var index = this.userQuotaList.IndexBySeqGetIndex(userQb.SeqNum);

                        if (index == -1 || (index + 1) >= this.userQuotaList.GetList().length)
                        {
                            this.hasError = -1;
                            this.errorMsg = "下级配额序号有误(-102),请联系管理员";
                            returnValue   = -1;
                        }
                        else
                        {
                            minTmpQb = this.userQuotaList.list[index + 1];

                            this.hasError = 1;
                            this.errorMsg = "";
                            returnValue   = 1;
                        }
                    }
                }

                if (!this.HasError())
                {
                    if (isTopmost && isLowest)
                    {
                        beginBonus_maxValue = Math.min(parentMin.BonusEnd, this.initReturnRate);
                        beginBonus_minValue = minTmpQb.BonusBegin;
                    }
                    else if (!isTopmost && !isLowest)
                    {
                        beginBonus_maxValue = Math.min(Math.min(parentMin.BonusEnd, maxTmpQb.BonusBegin - 0.1), this.initReturnRate);
                        beginBonus_minValue = Math.max(parentMin.BonusBegin, minTmpQb.BonusEnd + 0.1);
                    }
                    else if (isTopmost)
                    {
                        beginBonus_maxValue = Math.min(parentMin.BonusEnd, this.initReturnRate);
                        beginBonus_minValue = Math.max(parentMin.BonusBegin, minTmpQb.BonusEnd + 0.1);
                    }
                    else if (isLowest)
                    {
                        beginBonus_maxValue = Math.min(Math.min(parentMin.BonusEnd, maxTmpQb.BonusBegin - 0.1), this.initReturnRate);
                        beginBonus_minValue = minTmpQb.BonusBegin;
                    }

                    endBonus_maxValue = beginBonus_maxValue;
                    endBonus_minValue = beginBonus_minValue;

                    ///保证每个一定有一个SeqNum = 9999的配额.
                    if (isLowest)
                    {
                        beginBonus_maxValue = beginBonus_minValue;
                    }
                }
            }
            else
            {
                this.hasError = -1;
                this.errorMsg = "下级用户配额与上级配额不符,请联系管理员";
            }
        }
        else
        {
            this.hasError = -1;
            this.errorMsg = "未能找到指定配额,配额异常";
        }

        Bonus[0] = beginBonus_minValue;
        Bonus[1] = beginBonus_maxValue;
        Bonus[2] = endBonus_minValue;
        Bonus[3] = endBonus_maxValue;
        return returnValue;
    },

    /// <summary>
    /// 是否有错误
    /// </summary>
    /**
     * @return {bool}
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
            var d = [];
            d["type"] = "4";
            d["quotaID"] = this.currentQuotaID.toString();
            d["bonusBegin"] = this.finalBeginBonus.toString();
            d["bonusEnd"] = this.finalEndBonus.toString();

            list.push(d);
        }

        return list;
    }
};
module.exports=QuotaLogicAdjRate;