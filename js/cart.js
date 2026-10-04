let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];
function addToCart(productId) {
    const product =
        products.find(function(product) {
            return product.id === productId;
        });
    if (!product) {
        return;
    }
    cart.push(product);
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    alert(
        "Товар добавлен в корзину!"
    );
}
const cartProducts =
    document.getElementById("cartProducts");
const cartTotal =
    document.getElementById("cartTotal");
function showCart() {
    if (cart.length === 0) {
        cartProducts.innerHTML =
            "<p>Корзина пока пустая.</p>";
        cartTotal.textContent = "0";
        return;
    }
    let total = 0;
    cartProducts.innerHTML = "";
    cart.forEach(function(product, index) {
        total += product.price;
        cartProducts.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                    <div>
                        <h3>
                            ${product.name}
                        </h3>
                        <p>
                            ${product.price} ₽
                        </p>
                    </div>
                </div>
                <button
                    class="button"
                    onclick="removeFromCart(${index})"
                >
                    Удалить
                </button>
            </div>
        `;
    });
    cartTotal.textContent = total;
}
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    showCart();
}
if (cartProducts) {
    showCart();
}