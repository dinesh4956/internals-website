import {cart, addToCart, cartHoverUpdater} from './cart.js'
import {products} from './products.js';

let productsHtml='';

products.forEach((product) =>{
    productsHtml+= ` 
        <div class="box">

                <div class="box-head">
                    <img src="${product.image}" alt="">
                    <span class="menu-category">${product.class}</span>
                    <h3>${product.name}</h3>
                    <div class="price">&#8377;${product.price.sp} <span>&#8377;${product.price.mrp}</span></div>
                </div>
                <div class="box-bottom">
                    <button class="btn js-add-to-cart"
                    data-product-id="${product.id}">
                    add to cart
                    </button>
                </div>
            </div>
`;


});


document.querySelector('.js-box-container').innerHTML = productsHtml;




document.querySelectorAll('.js-add-to-cart')
.forEach((button) =>{
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
    });
});




cartHoverUpdater();
