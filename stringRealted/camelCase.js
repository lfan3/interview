function camelCase(str){
  const reg = /[A-Z]+/g;
  return str.replace(reg, function(char){
    return "_"+char.toLocaleLowerCase();
  })
}

console.log(camelCase("asdBaseCase"));









