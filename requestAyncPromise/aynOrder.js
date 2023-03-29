async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
// async1();

console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3');
});
console.log('script end');

/**
 * promise and async print order ?
 * 我的答案错了
 * script start
 * aysnc1 start
 * promise1
 * async2
 * aync1 end
 * promise3
 * setTimeout
 * script end
 * 正确答案
 * script start
async1 start
async2
promise1
promise2
script end
async1 end
promise3
setTimeout
 */

// todo： 理解async 和promise之间的顺序