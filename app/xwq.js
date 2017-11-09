var ee = function(selector, context) {
  context = context || document
  return context.querySelector(selector)
}

var es = function(selector, context) {
  context = context || document
  return context.querySelectorAll(selector)
}

const log = function() {
  // console.log(arguments);
  console.log.apply(console, arguments)
}

var removeClassAll = function(className, context) {
  // console.log('context', context);
  var cs = es("." + className, context)
  for (var i = 0; i < cs.length; i++) {
    cs[i].classList.remove(className)
  }
}

const removeActiveAll = function(context) {
  // console.log('context', context);

  var cs = es(".active", context)
  for (var i = 0; i < cs.length; i++) {
    cs[i].classList.remove("active")
  }
}


var bindEvent = function(selector, listener, callback) {
  var ele = document.querySelector(selector)
  ele.addEventListener(listener, callback)
}


var bindAll = function(elements, listener, callback) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener(listener, callback)
  }
}


function A_toggle_B(a, b) {
  a.addEventListener('click', function() {
    b.classList.toggle('none')
  })
  return b.classList.contains('none')
}


var toggle_style_display = function(element, style) {
  if (typeof element == 'string') {
    element = ee(element)
  }
  if (element.style.display == style) {
    element.style.display == 'none'
  } else {
    element.style.display = style
  }
}


function findIndexs(arr, n) {
  let result = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == n) {
      result.push(i)
    }
  }
  return result
}


var ckXian = function() {
  var body  = document.querySelector('body')
  var style ='<style id="xm" media="screen"> * {outline: 1px red dashed!important} </style>'
  var i = false
  body.addEventListener('keydown', function(event) {
      if (event.keyCode === 77 && event.ctrlKey) {
          if (i) {
              var styletog = document.querySelector('#xm')
              styletog.remove()
              i = false
          } else {
              body.insertAdjacentHTML('afterbegin', style)
              i = true
          }
      }
  })
}() // 加载代码 使用 Ctrl + M 显示参考线


let date = new Date()
// console.dir(date);
// console.log( 'date.getTime()', (new Date()).getTime() );
// console.log( 'date.valueOf()', (new Date()).valueOf() );
// console.log( 'date.toUTCString()', (new Date()).toUTCString() );
// console.log('date.getFullYear()', date.getFullYear());
// console.log('date.getMonth()', date.getMonth());
// console.log('date.getDate()', date.getDate());
// console.log('date.getHours()', date.getHours());
// console.log('date.toLocaleDateString()', date.toLocaleDateString());
// console.log('date.toTimeString()', date.toTimeString());
// let time1 = (new Date()).toDateString()
// let time2 = (new Date()).toTimeString().slice(0, 8)
// let time0 = time1 + " " + time2

function get_current_time() {
    let time1 = (new Date()).toLocaleDateString()
    let time2 = (new Date()).toTimeString().slice(0, 8)
    let time0 = time1 + " " + time2
    // console.log('time0', time0);
    return (new Date())
}



function get_English_time(origin_date) {
    if (origin_date == undefined) {
        origin_date = get_current_time()
    }
    // console.log('origin_date', origin_date);
    let dt = new Date(origin_date)
    // console.dir(dt);
    // console.log('dt.toLocaleDateString()', dt.toLocaleDateString());
    let date = dt.toLocaleDateString().split('/').reverse().join('/')
    let time = dt.toTimeString().slice(0, 8)

    // console.log('date.slice(4)', date.slice(4, 24));
    // let UStime = date.slice(4, 24)
    // console.log('date', date);
    let UStime = date + " " + time

    return UStime
}


function time_from_id(id) {
  // body...
  let id8 = id.slice(0, 8)
  let ts = parseInt(id8, 16)
  var t,y,m,d,h,i,s;
  t = ts ? new Date(ts*1000) : new Date();
  y = t.getFullYear();
  m = t.getMonth()+1;
  d = t.getDate();
  h = t.getHours();
  i = t.getMinutes();
  s = t.getSeconds();
  // 可依据须要在这里定义时间格式
  return (d<10?'0'+d:d) + '/' + (m<10?'0'+m:m) + '/' + y +
          ' ' + (h<10?'0'+h:h) + ':' +
          (i<10?'0'+i:i) + ':' + (s<10?'0'+s:s)
}

// 求出 x 为底 y 的对数
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x)
}

// 判断长度相同的数组是否相等
function arrIsEq(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

var quis = function(array) {
    let s = new Set(array)
    return Array.from(s)
}

function back_login(argument) {
  // body...
  window.location.href = "/"
}
// 带有 token 的请求
function syncxhr(method, path, data, callback) {
  var r = new XMLHttpRequest()
  //设置方法和请求地址
  var path = baseurl + path
  r.open(method, path, false)
  //设置发送的数据的格式，当data不为空的时候，就需要设置
  r.setRequestHeader('Authorization', "Token " + token)
  r.setRequestHeader('Content-Type', "application/json")
  //注册响应函数
  r.onreadystatechange = function() {
    // console.log('r.status, r.readyState', r.status, r.readyState);
    if (r.status == 401) {
      back_login()
      // console.log('token', token);
    }

    if (r.readyState == 4) {
      // console.log(r.response);
      callback(JSON.parse(r.response), r.status)
    }
  }
  //发送请求
  r.send(data)
}
// 带有 token 的请求
function ajax(method, path, data, callback) {
  var r = new XMLHttpRequest()
  //设置方法和请求地址
  var path = baseurl + path
  r.open(method, path, true)
  //设置发送的数据的格式，当data不为空的时候，就需要设置
  r.setRequestHeader('Authorization', "Token " + token)
  r.setRequestHeader('Content-Type', "application/json")
  //注册响应函数
  r.onreadystatechange = function() {
    // console.log('r.status, r.readyState', r.status, r.readyState);
    if (r.status == 401) {
      back_login()
      // console.log('token', token);
    }

    if (r.readyState == 4) {
      // console.log(typeof r.response);
      callback(r.response, r.status)
    }
  }
  //发送请求
  r.send(data)
}



// 判断两点间的距离
function lengthof2p(p1, p2) {
  let xl = p1[0] - p2[0]
  let yl = p1[1] - p2[1]
  let sq = xl*xl + yl*yl
  // console.log('sq', sq);
  return Math.sqrt(sq)
}

function queryString(s, f1 = "&", f2 = "=") {
  if (s.startsWith("?")) {
    s = s.slice(1)
  }
  let arr = s.split(f1);
  // console.log('arr', arr);
  let obj = {};
  for (let kv of arr) {
    // sid=59783e2baac4391dc14be52b
    let kva = kv.split(f2)
    obj[kva[0]] = kva[1]

  }

  return obj
}
