// ------------- basic variable and function -----------------
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
    console.log('start fetching '+url)
    setTimeout(()=>{
      res(url);
      console.log('end fetching '+url)
    }, Math.random() * 1000)
  })
}

function fetchError(url){
  return new Promise((res, rej)=>{
    console.log('start fetching '+url)
    setTimeout(()=>{
      rej(url);
      console.log('end fetching '+url)
    }, Math.random() * 1000)
  })
}

async function request(i, result){
  if(i === allRequests.length) {
    console.log('1 ', result);
    return;
  } 
  let response = await fetch(allRequests[i]);
  result[i] = response;
  request(i+1, result);
}

async function requestR(i){
  try{
    if(i<2) await fetch(allRequests[i]);
    else await fetchError(allRequests[i]); 
  }catch(e){
    console.log('requestR Error', i);
  }
}

// ---------------------------- demo1 function -------------
// paralle 可以同时发送request
async function request2(){
  try{
    requestR(0)
    console.log('festch0')
    requestR(1)
    console.log('festch1')
    requestR(2)
    console.log('festch2')
  }catch(error){
    // 这个地方catch不到requestR里面的错误, await的错误 必须在写await function的地方catch 就是在requestR里面try catch
    console.log('request2 Error', error);
  }
}
// request2 的recursive版本
async function request2Recur(urls, i){
  if(i === urls.length) return;
  requestR(i);
  request2Recur(urls, i+1);
}

// sequence await block住了 所以是一个一个发送request
async function request3(){
  try{
    await fetch(allRequests[0])
    console.log('festch0')
    await fetch(allRequests[1])
    console.log('festch1')
    await fetchError(allRequests[2])
    console.log('festch2')
  }catch(error){
    // 这里的error可以捕捉到
    console.log('request3 Error', error);
  }

}
// sequence request3 的recursive版本with Errorhandling
async function request3Recur(i, result){
  if(i === allRequests.length) {
    console.log('1 ', result);
    return;
  } 
  try{
    let response;
    if(i<2){
      response = await fetch(allRequests[i]);
    }else{
      response = await fetchError(allRequests[i]);
    }
    result[i] = response;
    request3Recur(i+1, result);
  }catch(error){
    console.log('request3Recur Error', error);
  }
}
// sequence request
async function request3RecurEasy(i, result){
  if(i === allRequests.length) {
    console.log('1 ', result);
    return;
  } 
  let response =  await fetch(allRequests[i]);
  result[i] = response;
  request3RecurEasy(i+1, result);
}

// 额外的一个recursive版本
function requestParallel(){
  const result = [];
  let count = 0;
  const addResult = (data, i)=>{
    result[i] = data;
    count++;
    if(count === allRequests.length -1){
      console.log('2 ', result)
    }
  }
  const recursive = (i)=>{
    if(i === allRequests.length) return;
    if(i<2) fetch(allRequests[i]).then(res=>addResult(res,i), error=>console.log("requestParallel error ", error));
    else fetchError(allRequests[i]).then(res=>addResult(res,i), error=>console.log("requestParallel error ", error));
    recursive(i+1);
  }
  recursive(0)
}

// request2();
// request3();
requestParallel()
// request2Recur(allRequests, 0);

// todo i want to knwo how it shows in http request debug tools

/**
 * 
 * 总结
 * await 后面的代码是block住的。但是这个block只在一个scope中有效。
 */