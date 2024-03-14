document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    const emptyCartButton = document.getElementById('emptyCartButton');
    emptyCartButton.addEventListener('click', emptyCart);
});

function displayCartItems() {
    const cartContainer = document.getElementById('cartContainer');
    const totalPriceElement = document.getElementById('totalPrice');

    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    cartContainer.innerHTML = '';

    
    let totalPrice = 0;

    for (const itemId in cartItems) {
        if (cartItems.hasOwnProperty(itemId)) {
            const item = cartItems[itemId];
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                    <button class="add-button" data-id="${itemId}">Add</button>
                    <button class="remove-button" data-id="${itemId}">Remove</button>
                    
                </div>
            `;
            cartContainer.appendChild(cartItemElement);

            
            totalPrice += item.price * item.quantity;
        }
    }

   
    totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;

   
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', removeCartItem);
        document.querySelectorAll('.add-button').forEach(button=>{
            button.addEventListener('click',add);
        })
    });
    
}




function removeCartItem(event) {
   
    const itemId = event.target.dataset.id;
    

   
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    if (typeof cartItems === 'object' && !Array.isArray(cartItems)) { 
       
        if (cartItems[itemId] && cartItems[itemId].quantity > 1) {
            cartItems[itemId].quantity--;
        } else {
            delete cartItems[itemId];
        }
       
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); //    for updating
        displayCartItems();
    }
    
    
}

function add(event) {
   
    const itemId = event.target.dataset.id;
    

   
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    if (typeof cartItems === 'object' && !Array.isArray(cartItems)) { 
       
        if (cartItems[itemId] && cartItems[itemId].quantity > 0) {
            cartItems[itemId].quantity++;
        } else {
            delete cartItems[itemId];
        }
       
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); //    for updating
        displayCartItems();
    }
    
}

function emptyCart() {
    localStorage.removeItem('cartItems');
    displayCartItems();
}








