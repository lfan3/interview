// new Promise((resolve,reject)=>{
//   console.log("promise1")
//   resolve()
// }).then(()=>{
//   console.log("then11")
//   new Promise((resolve,reject)=>{
//       console.log("promise2")
//       resolve()
//   }).then(()=>{
//       console.log("then21")
//   }).then(()=>{
//       console.log("then23")
//   })
// }).then(()=>{
//   console.log("then12")
// })

// 1 11 2 21 12 23

// new Promise((resolve,reject)=>{
//   console.log("promise1")
//   resolve()
// }).then(()=>{
//   console.log("then11")
//   return new Promise((resolve,reject)=>{
//       console.log("promise2")
//       resolve()
//   }).then(()=>{
//       console.log("then21")
//   }).then(()=>{
//       console.log("then23")
//   })
// }).then(()=>{
//   console.log("then12")
// })
//---------
new Promise((resolve,reject)=>{
  console.log("promise1")
  resolve()
}).then(()=>{
  console.log("then11")
  new Promise((resolve,reject)=>{
      console.log("promise2")
      resolve()
  }).then(()=>{
      console.log("then21")
  }).then(()=>{
      console.log("then23")
  })
}).then(()=>{
  console.log("then12")
})
new Promise((resolve,reject)=>{
  console.log("promise3")
  resolve()
}).then(()=>{
  console.log("then31")
})

// todo：stack 分析
curr: [promise1 promise3]
micro:[promise1]


