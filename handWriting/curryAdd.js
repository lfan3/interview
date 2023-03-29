function add(n1){
  return (n2)=>{
    return n1 + n2;
  }
}

const m = add(2)(3)(4);
console.log(m);