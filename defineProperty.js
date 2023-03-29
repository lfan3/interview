const data = [
  { userId: 8, title: "title1" },
  { userId: 11, title: "other" },
  { userId: 15, title: null },
  { userId: 19, title: "title2" },
];
const find = function (origin) {
  let obj = new Object(origin);

  Object.defineProperty(obj, "where", {
    configurable: false, // 是否可配置
    enumerable: false, // 是否可迭代
    writable: false, // 是否可写
    value: (val)=>{
      
    }
  });

  Object.defineProperty(obj, "orderBy", {
    configurable: false, // 是否可配置
    enumerable: false, // 是否可迭代
    writable: false, // 是否可写
    value: function (key, order) {
      obj.sort((a, b) => {
        if (order == "desc") {
          return b[key] - a[key];
        } else {
          return a[key] - b[key];
        }
      });
      return find(obj);
    },
  });

  return obj;
};

// 查找 data 中，符合条件的数据，并进行排序
const result = find(data)
  .where({
    title: /\d$/,
  })
  // .orderBy("userId", "desc");

// const result1 = find(data).orderBy("userId", "asc").where({
//   title: /\d$/,
// });

console.log(result); // [ { userId: 19, title: 'title2' }, { userId: 8, title: 'title1' } ]
