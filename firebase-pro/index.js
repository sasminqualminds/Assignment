let cartItems = {};

const tableElement = document.querySelector('#box');
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});
function fetchPosts() {
    const postUrl = 'https://first-firebase-project-7d9b9-default-rtdb.firebaseio.com/pro.json';
    fetch(postUrl)
        .then(response => response.json())
        .then(posts => renderPosts(posts));
}
function renderPosts(posts) {
    let rows = '';
    for (let i in posts) {
        let a = posts[i];
        rows += `
            <div id="box">
                <div id="inside-box">
                    <img src='${a.image}' class='image'>
                    <div id="right">
                        <h1>${a.name}</h1>
                        <div class='des-style'>${a.description}</div>
                        <div class='rupee'>₹</div>
                        <div class='price-style'>${a.price}</div>
                        <button class='addToCartButton' data-id=${i}>Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }
    tableElement.innerHTML = rows;

    document.querySelectorAll('.addToCartButton').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productId = event.target.dataset.id;
       
        const selectedProduct = posts[productId];

        
        const cartCountElement = document.querySelector('.zero');
        cartCountElement.textContent = parseInt(cartCountElement.textContent) + 1;
        console.log(cartItems)
     
        if (!cartItems[productId]) {
            cartItems[productId] = {
                name: selectedProduct.name,
                price: selectedProduct.price,
                image: selectedProduct.image,
                quantity: 1
            };
        } else {
            cartItems[productId].quantity++;
        }
        console.log(localStorage)
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

}

const cartIcon = document.getElementById('cartIcon');
cartIcon.addEventListener('click', displayCartItems);


function displayCartItems() {
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    
    const cartUrl = 'cart.html?items=' + encodeURIComponent(JSON.stringify(cartItems));
    window.location.href = cartUrl;
}
