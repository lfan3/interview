// 去最少同时保持顺序
// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”
const a = "aaabbbcceeff";
const b = "ababac";
// todo:需要看下优化方案
function deleteMin(str){
  const map = new Map();
  let s = '';
  
  for(let i=0; i<str.length; i++){
    if(!map.has(str[i])){
      map.set(str[i], 1);
    }else{
      let n = map.get(str[i]);
      map.set(str[i], n+1);
    }
  }
  
  const values = Array.from(map.values());
  const sorted = values.sort((a,b)=>a-b);
  const min = sorted[0];
  
  for(let i=0; i<str.length; i++){
      if(!(map.get(str[i]) === min)){
      s += str[i]
    }
  }
  return s;
}

const m = deleteMin(a);
const n = deleteMin(b);
console.log('m ',m);
console.log('n ',n);
