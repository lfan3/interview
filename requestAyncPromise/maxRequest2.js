function fetch(url, time=500){
  return new Promise((res, rej)=>{
    setTimeout(()=>{
      res(url);
    }, time)
  })
}
function sendRequest(urls, max, callbackFunc) {
  const urlsLen = urls.length;
    // 等待排队的那个队列
  const blockQueue = [];
  // 现在请求的数量,表示现在已经发送了几个请求
  let currentReqNumbers = 0;
  // 发送并且有返回的请求数量
  let requestsDoneNumbers = 0;
  // 存储最后的结果
  const results = new Array(urlsLen).fill(0);

  // 如果urls总共比max还小，那么就使用Promise.all一起发出去
  if(urlsLen <= max) {
    const promiseAll = [];
    for(let i = 0;i<urlsLen;i++) {
      promiseAll.push(fetch(urls[i]));
    }
    Promise.all(promiseAll).then(curRes => {
      callbackFunc(curRes);
    }).catch((err)=> {
      callbackFunc(err);
    })
  }else {
    init();
  }

  async function init() {
    // 开始发送请求，如果超过最大max
    for (let i = 0; i < urlsLen; i++) {
      console.log('loop', i)
      request(i, urls[i]);
    }
  }

  // 这个index传过来就是为了对应好哪个请求，
  // 放在对应的results数组对应位置上的，保持顺序
  async function request(index, reqUrl) {
    // 阻塞队列增加一个 Pending 状态的 Promise，
    // 这里最关键，就是如果当前发送的请求已经超过最大请求数了，在这里holding住，等待状态的改变后，再执行
    if (currentReqNumbers >= max) {
      console.log('create block');
      await new Promise((resolve) => blockQueue.push(resolve));
      console.log('after')
    }
    reqHandler(index, reqUrl);
  }

  async function reqHandler(index, reqUrl) {
    currentReqNumbers++;
    console.log("现在i是" + index + " 正请求：");
    try {
      const result = await fetch(reqUrl, Math.random() * 1000 + 500);
      results[index] = result;
    } catch (err) {
      results[index] = err;
    } finally {
      currentReqNumbers--;
      requestsDoneNumbers++;
      console.log(`${index}请求结束`);

      if (blockQueue.length>0) {
        // 每完成一个就从阻塞队列里剔除一个
        // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled
        blockQueue[0]();
        blockQueue.shift();
        console.log(
          "消灭一个blockQueue第一个阻塞后，排队数为 : " + blockQueue.length
        );
      }
      if (requestsDoneNumbers >= urlsLen) {
        callbackFunc(results);
      }
    }
  }
}
const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];
sendRequest(allRequests, 2, (result) => console.log(result));