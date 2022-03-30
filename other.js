/**
* 其他
*/

export const Other = {
    /**
     * 函数节流
     * @param {Function} [method]
     * @param {Object} [context] (上下文作用域)
     * @param {Number} [time]
     * @param {Any} [arg]
     */
    throttle(method, context, time = 500, arg) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context, arg);
        }, time)
    },
    /**
     * 将 html 字符串转为dom对象 
     * @param {String} [str]
     * @return {ElementObject} (默认返回第一个元素)
     */
    parseToDOM(str) {
        let divDom = document.createElement("div");
        if (typeof str == "string") {
            divDom.innerHTML = str;
        }
        return divDom.children[0];
    },
    /**
     * 颜色调整透明度
     * @param {String} [color] (#ffffff | #ff0000f0 | rgb(0,0,0) | rgba(0,0,0,0))
     * @param {String} [opacity] [0 - 1]
     * @return {String} color
     */
    colorToOpacity(color, opacity) {
        if (color.indexOf('#') > -1) {
            // 16进制
            let opacityMap = ['00', '03', '05', '08', '0A', '0D', '0F', '12', '14', '17', '1A', '1C', '1F', '21', '24', '26', '29', '2B', '2E', '30', '33', '36', '38', '3B', '3D', '40', '42', '45', '47', '4A', '4D', '4F', '52', '54', '57', '59', '5C', '5E', '61', '63', '66', '69', '6B', '6E', '70', '73', '75', '78', '7A', '7D', '80', '82', '85', '87', '8A', '8C', '8F', '91', '94', '96', '99', '9C', '9E', 'A1', 'A3', 'A6', 'A8', 'AB', 'AD', 'B0', 'B3', 'B5', 'B8', 'BA', 'BD', 'BF', 'C2', 'C4', 'C7', 'C9', 'CC', 'CF', 'D1', 'D4', 'D6', 'D9', 'DB', 'DE', 'E0', 'E3', 'E6', 'E8', 'EB', 'ED', 'F0', 'F2', 'F5', 'F7', 'FA', 'FC', 'FF'];
            let index = opacity * 100;
            let _opacity = opacityMap[index];
            let _color = color.replace('#', '');
            if (_color.length === 3) {
                // 暂不支持
            }
            if (_color.length === 6) {
                _color += _opacity;
            }
            if (_color.length === 8) {
                _color = _color.substring(0, 6) + _opacity;
            }
            return '#' + _color;
        } else if (color.indexOf('rgb') > -1) {
            let _color = color.replace(/[rgb|rgba\(|\)]/g, '').split(',')
            // rgb
            if (_color.length === 3) {
                _color.push(opacity);
            } else if (_color.length === 4) {
                _color.splice(3, 1, opacity);
            }
            return `rgba(${_color.join(',')})`;
        } else {
            throw error('颜色值错误, 不支持转换');
        }
    },
};

export default Other;
