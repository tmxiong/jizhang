/**
 * Created by zoufeng on 2017/6/21.
 */
import {count} from './mathNum';
function QuotaLogicRetrieveQuota() {

}

QuotaLogicRetrieveQuota.prototype =
    {
        /// <summary>
        /// keys:
        ///     userID --被回收用户
        ///     quotaID --被回收的配额ID
        ///     numbers --被回收数量
        /// </summary>
        huishouList: null,
        /// <summary>
        /// keys:
        ///     userID --增加配额的用户
        ///     quotaID --增加的配额
        ///     numbers --增加的数量
        /// </summary>
        zengjiaList: null,

        /// <summary>
        /// 上级配额信息
        /// </summary>
        parentQuotaList: null,
        /// <summary>
        /// 下级配额信息
        /// </summary>
        userQuotaList: null,
        /// <summary>
        /// 当前是否有错误信息
        /// 1 = 没有错误
        /// 0 = 初始状态
        /// -1 = 有错误
        /// -2 = 有警告
        /// </summary>
        hasError: 0,
        /// <summary>
        /// 错误信息
        /// </summary>
        errorMsg: "",
        /// <summary>
        /// 警告信息
        /// </summary>
        warningMsg: "",
        /// <summary>
        /// 上级用户名
        /// </summary>
        parentUserID: "",
        /// <summary>
        /// 被操作用户名
        /// </summary>
        userID: "",

        /// <summary>
        /// 初始化方法
        /// </summary>
        /// <param name="userReturnRate"></param>
        /// <param name="parentQuotaList"></param>
        /// <param name="parentUserID"></param>
        /// <param name="userQuotaList"></param>
        /// <param name="userID"></param>
        Init: function (userReturnRate, parentQuotaList, parentUserID, userQuotaList, userID) {
            this.parentQuotaList = parentQuotaList;
            this.parentUserID = parentUserID;
            this.userQuotaList = userQuotaList;
            this.userID = userID;
            this.huishouList = [];
            this.zengjiaList = [];
        },

        /**
         * @return {string}
         */
        GetDesc: function (useUsers, quotaID) {
            this.huishouList = [];
            this.zengjiaList = [];
            var returnStr = "";

            if (this.HasError()) {
                returnStr = this.GetError();
            }
            else {
                var selectedQuota_chd = this.userQuotaList.IndexByID(quotaID);
                if (selectedQuota_chd != null) {
                    var selectedQuota_parent = this.parentQuotaList.IndexByBeginEnd(selectedQuota_chd.BonusBegin, selectedQuota_chd.BonusEnd);

                    if (selectedQuota_chd.SeqNum == 9999) {
                        this.hasError = -1;
                        this.errorMsg =
                            "无法回收" +
                            selectedQuota_chd.BonusBegin.toFixed(2).toString() +
                            "~" +
                            selectedQuota_chd.BonusEnd.toFixed(2).toString() +
                            "配额";
                    }
                    else {
                        this.huishouList["type"] = "2";
                        this.huishouList["quotaID"] = quotaID.toString();
                        this.huishouList["numbers"] = useUsers.toString();

                        if (selectedQuota_parent != null) {
                            if (selectedQuota_parent.SeqNum == 9999) {
                                returnStr =
                                    "回收用户" +
                                    this.userID.toString() +
                                    "的" +
                                    selectedQuota_chd.BonusBegin.toFixed(2).toString() +
                                    "~" +
                                    selectedQuota_chd.BonusEnd.toFixed(2).toString() +
                                    "配额" +
                                    useUsers.toString() +
                                    "个";
                            }
                            else {
                                returnStr =
                                    "回收用户" +
                                    this.userID.toString() +
                                    "的" +
                                    selectedQuota_chd.BonusBegin.toFixed(2).toString() +
                                    "~" +
                                    selectedQuota_chd.BonusEnd.toFixed(2).toString() +
                                    "配额" +
                                    useUsers.toString() +
                                    "个" +
                                    "\n" +
                                    "回收后您将得到" +
                                    useUsers.toString() +
                                    "个" +
                                    selectedQuota_parent.BonusBegin.toFixed(2).toString() +
                                    "~" +
                                    selectedQuota_parent.BonusEnd.toFixed(2).toString() +
                                    "配额";
                            }
                            this.zengjiaList["type"] = "1";
                            this.zengjiaList["quotaID"] = selectedQuota_parent.QuotaID.toString();
                            this.zengjiaList["numbers"] = useUsers.toString();

                            this.hasError = 1;
                            this.errorMsg = "";
                        }
                        else {
                            returnStr =
                                "回收用户" +
                                this.userID.toString() +
                                "的" +
                                selectedQuota_chd.BonusBegin.toFixed(2).toString() +
                                "~" +
                                selectedQuota_chd.BonusEnd.toFixed(2).toString() +
                                "配额" +
                                useUsers.toString() +
                                "个" +
                                "\n" +
                                "回收后您将得到" +
                                useUsers.toString() +
                                "个" +
                                selectedQuota_chd.BonusBegin.toFixed(2).toString() +
                                "~" +
                                selectedQuota_chd.BonusEnd.toFixed(2).toString() +
                                "配额";

                            this.zengjiaList["type"] = "3";
                            this.zengjiaList["userID"] = this.parentUserID;
                            this.zengjiaList["bonusBegin"] = selectedQuota_chd.BonusBegin.toString();
                            this.zengjiaList["bonusEnd"] = selectedQuota_chd.BonusEnd.toString();
                            this.zengjiaList["numbers"] = useUsers.toString();
                        }
                        this.hasError = 1;
                        this.errorMsg = "";
                    }
                }
            }
            if (this.HasError()) {
                returnStr = this.GetError();
            }

            return returnStr;
        },

        //NumValue[0] = remainUsers_minValue;
        //NumValue[1] = remainUsers_maxValue;
        //NumValue[2] = remainUsers_curValue;
        /**
         * @return {number}
         */
        ChangeQuota: function (quotaID, NumValue) {
            var returnValue = -1;
            var remainUsers_minValue = 0;
            var remainUsers_maxValue = 0;
            var remainUsers_curValue = 0;

            var selectedQuota_chd = this.userQuotaList.IndexByID(quotaID);
            if (selectedQuota_chd != null) {
                var selectedQuota_parent = this.parentQuotaList.IndexByBeginEnd(selectedQuota_chd.BonusBegin, selectedQuota_chd.BonusEnd);
                remainUsers_minValue = selectedQuota_chd.RemainUsers > 0 ? 1 : 0;
                remainUsers_maxValue = selectedQuota_chd.RemainUsers;
                remainUsers_curValue = remainUsers_minValue;
                returnValue = 1;
                this.hasError = 1;
                this.errorMsg = "";
            }
            else {
                this.hasError = -1;
                this.errorMsg = "未找到与配额" +
                    selectedQuota_chd.BonusBegin.toFixed(2).toString() +
                    "~" +
                    selectedQuota_chd.BonusEnd.toFixed(2).toString() +
                    "相匹配的配额";
            }

            NumValue[0] = remainUsers_minValue;
            NumValue[1] = remainUsers_maxValue;
            NumValue[2] = remainUsers_curValue;
            return returnValue;
        },

        /// <summary>
        /// 是否有错误
        /// </summary>
        /**
         * @return {boolean}
         */
        HasError: function () {
            return this.hasError != 1;
        },

        /// <summary>
        /// 如果HasError = true,获取错误信息
        /// </summary>
        /**
         * @return {string}
         */
        GetError: function () {
            if (this.HasError()) {
                return this.errorMsg;
            }
            else {
                return "";
            }
        },


        /// <summary>
        /// 获取要更新的对象集合
        /// </summary>
        /// <returns></returns>
        GetUpdateResult: function () {
            var list = [];
            if (!this.HasError()) {
                if (count(this.huishouList) > 0) {
                    list.push(this.huishouList);
                }

                if (count(this.zengjiaList) > 0) {
                    list.push(this.zengjiaList);
                }
            }
            return list;
        }
    };

module.exports = QuotaLogicRetrieveQuota;