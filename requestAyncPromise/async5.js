async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1');
    resolve('1');
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('script end')

/**
 * my answer ✅
 * srcipt start
 * async1 start
 * promise1
 * script end ---
 * async1 success
 * async1 end
 * 
 * 难点：
 * async1.then() 仍然是promise 放到microqueue
 * 所以先 script end 
 */