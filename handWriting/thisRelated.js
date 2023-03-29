function Dog(){};
Dog.prototype.bark = function(msg){
  console.log(msg);
  setTimeout(()=>{
    this.bark('wang');
  },1000)
  // belowing is wrong with the this reference
  // setTimeout(function(){
  //   this.bark('wang')
  // },1000)
}
// let d = new Dog();
// d.bark("wang");