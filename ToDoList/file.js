// let delete_button=document.querySelectorAll('.delete');

// for(let i of delete_button){
//     i.addEventListener('click', (event)=>{
//        let first=event.target;
//        let second=first.parentElement;
//        second.remove();

//     })
// }

// removing element from list
let ulElement=document.querySelector('ul');

ulElement.addEventListener('click',(event)=>{
    let targetElement=event.target;
    if(targetElement.className=='delete'){
        targetElement.parentElement.parentElement.remove();
        
    }
})


//adding items
let formElement=document.querySelector('.add_item');

formElement.addEventListener('submit',adding);

function adding(event){
    event.preventDefault();

    let input=formElement.querySelector('input[type=text]').value;
    console.log(input)
    let ulElement = document.querySelectorAll('ul')[0];
    const liElement=document.createElement('li');
    const itemElement =document.createElement('div');
    const bothElement=document.createElement('div');
    const delete_button=document.createElement('div');
    const update_button=document.createElement('div');
    itemElement.classList.add('item');
    
    delete_button.classList.add('delete')
    itemElement.textContent=input;
    delete_button.textContent='Delete';
    update_button.textContent='Update';
    update_button.classList.add('update')
    bothElement.classList.add('both');
    bothElement.appendChild(delete_button);
    bothElement.appendChild(update_button);
    liElement.appendChild(itemElement);
    liElement.appendChild(bothElement);
    console.log(liElement)
    ulElement.appendChild(liElement);
    formElement.querySelector('input[type=text]').value='';
}


//search

let search_element=document.forms['search_box'].querySelector('input[type=text]');


search_element.addEventListener('keyup',(event)=>{
    let search=event.target.value;
    const container=document.querySelector('.items_list_box ul');

    let item_set=container.getElementsByTagName('li');
    item_set=Array.from(item_set);
    item_set.forEach((element) => {
        let firstElementOfItemSet=element.firstElementChild.textContent.toLowerCase();
        if(firstElementOfItemSet.indexOf(search)!=-1){
            element.style.display='flex';
        }else{
            element.style.display='none';
            }
    });
    
});

// Hide list

let check_box=document.getElementById('tick');

check_box.addEventListener('change',items);

function items(event){
    let items_container=document.getElementById('box');
    if(check_box.checked){
        items_container.style.display='none';
    }else{
        items_container.style.display='block';
    }
    

}

// update 

ulElement.addEventListener('click', (event) => {
    let targetElement = event.target;
    if (targetElement.className == 'update') {
        
        let parentLi = targetElement.parentElement.parentElement;
        console.log(parentLi)
        let itemText = parentLi.querySelector('.item').textContent;
        let updatedItemText = prompt('Update item:', itemText);

        if (updatedItemText !== null && updatedItemText.trim() !== '') {
            parentLi.querySelector('.item').textContent = updatedItemText;
        }else {
            alert('no update');
        }
    }
});





