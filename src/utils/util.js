import { isURL } from '@/utils/validate'

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  let index = Math.floor((Math.random() * arr.length))
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  let event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj == 'object')) {
    return;
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)
      && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
      delete obj[key];
    }
  }
  return obj;
}

/**
 * 过滤空对象
 * @param obj
 * @returns {*}
 */
export function filterEmptyObj(obj) {
  if (!(typeof obj == 'object')) {
    return;
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)
      && (Object.keys(obj[key]).length == 0 || obj[key] == null || obj[key] == undefined || obj[key] === '')) {
      delete obj[key];
    }
  }
  return obj;
}


/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value, fmt) {
  var regPos = /^\d+(\.\d+)?$/;
  if (regPos.test(value)) {
    //如果是数字
    let getDate = new Date(value);
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt;
  } else {
    //TODO
    value = value.trim();
    return value.substr(0, fmt.length);
  }
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    let [length] = arguments
    // 生成指定长度的随机数字，首位一定不是 0
    let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    let [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
  let chats = '0123456789abcdef'
  return randomString(32, chats)
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string) {
  return string.replace(/_([a-z])/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 判断是否显示办理按钮
 * @param bpmStatus
 * @returns {*}
 */
export function showDealBtn(bpmStatus) {
  if (bpmStatus != "1" && bpmStatus != "3" && bpmStatus != "4") {
    return true;
  }
  return false;
}

export function getNextDayDate(AddDayCount,dd){
    var date = new Date(dd);
    date =+date + 1000*60*60*24*(AddDayCount);
    date = new Date(date);
	return date;
}

/**
 * 解析格式如'2012-10-15'的字符串
 * @param str
 */
export function parseDate(str) {
	//str = '2015-10-31'
    var dayArr = str.split('-');
    var t = new Date();
    t.setDate(Number(dayArr[2]));
    t.setMonth(Number(dayArr[1]) - 1);
    t.setFullYear(Number(dayArr[0]));
    return t;
}

export function stringToDate(date, format){
	if(typeof date == 'string'){
		date = parseTime(date);
    }
	date = new Date(date);
	var map = {
            "M": date.getMonth() + 1, //月份 
            "d": date.getDate(), //日 
            "h": date.getHours(), //小时 
            "m": date.getMinutes(), //分 
            "s": date.getSeconds(), //秒 
            "q": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
   return format;
}


/**
 * 排序，按指定的属性值排序
 * @param name
 * @param minor
 * @returns {Function}
 */
export function by_str(name, minor) {
	return function(o, p) {
		var a, b;
		if (typeof o === "object" && typeof p === "object" && o && p) {
			a = o[name];
			b = p[name];
			if (a === b) {
				return typeof minor === 'function' ? minor(o, p) : 0;
			}
			if (typeof a === typeof b) {
				if(isNaN(a) && isNaN(b)){
					return a < b ? -1 : 1;
				}else{
					return Number(a) < Number(b) ? -1 : 1;
				}
			}
			return typeof a < typeof b ? -1 : 1;
		}
	}
}


/**
 * 将对像进行排序
 * @param obj 对象
 * @param name 排序属性名
 * @param minor 子排序
 * @param desc 排序方式 desc 降序 asc 
 * @returns 返回排序好的对象数组
 */
export function obj_sort_by(obj,name,minor){
	var tmp = [];
	for(var k in obj){
		tmp.push(obj[k]);
	}
	tmp.sort(by_str(name,minor));
	return tmp;
}

export function parseTime(str){
    var dayArr = str.split(' ')[0].split('-');
    var timeArr = str.split(' ')[1].split(':');
    var t = new Date();
    t.setMilliseconds(0);
    t.setSeconds(Number(timeArr[2]));
    t.setMinutes(Number(timeArr[1]));
    t.setHours(Number(timeArr[0]));
    t.setDate(Number(dayArr[2]));
    t.setMonth(Number(dayArr[1]) - 1);
    t.setFullYear(Number(dayArr[0]));
    return t;
}

//制保留2位小数，如：2，会在2后面补上00.即2.00 
export function dealDecimal(x) { 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return false; 
  } 
  var f = Math.round(x*100)/100; 
  var s = f.toString(); 
  var rs = s.indexOf('.');
  if (rs < 0) { 
    rs = s.length; 
    s += '.'; 
  } 
  while (s.length <= rs + 2) { 
    s += '0'; 
  } 
  return s; 
}

//获取对象的长度
export function getLen(o) { 
	if(!o){
		return 0;
	}
   return Object.keys(o).length;
}