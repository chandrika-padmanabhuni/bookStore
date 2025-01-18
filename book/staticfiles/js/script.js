document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cart = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    let total = 0;
  
    addToCartButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const product = button.parentNode;
        const productName = product.querySelector('h2').innerText;
        const productPrice = parseFloat(button.dataset.price);
  
        const cartItem = document.createElement('li');
        cartItem.innerText = productName + ' - ' + '$' + productPrice.toFixed(2);
        cart.appendChild(cartItem);
  
        total += productPrice;
        totalElement.innerText = 'Total: $' + total.toFixed(2);
      });
    });
  });
  