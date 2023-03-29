class Task {
    // queue用来trace正在fetch的数量，不考虑顺序
    constructor(urls, max, callbackFunc){
      this.queue = [];
      this.responses = [];
      this.urlIndex = -1;
      this.urls = urls;
      this.max = max;
      this.callbackFunc = callbackFunc;
    }
    
    task = async(index,url)=>{
      console.log('begin to fetch '+url);
      this.queue.push(url);
      let response = await fetch(url);
      this.responses[index] = response;
      this.queue.pop();
      console.log('end of fetch '+url);
    }
    
    getNext = ()=>{
      const url = this.urls.shift();
      return [++this.urlIndex, url];
    }
    runTask = ()=>{
      if(!this.urls.length && !this.queue.length){
        this.callbackFunc(this.responses);
        return;
      }
      if(this.urls.length && this.queue.length < this.max){
        const [index, url] = this.getNext();
        this.task(index, url);
        this.runTask();
      }
      else{
        setTimeout(()=>{
          this.runTask();
        },300);
      }
    }
}

function sendRequest(urls, max, callbackFunc) {
  const task = new Task(urls, max, callbackFunc);
  task.runTask();
}

function fetch(url){
  return new Promise((res, rej)=>{
    console.log('start fetching '+url)
    setTimeout(()=>{
      res(url);
      console.log('end fetching '+url)
    }, Math.random() * 1000)
  })
}

const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];

function cb(urls){
  for(let i=0; i<urls.length; i++){
    const num = urls[i].match(/\d/g);
    console.log(num[0]);
  }
}
// sendRequest(allRequests, 3, cb);

async function serialFlow(){
  const res1 = fetch(1);
  const res2 = fetch(2);
  const r1 = await res1;
  const r2 = await res2;
  console.log(r1 + r2);
}

serialFlow()