function renderTpl(tpl, data) {
  // 代码写在这里
  Object.keys(data).forEach((str)=>{
    tpl = tpl.replace(`{${str}}`, data[str]);
  })
  return tpl;
}

let tpl = '你好，我们公司是{company}，我们部门是{bu}';
let tplData = {
  company: '阿里巴巴',
  bu: '天猫精灵'
}

const str = renderTpl(tpl, tplData);
console.log(str); // 你好，我们公司是阿里巴巴，我们部门是天猫精灵

// 最终输出结果为：你好，我们公司是阿里巴巴，我们部门是天猫精灵。
