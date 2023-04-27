var promisePool = async function(functions, n) {
  return new Promise((res)=>{
    const len = functions.length;
    // 记住result 对应的index
    const queue = functions.map((f, i)=>([i, f]))
    // 判断是否全部请求得到回复
    let count = 0;
    const result = Array(len);
    // 无法判断什么时候完全结束
    const request = async()=>{
      try{
        if(queue.length){
          const [index, fn] = queue.shift();
          const r = await fn();
          result[index] = r;
          count++;
          request();
        }
      }finally{
        console.log('c', count, len)
        if(count>=len){
          res(result);
        }
      }
    }
    const num = Math.min(n, len);
    for(let i=0;i<num;i++){
      request()
    }
    // 如果functions 的length 是0
    if(!num){
      return res([])
    }
  })
};

var promisePool = async function(functions, n) {
  return new Promise((res)=>{
    let count = 0;
    // 不能从零开始因为，并行的时候 前几个会一直是零
    let i = 0;
    // let i = -1;
    const len = functions.length;
    const result = [];
    // 无法判断什么时候完全结束
    const request = async()=>{
      try{
        if(i<len-1){
          console.log('i1', i)
          const r = await functions[i]();
          console.log('i2', i)
          i++
          
          //这里i 最后几个会一直是len-1， len-1，len-1
          result.push(r);
          count++;
          request();
        }
      }finally{
        if(count>=len){
          res(result);
        }
      }
    }
    const num = Math.min(n, len);
    for(let i=0;i<num;i++){
      request()
    }
    // 如果functions 的length 是0
    if(!num){
      return res([])
    }
  })
};

var promisePool2 = (functions, n)=>{
  const res = []
  const iter = functions.entries()
  //????why why why
  const workers = Array(n).fill(iter).map(work);
  console.log('workers', workers)
  return Promise.all(workers).then(() => res)

  async function work(entries) {
    for (const [index, task] of entries) {
      // eslint-disable-next-line no-await-in-loop
      const cur = await task()
      console.log('index', index)
      res[index] = cur
    }
  }
}
// promisePool2 的解释
// const entries = functions.entries()
// async function work(entries, i) {
//   for (const [index, task] of entries) {
//     // eslint-disable-next-line no-await-in-loop
//     const cur = await task()
//     console.log('index', index, i)
//     // res[index] = cur
//   }
// }
// work(entries, 1)
// work(entries,2)



functions = [
  () => new Promise(res => setTimeout(res(2), 1000)),
  () => new Promise(res => setTimeout(res(4), 200)),
  () => new Promise(res => setTimeout(res(8), 200)),
  () => new Promise(res => setTimeout(res(10), 200)),
  () => new Promise(res => setTimeout(res(12), 200)),
  () => new Promise(res => setTimeout(res(14), 200)),
]
// console.log('ff');

// promisePool([], 2).then(res=>{
//   console.log('fin', res)
// })
// console.log('ss');

promisePool(functions, 2).then(res=>{
  console.log('fin', res)
})




