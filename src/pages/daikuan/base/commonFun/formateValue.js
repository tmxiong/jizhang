/**
 * Created by zoufeng on 2017/6/12.
 */
export function FormatInDecimal(value) {
    return "[type]decimal[/type]"+"[value]" + parseFloat(value) +"[/value]";
}
export function FormatInInt(value) {
    return "[type]int[/type]" + "[value]" + parseInt(value) + "[/value]";
}

export function FormatDataTime(date,time){
    return "[type]datetime[/type][value]"+ date + " " + time+"[/value]";
}

export function FormatData(date){
    return "[type]datetime[/type][value]"+ date + " 00:00:01" + "[/value]";
}

export function FormatDataByString(sData){
    return "[type]datetime[/type][value]"+ sData + " 00:00:00" + "[/value]";
}