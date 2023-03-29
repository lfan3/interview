function fetch(url){
  return new Promise((res,rej)=>{
    console.log('start fetching: '+ url);
    setTimeout(()=>{
      res(url);
      console.log('end fetching: '+ url);
    }, Math.random()*100)
  })
};

async function request(url){
  try{
    const response = await fetch(url);
    return response;
  }catch(e){
    console.log('request error', url)
  }
}
// ! 需要理解index 的问题

async function multipleRequest(urlArr,max){
  // 卡住问题二 怎么返回 结果
  return new Promise((res, rej)=>{
    const requestTotal = urlArr.length;
    let count = 0;
    let index = -1;
    const responses = [];
    
    if(requestTotal === 0){
      res(responses);
    }
    // 卡死：解决不了index的问题。
    // const requestRecursive = async(url, index)=>{
    //   if(count >= request) return response;
    //   const response = await multipleRequest(url);
    //   responses[index] = response;
    //   count++;
    // }
    
    // why need a i and why i must declared inside the block
    // index 是对发送请求的数量的控制。count是对返回result的数量限制
    // 如果count 够了，就可以返回所有答案。如果 index 够了，就不需要在多发请求。
    const requestRecursive = async()=>{
      index++;
      if(index >= requestTotal) return;
      const i = index;
      try{
        const res = await fetch(urlArr[i]);
        responses[i] = res;
      }catch(e){
        responses[i] = 'error: '+e;
      }finally{
        count++;
        console.log('count fi',count);
        
        if(count>=requestTotal){
          return res(responses);
        }else{
          requestRecursive()
        }
      }
    }
    // 卡住问题三：index 不停增长,because max??为什么index 会超出？和max number相关
    
    for(let i=0; i<max; i++){
      // here the requestRecursive works councurrently / almost parellel
      requestRecursive();
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

multipleRequest(allRequests, 4).then(r => 
  console.log('r',r)
)