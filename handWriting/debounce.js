const debounce = (fn, duration=100)=>{
  let timer;
  return function(){
    clearTimeout(timer);
    let args = arguments;
    timer = setTimeout(()=>{
      fn.apply(this, args);
    },duration)
  }
}

 

function abc(txt){
  console.log(txt);
}

abc('k');
abc('k');
abc('k');

const dabc = debounce(abc);
dabc('l');
dabc('l');
dabc('l');