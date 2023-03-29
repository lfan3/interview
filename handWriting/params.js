let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/

function parseParam(url){
  const index = url.indexOf('?');
  const subStr = url.substring(index+1, url.length);
  const arr = subStr.split('&');
  const result = arr.reduce((acc, curr)=>{
    const [key, val] = curr.split('=');
    const decodeVal = decodeURI(val);
    // ! 这里 最好用 prototype，不要忘记 .call
    if(Object.prototype.hasOwnProperty.call(acc, key)){
      if(!Array.isArray(acc[key])){
        acc[key] = [acc[key], decodeVal]
      }else{
        acc[key].push(decodeVal)
      }
    }else{
      if(decodeVal !== 'undefined'){
        acc[key] = decodeVal;
      }else{
        acc[key] = true;
      }
    }
    return acc;
  },{})
  return result
}
// const c = parseParam(url)

let baseUrlStr = 'https://coder.itclan.cn?name=itclanCoder&id=2&id=4';
const queryURLParameter = (url) => {
  let regx = /([^&?=]+)=([^&?=]+)/g
  let obj = {};

  // tomorrow
  url.replace(regx, (...args) => {
    if(obj[args[1]]){
      if(Array.isArray(obj))
    }
    obj[args[1]] = args[2]
  });
  return obj;
};

console.log(queryURLParameter(baseUrlStr)); 


