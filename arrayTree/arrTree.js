const arr = [{
  id: 2,
  name: '部门B',
  parentId: 0
},
{
  id: 3,
  name: '部门C',
  parentId: 1
},
{
  id: 1,
  name: '部门A',
  parentId: 2
},
{
  id: 4,
  name: '部门D',
  parentId: 1
},
{
  id: 5,
  name: '部门E',
  parentId: 2
},
{
  id: 6,
  name: '部门F',
  parentId: 3
},
{
  id: 7,
  name: '部门G',
  parentId: 2
},
{
  id: 8,
  name: '部门H',
  parentId: 4
}
]

// {
//     id: 0,
//     pid: -1,
//     name: '面试',
//     children: [
//         {
//             id: 1,
//             pid: 0,
//             name: '计算机基础知识及原理',
//             children: [
//                 {
//                     id: 4,
//                     pid: 1,
//                     name: '编码'
//                 },
//                 {
//                     id: 5,
//                     pid: 1,
//                     name: '操作系统'
//                 },
function constructTree(arr){
  const map = new Map();
  let root = {};
  for(let i=0; i<arr.length; i++){
    map.set(arr[i].id, arr[i]);
  }
  for(let j=0; j<arr.length; j++){
    const parent = map.get(arr[j].parentId);
    if(!parent){
      root = arr[j];
    }else{
      children = parent.children;
      if(!children){
        parent.children = [];
      }
      parent.children.push(arr[j])
    }
  }
  return root;
}


// const root = constructTree(arr);
// todo deep clone
// 多少中可以判断的array的方法
// console.log("root",root.children[0].children[0])

function deepClone(obj){
  if(typeof obj === null || typeof obj !== "object"){
    return obj;
  }
  const keys = Object.keys(obj);
  const targetObj = Array.isArray(obj) ? [] : {};
  for(let key of keys){
    targetObj[key] = deepClone(obj[key]);
  }
  return targetObj;
}
//🙆🏻 解决对比输出答案
// const r = deepClone(root);
// console.log('r',r.children[0].children[0]);

function deepCompareValue(obj1, obj2){
  if(typeof obj1 !== typeof obj2){
    return false;
  }
  // 不需要再看obj2的type，上一步已经判断
  if(typeof obj1 !== "object" || typeof obj1 === null){
    if(obj1 !== obj2){
      return false;
    }
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  while(keys1.length && keys2.length){
    const key1 = keys1.shift();
    const key2 = keys2.shift();
    deepCompareValue(obj1[key1], obj2[key2]);
  }
  if(keys1.length || keys2.length){
    return false;
  }
  return true;
}

// todo test cases
// console.log(deepCompareValue({a:1},{a:1}));


function ConstructTree2(array){
  // 以id为key然后元素为value，这样在遍历数组的时候可以快速获取父节点
  this.root = null;
  this.map = new Map();

  this.construct = ()=>{
    for(let item of array){
      this.map.set(item.id, item);
    }
    for(let i=0; i<array.length; i++){
      const node = array[i];
      this.addNode(node);
      // const parentId = node.parentId;
      // const parentNode = this.map.get(parentId);
      // if(!parentNode){
      //   this.root = array[i];
      // }else if(parentNode){
      //   const {children} = parentNode;
      //   if(!children){
      //     parentNode.children = [node];
      //   }else{
      //     children.push(node);
      //   }
      // }
    }
    return this.root;
  }
  this.deleteNode = (id)=>{
    // 有children 或者是 子node
    const toDelete = this.map.get(id);
    const parentId = toDelete.parentId;
    const parentNode = this.map.get(parentId);
    // 根节点
    if(!parentNode){
      return null;
    }else{
      const {children} = parentNode;
      const newChildren = children.filter(item => item.id !== id);
      parentNode.children = newChildren;
    }
    return this.root;
  }
  /**
   * node
   * {
   *  id:2,
   *  name:'abc',
   *  parentId: 1
   * }
   * condition: add to root if root does not exist
   */
  this.addNode = node => {
    const parentId = node.parentId;
    const parentNode = this.map.get(parentId);
    if(!parentNode && !this.root ){
      this.root = node;
    }else{
      const {children} = parentNode;
      if(!children){
        parentNode.children = [node];
      }else{
        children.push(node);
      }
    }
  }
}

const t = new ConstructTree2(arr);
const tree = t.construct();
console.log('tree ', tree);
// const tree2 = t.deleteNode(7);
// console.log('tree2', tree2);
  


