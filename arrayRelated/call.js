/**
 * 总结
 * fn.call(1) this 指向object(1)
 * fn.call(obj) this 指向obj
 * fn.call(null/undefine)，会将 this 指向 window
 */
var name = "he";
var obj = {
  name:"obj"
}

function foo(...args){
  // console.log('this', this);
  console.log('this name', this.name, ...args);
}

// foo();
// foo.call(obj);
// foo.call(undefined);
// foo.call(11);

obj.mm = foo;
obj.mm(123, 456);
/**
 * description
 * 在node环境返回
 * undefined
 * obj
 * undefined
 * this [Number: 11]
 * 在浏览器环境
 * he
 * obj
 * he
 */

// console.log('ob', Object(null));
// console.log('ob', Object(obj));

Function.prototype._call = function(ctx, ...args){
  const o = ctx === undefined ? window : Object(ctx);
  const key = Symbol();
  // 最难想的地方 把function 赋值给对象o的一个属性。这样通过o调用function(...args)，这是this就指向ctx了。
  o[key] = this;
  
  const result = o[key](...args);
  delete o[key];
  return result;
}