/**
* 浏览器操作
*/

export const BomCtrl = {
    /**
     * 客户端判断
     * @return {String} （android / ios / windows / mac / other）
     */
    systemJudge() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        let isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        let str = '';
        if (isAndroid) {
            str = 'android'
        } else if (isIOS) {
            str = 'ios';
        } else if (isWin) {
            str = 'windows';
        } else if (isMac) {
            str = 'mac';
        } else {
            str = 'other';
        }
        return str;
    },
    /**
     * 设备判断
     * @return {String} （android / ios / wechart / qq / other）
     */
    deviceJudge() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let isWx = u.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
        let isQQ = u.toLowerCase().match(/QQ/i) == "qq";
        let str = '';
        if (isAndroid) {
            str = 'android'
        } else if (isIOS) {
            str = 'ios';
        } else if (isWx) {
            str = 'wechart';
        } else if (isQQ) {
            str = 'qq';
        } else {
            str = 'other';
        }
        return str;
    },
    /**
     * 控制浏览器全屏函数，进入全屏
     */
    enterFullScreen() {
        var ele = document.documentElement;
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
            ele.webkitRequestFullScreen();
        }
    },
    /**
     * 控制浏览器全屏函数，退出全屏
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    },
    /**
     * 动态控制元素进入全屏
     * @param {ElementObject} [element] (Dom对象)
     */
    launchFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    },
    /**
     * 判断是否是全屏
     * @return {Boolean} true => 全屏
     */
    isFullScreen() {
        return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
    },
    /**
     * 获取视窗宽高
     * @return {Object}
     */
    getWindowInfo() {
        let w = document.documentElement.clientWidth
            || document.body.clientWidth;
        let h = document.documentElement.clientHeight
            || document.body.clientHeight;
        return { w, h };
    },
};