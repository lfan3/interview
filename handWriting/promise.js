/**
 * description
 * 作者：Sunshine_Lin
 * 链接：https://juejin.cn/post/6994594642280857630
 * 来源：稀土掘金
 */

//第一步 promise obj 里面有 promiseState promiseResult
// 第二步 promise同步执行executor
// 第三步状态是不可逆的
// 第四步 如果有throw 要走reject 。add try catch block around executor
// 第五步 实现 then(res=>console.log(res), error=>console.log(error))
// let p1 = new Promise((resolve, reject) => {
//   resolve('成功')
//   reject('失败')
// })
// console.log('p1', p1)

/**
 * 实现步骤 知识点
一）实现 executor(resolve, reject)
1、执行了resolve，Promise状态会变成fulfilled
2、执行了reject，Promise状态会变成rejected
3、Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected
4、Promise中有throw的话，就相当于执行了reject
二）实现then(onfulfilled, onRejected)
1,then接收两个回调，一个是成功回调，一个是失败回调
2,当Promise状态为fulfilled执行成功回调，为rejected执行失败回调
3,如resolve或reject在定时器里，则定时器结束后再执行then   --- 难点
4,then支持链式调用，下一次then执行受上一次then返回值的影响  --- 非常难点

总结：
0) executor 是给一个成功结果的承诺或者失败结果的承诺， then 得到成功或者失败的结果R之后，通过对应的callback对R进行处理
1）promise 含有 promiseResult promiseState 和 onFulfilledcallback and onRejectedCallback 数组组成
2）执行了resolve 或者 reject的函数 是不可逆的
 */

class MyPromise{
  constructor(executor){
    this.promiseResult = null;
    this.promiseState = 'pending';
    this.onFulfilledCb = [];
    this.onRejectedCb = [];
    try{
      executor(this.resolve, this.reject);
    }catch(error){
      this.reject(error);
    }
  }
  static all = (promiseArr)=>{
    const result = [];
    // 需要用counte，因为promise 返回的结果不一定按照顺序
    let count = 0;
    const allPromises = new MyPromise((resolve, reject)=>{
      // put the resulte at the right index place
      const addData = (data, index)=>{
        result[index] = data;
        count++;
        console.log(count, promiseArr.length)
        if(count === promiseArr.length){
          resolve(result);
        }
      }
      // todo 加错误判断
      if(promiseArr.length > 0){
        promiseArr.forEach((p,i) => {
          if(p instanceof MyPromise){
            p.then(res => {addData(res, i)}, error=>reject(error))
          }else{
            addData(p, i)
          }
        })
      }
    })
    return allPromises;
  }
  // 无论成功与否，返回第一个值
  static race = (promiseArr)=>{
    const racePromise = new MyPromise((resolve, reject)=>{
      promiseArr.forEach((p, i)=>{
          if(p instanceof MyPromise){
            p.then(res=>resolve(res), error=>reject(error))
          }else{
            raceResulte(p);
          }
      })
    })
    return racePromise;
  }
  resolve = (data)=>{
    if(this.promiseState !== 'pending') return;
    this.promiseState = 'fulfilled';
    this.promiseResult = data;
    if(this.onFulfilledCb.length){
      this.onFulfilledCb.shift()(this.promiseResult);
    }
  }
  reject = (error)=>{
    if(this.promiseState !== 'pending') return;
    this.promiseState = 'rejected';
    this.promiseResult = error;
    if(this.onRejectedCb.length){
      this.onRejectedCb.shift()(this.promiseResult);
    }
  }
  simpleThen = (onFulfilled, onReject)=>{
    console.log('then', this.promiseState)
    // 校验
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onReject = typeof onReject === 'function' ? onReject : error =>error;
    if(this.promiseState === 'fulfilled'){
      onFulfilled(this.promiseResult);
    }else if(this.promiseState === 'rejected'){
      onReject(this.promiseResult);
    }else{
      this.onFulfilledCb.push(onFulfilled);
      this.onRejectedCb.push(onReject);
    }
  }
  thenExplain = (onFulfilled, onReject)=>{
    // 首先要判断onFulfilled, onReject 是否是函数
    // then 应该return 一个promise
    // then 里面的callback可以是一个简单的函数，也可能是一个promise，也可能是setTimeout（在promise里面已经处理了）
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val;
    onReject = typeof onReject === 'function' ? onReject : val=>val;
    
    var thenPromise = new MyPromise((resolve, reject)=>{
      if(this.promiseState === 'fulfilled'){
        try{
          const result = onFulfilled(this.promiseResult);
          if(result === thenPromise){
            throw Error('Not return promise itself');
          }
          if(result instanceof MyPromise){
            result.then(res => resolve(res));
          }else{
            resolve(result)
          }
        }catch(error){
          reject(error);
          throw Error('thenPromise error', error);
        }
      }else if(this.promiseState === 'rejected'){
        try{
          const result = onReject(this.promiseResult);
          if(result === thenPromise){
            throw Error('Not return promise itself');
          }
          if(result instanceof MyPromise){
            result.then(res => reject(res));
          }else{
            reject(result)
          }}catch(error){
            reject(error);
            throw Error('thenPromise error', error);
          }
      }else{
        this.onFulfilledCb.push(onFulfilled);
        this.onRejectedCb.push(onReject);
      }
    })
    return thenPromise;
  }
  then = (onFulfilled, onReject)=>{
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onReject = typeof onReject === 'function' ? onReject : error =>error;
    
    // can not use const here
    var thenPromise = new MyPromise((resolve, reject)=>{
      const resolvePromise = cb => {
        setTimeout(()=>{
          try{
            const x = cb(this.promiseResult);
            console.log('x',x)
            // ??how to return itself？？？
            if(x === thenPromise){
              throw new Error("不能返回自身");
            }
            if(x instanceof MyPromise){
              x.then(resolve, reject);
            }else{
              resolve(x);
            }
          }catch(err){
            reject(err);
            throw new Error("不能返回自身");
          }
        })
      }
      if(this.promiseState === 'fulfilled'){
        resolvePromise(onFulfilled);
      }else if(this.promiseState === 'rejected'){
        resolvePromise(onReject);
      }else{
        this.onFulfilledCb.push(onFulfilled);
        this.onRejectedCb.push(onReject);
      }
      
    })
    return thenPromise;
  }
}

// const test1 = new MyPromise((resolve, reject) => {
//   reject('失败')
//   resolve('成功')
// })
// console.log(test1) 

// const test3 = new MyPromise((resolve, reject) => {
//   throw('失败x')
// })
// console.log(test3) 

// 输出 ”成功“
// const test = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('成功')
// }, 3000)
// }).then(res => console.log("suc",res), err => console.log("failed",err)).then(res => console.log("suc",res), err => console.log("failed",err))

// const test5 = new MyPromise((resolve, reject) => {
//   resolve(100) 
// }).then(4)
//   .then(res => console.log('成功', res), err => console.log('失败', err))

//   const test6 = new Promise((resolve, reject) => {
//     resolve(200) 
//   }).then(4)
//     .then(res => console.log('成功', res), err => console.log('失败', err))
  
// const test3 = new Promise((resolve, reject) => {
//   resolve(3)
//   // reject(100) // 输出 状态：成功 值：300
// }).then(res =>new Promise((resolve, reject) => resolve(3 * res)))
//   .then(res => console.log('成功', res), err => console.log('失败', err))
  
// const test4 = new MyPromise((resolve, reject) => {
//   resolve(3)
// }).then(res =>new Promise((resolve, reject) => resolve(3 * res)))
//   .then(res => console.log('成功', res), err => console.log('失败', err))

// const p = new MyPromise((resolve, reject) => {
//   resolve(1)
// }).then(res => console.log(res), err => console.log(err))

function fetch(url){
  return new MyPromise((res, rej)=>{
    console.log('start fetching '+url)
    setTimeout(()=>{
      res(url);
      console.log('end fetching '+url)
    }, Math.random() * 1000)
  })
}
function fetchError(url){
  return new MyPromise((res, rej)=>{
    console.log('start fetching '+url)
    setTimeout(()=>{
      rej(url);
      console.log('end fetching '+url)
    }, Math.random() * 1000)
  })
}
// const p1 = fetch('a');
// const p2 = fetchError('b');
// const p3 = fetch('c');

// MyPromise.race([p1, p2, p3]).then(res=>{console.log("res1",res);}, error=>{console.log('err',error)});















