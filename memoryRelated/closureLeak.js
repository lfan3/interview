let a = [];
// function lm(){
//   for(let i=0; i<1000000; i++){
//     a.push(i);
//   }
// }


function sm(){
  let a = [];
  return function(){
    for(let i=0; i<1000000; i++){
      a.push(i);
    }
  }
}
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(used);
lm();

// const fn = sm();
// fn();
for(let i=0; i<1000000; i++){
  a.push(i);
}

const used2 = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(used2, a.length);

