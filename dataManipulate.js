/**
* 数据操作
*/

export default {
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
     */
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
     */
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
        let cpObj = obj instanceof Array ? [] : {};
        for (let key in obj) {
            cpObj[key] = this.deepClone(obj[key])
        };
        return cpObj;
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
     * @param {String} [type] (类型: 'string','number','boolean','undefined','null','array','function'; '_object')
     * @return {Boolean}
     */
    isDataType(data, type) {
        if (arguments.length === 0) {
            return;
        }
        if (type === 'array') {
            return Array.isArray(data);
        }
        if (type === 'null') {
            return data === null;
        }
        if (type === '_object') {
            return Object.prototype.toString.call(data) === '[object Object]';
        }
        return typeof data === type;
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
    /**
     * 为树结构数据设置唯一_treeId（提供给el-table设置row-key使用）
     * @param {Array} [data] 
     */
    setTreeId(data) {
        const deepSet = (arr, deep = 0, parentTreeId) => {
            let _deep = deep + 1;
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (parentTreeId) {
                    item._treeId = parentTreeId + '_' + _deep + '_' + i;
                } else {
                    item._treeId = _deep + '_' + i;
                }
                if (item.children) {
                    deepSet(item.children, _deep, item._treeId);
                }
            }
        }
        deepSet(data);
    },
    /**
     * 计算总额函数
     * @param {Array} [array] 
     * @param {String} [prop] 
     * @returns {Number} 
     */
    calculationSum(array, prop) {
        let sum = array.reduce((pre, current) => {
            return pre + current[prop];
        }, 0);
        return sum;
    },
    /**
     * 数组元素移动，上移
     * @param {Array} [array]
     * @param {Number} [index] (当前索引)
     */
    up(array, index) {
        if (index === 0) {
            return;
        } else {
            array[index] = array.splice(index - 1, 1, array[index])[0];
        }
    },
    /**
     * 数组元素移动，下移
     * @param {Array} [array]
     * @param {Number} [index] (当前索引)
     */
    down(array, index) {
        if (index === array.length - 1) {
            return;
        } else {
            array[index] = array.splice(index + 1, 1, array[index])[0];
        }
    },
    /**
     * 数组元素移动，置顶
     * @param {Array} [array]
     * @param {Number} [index] (当前索引)
     */
    top(array, index) {
        let item = array.splice(index, 1)[0];
        array.unshift(item);
    },
    /**
     * 数组元素移动，置底
     * @param {Array} [array]
     * @param {Number} [index] (当前索引)
     */
    bottom(array, index) {
        let item = array.splice(index, 1)[0];
        array.push(item);
    },
    /**
     * 首字母小写
     * @param {String}
     * @return {String}
     */
    firstToLowerCase(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    },
    /**
     * list结构转tree结构数据
     * @param {Array} [list]
     * @param {String} [key] (节点唯一属性名)
     * @param {String} [parentKey] (父节点的唯一属性名，用于关系映射)
     * @param {String} [rootValue] (根节点的值)
     * @return {Array} (tree结构数据)
     * eg: 
     * const list = [{id: '0', name:'根', parentId: '-1'},{id: '1', parentId: '0', name: '节点1'}]
     * 其中: key = 'id', parentKet = 'parentId', rootValue = '-1'
     */
    transformListToTree(list, key, parentKey, rootValue) {
        const group = {}
        list.forEach(item => {
            const parentId = item[parentKey]
            if (!Object.prototype.hasOwnProperty.call(group, parentId)) {
            group[parentId] = []
            }
            group[parentId].push(item)
        })
        list.forEach(item => {
            const id = item[key]
            if (Object.prototype.hasOwnProperty.call(group, id)) {
            item.children = group[id]
            }
        })
        if (group[rootValue]) {
            return group[rootValue]
        }
    }
};
