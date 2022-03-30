/**
* DOM操作
*/

export default {
    /**
     * 获取元素相对浏览器视窗的位置
     * @param {Element} [element]
     * @return {Object}
     */
    getRect(element) {
        let rect = element.getBoundingClientRect();
        let top = document.documentElement.clientTop; // 兼容IE
        let left = document.documentElement.clientLeft;
        const { w, h } = this.getWindowInfo();
        return {
            left: rect.left - left,
            top: rect.top - top,
            bottom: h - rect.bottom - top,
            right: w - rect.right - left
        }
    },
    /**
     * 获取元素的大小
     * @param {Element} [element]
     * @return {Object}
     */
    getElementWH(element) {
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        return {
            width,
            height,
        }
    },
};