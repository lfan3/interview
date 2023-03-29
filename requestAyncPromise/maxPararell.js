const MAX = 3;
const IDLE_DELAY = 500;

function request(url){
  console.log(`start the request ${url}`)
  return new Promise((res)=>{
    setTimeout(()=>{
      res(url)
    }, Math.random() * 1000);
  })
}

class Tasks{
  constructor(requestsUrls){
    this.totalActive = 0;
    this.resolveNum = 0;
    this.len = requestsUrls.length;
    this.queue = requestsUrls.map((url, i)=>([i, url]));
    this.response = new Array(this.length);
  }
  task = async function(index,url){
    const response = await request(url);
    this.totalActive--;
    this.response[index] = response;
    this.resolveNum++;
    console.log(`completer ${response}`);
  }
  getNext = ()=>{
    this.totalActive++;
    return this.queue.shift();
  }
  runTask = ()=>{
    if(this.resolveNum >= this.len){
      console.log('responses: ', this.response)
      return this.response;
    }
    if(this.queue.length && this.totalActive < MAX){
      const [index, url] = this.getNext();
      this.task(index, url);
      this.runTask();
    }else{
      setTimeout(()=>{
        this.runTask();
      }, IDLE_DELAY)
    }
  }
}

const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];

const tasks = new Tasks(allRequests);

const r = tasks.runTask();