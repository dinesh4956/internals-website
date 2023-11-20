import {cart, cartHoverUpdater, removeFromCart} from './cart.js'
import {products} from './products.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
    
        let matchingProduct;
    
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
       
    
        cartSummaryHTML +=
        `<div class="cart-item-container  
            js-cart-item-container-${matchingProduct.id}">
            <div class="cart-item-details-grid">
            <img class="product-image"src="${matchingProduct.image}">
                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="category">
                        ${matchingProduct.class}
                    </div>
                    <div class="product-price">
                        &#8377;${matchingProduct.price.sp}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                </div>
            </div>
            </div>
        </div>`;
    });
    
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    
    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', ()=>{
                const productId = link.dataset.productId;
                removeFromCart(productId);
    
               const container = document.querySelector(
                    `.js-cart-item-container-${productId}`
                );
                container.remove();
                
                
                renderOrderSummary();
                renderPaymentSummary(); 
                
            });
       });
  
}
    
    cartHoverUpdater();
    renderOrderSummary();
    renderPaymentSummary();
    
   





