import {cart, cartQuantity} from './cart.js';
import { products } from './products.js';
import { renderOrderSummary } from './checkout.js';

let productPrice = 0;
let shippingPrice = 50;
export function renderPaymentSummary() {
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct;
    

        products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
        });
        productPrice += matchingProduct.price.sp * cartItem.quantity
       
    });
    
    const totalBeforeTax = productPrice + shippingPrice;
    const tax = Math.round(totalBeforeTax * 0.1);
    const orderTotal = totalBeforeTax + tax;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">&#8377;${productPrice}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">&#8377;${shippingPrice}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">&#8377;${totalBeforeTax}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money tax">&#8377;${tax}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">&#8377;${orderTotal}</div>
        </div>

        <a href="order.html">
        <button class="place-order-button button-primary">
            Place your order
        </button>
        </a>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  
    
}


