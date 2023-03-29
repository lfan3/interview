const allRequests = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
  "http://jsonplaceholder.typicode.com/posts/4",
  "http://jsonplaceholder.typicode.com/posts/5",
  "http://jsonplaceholder.typicode.com/posts/6",
];

function fetch(url){
  return new Promise((res, rej)=>{
    console.log('start fetching '+url)
    setTimeout(()=>{
      res(url);
      console.log('end fetching '+url)
    }, 2000) 
  })
}

function fetchError(url){
  return new Promise((res, rej)=>{
    console.log('start fetching '+url)
    setTimeout(()=>{
      rej("fetchError: "+ url);
      console.log('end fetching '+url)
    }, 2000) 
  })
}

async function request(url){
  try{
    const res = await fetchError(url);
    return res;
  }catch(e){
    console.error('request error '+ e)
  }
}

async function serialFlow(){
  await fetch(allRequests[0]);
  await fetch(allRequests[1]);
}

async function parallelFlow(){
  const res1 = fetch(allRequests[0]);
  const res2 = fetch(allRequests[1]);
  const r1 = await res1;
  const r2 = await res2;
  console.log(r1 +" "+ r2)
}

async function errorHandling(){
  try{
    // request1(allRequests[0]);
    fetchError(allRequests[0])
  }catch(e){
    console.error('err ',e)
  }
}

async function request(url){
  try{
    const res = await fetchError(url);
    return res;
  }catch(e){
    console.error('request error '+ e)
  }
}

async function errorHandlingParalle(){
  try{
    request(allRequests[0]);
    request(allRequests[1]);
  }catch(e){
    console.error('err ',e)
  }
}

async function errorHandling(){
  request(allRequests[0]);
  request(allRequests[1]);
}

// errorHandling()

async function requestRecursiveBlockant(index){
  if(index >= allRequests.length) return;
  try{
    await fetchError(allRequests[index]);
  }catch(e){
    console.error('err ',e)
  }
  requestRecursive(++index);
  
}

async function requestRecursive(index){
  if(index >= allRequests.length) return;
  await request(allRequests[index]);
  requestRecursive(++index);
}

// requestRecursive(0)
requestRecursiveBlockant(0)