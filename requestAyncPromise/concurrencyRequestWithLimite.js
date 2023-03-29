function fetch(url){
  return new Promise((res, rej)=>{
    console.log('start fetching '+url)
    setTimeout(()=>{
      res(url);
      console.log('end fetching '+url)
    }, Math.random() * 1000)
  })
}
const concurrencyRequest = (urls, maxNum)=>{
  return new Promise((resolve)=>{
    if(urls.length === 0){
      resolve([]);
      return;
    }
    const results = [];
    let index = 0;
    let count = 0;
    
    async function request(){
      if(index === urls.length) return;
      const i = index;
      const url = urls[index];
      index++;
      // 1：处理error，要在用await的地方处理
      try{
        const resp = await fetch(url);
        results[i] = resp;
      }catch(err){
        results[i] = err;
      }finally{
        count++;
        if(count === urls.length){
          console.log("finish");
          resolve(results);
        }
        // sequence parallel
        request();
      }
    }
    const timers = Math.min(maxNum, urls.length);
    for(let i=0; i<timers; i++){
      // 并发的request --- parallel,注意error的处理--建1
      request();
    }
  })
}
const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];




// const r = request(0, Array(6))
// const r1 = requestParallel(0, Array(6))

// concurrencyRequest(allRequests, 3);