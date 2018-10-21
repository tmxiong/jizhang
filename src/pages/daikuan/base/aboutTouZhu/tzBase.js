function plusMinusControl(){

};
//界面选注结构体
function NumSelect()
{
    this.NumIndex = 0;    //个十百千万  01234
    this.NumList  = [];   //选中的数字,字符串类型
}

function GetCount(n,m){
    var num = 1;
    var num2 = 1;
    var num3 = n;
    var num4 = 1;
    while (num4 <= m)
    {
        num  *= num3--;
        num2 *= num4++;
    }

    return num / num2;
}
function ParseCodeForSYXW(rows, listItem, items, row){
    if (items == null)
    {
        items = new Array(rows.length);
    }

    var strArray = rows[row].split(",");
    var i = 0;
    var j = 0;
    if (row < (items.length - 1))
    {
        for(i=0; i<strArray.length; i++)
        {
            items[row] = strArray[i];
            ParseCodeForSYXW(rows, listItem, items, row + 1 ) ;
        }
    }
    else
    {
        for(j = 0; j<strArray.length; j++)
        {
            items[row] = strArray[j];
            var list = [];
            for(i=0; i<items.length; i++)
            {
                if (-1 != list.indexOf(items[i]))
                {
                    break;
                }
                list.push(items[i]);
            }

            if (list.length == items.length)
            {
                listItem.push(new Array(items.length));
                for (i = 0; i < items.length; i++ )
                {
                    listItem[listItem.length - 1][i] = items[i];
                }
            }
        }
    }
}
function CheckErrorForSYXW(codes,placeLength){
    for(var j = 0; j<codes.length; j++)
    {
        var str = codes[j];
        if (str.length != (placeLength * 2))
        {
            return "每组号码必需为" + placeLength.toString() + "位号码，错误号码:" + str ;
        }
        var list = [];
        for (var i = 0; i < str.length; i += 2)
        {
            var item = parseInt(str[i] + str[i + 1]);
            if ((item <= 0) || (item > 11))
            {
                return "号码输入有误!";
            }
            if (-1 != list.indexOf(item))
            {
                return "号码输入有误!";
            }
            list.push(item);
        }
    }
    return "";
}
//PlayType枚举
function GetPlayType(){
    this.Direct = 5;
    this.Fixed = 10;
    this.Group = 1;
    this.Group2 = 2;
    this.Group3 = 3;
    this.Group6 = 4;
    this.GroupSums = 7;
    this.RX = 12;
    this.SingleDouble = 8;
    this.Sums = 6;
    this.SYXWGroup2 = 13;
    this.SYXWGroup3 = 14;
    this.Unfixed = 9;
    this.OneSingleDouble = 15;
}

var PlayType = new GetPlayType();

//GameType枚举
function GetGameType(){
    this.FSD = 2;
    this.Happy10 = 8;
    this.Happy8 = 7;
    this.MarkSix = 9;
    this.PLS = 3;
    this.SSC = 1;
    this.SSL = 4;
    this.SSQ = 6;
    this.SYXW = 5;
    this.BJSC = 10;
}

var GameType = new GetGameType();

function CheckResult(){
    this.Count   = 0;                    //投了多少注
    this.Error   = "";                   //返回错误信息
    this.Success = false;                //是否是错误
}

function BetOrder(){
    this.MinLength = -1;                  //每一位少要选择的号码数量
    this.MaxLength = -1;                  //每一位上最多可选择的号码数量, 为0时不限制最多数量
    this.PlaceLength = -1;                //一共多少位       个十百千万
    this.CodeArray = [];                  //游戏每一位投注   个十百千万
    this.PlayType = PlayType.SYXWGroup2;  //游戏玩法
    this.GameType = GameType.SYXW;        //游戏类型
    this.DoubleNumber = false;            //是否是双数,11选五就是数,大于10
    this.IsInput = false;                 //手动输入
    this.Places = [];                     //点击了万千百十个 43210
}

function PlayTypeCtl(betOrder){
    switch(betOrder.PlayType)
    {
        case PlayType.Group:
            return new GroupObj(betOrder);
            break;
        case PlayType.Group2:
            return new Group2Obj(betOrder);
            break;
        case PlayType.Group3:
            return new Group3Obj(betOrder);
            break;
        case PlayType.Group6:
            return new Group6Obj(betOrder);
            break;
        case PlayType.Direct:
            return new DirectObj(betOrder);
            break;
        case PlayType.SingleDouble:
            return new SingleDoubleObj(betOrder);
            break;
        case PlayType.OneSingleDouble:
            return new OneSingleDoubleObj(betOrder);
            break;
        case PlayType.Fixed:
            return new FixedObj(betOrder);
            break;
        case PlayType.RX:
            return new RXObj(betOrder);
            break;
        case PlayType.SYXWGroup2:
            return new SYXWGroup2Obj(betOrder);
            break;
        case PlayType.SYXWGroup3:
            return new SYXWGroup3Obj(betOrder);
            break;
        case PlayType.Unfixed:
            return new UnfixedObj(betOrder);
            break;
        case PlayType.Sums:
            return new SumsObj(betOrder);
            break;
        case PlayType.GroupSums:
            return new GroupSumsObj(betOrder);
            break;
        default :
            break;
    }
}
function GroupObj(bo){
    this.betOrder = bo;
}

GroupObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        var strArray4 = codeArray;
        var num4 = 0;
        while (num4 < strArray4.length)
        {
            var str3 = strArray4[num4];
            if (str3.length != 3)
            {
                str = "每组号码必需为 3 位数字:" + str3;
                break;
            }
            if ((str3[0] == str3[1]) && (str3[1] == str3[2]))
            {
                str = "混合组选不能出现三位相同的数字(豹子):" + str3;
                break;
            }
            num4++;
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return codeArray[0].length * (codeArray[0].length - 1);
    }
};

function Group2Obj(bo){
    this.betOrder = bo;
}

Group2Obj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        var min = this.betOrder.MinLength*this.betOrder.PlaceLength;
        var bMaxLength = (codeArray[0].length > this.betOrder.MaxLength) && (this.betOrder.MaxLength!=0);
        if (codeArray[0].length < min || bMaxLength)
        {
            str = "请选择 " +
                  min.toString() +
                  "-"+
                  this.betOrder.MaxLength.toString()+
                  " 个数字!";
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return (codeArray[0].length * (codeArray[0].length - 1)) / 2;
    }
};

function Group3Obj(bo){
    this.betOrder = bo;
}

Group3Obj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        var strArray4 = codeArray;
        var num4 = 0;
        while (num4 < strArray4.length)
        {
            var str3 = strArray4[num4];
            if (str3.length < 2)
            {
                str = "至少选择 2 位数字!";
                break;
            }
            num4++;
        }

        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return codeArray[0].length * (codeArray[0].length - 1);
    }
};

function Group6Obj(bo){
    this.betOrder = bo;
}

Group6Obj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        var strArray4 = codeArray;
        var num4 = 0;
        while (num4 < strArray4.length)
        {
            var str3 = strArray4[num4];
            if (str3.length < 3)
            {
                str = "至少选择 3 位数字!";
                break;
            }
            num4++;
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return (
            (codeArray[0].length *
            (codeArray[0].length - 1)) *
            (codeArray[0].length - 2)) / 6;
    }
};

function DirectObj(bo){
    this.betOrder = bo;
    this.listItem = [];
}

DirectObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        if ((this.betOrder.GameType == GameType.BJSC) ||
            (this.betOrder.GameType == GameType.SYXW) ||
            (this.betOrder.GameType == GameType.Happy10))
        {
            if (this.betOrder.IsInput)
            {
                str = CheckErrorForSYXW(codeArray, this.betOrder.PlaceLength);
                if ( "" != str )
                {
                    return str;
                }
            }
            else if (codeArray.length > 1)
            {
                var strArray4 = codeArray;
                for (var num4 = 0; num4 < strArray4.length; num4++)
                {
                    var str3 = strArray4[num4].split(",");
                    for(var i=0; i<str3.length; i++)
                    {
                        var nNumValue = 0;
                        if(this.betOrder.GameType == GameType.SYXW){
                            nNumValue = 11;
                        }else if(this.betOrder.GameType == GameType.Happy8){
                            nNumValue = 20;
                        }else if(this.betOrder.GameType == GameType.BJSC){
                            nNumValue = 10;
                        }
                        if ((parseInt(str3[i]) <= 0) ||
                            (parseInt(str3[i]) > nNumValue))
                        {
                            str = "号码输入有误!";
                            break;
                        }
                    }

                    if ("" != str)
                    {
                        break;
                    }
                }
                if ((this.betOrder.GameType == GameType.SYXW) ||
                    (this.betOrder.GameType == GameType.BJSC) ||
                    (this.betOrder.GameType == GameType.Happy10))
                {
                    ParseCodeForSYXW(codeArray,this.listItem, null, 0);
                    if (this.listItem.length == 0)
                    {
                        str = "号码输入有误！";
                    }
                }
            }
        }
        if (!this.betOrder.IsInput)
        {
            if (codeArray.length != this.betOrder.PlaceLength)
            {
                str = "号码必需" + this.betOrder.PlaceLength.toString() + "位一组!";
            }
        }
        else if (!(this.betOrder.GameType == GameType.SYXW ||
                 this.betOrder.GameType == GameType.BJSC))
        {
            strArray4 = codeArray;
            num4 = 0;
            while (num4 < strArray4.length)
            {
                str3 = strArray4[num4];
                if (str3.length != this.betOrder.PlaceLength)
                {
                    str = "号码必需 {" +
                        this.betOrder.PlaceLength.toString() +
                        "} 位一组, 错误号码:{" +
                        str3 +
                        "}";
                    break;
                }
                num4++;
            }
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return DirectCalcCount(codeArray,this.listItem,this.betOrder);
    }
};

function SingleDoubleObj(bo){
    this.betOrder = bo;
}

SingleDoubleObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        if (codeArray.length != 2)
        {
            str = "至少选 2 组号码!";
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        var count = 1;
        for(var i=0; i<codeArray.length; i++)
        {
            count *= codeArray[i].length;
        }

        return count;
    }
};

function OneSingleDoubleObj(bo){
    this.betOrder = bo;
}

OneSingleDoubleObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        if (codeArray.length != 1)
        {
            str = "请选 1 组号码!";
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        var count = 1;
        for(var i=0; i<codeArray.length; i++)
        {
            count *= codeArray[i].length;
        }

        return count;
    }
};

function FixedObj(bo){
    this.betOrder = bo;
}

FixedObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        var flag = false;
        var strArray4 = codeArray;
        var num4 = 0;
        while (num4 < strArray4.length)
        {
            var str5 = strArray4[num4];
            if (str5 != "-")
            {
                flag = true;
                break;
            }
            num4++;
        }

        //?未验证呢
        if (!flag)
        {
            str = "请选择至少一位号码!";
        }
        if (codeArray.length != this.betOrder.PlaceLength)
        {
            str = "号码输入有误！";
        }

        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        var strArray4 = codeArray;
        var num4 = 0;
        var count = 0;
        while (num4 < strArray4.length)
        {
            var str6 = strArray4[num4];
            if (str6 != "-")
            {
                if (this.betOrder.DoubleNumber)
                {
                    count += str6.split(",").length;
                }
                else
                {
                    count += str6.replace(/-/g, "").length;
                }
            }
            num4++;
        }

        return count;
    }
};

function RXObj(bo){
    this.betOrder = bo;
}

RXObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        if (!this.betOrder.IsInput)
        {
            var strArray4 = codeArray;
            for (var num4 = 0; num4 < strArray4.length; num4++)
            {
                var str6 = strArray4[num4];
                if (str6.split(",").length < this.betOrder.MinLength)
                {
                    str = "至少选择" + this.betOrder.MinLength.toString() + "个号码!";
                }

                //这个条件在手动输入很难达成,未验证
                var bMaxLength = (str6.split(",").length > this.betOrder.MaxLength) && (this.betOrder.MaxLength!=0);
                if ((this.betOrder.MaxLength > 0) && bMaxLength)
                {
                    str = "最多选择" + this.betOrder.MaxLength.toString() + "个号码!";
                }
            }
            return str;
        }
        str = CheckErrorForSYXW(codeArray, this.betOrder.MinLength);
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return  GetCount(codeArray[0].split(",").length, this.betOrder.MinLength);
    }
};

function SYXWGroup2Obj(bo){
    this.betOrder = bo;
}

SYXWGroup2Obj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function (codeArray)
    {
        var str = "";
        if (!this.betOrder.IsInput)
        {
            var strArray2 = codeArray[0].split(",");
            var bMaxLength = (strArray2.length > this.betOrder.MaxLength) && (this.betOrder.MaxLength!=0);
            if ((strArray2.length < 2) || bMaxLength)
            {
                str = "请选择 2 -" + this.betOrder.MaxLength.toString() + "位号码!";
            }
            for(var i=0; i<strArray2.length; i++)
            {
                if ((parseInt(strArray2[i]) <= 0) ||
                    (parseInt(strArray2[i]) > ((this.betOrder.GameType == GameType.SYXW) ? 11 : 20)))
                {
                    str = "号码输入有误!";
                    break;
                }
            }
            return str;
        }

        bMaxLength = (codeArray.length > this.betOrder.MaxLength) && (this.betOrder.MaxLength!=0);
        if (bMaxLength)
        {
            str = "最多输入" + this.betOrder.MaxLength.toString() + "注号码！";
        }
        else
        {
            str = CheckErrorForSYXW(codeArray, 2);
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function (codeArray)
    {
        return GetCount(codeArray[0].split(",").length, 2);
    }
};

function SYXWGroup3Obj(bo){
    this.betOrder = bo;
}

SYXWGroup3Obj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        var str = "";
        if (this.betOrder.IsInput)
        {
            str = CheckErrorForSYXW(codeArray, 3);
        }
        else
        {
            var strArray2 = codeArray[0].split(",");
            if (strArray2.length < 3)
            {
                str = "至少选择 3 位号码!";
            }
            var strArray4 = strArray2;
            var num4 = 0;
            while (num4 < strArray4.length)
            {
                var str3 = strArray4[num4];
                if ((parseInt(str3) <= 0) ||
                    (parseInt(str3) > ((this.betOrder.GameType == GameType.SYXW) ? 11 : 20)))
                {
                    str = "号码输入有误!";
                    break;
                }
                num4++;
            }
        }
        return str;
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return GetCount(codeArray[0].split(",").length, 3);
    }
};

function UnfixedObj(bo){
    this.betOrder = bo;
}

UnfixedObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        return "";
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        var listItem = null;
        return DirectCalcCount(codeArray,listItem,this.betOrder);
    }
};

function SumsObj(bo){
    this.betOrder = bo;
}

SumsObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        return "";
    },

    /**
     * @return {number}
     */
    GetCalcCount:function(codeArray)
    {
        return SumsCount(codeArray,this.betOrder);
    }
};

function GroupSumsObj(bo){
    this.betOrder = bo;
}

GroupSumsObj.prototype = {
    /**
     * @return {string}
     */
    CheckNum:function(codeArray)
    {
        return "";
    },

    /**
     * @return {number}
     */
    GetCalcCount:function (codeArray)
    {
        return SumsCount(codeArray,this.betOrder);
    }
};
/**
 * @return {number}
 */
function DirectCalcCount(codeArray,listItem,betOrder){
    var count = 0;

    if ((betOrder.GameType == GameType.SYXW) ||
        (betOrder.GameType == GameType.BJSC) ||
        (betOrder.GameType == GameType.Happy10))
    {
        count = listItem.length;
    }
    else
    {
        count = 1;
        for(var i=0; i<codeArray.length; i++)
        {
            count *= codeArray[i].length;
        }
    }

    return count;
}

/**
 * @return {number}
 */
function SumsCount(codeArray,betOrder){
    var numArray;
    if (betOrder.PlayType == PlayType.Sums)
    {
        numArray = [
            1, 3, 6, 10, 15, 0x15, 0x1c, 0x24, 0x2d, 0x37, 0x3f, 0x45, 0x49, 0x4b, 0x4b, 0x49,
            0x45, 0x3f, 0x37, 0x2d, 0x24, 0x1c, 0x15, 15, 10, 6, 3, 1 ];
    }
    else
    {
        numArray = [
            0, 1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14,
            14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1 ];
    }

    var count = 0;
    for(var i=0; i<codeArray.length; i++)
    {
        count += numArray[parseInt(codeArray[i])];
    }

    return count;
}

plusMinusControl.prototype={
  // 保留几位小数xiaoshu
  // plus 是否加
  plusMinus:function(obj,plus,xiaoshu,callback) {
    var val;
    var def=parseFloat(obj.def);

    var currentVal=parseFloat(obj.currentVal);
    var min=parseFloat(obj.min);
    var max=parseFloat(obj.max);
    var increment=parseFloat(obj.increment);
    // 加
    if(plus) {
      if(currentVal+increment>max) {
        callback(obj.type,max);
        return ;
      }
      if(xiaoshu==0) {
        val=currentVal+increment;
      }
      else {
        val=(currentVal+increment).toFixed(xiaoshu);
      }
    }
    else {
      if(currentVal-increment<min) {
        callback(obj.type,min);
        return ;
      }
      if(xiaoshu==0) {
        val=currentVal-increment;
      }
      else {
        val=(currentVal-increment).toFixed(xiaoshu);
      }
    }

    callback(obj.type,val);
  },
    chengChu: function(obj,plus,xiaoshu,callback){
        var val;
        var currentVal=parseFloat(obj.currentVal);
        var min=parseFloat(obj.min);
        var max=parseFloat(obj.max);
        var increment=parseFloat(obj.increment);
      if(plus) {
          if(currentVal*increment>max) {
              callback(obj.type,max);
              return ;
          }
          if(xiaoshu==0) {
              val=currentVal*increment;
          }
          else {
              val=(currentVal*increment).toFixed(xiaoshu);
          }
      } else {
          if(currentVal/increment<min) {
              callback(obj.type,min);
              return ;
          }
          if(xiaoshu==0) {
              val=currentVal/increment;
          }
          else {
              val=(currentVal/increment).toFixed(xiaoshu);
          }
      }
        callback(obj.type,val);

    },

  plusMinusObserver:function(obj,xiaoshu,callback) {
    var targetParentNode=obj.parentNode;
    var list=targetParentNode.getElementsByTagName("input");
    var targetNode=null;
    for(var i=0;i<=list.length-1;i++) {
      var childNode = list[i];
      targetNode=childNode;
      break;
    }
    var def=parseFloat(molibase.getAttr(targetParentNode,"def"));
    if(targetNode.value=="") {
      if(targetNode!=null) {
        targetNode.value=def+"";
      }
      callback();
      return ;
    }
    var currentVal=parseFloat(targetNode.value);
    var min=parseFloat(molibase.getAttr(targetParentNode,"min"));
    var max=parseFloat(molibase.getAttr(targetParentNode,"max"));
    var increment=parseFloat(molibase.getAttr(targetParentNode,"increment"));
    if(currentVal<min) {
      currentVal=min.toFixed(xiaoshu)+"";
    }
    if(currentVal>max) {
      currentVal=max.toFixed(xiaoshu)+"";
    }
    if(targetNode!=null) {
      targetNode.value=currentVal+"";
    }
    callback();
  },
  CheckError:function (betOrder)
    {
        if(betOrder.MinLength == 0)
        {
            betOrder.MinLength = 1;
        }

        var result = new CheckResult();

        try
        {
            if ((betOrder.CodeArray == null) ||
                (betOrder.CodeArray.length == 0))
            {
                result.Error = "请输入号码!";
                return result;
            }

            var codeArray = betOrder.CodeArray;
            var input = codeArray.join(",");

            var isMatch = "";
            if (betOrder.PlayType == PlayType.SingleDouble ||
                betOrder.PlayType == PlayType.OneSingleDouble)
            {
                isMatch = input.match("^[大小单双,]{1,}$");
                if (null == isMatch)
                {
                    result.Error = "号码输入有误!";
                    return result;
                }
            }
            else if (betOrder.PlayType == PlayType.Fixed)
            {
                isMatch = input.match("^[0-9,-]{1,}$");
                if (null == isMatch)
                {
                    result.Error = "号码输入有误!";
                    return result;
                }
            }
            else
            {
                isMatch = input.match("^[0-9,]{1,}$");
                if (null == isMatch)
                {
                    result.Error = "号码输入有误!";
                    return result;
                }
                if ((((betOrder.GameType != GameType.SYXW) &&
                    (betOrder.GameType != GameType.BJSC) &&
                    (betOrder.GameType != GameType.Happy8)) &&
                    (betOrder.GameType != GameType.Happy10)) &&
                    !betOrder.IsInput)
                {
                    for (var i = 0; i < codeArray.length; i++)
                    {
                        codeArray[i] = codeArray[i].toString().replace(/,/g, "");
                    }
                }
            }

            for(i = 0; i<codeArray.length; i++)
            {
                if("" == codeArray[i])
                {
                    result.Error = "号码不能为空!";
                    return result;
                }
            }

            var ptc = PlayTypeCtl(betOrder);
            var str = ptc.CheckNum(codeArray);

            if ("" != str)
            {
                result.Error = "验证错误:[" + str + "]";
                return result;
            }

            result.Success = true;
            var count = 0;

            if (betOrder.IsInput)
            {
                var strArray4 = codeArray;
                for (var num4 = 0; num4 < strArray4.length; num4++)
                {
                    var str6 = strArray4[num4];
                    if (null != str6)
                    {
                        count++;
                    }
                }
            }
            else
            {
                count = ptc.GetCalcCount(codeArray);
            }

            //修复位数不正确报警
            if(betOrder.Places.length != betOrder.PlaceLength && betOrder.PlayType != 10)
            {
                result.Error = "选择位数不正确";
                return result;
            }

            result.Count = count;
        }
        catch(e)
        {
            result.Error = "验证号码时发生未知错误，请截图给客服人员以解决该问题！";
            result.Success = false;
        }

        return result;
    },
    ToCodeArray:function(betOrder,numSelectListInput)
    {
        //循环变量
        var i;
        var j;
        //字符串
        var joinStr = "";
        //返回结果数组
        var list = [];

        var numSelectList = [];
        //这些玩法只需要一行
        if(betOrder.PlayType == PlayType.Group ||
           betOrder.PlayType == PlayType.Group2 ||
           betOrder.PlayType == PlayType.Group3 ||
           betOrder.PlayType == PlayType.Group6 ||
           betOrder.PlayType == PlayType.GroupSums ||
           betOrder.PlayType == PlayType.RX ||
           betOrder.PlayType == PlayType.Sums ||
           betOrder.PlayType == PlayType.SYXWGroup2 ||
           betOrder.PlayType == PlayType.SYXWGroup3)
        {
            numSelectList[0] = numSelectListInput[0];
        }
        else
        {
            numSelectList = numSelectListInput;
        }

        //玩法是合值
        if(PlayType.Sums      == betOrder.PlayType ||
           PlayType.GroupSums == betOrder.PlayType)
        {
            for(i=0; i<numSelectList.length; i++)
            {
                for(j=0; j<numSelectList[i].NumList.length; j++)
                {
                    list.push(numSelectList[i].NumList[j]);
                }
            }
        }
        //玩法是定位
        else if(PlayType.Fixed == betOrder.PlayType)
        {
            //游戏选择号码可以有多少行
            var num = betOrder.PlaceLength;

            //总循环,可以有多少行就循环多少次
            for(i=0; i<num; i++)
            {
                //搜索
                for(j=0; j<numSelectList.length; j++)
                {
                    if(i == numSelectList[j].NumIndex)
                    {
                        break;
                    }
                }

                //如果没有搜索到,就填写"-"
                if(j == numSelectList.length)
                {
                    list.push("-");
                }
                //否则的话就叠加在一起
                else
                {
                    //两个字符使用","隔开
                    if(betOrder.DoubleNumber)
                    {
                        joinStr = ",";
                    }
                    else
                    {
                        joinStr = "";
                    }
                    list.push(numSelectList[j].NumList.join(joinStr));
                }
            }
        }
        //其他玩法
        else
        {
            for(i=0; i<numSelectList.length; i++)
            {
                if(betOrder.DoubleNumber &&
                   betOrder.PlayType != PlayType.OneSingleDouble)
                {
                    joinStr = ",";
                }
                else
                {
                    joinStr = "";
                }
                list.push(numSelectList[i].NumList.join(joinStr));
            }
        }
        return list;
    },

  /**
   * @return {string}
   */
  //betOrder        压住结构体
  //strInputNum     手动录入
  //numSelectList   选择输入
 UpdateInfo:function(betOrder,strInputNum,numSelectList)
  {
      //循环变量
      var i;
      //赋值给CodeArray
      var str;
      //得到整理的字符串,主要是去空格,整理逗号
      var getStr;

      //如果是手动输入
      if(betOrder.IsInput)
      {
          //如果是两位数
          if(betOrder.DoubleNumber)
          {
              getStr = strInputNum.replace(/,\s/g, ",").replace(/\s\s/g, ",").split("\r");
              for (i = 0; i < getStr.length; i++)
              {
                  getStr[i] = getStr[i].replace(/\s/g, ",");
              }
              str = getStr.join(" ");
          }
          else
          {
              getStr = strInputNum.replace(/,\s/g, ",").split("\r");
              for (i = 0; i < getStr.length; i++)
              {
                  getStr[i] = getStr[i].trim();
              }
              str = getStr.join(" ");
              str = str.replace(/\s\s/g, ",");
          }

          //使用正则分割
          str = str.split(/[、;\s　,，]/);
      }
      else
      {
          str = this.ToCodeArray(betOrder,numSelectList);
      }

      betOrder.CodeArray = str;

      //选择按钮时显示
      var SelectedNumbers = "";
      //如果不是手动输入
      if(!betOrder.IsInput)
      {
          //11选5和北京赛车 用"|",其他的用","隔开
          if(GameType.SYXW == betOrder.GameType ||
             GameType.BJSC == betOrder.GameType )
          {
              SelectedNumbers = betOrder.CodeArray.join("|");
          }
          else
          {
              SelectedNumbers = betOrder.CodeArray.join(",");
          }
      }

      return SelectedNumbers;
  }
};

function LotteryUtil(){
}

LotteryUtil.prototype = {
    CheckError:function (betOrder)
    {
        if(betOrder.MinLength == 0)
        {
            betOrder.MinLength = 1;
        }

        var result = new CheckResult();

        try
        {
            if ((betOrder.CodeArray == null) ||
                (betOrder.CodeArray.length == 0))
            {
                result.Error = "请输入号码!";
                return result;
            }

            var codeArray = betOrder.CodeArray;
            var input = codeArray.join(",");

            var isMatch = "";
            if (betOrder.PlayType == PlayType.SingleDouble ||
                betOrder.PlayType == PlayType.OneSingleDouble)
            {
                isMatch = input.match("^[大小单双,]{1,}$");
                if (null == isMatch)
                {
                    result.Error = "号码输入有误!";
                    return result;
                }
            }
            else if (betOrder.PlayType == PlayType.Fixed)
            {
                isMatch = input.match("^[0-9,-]{1,}$");
                if (null == isMatch)
                {
                    result.Error = "号码输入有误!";
                    return result;
                }
            }
            else
            {
                isMatch = input.match("^[0-9,]{1,}$");
                if (null == isMatch)
                {
                    result.Error = "号码输入有误!";
                    return result;
                }
                if ((((betOrder.GameType != GameType.SYXW) &&
                    (betOrder.GameType != GameType.BJSC) &&
                    (betOrder.GameType != GameType.Happy8)) &&
                    (betOrder.GameType != GameType.Happy10)) &&
                    !betOrder.IsInput)
                {
                    for (var i = 0; i < codeArray.length; i++)
                    {
                        codeArray[i] = codeArray[i].replace(/,/g, "");
                    }
                }
            }

            for(i = 0; i<codeArray.length; i++)
            {
                if("" == codeArray[i])
                {
                    result.Error = "号码不能为空!";
                    return result;
                }
            }

            var ptc = PlayTypeCtl(betOrder);
            var str = ptc.CheckNum(codeArray);

            if ("" != str)
            {
                result.Error = "验证错误:[" + str + "]";
                return result;
            }

            result.Success = true;
            var count = 0;

            if (betOrder.IsInput)
            {
                var strArray4 = codeArray;
                for (var num4 = 0; num4 < strArray4.length; num4++)
                {
                    var str6 = strArray4[num4];
                    if (null != str6)
                    {
                        count++;
                    }
                }
            }
            else
            {
                count = ptc.GetCalcCount(codeArray);
            }

            //修复位数不正确报警
            if(betOrder.Places.length != betOrder.PlaceLength && betOrder.PlayType != 10)
            {
                result.Error = "选择位数不正确";
                return result;
            }

            result.Count = count;
        }
        catch(e)
        {
            result.Error = "验证号码时发生未知错误，请截图给客服人员以解决该问题！";
            result.Success = false;
        }

        return result;
    }
};

var plusMinusControl=new plusMinusControl();
var betOrder = new BetOrder();
var lotteryUtil = new LotteryUtil();
export {
    plusMinusControl,
    betOrder,
    lotteryUtil
}
// module.exports=plusMinusControl;
// module.exports=betOrder;
