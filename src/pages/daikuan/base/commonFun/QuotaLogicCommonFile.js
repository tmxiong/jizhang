/// <summary>
    /// type = 1 为现有配额增加配额
    ///      = 2 为现有配额使用配额
    ///      = 3 创建新配额
    ///      = 4 调整配额
    /// type = 1 or 2
    ///     Keys:
    ///         quotaID
    ///         numbers
    /// type = 3
    ///     Keys:
    ///         bonusBegin
    ///         bonusEnd
    ///         numbers
    ///         userID
    /// type = 4
    ///     Keys:
    ///         bonusBegin
    ///         bonusEnd
    ///         quotaID
    /// </summary>
function QuotaLogicCommon(){
}

/// <summary>
/// 升点,降点,配额回收,配额授予都涉及到[一组配额从下级用户回收到上级用户的配额当中]
/// 其中,从下级用户回收回来的配额,有的是在上级配额中存在的,这种回收直接再现有的配额上增加就可以
/// 另外一种,是从下级用户回收来的配额,在上级配额中并不存在,涉及到针对该次回收配额,要为上级创建一个新配额
/// </summary>
/// <param name="bonusBegin">回收配额的最小返点</param>
/// <param name="bonusEnd">回收配额的最大返点</param>
/// <param name="parentList">上级配额</param>
/// <returns></returns>
QuotaLogicCommon.QuotaRetrieveProcess = function(bonusBegin,bonusEnd,useUsers,parentList)
{
    var returnDic = [];

    if (parentList != null)
    {
        var parentQuota = parentList.IndexByBeginEnd(bonusBegin, bonusEnd);
        var type = -1;

        if (parentQuota != null)
        {

            type = 1;
            var quotaID = parentQuota.QuotaID;
            var numbers = useUsers;
            returnDic["type"]    =  type.toString();
            returnDic["quotaID"] =  quotaID.toString();
            returnDic["numbers"] =  useUsers.toString();
        }
        else
        {
            var includeOthers = parentList.Validate_IncludeOtherQuota(bonusBegin, bonusEnd);
            if (includeOthers == 1)
            {
                type = 3;
                returnDic["type"]       = type.toString();
                returnDic["bonusBegin"] = bonusBegin.toString();
                returnDic["bonusEnd"]   = bonusEnd.toString();
                returnDic["numbers"]    = useUsers.toString();
            }
        }
    }

    return returnDic;
};

QuotaLogicCommon.ConverTo2Decimal = function(value)
{
    return parseFloat(value.toFixed(2));
};
module.exports=QuotaLogicCommon;