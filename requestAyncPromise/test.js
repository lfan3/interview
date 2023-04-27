
var rotate = function(nums, k) {
  for(let i=0; i<k; i++){
    const m = nums.pop();
    nums.unshift(m);
  }
};

var rotate = function(nums, k) {
  const len = nums.length
  while(k>len){
    k = k % len;
  }
  const m = nums.splice(-k);
  nums.unshift(...m);
};

[1,2]
3
const nums = [1,2,3,4,5,6,7];
const k = 3;
const m = rotate(nums, k)
console.log('m', nums)