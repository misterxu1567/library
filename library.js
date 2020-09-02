/**
* 工具库函数
*/

const Library = {
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
    /**
     * 时间戳转译
     * @param {Number} [time] 时间戳（ms）
     * @return {String} 当天 || 昨天 || 本周 || 年-月-日 时:分 （说明，将某一天的时间转换成，15:00，昨天，周一，2019.01.02 15:30）
    */
    timeToSpecialTranslate(time) {
        let timeTranslate = function (num) {
            return num < 10 ? `0${num}` : num
        };
        let date = new Date(time);
        let y = 1900 + date.getYear();
        let m = timeTranslate((date.getMonth() + 1));
        let d = timeTranslate(date.getDate());
        let creat_w = date.getDay(); // 创建的周？
        let hh = timeTranslate(date.getHours());//时
        let mm = timeTranslate(date.getMinutes());//分
        // 当前时间戳
        let currentDate = new Date();
        let current_y = 1900 + currentDate.getYear();
        let current_m = currentDate.getMonth() + 1;
        let current_d = currentDate.getDate();
        let current_w = currentDate.getDay(); // 当天周？ (0-6)
        let current_ymd_s = `${current_y}/${current_m}/${current_d} 00:00:00`; // 当天0点的时间
        let currentStamp_s = new Date(current_ymd_s).getTime(); // 当天0点的时间戳
        // 判断
        if (time >= currentStamp_s) {
            // 当天
            return hh + ':' + mm;
        }
        if (time <= currentStamp_s && time >= (currentStamp_s - (24 * 60 * 60 * 1000))) {
            // 昨天
            return '昨天';
        }
        // 当天 0:0:0 的时间戳
        let todayStamp_s = new Date(`${current_y}/${current_m}/${current_d}`).getTime();
        let weekRange = (24 * 60 * 60 * 1000) * (current_w == 0 ? 6 : current_w - 1); // 本周的范围
        if (time >= (todayStamp_s - weekRange)) {
            let w = '';
            switch (creat_w) {
                case 1:
                    w = '一';
                    break;
                case 2:
                    w = '二';
                    break;
                case 3:
                    w = '三';
                    break;
                case 4:
                    w = '四';
                    break;
                case 5:
                    w = '五';
                    break;
            }
            // 一周内
            return '周' + w;
        }
        // 其他返回年月日
        return `${y}.${m}.${d} ${hh}:${mm}`;
    },
    /**
     * 时间戳转译
     * @param {Number} [type] （包含：YY-MM-DD | YY-MM-DD H:M:S | H:M:S | objDate） （注：objDate => 返回一个对象形式的当前时间）
     * @param {Number} [time] 时间戳（ms），如果不传递将返回当前的时间
     * @return {String | Object}
    */
    timeToYMDHMS(type, time) {
        let timeTranslate = function (num) {
            return num < 10 ? `0${num}` : num
        };
        let date = time ? new Date(parseInt(time)) : new Date();
        let y = 1900 + date.getYear();
        let m = timeTranslate(date.getMonth() + 1);
        let d = timeTranslate(date.getDate());
        let h = timeTranslate(date.getHours());
        let min = timeTranslate(date.getMinutes());
        let s = timeTranslate(date.getSeconds());
        let str = '';
        switch (type) {
            case 'YY-MM-DD':
                str = `${y}-${m}-${d}`;
                break;
            case 'YY-MM-DD H:M:S':
                str = `${y}-${m}-${d} ${h}:${min}:${s}`;
                break;
            case 'H:M:S':
                str = `${h}:${min}:${s}`;
                break;
            case 'objDate':
                str = { y, m, d, h, min, s };
                break;
            default:
                str = `${y}-${m}-${d} ${h}:${min}:${s}`;
                break;
        }
        return str;
    },
    /**
     * 日期转时间戳（毫秒）
     * @param {String} [data] ('2020/07/28 20:11')
     * @return {Number} (时间戳，ms)
    */
    dateToTimeStamp(date) {
        if (date) {
            return new Date(date).getTime();
        } else {
            return date;
        }
    },
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
     * 生成区间随机整数(注：会重复)
     * @param {Number} [m] 最大数
     * @param {Number} [n] 最小数
     * @return {Number}
    */
    getLimitRandom(m, n) {
        let max = Math.max(m, n);
        let min = Math.min(m, n);
        let arr = [];
        for (let i = min; i < max; i++) {
            arr.push(i);
        }
        let num = Math.floor(Math.random() * (max - min));
        return arr[num];
    },
    /**
     * 生成区间随机整数(注：不会重复, 其他说明：当区间内的数全部随机完之后，会返回 'undefined')
     * @param {Number} [m] 最大数
     * @param {Number} [n] 最小数
     * @return {Number | undefined}
    */
    getLimitRandomNoRepeat(m, n) {
        if (window.getLimitRandomNoRepeatNum) {
            window.getLimitRandomNoRepeatNum += 1;
        } else {
            window.getLimitRandomNoRepeatNum = 1;
        }
        if (window.getLimitRandomNoRepeatNum === 1) {
            let max = Math.max(m, n);
            let min = Math.min(m, n);
            window.randomLimitArr = [];
            for (let i = min; i < max; i++) {
                window.randomLimitArr.push(i);
            }
        }
        let index = Math.floor(Math.random() * (window.randomLimitArr.length - 1));
        let num = window.randomLimitArr[index];
        window.randomLimitArr.splice(index, 1);
        return num;
    },
    /**
     * 数组对象排序
     * @param {Array<Object>} [data] 排序数组
     * @param {String} [props] 排序的参照属性
     * eg: 
     *  [{name:'x',age:2}, {name:'y',age:1}, {name:'z',age:3}] 
     *  => 
     *  objArraySort(data, 'age')
     *  => 
     *  [{name:'y',age:1}, {name:'x',age:2}, {name:'z',age:3}])
    **/
    objArraySort(data, props) {
        function fn(obj1, obj2) {
            let val1 = obj1[props];
            let val2 = obj2[props];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        };
        return data.sort(fn);
    },
    /**
     * 生成不重复ID
     * @return {String}
    **/
    createRandomId() {
        return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    },
    /**
     * 查询一维数组重复出现的数据的次数 
     * eg:  ["李","弟","李"] => {李: 2, 弟: 1}
     * @param {Array} [arr]
     * @return {Object}
    */
    getRepeatNum(arr) {
        return arr.reduce(function (prev, next) {
            prev[next] = (prev[next] + 1) || 1;
            return prev;
        }, {});
    },
    /**
     * 深拷贝 
     * @param {Object} [obj]
     * @return {Object}
    */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        var cpObj = obj instanceof Array ? [] : {};
        for (var key in obj) cpObj[key] = this.deepClone(obj[key]);
        return cpObj;
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
     * 判断两个数组是否相等(数组内只包含一层对象，当前不支持多层对象数据判断)
     * @param {Array} [arr1]
     * @param {Array} [arr2]
     * @return {Boolean} true => 相等，false => 不等
    */
    judgeArraryEqual(arr1, arr2) {
        let array1 = JSON.parse(JSON.stringify(arr1)).sort();
        let array2 = JSON.parse(JSON.stringify(arr2)).sort();
        return JSON.stringify(array1) == JSON.stringify(array2);
    },
    /**
     * 判断常用类型
     * @param {Any} [data] (需要验证数据)
     * @return {String} ('string','number','boolean','undefined','null','array','function'; '_object' => 表示普通的对象（非null、非函数数、非数组）)
    */
    dataType(data) {
        if (arguments.length === 0) {
            return;
        }
        if (typeof data === 'object') {
            if (Array.isArray(data)) {
                return 'array';
            } else if (data === null) {
                return 'null';
            } else {
                return '_object'
            }
        } else {
            return typeof data;
        }
    },
    /**
     * 小数加减乘除精度还原
     * @param {Number} [num1] (计算的左侧数据)
     * @param {Number} [num2] (计算的右侧数据)
     * @param {String} [type] (计算类型（'+', '-', '*', '/'）注意必须为英文字符)
     * @return {String}
    */
    calculationDecimal(num1, num2, type) {
        let _num1 = parseFloat(num1);
        let _num2 = parseFloat(num2);
        let _num1_left = _num1.toString().split('.')[0];
        let _num1_right = _num1.toString().split('.')[1] || '0'; // 如果为整数，小数点后取0
        let _num2_left = _num2.toString().split('.')[0];
        let _num2_right = _num2.toString().split('.')[1] || '0'; // 如果为整数，小数点后取0
        let length1 = _num1_right.length;
        let length2 = _num2_right.length;
        let minLength = Math.min(length1, length2); // 最小长度
        let maxLength = Math.max(length1, length2); // 最大长度
        let dValueLength = maxLength - minLength; // 长度差值
        let value = 0;
        if (type === '+') {
            let value1 = parseFloat(_num1_left) + parseFloat(_num2_left); // 小数左侧整数相加值
            let value2 = 0;
            if (length1 < length2) {
                let n1 = parseFloat(_num1_right) * Math.pow(10, dValueLength); // 换算后的等量右侧小数
                value2 = (n1 + parseFloat(_num2_right)) / Math.pow(10, maxLength);
            } else {
                let n2 = parseFloat(_num2_right) * Math.pow(10, dValueLength); // 换算后的等量右侧小数
                value2 = (parseFloat(_num1_right) + n2) / Math.pow(10, maxLength);
            }
            value = (value1 + parseFloat(value2.toString().split('.')[0])) + '.' + value2.toString().split('.')[1];
        }
        return value;
    },
    /**
     * 数组交换位置(注：会修改原数组，不想修改原数组请传递复制的数据)
     * @param {Array} [arr] 
     * @param {Number} [index1] (索引)
     * @param {Number} [index2] (索引)
     * @return {Array}
    */
    swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    },
    /**
     * 正则从字符串中提取数字(注：会修改原数组，不想修改原数组请传递复制的数据)
     * @param {String} [str] 
     * @return {Array}
     * eg: '大米:2.57斤/元,白菜:3.65元/斤'; // ["2.75","3.65"]
    */
    getNumFromStr(str) {
        return str.match(/\d+(.\d+)?/g);
    },
    /**
     * 手机号切割显示
     * eg: （15637977112 =>  156-3797-7112）
     * @param {String | number} [phoneNumber] 
     * @return {String}
    */
    phoneToLine(phoneNumber) {
        let str = phoneNumber + '';
        if (str.length === 11) {
            return `${str.substring(0, 3)}-${str.substring(3, 7)}-${str.substring(7)}`;
        }
        return '';
    },
    /**
     * 获取最大最小值
     * eg: [2,3,1,9,5] => [1,9]
     * @param {Array} [array] 
     * @return {Array} [最小值，最大值]
    */
    getMinMax(array) {
        let min = Math.min.apply(null, array);
        let max = Math.max.apply(null, array);
        return [min, max]
    },
    /**
     * 分割字符串重构为对象
     * @param {String} [str] (例：querys=a:1,b:2)
     * @param {String} [mark1] (例：':')
     * @param {String} [mark2] (例：',')
     * @return {Object} (例：{a:1,b:2})
    */
    splitStrToObj(str, mark1, mark2) {
        let arr = str.split(mark1);
        let obj = {};
        arr.forEach(item => {
            let arrKeyVal = item.split(mark2);
            obj[arrKeyVal[0]] = arrKeyVal[1];
        });
        return obj;
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
     * 文件编码，base64转blob
     * @return {Object}
    */
    convertBase64UrlToBlob(base64) {
        let arr = base64.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    },
};

export default Library;
