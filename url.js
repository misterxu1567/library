/**
* 地址栏操作
*/

export const Url = {
    /**
     * 获取地址栏参数
     * @param {String} [name]
     * @return {String}
     * eg: www.abc.com?id=2&type=museum; getQueryFn('type'); // museum
     */
    getQuery(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // let r = window.location.search.substr(1).match(reg);
        let str = window.location.href.split('?')[1]; // 注意此处已使用?分割防止前端路由#出现的异常情况
        if (!str) {
            return null;
        }
        let r = str.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
};