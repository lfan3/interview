setTimeout(()=>{
  console.log(1)
},0)

new Promise((resolve)=>{
  console.log(2);
  resolve();
  console.log(3);
}).then(res=>{
  console.log(4)
})

console.log(5)