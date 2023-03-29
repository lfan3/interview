// 时间戳
function throttle(fn, wait){
  let previous = 0;
  return function(...args){
    const now =  +new Date();
    if(now - previous > wait){
      previous = now;
      fn.apply(this, args);
    }
  }
}

// 定时器⏲
function throttle2(fn, wait){
  let timer;
  return function(...args){
    if(!timer){
      timer = setTimeout(()=>{
        fn.apply(null,args);
        clearTimeout(timer);
      },wait)
    }
  }
}

// 定时器2version⏲
function throttle3(fn, wait){
  let timer;
  return function(...args){
    fn.apply(null,args);
    if(!timer){
      timer = setTimeout(()=>{
        clearTimeout(timer);
      },wait)
    }
  }
}

// 可以控制最后一次回调的防抖
// @option {leading:true} {tailing:true}
// par default: leading + tailing
function throttle3(fn, wait, option){
  let timeout;
  let previous = 0;
  let result;
  let context;
  let args;
  
  if(!option) option = {};
  let later = function(){
    // 防止内存泄露
    timeout = null;
    result = fn.apply(context, args);
    if(!timeout) context = args = null;
  };
  // 用时间戳来控制第一次是否运行。
  let throttled = function(){
    let now = +new Date();
    //! 设置了leading=false 并且第一次触发
    if(!previous && option.leading === false) previous = now;
    // !用来判断的值
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果到时间触发 remaining<=0
    // 或者没有设置 leading=false
    if(remaining<=0){
      previous = +new Date();
      result = fn.apply(context, args);
      if(!timeout) context = args = null;
    } else if (!timeout && option.tailing !==false ){
      // 用定时器控制最后一次运行
      timeout = setTimeout(later, remaining);
    }
    return result;
  }
  return throttled;
}

const fn = (n)=>{
  console.log('ok',n);
}
const fn2 = (n)=>{
  console.log('ok2',n);
}
let i = 0;
const fnt = throttle(fn, 1000);
const fnt2 = throttle3(fn2, 0, {tailing:true, leading:true});


// fnt2(1)
// fnt2(2)
// fnt2(3)
// fnt2(4)
// setInterval(()=>fnt2(i++), 500)
// 防抖再次
function th(fn, wait){
  let timer = null;
  return function(...args){
    if(!timer){
      timer = setTimeout(()=>{
        clearTimeout(timer);
      }, wait);
      fn.apply(null,args);
    }
  }
}

// 可以最后一次执行 也可以第一次执行
function thLast(fn, wait){
  let previous = 0;
  let timerout = null;
  let remaining = 0;
  let context = null;
  let argu = null;
  
  const later = ()=>{
    fn.apply(context, argu);
    timerout = null;
  }
  
  return function(...args){
    let curr = +new Date();
    remaining = wait - (curr - previous);
    argu = args;
    context = this;
    if(remaining < 0){
      previous = curr;
      fn.apply(null,args);
      timerout = null;
    }
    if(!timerout && remaining > 0){
      //!难点像下面注释部分那样直接写 会有问题
      timerout = setTimeout(later,remaining);
      // timerout = setTimeout(()=>{
      //   fn.apply(null, args);
      // },remaining);
    }
  }
}

function c(n){
  console.log(n);
}

const t = thLast(c, 3000);
t(4);
t(3);
t(2);
t(1);

