/**
* 工具库函数
*/

const Library = {
    // 获取地址栏参数（#前）
    getQuery(name) {
        // @params: name => 想要获取的地址栏参数（eg: www.abc.com?id=2&type=museum; getQueryFn('type')）
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
    // 函数节流
    throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 500)
    },
    // 正则类型验证
    typeValidate(str, type) {
        // @params: str => 验证字符串, type => 验证类型（email/idCard/phone/number/postalcode）
        let email = /^[\w|.]+[@]\w+[.][\w.]+$/;
        let idCard = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
        let phone = /^1[3|4|5|6|7|8|9]\d{9}$/;
        let postalcode = /^\d{6}$/;
        let chinese = /[^\a-zA-Z\u4E00-\u9FA5]/g; // 汉字/拼音
        let number = /\D/g;
        let a_num = /\W/g; // 仅限数字、字母、下划线 等价于[^A-Za-z0-9_]
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
            default:
                alert('未知类型');
        }
        return bool; //@return: true => 通过, false => 不通过返回
    },
    // ***时间相关***
    // 时间戳 ＝> 当天 || 昨天 || 本周 || 年-月-日 时:分 （说明，将某一天的时间转换成，15:00，昨天，周一，2019.01.02 15:30）
    timeToSpecialTranslate(time) {
        // @params: time => 时间戳（ms）
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
    // 获取当前时间 (年-月-日 时:分:秒)
    getNowTime(type) {
        // @params: type => 返回当前时间的类型（包含：YY-MM-DD / YY-MM-DD H:M:S / H:M:S / objDate） （注：objDate => 返回一个对象形式的当前时间）
        let timeTranslate = function (num) {
            return num < 10 ? `0${num}` : num
        };
        let date = new Date();
        let y = date.getFullYear();
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
    // 时间戳 ＝> 年－月－日 时：分
    timeToYMDHMS(time, type) {
        // @params: time => 时间戳（ms）
        let timeTranslate = function (num) {
            return num < 10 ? `0${num}` : num
        };
        let date = new Date(parseInt(time));
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
    // 客户端判断（android / ios / windows / mac / other）
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
        return str; // @return: android / ios / windows / mac / other
    },
    // 设备判断（android / ios / wechart / qq）
    deviceJudge() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isWx = u.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
        let isQQ = u.toLowerCase().match(/QQ/i) == "qq";
        let str = '';
        if (isAndroid) {
            str = 'android'
        } else if (isIOS) {
            str = 'ios';
        } else if (isWx) {
            str = 'wechart'; // 微信
        } else if (isQQ) {
            str = 'qq';
        } else {
            str = 'other';
        }
        return str; // @return: android / ios / wechart / qq
    },
    // 生成区间随机整数 (注：会重复)
    getLimitRandom(m, n) {
        // @params: m, n => 两个区间边缘值
        let max = Math.max(m, n);
        let min = Math.min(m, n);
        let arr = [];
        for (let i = min; i < max; i++) {
            arr.push(i);
        }
        let num = Math.floor(Math.random() * (max - min));
        return arr[num];
    },
    // 生成区间随机整数 (注：不会重复, 其他说明：当区间内的数全部随机完之后，会返回 'undefined')
    getLimitRandomNoRepeat(m, n) {
        // @params: m, n => 两个区间边缘值
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
        return num; // @return: Number / 'undefined'
    },
    // 数组对象排序 
    /**
     * eg: 
     *  [{name:'x',age:2}, {name:'y',age:1}, {name:'z',age:3}] 
     *  => 
     *  objArraySort(data, 'age')
     *  => 
     *  [{name:'y',age:1}, {name:'x',age:2}, {name:'z',age:3}])
     *  */
    objArraySort(data, props) {
        // @params: props => 排序的参照属性
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
    // ***文件编码

};

export default Library;


