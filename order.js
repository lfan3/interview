// a
function Foo () {
  getName = function () {
    console.log(1);
  }
  return this;
 }
 // b
 Foo.getName = function () {
  console.log(2);
 }
 // c
 Foo.prototype.getName = function () {
  console.log(3);
 }
 // d
 var getName = function () {
  console.log(4);
 }
 // e
 function getName () {
  console.log(5);
 }
 
//  按顺序执行后分别输出什么？
 
 Foo.getName();
 getName();
//  Foo().getName();
 new Foo.getName();
 new Foo().getName();
 new new Foo().getName()
console.group('last three')
console.log( new new Foo().getName());//{}
console.log( new Foo().getName());//undefined
console.log( new Foo());//Foo {}
console.groupEnd();
