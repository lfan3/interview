// trans(123456) —— 十二万三千四百五十六
// trans（100010001）—— 一亿零一万零一

const numbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const uniques = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千"];

// const c = decimalToBinary(8);

// 数字转换的套用一种方法来写
function trans(number){
  // 目标： 把一个个数字和它的位置符号连在一起
  // 准备 阿拉伯数字和中文汉字的对应map + 阿拉伯数字对应的汉字数字的位置符号(注意零的情况不需要配位置)
  // 使用十进制到二进制的转换算法把数字最后一位的提取出来
  // 把阿拉伯数字转换成汉字 + 位置符号
  // 处理特殊情况(一十，零在后面，多个零在中间)
  
  let source = number;
  let pos = 0;
  let target = '';
  
  while(source){
    const number = source % 10;
    source = Math.floor(source / 10);
    const group = number ? numbers[number] + uniques[pos] :numbers[number] ;
    target = group + target;
    pos++;
  }
      
  if(target.startsWith('一十')){
    target = target.slice(1);
  }
  while(target.endsWith('零')){
    target = target.slice(0, -1);
  }
  if(target.match(/零+/)){
    target = target.replaceAll(/零+/g, '零');
  }
  return target;
}

const a = trans(11);
const b = trans(2000);
const c = trans(1000023);
const d = trans(9000023);
console.log(a,b,c,d);




