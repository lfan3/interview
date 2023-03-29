async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")

/**
 * my answ  ❌
 * async1 start
 * async2
 * async1 end
 * start
 * timer2
 * timer1
 * timer3
 * 
 * correct answer ✅
 * async1 start
 * async2
 * start
 * async1 end
 * timer2
 * timer3
 * timer1
 * 
 * 原因 await async2 下面的代码会被block住。先运行主进程上的timer3 和start
 * 所以setTimeout 的执行顺序是 timer2 timer3 timer1
 */