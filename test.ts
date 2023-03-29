// class C {
//   bar: Record<'key1' | 'key2' | 'key100', number>
// }

// // 业务代码文件
// // import C from 'mod'

// const c = new C()

// // foo 函数用到了 c 实例的 bar 属性，请引用 C 中 bar 属性的类型作为 foo 函数 bar 参数的类型
// function foo (bar: Record<'key1', number>) {
//   console.log(bar.key1)
// }

// foo(c.bar)

const a = 'a';
console.log(a)