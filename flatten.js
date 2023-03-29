function flatten(arr, result=[]){
  for(let item of arr){
    if(Array.isArray(item)){
      flatten(item, result);
    }else{
      result.push(item);
    }
  }
  return result;
}

function flatten1(arr){
  return arr.reduce((acc,curr) => {
    return acc.concat(Array.isArray(curr) ? flatten1(curr): curr);
  },[])
}

function flatten2(arr){
  const response = [];
  
  const recur = (a)=>{
    if(Array.isArray(a)){
      a.forEach(item=>recur(item));
    }else{
      response.push(a);
    }
  }
  recur(arr);
  return response;
}

var array = [[1,2,3],4,5,6,[[7]],[]]
// const a = flatten(array);
const b = flatten1(array);
const c = flatten2(array);

// console.log(a);
console.log(c, array);

