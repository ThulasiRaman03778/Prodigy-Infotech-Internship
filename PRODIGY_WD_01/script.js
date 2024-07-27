// Change navigation menu style on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scroll-active', window.scrollY > 0);
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemName = button.dataset.item;
        const itemPrice = parseFloat(button.dataset.price);
        addToCart(itemName, itemPrice);
    });
});
function addToCart(name, price) {
    console.log(`Added ${name} to cart for $${price}`);
}
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-item');
        const itemPrice = parseFloat(this.getAttribute('data-price'));

        alert(`Added "${itemName}" to cart for Rs:${itemPrice}/-`);
    });
});
document.getElementById('form-contact').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});