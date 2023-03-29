async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}

async function async(){
  await testSometing();
  console.log("执行async");
}

function foo(i){
  console.log("foo ", i);
}

console.log('start')
async()
new Promise((res, rej)=>{
  console.log("执行promise");
  res("promise")
}).then(res=>{
  console.log('pp ', res)
})
process.nextTick(()=>foo(2));

/* 
执行testSometing
执行promise
start
*/