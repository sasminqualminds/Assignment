let post=document.getElementById('btn');
post.addEventListener('click', getAllPosts);

async function getAllPosts(){
    let apis= await fetch('https://jsonplaceholder.typicode.com/posts');

    let result= await apis.json();
    console.log(result);

    for(i of result){
        const table=document.getElementById('tab');
    const trElement=document.createElement('tr');
    const tdElementTitle=document.createElement('td');
    const tdElementBody=document.createElement('tr');

    tdElementBody.textContent=i.body;
    tdElementTitle.textContent=i.title;
    trElement.appendChild(tdElementBody);
    trElement.appendChild(tdElementTitle);
    table.appendChild(trElement);
    }
    
   
    // console.log(apis);

    // apis.then(response=>{
    //     response.json().then(data=>{
    //         console.log(data);
    //     });
    // })
}