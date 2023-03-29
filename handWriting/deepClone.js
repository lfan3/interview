const testVal  = {
  a: "1",
  b: 2,
  c: [1, 2, "asd", { a: { a: { a: [1, 2] } } }],
  d: { a: 1, b: "2", c: [[[]]] },
  e: null,
  f: undefined,
  g: true,
};

const simple = {a:1, b:{e:3,f:9}, c:[12,11]};

const circle  = {
  a: {z:1},
  b: 2,
  c: [1, 2, "asd", { a: { a: { a: [1, 2] } } }],
  d: { a: 1, b: "2", c: [[[]]] },
  e: null,
  f: undefined,
  g: true,
  k: {z:1},
  m: new String('123'),
  n: new Boolean(false)
};

function deepClone(obj, valueSet = new Set()){
  if(typeof obj !== "object" || obj === null){
    return obj;
  }
  if(valueSet.has(obj)){
    return obj;
  }else{
    valueSet.add(obj);
  }
  
  if(isSimpleType(obj)){
    console.log('sssimp', obj)
    // 易错点：constructor  的获取方式，不在后面加括号
    const ctor = obj.constructor;
    return new ctor();
  }
  
  const keys = Object.keys(obj);
  const targetObject = Array.isArray(obj)?[]:{};
  while(keys.length){
    const key = keys.shift();
    targetObject[key] = deepClone(obj[key], valueSet);
  }
  return targetObject;
}

const d = Object.prototype.toString.call(new String('124'));
const c = d.slice(8,-1);

function isSimpleType(data){
  const type = Object.prototype.toString.call(data).slice(8,-1);
  return ['Number','Boolean','String'].includes(type);
}

// 
function simpleDeepClone(obj){
  if(obj === null || typeof obj !== 'object'){
    return obj;
  }
  const keys = Object.keys(obj);
  const target = Array.isArray(obj) ? [] : {};
  
  for(let key of keys){
    target[key] = simpleDeepClone(obj[key]);
  }
  return target;
}

// simple['a'][0] = 4;
// const m = deepClone(circle);
// console.log(m)

const m = simpleDeepClone(simple);
console.log(m);