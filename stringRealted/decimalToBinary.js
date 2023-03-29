function decimalToBinary(num){
  let bi = '';
  while(num){
    bi = num % 2 + bi;
    num = Math.floor(num / 2);
  }
  return bi;
}