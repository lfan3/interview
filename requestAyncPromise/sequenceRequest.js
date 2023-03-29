function request(url){
  return new Promise((res, rej)=>{
    console.log("promise start :"+ url)
    setTimeout(()=>{
      res(url);
      console.log("promise done")
    }, Math.random() * 1000)
  })
}

// ？？ how promise works in the event loop？？？
// onSucess 的处理 和 error的处理
// 对规定数量的request的处理
function sequenceRecursiveTask(res,urls, i, onFailure){
  if(i >= urls.length){
    console.log('request finished');
    return;
  }
  if(res){
    console.log('do something with sequenceTask res', res);
  }
  
  request(urls[i]).then((res)=>sequenceRecursiveTask(res,urls, i+1, onFailure)).catch(onFailure);
}

function concurrentRecursiveRequest(urls, i, requestNumber){
  if(i >= requestNumber){
    console.log('request finished');
    return;
  }
  request(urls[i]).then(res => console.log('res ', res));
  concurrentRecursiveRequest(urls, i+1, requestNumber);
}



function onSuccess(res){
  console.log("sss ", res);
}

function onFailure(reason){
  console.log(reason);
}

const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];

function downloadOneAync(urls, onSuccess, onfailure){
  var n = urls.length;
  function tryNextUrl(i){
    if(i>=n){
      onfailure("All download fails");
      return;
    }
    downloadAsync(urls[i], onSuccess, function(){
      tryNextUrl(i+1);
    })
  }
  tryNextUrl(0);
}

concurrentRecursiveRequest(allRequests, 0, allRequests.length);
// sequenceRecursiveTask(null, allRequests, 0, onFailure)

