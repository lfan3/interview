function Foo(){
  Foo.a = function(){
      console.log(1);
  }
  this.a = function(){
      console.log(2)
  }
}

Foo.prototype.a = function(){
  console.log(3);
}

Foo.a = function(){
  console.log(4);
}

Foo.a(); //4
let obj = new Foo();
obj.a(); //2
Foo.a(); //1
/**
 * description
 * Foo.a() 这个是调用 Foo 函数的静态方法 a，虽然 Foo 中有优先级更高的属性方法 a，但 Foo 此时没有被调用，所以此时输出 Foo 的静态方法 a 的结果：4
let obj = new Foo(); 使用了 new 方法调用了函数，返回了函数实例对象，此时 Foo 函数内部的属性方法初始化，原型链建立。
obj.a() ; 调用 obj 实例上的方法 a，该实例上目前有两个 a 方法：一个是内部属性方法，另一个是原型上的方法。当这两者都存在时，首先查找 ownProperty ，如果没有才去原型链上找，所以调用实例上的 a 输出：2
Foo.a() ; 根据第2步可知 Foo 函数内部的属性方法已初始化，覆盖了同名的静态方法，所以输出：1
————————————————
版权声明：本文为CSDN博主「语无伦次￥！」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_67614517/article/details/126830167

 */
