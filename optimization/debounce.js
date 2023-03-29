const debounce = function(fn, delay=200){
  let timer;
  return (...args)=>{
    // 考察闭包
    clearTimeout(timer);
    timer = setTimeout(()=>{
      // 考察apply
      fn.apply(null,args);
    },delay)
  }
}

const fn = (n,m)=> {console.log(n,m)};
const a = debounce(fn, 200);
a(5,1)
a(5,2)

