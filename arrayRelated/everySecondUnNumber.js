function demo1(arr){
  // let 块级别
  for (let i=0; i<3; i++) {
    setTimeout(_ => {
        console.log(arr[i])
        // i* 1000 没加一秒
    }, i*1000)
  } 
}

// printEverySecond([1,2,3]);
demo1([1,2,3]);