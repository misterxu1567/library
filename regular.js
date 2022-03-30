/**
* 正则
*/

export default {
    /**
     * 正则类型验证
     * @param {String} [str] (验证字符串)
     * @param {String} [type] 验证类型（email/idCard/phone/number/postalcode）
     * @return {Boolean} （true => 正确, false => 错误）
     */
    typeValidate(str, type) {
        let email = /^[\w|.]+[@]\w+[.][\w.]+$/;
        let idCard = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
        let phone = /^1[3|4|5|6|7|8|9]\d{9}$/;
        let postalcode = /^\d{6}$/;
        let chinese = /[^\a-zA-Z\u4E00-\u9FA5]/g; // 汉字/拼音
        let number = /\D/g;
        let a_num = /\W/g; // 仅限数字、字母、下划线 等价于[^A-Za-z0-9_]
        let pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/; // 数字和字母组合必须 6-16位
        let bool = false;
        switch (type) {
            case 'email':
                bool = email.test(str);
                break;
            case 'idCard':
                bool = idCard.test(str);
                break;
            case 'phone':
                bool = phone.test(str);
                break;
            case 'postalcode':
                bool = postalcode.test(str);
                break;
            case 'chinese':
                bool = !chinese.test(str);
                break;
            case 'number':
                bool = !number.test(str);
                break;
            case 'a_num':
                bool = a_num.test(str);
                break;
            case 'pwd':
                bool = pwd.test(str);
                break;
            default:
                alert('未知类型');
        }
        return bool;
    },
};