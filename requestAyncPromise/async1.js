async function async1() {
  console.log("async1 start");
  new Promise(resolve => {
    console.log('promise');
  })
  console.log("async1 end");
}
async1();
console.log("start")
/**
 * my answer ❌
 * async1 start
 * start
 * promise async1 end
 * 
 * right ✅
 * async1 start
 * promise
 * async1 end
 * start
 * 
 * Promise 里面的不是在resove中 直接执行 + promise ne block pas le code apres
 */

