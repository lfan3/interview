const LIMIT = 3;
const IDLE_DELAY = 200;

const task = {
  queue : [],
  totalActive: 0,
  add: function(item){
    // console.log('add item ', item);
    if(!item || item.length == 1){
      return;
    }else{
      if(this.queue.indexOf(item) == -1){
        this.queue.push(item);
      }
    }
  },
  done: function(item){
    // console.log(item  + ' is done');
    this.totalActive--;
  },
  getNext: function(){
    this.totalActive++;
    return this.queue.shift();
  },
  isPending: function(){
    return this.queue.length > 0;
  }
}

function runTask(){
  if(!task.isPending())
    return;
  if(task.totalActive < LIMIT){
    const item = task.getNext();
    console.log('Processing ' + item + ' Total Active Items ' + task.totalActive);
    // 这个地方是同步平行的 相当于下面的parallel里面的代码。参考asyncflow.js
    myTask2(item);
    runTask();
  }
  else if(task.totalActive >= LIMIT){
    console.log('Hold State');
    setTimeout(()=>{runTask()}, IDLE_DELAY);
  }
}

function myTask(item){
  setTimeout(()=>{
    console.log('completed item '+ item);
    task.done(item);
  },Math.random()*1000)
}

// myTask2 是用来获取 myRequest 里面的return value
async function myTask2(url){
  let rq = await myRequest(url);
  console.log('completed item '+ rq);
  task.done(url);
  return url
}

function myRequest(url){
  return new Promise((res)=>{
    // console.log('start myquest '+url);
    setTimeout(()=>{
      res(url)
    }, Math.random() * 1000)
  })
}

function parallel(){
  myTask2(2);
  myTask2(3);
  myTask2(4);
}

const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];

// for(var i=0;i<allRequests.length;i++){
//   task.add('Item: ' + allRequests[i]);
// }
task.queue = allRequests;
runTask();
// parallel();


