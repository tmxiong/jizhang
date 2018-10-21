function QuotaList(list){
    this.list = list;
}

QuotaList.prototype = {

    list:[],

    /**
     * @return {null}
     */
    IndexByID:function(id)
    {
        for(var i=0; i<this.list.length; i++)
        {
            if (this.list[i].QuotaID == id)
            {
                return this.list[i];
            }
        }
        return null;
    },

    /**
     * @return {null}
     */
    IndexByReturnRate:function(returnRate)
    {
        for(var i=0; i<this.list.length; i++)
        {
            if(this.list[i].BonusBegin <= returnRate &&
               this.list[i].BonusEnd   >= returnRate)
            {
                return this.list[i];
            }
        }
        return null;
    },

    /**
     * @return {null}
     */
    IndexBySeq:function(seqNum)
    {
        for(var i=0; i<this.list.length; i++)
        {
            if(this.list[i].SeqNum == seqNum)
            {
                return this.list[i];
            }
        }
        return null;
    },

    /**
     * @return {number}
     */
    IndexBySeqGetIndex:function(seqNum)
    {
        for (var i = 0; i < this.list.length; i++)
        {
            if (this.list[i].SeqNum == seqNum)
            {
                return i;
            }
        }
        return -1;
    },

    /**
     * @return {null}
     */
    IndexByBeginEnd:function(bonusBegin, bonusEnd)
    {
        for (var i = 0; i < this.list.length; i++)
        {
            if (this.list[i].BonusBegin <= bonusBegin &&
                this.list[i].BonusEnd >=bonusEnd)
            {
                return this.list[i];
            }
        }
        return null;
    },

    /// <summary>
    /// 给定的返点范围是否包含其他配额
    /// </summary>
    /// <param name="bonusBegin"></param>
    /// <param name="bonusEnd"></param>
    /// <returns></returns>
    /**
     * @return {number}
     */
    Validate_IncludeOtherQuota:function(bonusBegin, bonusEnd)
    {
        var returnValue = -1;

        var bonusBeginQuota = this.IndexByReturnRate(bonusBegin);
        var bonusEndQuota   = this.IndexByReturnRate(bonusEnd);

        if (bonusBeginQuota == null &&
            bonusEndQuota   == null)
        {
            var hasBetweenValue = false;

            for(var i = 0; i<this.list.length; i++)
            {
                var item = this.list[i];
                if ((item.BonusBegin <= bonusBegin && item.BonusEnd >= bonusBegin)
                    &&
                    (item.BonusBegin <= bonusEnd &&  item.BonusEnd >= bonusEnd))
                {
                    hasBetweenValue = true;
                }
            }
            if (hasBetweenValue)
            {
                returnValue = -1;
            }
            else
            {
                returnValue = 1;
            }
        }
        return returnValue;
    },

    /// <summary>
    /// 上级的配额返点与下级某个返点完全一样
    /// </summary>
    /// <param name="bonusBegin"></param>
    /// <param name="bonusEnd"></param>
    /// <returns></returns>
    /**
     * @return {number}
     */
    Validate_InOtherQuota:function(bonusBegin, bonusEnd)
    {
        var returnValue = -1;

        var bonusBeginQuota = this.IndexByReturnRate(bonusBegin);
        var bonusEndQuota = this.IndexByReturnRate(bonusEnd);

        if (bonusBeginQuota != null &&
            bonusEndQuota   != null &&
            bonusBeginQuota.QuotaID == bonusEndQuota.QuotaID)
        {
            returnValue = bonusBeginQuota.QuotaID;
        }
        else
        {
            returnValue = -1;
        }

        return returnValue;
    },

    QuotaBase:function(index)
    {
        return this.list[index];
    },

    GetList:function()
    {
        return this.list;
    }
};

//const QuotaList=new QuotaList();
module.exports=QuotaList;