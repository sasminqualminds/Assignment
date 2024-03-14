const tableElement=document.querySelector('#table_result');
let updatedPostId='';
document.addEventListener('DOMContentLoaded',()=>{
    fetchPosts();
})

function fetchPosts(){
    const postUrl='https://jsonplaceholder.typicode.com/posts';
    fetch(postUrl, {
        method: 'GET',
    }).then((response)=>{
       return response.json();
    }).then((posts)=>{
        let rows='';
        let count=0;
        for(let i of posts){
            rows=rows+`<tr>
            <td>${i.title}</td>
            <td>${i.body}</td>
            <td>${i.id}</td>
            <td>
            
            <button class="update_button">Update</button>
            <button class="delete_button">Delete</button>
            
            </td>
            </tr>`;
                    // count=count+1;
                    // if(count>=2){
                    //     break;
                    // }
                    
        }
        tableElement.innerHTML=rows;
    });
}

const addingPostsButton=document.getElementById('button_a');
let showPage=document.getElementById('add_method');
addingPostsButton.addEventListener('click',()=>{
    
    showPage.style.display='block';
});

let closeElement=document.querySelector('.close');

closeElement.addEventListener('click',()=>{
    showPage.style.display='none';
});

let cancel_button=document.querySelector('#cancel');
cancel_button.addEventListener('click',()=>{
    showPage.style.display='none';
});

// let add_button=document.querySelector('#add');
// add_button.addEventListener('click', ()=>{
//     let title=document.getElementById('title_box').value;
//     let body=document.getElementById('body_box').value;

//     let tableTag=document.getElementById('table_result');
//     let createTitle=document.createElement('td');
//     let createBody=document.createElement('td');
//     let createTr=document.createElement('tr');

//     createTitle.textContent=title;
//     createBody.textContent=body;
//     createTr.appendChild(createBody);
//     createTr.appendChild(createTitle);
//     tableTag.appendChild(createTr);
//     showPage.style.display='none';
    
// });



// adding Posts

const add=document.getElementById('add');

add.addEventListener('submit',(e)=>{
    // debugger
    e.preventDefault();
    console.log(e.target);
    let title=document.getElementById('title_box').value;
    let body=document.getElementById('body_box').value;
    console.log(title);
    console.log(body);

    let postData={
        'name':'someName',
        'description':'somedes'
    };
    console.log(postData);

    fetch('https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro',{
        method:'POST',
        body:JSON.stringify(postData)
    }).then((responsse)=>{
        fetchPosts();
        e.target.reset();
    });
    showPage.style.display='none';
});


    
// count=count+1;
//             if(count>=2){
//                 break;
//             }

tableElement.addEventListener('click',e=>{
    let target=e.target;
    // console.log(target);
    // console.log(target.classList);
    if(target.classList.contains('update_button')){
        document.getElementById('update_model').style.display='block';
        const postId=target.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent;
        updatedPostId=postId;
        // console.log(postId);        
        
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'GET'
        }).then((response)=>{
            return response.json();
    
        }).then((posts)=>{
            let selectedPost=posts.find((post)=>post.id==postId);
            // console.log(post);
            console.log(selectedPost);
            // console.log(selectedPost);
            popField(selectedPost);
        });
    }
});


let closeElement1=document.querySelector('.close1');

closeElement1.addEventListener('click',()=>{
    document.getElementById('update_model').style.display='none';
});

let cancel_button1=document.querySelector('#cancel1');
cancel_button1.addEventListener('click',()=>{
    document.getElementById('update_model').style.display='none';
});


let popField = (post)=>{
 
    let title=document.getElementById('title_box').value;
    let body=document.getElementById('body_box').value;
   document.getElementById('title_box_update').value = post.title;
    document.getElementById('body_box_update').value=post.body;
   
}


const updated=document.querySelector('#update_model form');
updated.addEventListener('submit',(e)=>{
    e.preventDefault();
    let title=document.getElementById('title_box_update').value;
    let body= document.getElementById('body_box_update').value;
    console.log(updatedPostId)

    let updatedPost={
        title,
        body
    };
    fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPostId}`,{
        method:'PUT',
        body:JSON.stringify('updatedPost')
    }).then((response)=>{
        console.log(response);
    })
    


})


tableElement.addEventListener('click',(e)=>{
    let target=e.target;
    if(target.classList.contains('delete_button')){
        let postId =target.parentElement.parentElement.firstElementChild.textContent;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,{
            method:'DELETE'
        }).then((response)=>{
            console.log(response);
        });
        
    }
});

let postData={
    'name':'someName',
    'description':'somedes'
};
console.log(postData);

fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    body:JSON.stringify(postData)
}).then((responsse)=>{
    fetchPosts();
    // e.target.reset();
});