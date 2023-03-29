const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];

function fetch(url){
  return new Promise((res, rej)=>{
    console.log('begin of fetch '+ url);
    
    setTimeout(()=>{
      res(url);
      console.log('end of fetch '+ url);
    }, 2000) 
  })
}

async function request(url){
  try{
    const res = await fetch(url);
    console.log('request res ', res);
  }catch(e){
    console.log('request error', e);
  }
}

//串行
async function serialFlow(){
  const res1 = await fetch(allRequests[0]);
  const res2 = await fetch(allRequests[1]);
  console.log('serialFlow res1 ', res1);
  console.log('serialFlow res2 ', res2);
}
// 通过recursive串行
async function serialFlowRecursive(urls, i, result){
  if(i > 5) {
    console.log('result of serialFlow2', result);
    return;
  };
  const res = await fetch(urls[i]);
  result[i] = res;
  serialFlowRecursive(urls, i+1, result);
}

//并行
async function parallelFlow(){
  const p1 = fetch(1);
  const p2 = fetch(2);
  
  const res1 = await p1;
  const res2 = await p2;
  
  console.log('parallelFlow res1 ', res1);
  console.log('parallelFlow res2 ', res2);
}

// 通过loop并行
async function parallelFlowLoop(urls){
  const len = urls.length;
  
  for(let i=0; i<len; i++){
    // const p = fetch(urls[i]);
    // const res = await p;  ---- 如果这样的写的话 就会变成 sequence， await 后面的东西会block住。 因此loop并行的话，需要一个类似于request的function 来包住 await fetch（）
    request(urls[i]);
  }
}


// parallelFlowR();
parallelFlowLoop(allRequests);
