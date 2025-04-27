let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  price = Number(price); // 💥 Ensure price is a number
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.querySelectorAll('.cart-count');
  cartCount.forEach(span => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    span.textContent = count;
  });
}

function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>₹${item.price * item.quantity}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  if (cartTotal) cartTotal.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}

function proceedToPayment() {
  window.location.href = "payment.html";
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  displayCart();
});
