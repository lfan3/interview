const source = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 2,
  name: 'div'
}
]

// ! i did it so many times, but i still do not know it immediatly. technique: link the id with itself!!!
function jsonToTree(data) {
  const result = [];
  const map = {};
  if(!Array.isArray(data)){
    return result;
  }
  data.forEach((d)=>{
    map[d.id] = d;
  })
  data.forEach((d)=>{
    const parent = map[d.pid];
    if(parent){
      const {children} = parent;
      if(children){
        parent.children.push(d)
      }else{
        parent.children = [d];
      }
    }else{
      result.push(d);
    }
  })
  return result
}

const {children } = {a:1};
const t = jsonToTree(source);
console.log(t[0],t[0].children[0])
