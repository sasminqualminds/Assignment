// let postData={
//     'id':0,
//     'name':'apple',
//     'description':'It is a fruit',
//     'img':'some url'
// }

// console.log(postData);


// fetch('https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro.json',{
//     method:'POST',
//     body:JSON.stringify(postData)
// }).then((response)=>{
//     console.log(response);
// });
// document.addEventListener('DOMContentLoaded',()=>{
//     fetchPosts();
// })
const tableElement = document.querySelector('#table_result');
let updatedPostId = '';
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
})

function fetchPosts() {
    const postUrl = 'https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro.json';
    fetch(postUrl, {
        method: 'GET',
    }).then((response) => {
        return response.json();
    }).then((posts) => {
        let rows = '';

        for (let i in posts) {
            // let details=posts[i];
            let a = posts[i];

            rows = rows + `<tr>
            <td>${i}</td>
            <td>${a.name}</td>
            <td>${a.description}</td>
            <td>${a.image}</td>
            <td>${a.price}</td>
            <td>           
            <button class="update_button">Edit</button>
            <button class="delete_button">Delete</button>           
            </td>
            </tr>`;

        }
        tableElement.innerHTML = rows;

    });
}

let addPost = document.getElementById('add-data');
let showPage = document.getElementById('add_popup');


addPost.addEventListener('click', () => {
    showPage.style.display = 'block';

});
let closeElement = document.querySelector('.close');

closeElement.addEventListener('click', () => {
    showPage.style.display = 'none';
});

let cancel_button = document.querySelector('#cancel');
cancel_button.addEventListener('click', () => {
    showPage.style.display = 'none';
});

// adding data into db

const add = document.getElementById('add');

add.addEventListener('click', (e) => {
    // debugger
    e.preventDefault();
    // console.log(e.target);
    // let id = document.getElementById('id-field').value;
    let name = document.getElementById('name-field').value;
    let description = document.getElementById('description-field').value;
    let image = document.getElementById('image-field').value;
    let price = document.getElementById('price-field').value;
    // console.log(name);
    // console.log(description);
    // console.log(image);
    let postData = {

        // 'id': id,
        'name': name,
        'description': description,
        'image': image,
        'price': price
    }

    // console.log(postData);
    fetch('https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro.json', {
        method: 'POST',
        body: JSON.stringify(postData)
    }).then((response) => {
        // console.log(response.json);
        fetchPosts();
    });
    showPage.style.display = 'none';
});


// Editing data into db

tableElement.addEventListener('click', e => {
    let target = e.target;
    // console.log(target);
    // console.log(target.classList);
    if (target.classList.contains('update_button')) {
        document.getElementById('update_model').style.display = 'block';
        const postId = target.parentElement.parentElement.firstElementChild.textContent;
        // console.log(postId);
        updatedPostId = postId;
        // console.log(postId);        

        fetch('https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro.json', {
            method: 'GET'
        }).then((response) => {
            // console.log(response);
            return response.json();

        })
            .then((posts) => {
                // console.log(posts);
                // let selectedPost=null;

                for (const post in posts) {
                    // console.log(post);
                    let i = posts[post];
                    console.log(i);

                    if (post == postId) {
                        selectedPost = i;
                        break;
                    }
                }
                // console.log(selectedPost);


                // let selectedPost=posts.find(post=>post.id==postId);
                popField(selectedPost);
            });
    }

});
let closeElement1 = document.querySelector('.close1');

closeElement1.addEventListener('click', () => {
    document.getElementById('update_model').style.display = 'none';
});

let cancel_button1 = document.querySelector('#cancel1');
cancel_button1.addEventListener('click', () => {
    document.getElementById('update_model').style.display = 'none';
});


let popField = (post) => {
    console.log(post)
    // let id=document.getElementById('id-field').value;
    let name = document.getElementById('name-field').value;
    // console.log(post.name)
    let description = document.getElementById('description-field').value;
    let image = document.getElementById('image-field').value;
    let price = document.getElementById('price-field').value;
    // console.log(post.name);
    //    document.getElementById('id-field-update').value = post.id;
    document.getElementById('name-field-update').value = post.name;
    document.getElementById('description-field-update').value = post.description;
    document.getElementById('image-field-update').value = post.image;
    document.getElementById('price-field-update').value = post.price;
}


const updated = document.querySelector('#update_model form');
updated.addEventListener('submit', (e) => {
    e.preventDefault();
    // let id=document.getElementById('id-field-update').value;
    let name = document.getElementById('name-field-update').value;
    let description = document.getElementById('description-field-update').value;
    let image = document.getElementById('image-field-update').value;
    let price = document.getElementById('price-field-update').value;
    console.log(updatedPostId);

    let updatedPost = {

        name,
        description,
        image,
        price
    };
    console.log(updatedPost);
    fetch(`https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro/${updatedPostId}.json`, {
        method: 'PUT',
        body: JSON.stringify(updatedPost)
    }).then((response) => {
        console.log(response);

        fetchPosts();
    })

    document.getElementById('update_model').style.display = 'none';



})

// deleting data


tableElement.addEventListener('click', (e) => {

    let target = e.target;
    if (target.classList.contains('delete_button')) {
        let postId = target.parentElement.parentElement.firstElementChild.textContent;
        console.log(postId);
        fetch(`https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro/${postId}.json`, {
            method: 'DELETE'
        }).then((response) => {
            console.log(response);
        });

    }
});

// let postData={
//     'name':'someName',
//     'description':'somedes'
// };
// console.log(postData);

// fetch('https://jsonplaceholder.typicode.com/posts',{
//     method:'POST',
//     body:JSON.stringify(postData)
// }).then((responsse)=>{
//     fetchPosts();
//     // e.target.reset();
// });