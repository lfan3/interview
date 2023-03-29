async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')

/**
 * my answer ❌
 * srcipt start
 * async1 start
 * promise1
 * script end ---
 * async1 success
 * async1 end
 * 
 * correct answer ✅
 * srcipt start
 * async1 start
 * promise1
 * srcipt end
 * 
 * 原因 await 没结果 
 * await后面的代码用不执行
 * 包括后面的then
 */