class YBakes {
    constructor() {
        this.cartSection = document.querySelector('.cart-section');
        this.cartItems = document.querySelector('.cart-items');
        this.cartTotal = document.querySelector('.cart-total');
        this.cartQtyTotal = document.querySelector('.cart-qty-total');
        this.currentCart = [];
        this.addEventListeners(); 
    }
    
    addEventListeners() {
        let closeX = document.querySelector('.close-x');
        let cart = document.querySelector('.cart');
        let cartLink = document.querySelector('.cart-link');
        let addToCart = document.querySelectorAll('.add-to-cart');
        
        // open cart side bar
        cart.addEventListener('click', () => {
            if (window.innerWidth < '680') {
                cart.style.width = '100%';
            } else {
                cart.style.width = '600px';
            }
            this.cartSection.style.display = 'flex';
            cartLink.style.display = 'none';
            cart.style.backgroundColor = 'palevioletred';
            cart.style.color = 'paleturquoise';
            closeX.style.display = 'block';
        })

        // close cart side bar
        closeX.addEventListener('click', () => {
            cart.style.width = '10vw';
            this.cartSection.style.display = 'none';
            cartLink.style.display = 'flex';
            cart.style.backgroundColor = 'paleturquoise';
            cart.style.color = 'palevioletred';
            closeX.style.display = 'none';
        })

        // adding product to cart  
        addToCart.forEach(addTocartBtn => {
            addTocartBtn.addEventListener('click', e => {
                let productId = e.target.parentNode.id;
                let productName = e.target.parentNode.querySelector('.item-name').textContent;
                let productPrice = Number(e.target.parentNode.querySelector('.price').textContent);
                let productImage = this.getProductImage(productId);
                this.addToCartArray(productId, productName, productPrice, productImage);
            })
        })
    }
    
    // retrieve product thumbnail from productId
    getProductImage(productId) {
        let imageArr = {
            cookies : '🍪',
            donut : '🍩',
            birthdayCake : '🎂',
            cake : '🍰',
            chocolate : '🍫',
            
        }
        let productType = productId.split('-')[0];
        return imageArr[productType]
    }

    // adding product details to currentCart array
    addToCartArray(productId, productName, productPrice, productImage) {

        // if  currentCart array is empty create product object and add to array
        if (this.currentCart.length === 0) {
            let product = {
                id : productId,
                name : productName,
                price : productPrice,
                totalPrice : productPrice,
                image : productImage,
                qty : 1
            };
            this.currentCart.push(product);
            this.displayCartProducts();
            return;
        }

        // get all unique product ids into an array
        let productIdArray = [];
        for (let product of this.currentCart) {
            let productValues = Object.values(product);
            if (!productIdArray.includes(productValues[0])) {
                productIdArray.push(productValues[0])
            }
        }

        // add to currentCart if not product is not already in cart
        if (!productIdArray.includes(productId)) {
            let product = {
                id : productId,
                name : productName,
                price : productPrice,
                totalPrice : productPrice,
                image : productImage,
                qty : 1
            };
            this.currentCart.push(product);
        } 
        // calc price and update qty
        else {
            let productIndex = productIdArray.findIndex(i => {
                return i === productId
            })
            // only increment qty if below 10
            if (this.currentCart[productIndex].qty !== 10) {
                this.currentCart[productIndex].qty++
            }
            let qty = this.currentCart[productIndex].qty;
            this.calcItemPrice(productIndex, qty);
            
        }
        // update UI each time user clicks add to cart
        this.displayCartProducts();
    }

    // calculate total item price (qty * product price)
    calcItemPrice(productIndex, qty) {
        let price = this.currentCart[productIndex].price;
        this.currentCart[productIndex].totalPrice = qty * price
    }

    // format price to £0.00
    formatPrice(price) {
        return price.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'});
    }

    displayCartProducts() {
        // clear cart items section display
        this.cartItems.textContent = '';

        // loop through currentCart array and display details to cart
        for (let item of this.currentCart) {
            let cartItemTemplate = document.getElementById('cart-item');
            let cartItem = document.importNode(cartItemTemplate.content, true);
            let cartImage = cartItem.querySelector('.cart-image');
            let cartName = cartItem.querySelector('.cart-name');
            let cartQty = cartItem.querySelector('.cart-qty');
            let cartPrice = cartItem.querySelector('.cart-price');
            cartImage.textContent = item.image;
            cartName.textContent = item.name;

            cartQty.querySelector('.cart-quantity').querySelector(`.option-${item.qty}`).selected = true;

            cartPrice.textContent = this.formatPrice(item.totalPrice);
            this.cartItems.append(cartItem)
        }
        // calculate final cart total and item quantity total
        this.calcCartTotal();
        this.qtyTotal();
        // listen for item removal & updates to qty
        this.removeItemListener();
        this.updateQtyListener();
    }

    updateQtyListener() {
        this.cartItem = document.querySelectorAll('.cart-item');
        // identify which product qty was 'changed' and the new qty selected
        this.cartItem.forEach(cartItem => {
            cartItem.querySelector('.cart-quantity').addEventListener('change', e => {
                let newQty = e.srcElement.value;
                let productName = e.target.parentNode.parentNode.querySelector('.cart-name').textContent;
                this.updateQty(productName, newQty);
            })
        })
    }

    updateQty(productName, newQty) {
        let productNames = [];
        for (let product of this.currentCart) {
            productNames.push(Object.values(product)[1])
        }

        // find index of productName
        let index = productNames.findIndex(i => {
            return i === productName;
        });
        // update qty in currentCart array
        this.currentCart[index].qty = newQty;
        // recalculate total item price
        this.calcItemPrice(index, newQty);
        // update cart items and final total
        this.displayCartProducts();
    }

    removeItemListener() {
        let removeItemBtn = document.querySelectorAll('.bin-item');

        removeItemBtn.forEach(removeBtn => {
            removeBtn.addEventListener('click', e => {
                // identify which item is to be deleted
                let productName = e.target.parentNode.querySelector('.cart-name').textContent;
                this.removeItem(productName) // remove product from array

                // remove item from display
                e.target.parentNode.remove()
              
                // if cart is empty display empty cart text
                if (this.currentCart.length === 0) {
                  let emptyCart = document.createElement('div');
                  emptyCart.className = 'empty-cart';
                  emptyCart.textContent = 'You have no items in your cart';
                  this.cartItems.append(emptyCart)
                }
            })
        });
    }

    // find product index in currentCart array and remove
    removeItem(productName) {
        let productNames = [];
        for (let product of this.currentCart) {
            productNames.push(Object.values(product)[1])
        }

        let index = productNames.findIndex(i => {
            return i === productName;
        })

        this.currentCart.splice(index, 1);
        this.calcCartTotal();
        this.qtyTotal(); 
    }

    // add all item price totals to an array and calculate the final total
    calcCartTotal() {
        let totalPriceArr = [];
        for (let product of this.currentCart) {
            totalPriceArr.push(Object.values(product)[3]);
        }

        let cartTotal = totalPriceArr.reduce((prev, cur) => {
            return prev + cur;
        },0)
        this.cartTotal.textContent = this.formatPrice(cartTotal);
    }

    // add all Qty to an array and calculate the item total
    qtyTotal() {
        let totalQtyArr = [];
        for (let product of this.currentCart) {
            totalQtyArr.push(Object.values(product)[5]);
        }

        let qtyTotal = totalQtyArr.reduce((prev, cur) => {
            return prev + Number(cur);
        }, 0)
        this.cartQtyTotal.textContent = `(${qtyTotal})`;
    }
}

new YBakes();