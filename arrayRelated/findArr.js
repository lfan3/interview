// 比如这个函数输入一个1，那么要求函数返回A
const A = [1,2,3];
const B = [4,5,6];
const C = [7,8,9];

function test(num) {
  if(A.includes(num)){
    return 'A';
  }else if(B.includes(num)){
    return 'B';
  }else if(C.includes(num)){
    return 'C';
  }else{
    return null;
  }
}

const q = test(10);
const p = test(1);
const k = test(5);
console.log(q,p, k);