function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  const cartList = document.getElementById('cartList');

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    cartList.innerHTML = '<p class="text-muted text-center">Cart is empty</p>';
    return;
  }

  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between align-items-center mb-2';
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong> (${item.qty})<br>
        <small>$${(item.price * item.qty).toFixed(2)}</small>
      </div>
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">❌</button>
    `;
    cartList.appendChild(div);
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

document.addEventListener('DOMContentLoaded', loadCart);

