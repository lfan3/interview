const arr = [1,2];
const obj = {a:'1', b:2};

for(let i in arr){
  console.log(i);
}

for(let i of arr){
  console.log(i);
}

for(let k in obj){
  console.log(k)
}

// ❌ obj is not iterable
// for(let k of obj){
//   console.log(k)
// }

console.log("array key:",Object.keys(arr));

