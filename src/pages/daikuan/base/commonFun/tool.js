module.exports = (function () {
    var mlregexp = {};

    mlregexp.test = function (pattern, str) {
        return pattern.test(str);
    };

    mlregexp.isDigital = function (str) {

        var pattern = /^[\d]+$/i;
        return pattern.test(str);
    };

    mlregexp.isLetter = function (str) {

        var pattern = /^[a-z]+$/i;
        return pattern.test(str);
    };

    mlregexp.isLetterAndDigital = function (str) {

        var pattern = /^[a-z\d]+$/i;
        return pattern.test(str);
    };


    mlregexp.isEmail = function (str) {

        var pattern = /^[a-z\d]+[@][a-z\d]+[.][a-z\d]+$/i;
        return pattern.test(str);
    };

    mlregexp.isUnsignedInt = function (str) {

        var pattern = /^[1-9]{1}/i;
        var tmp = pattern.test(str);
        if (!tmp) {
            pattern = /^[1-9]{1}[0-9]+$/i;
            tmp = pattern.test(str);
        }
        return tmp;
    };

    mlregexp.isMobile = function (str) {

        var pattern = /^[1]{1}[0-9]{10}$/i;
        tmp = pattern.test(str);
        return tmp;
    };

    mlregexp.isTelephone = function (str) {

        var pattern = /^[0-9]+[-][0-9]+$/i;
        tmp = pattern.test(str);
        return tmp;
    };

    mlregexp.isRuoPwd = function (str) {

        var pattern1 = /^[a-z\D]{1}[0-9]+[a-z\D]{1}$/i;
        var tmp = pattern1.test(str);
        return tmp;
    };

    mlregexp.isZhongPwd = function (str) {

        var pattern1 = /^[a-z\D]{1}[0-9]+[a-z\D]{1}$/i;
        var pattern2 = /^[a-z\D]{1}[0-9]+$/i;
        var pattern3 = /^[0-9]+[a-z\D]{1}$/i;
        var tmp = pattern1.test(str) || pattern2.test(str) || pattern3.test(str);
        return tmp;
    };

    return mlregexp;
})();
