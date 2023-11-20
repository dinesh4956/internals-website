import { products } from "./products.js";


export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        productName: 'Chicken and Mushrooms',
        quantity:2
    },{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        productName: 'The Saucy Tomato',
        quantity: 1
    }];
}



function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    if(matchingItem) {
        matchingItem.quantity += 1;
    } else{
         cart.push({
            productId: productId,
            quantity: 1
        });
    }
    saveToStorage();
    
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    
    saveToStorage();
}

export function cartHoverUpdater() {
    let cartHoverSummaryHTML = '';
        cart.forEach((cartItem) => {
            const productId = cartItem.productId;
        
            let matchingProduct;

        
            products.forEach((product) => {
                if (product.id === productId) {
                    matchingProduct = product;
                }
            });
        
        
            cartHoverSummaryHTML +=
            `<div class="cart-item js-cart-item-${matchingProduct.id}">
            <i class="fas fa-times js-x-link" data-product-id="${matchingProduct.id}"></i>
            <img src="${matchingProduct.image}" alt="menu">
            <div class="content">
                <h3>${cartItem.quantity}-${matchingProduct.name}</h3>
                <div class="price">&#8377;${parseInt(matchingProduct.price.sp)} </div>
            </div>
        </div>
        `;
        });
        cartHoverSummaryHTML += '<a href="checkout.html" class="btn">check out </a>'
        
        document.querySelector('.js-cart-item-container').innerHTML = cartHoverSummaryHTML;


        document.querySelectorAll('.js-x-link')
        .forEach((link) => {
            link.addEventListener('click', ()=>{
                const productId = link.dataset.productId;
                removeFromCart(productId);
    
               const container = document.querySelector(
                    `.js-cart-item-${productId}`
                );
                container.remove();
                
                
                renderOrderSummary();
                   
            });
       });
    

       document.querySelectorAll('.js-add-to-cart')
       .forEach((button)=>{
        button.addEventListener('click', () => {
            cartHoverUpdater();

        });
       });
}

cartHoverUpdater();

