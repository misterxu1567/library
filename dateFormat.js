/**
* 日期格式化
*/

export const DateForMat = {
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
     * 时间戳 ＝> n天n时n分 100 000 / 1000 % 60 (用于倒计时)
     * @param {Number} [time] 时间戳（ms），如果不传递将返回-
     * @return {Object} {d, h, m, s}
     */
    timeToObj(time) {
        if (!time) {
            return '-';
        }
        let d = Math.floor(time / (24 * 60 * 60 * 1000));
        let h = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        let m = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
        let s = Math.floor((time / 1000) % 60);
        return { d, h, m, s };
    },
    
};
