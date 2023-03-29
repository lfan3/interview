
Promise.prototype.myAll = (promiseArr)=>{
  return new Promise((resolve, reject)=>{
    const result = [];
    let count = 0;
   
    promiseArr.forEach((p, index)=>{
      p.then((res)=>{
        if(count >= promiseArr.length-1){
          resolve(result);
        }
        result[index] = res;
        count++;
      }).catch((err)=>{
        console.log('error ',err);
        throw new Error(err)
      })
    })
  })
}

function fetch(url){
  return new Promise((res,rej)=>{
    console.log('start fetching: '+ url);
    setTimeout(()=>{
      res(url);
      console.log('end fetching: '+ url);
    }, Math.random()*100)
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

const arr = allRequests.map(r => fetch(r));
const p = Promise.resolve(2)
// promise.all 是promise的静态方法，所以其实这里面用prototype不是特别合适。
// 结果返回的也是一个promise，返回数组
// Promise.all(arr).then(res=>console.log('all ',res))
p.myAll(arr).then(res=>console.log('all ',res))
