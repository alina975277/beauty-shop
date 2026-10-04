//элементы меню
const loginLink = document.getElementById("loginLink");
const profileLink = document.getElementById("profileLink");
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    if (profileLink) {
        profileLink.classList.remove("hidden");
    }
    if (loginLink) {
        loginLink.classList.add("hidden");
    }
}
function createProductCard(product) {
    return `
        <div class="product">
            <img
                src="${product.image}"
                alt="${product.name}"
            >
            <div class="product-info">
                <h3>
                    ${product.name}
                </h3>
                <p class="product-category">
                    ${product.category}
                </p>
                <p>
                    ${product.description}
                </p>
                <p class="product-price">
                    ${product.price} ₽
                </p>
                <button
                    class="button"
                    onclick="addToCart(${product.id})"
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    `;
}

//блок попул товаров
const popularProducts =
    document.getElementById("popularProducts");
if (popularProducts) {
    const popular = products.slice(0, 3);
    popularProducts.innerHTML =
        popular.map(createProductCard).join("");
}
const catalogProducts =
    document.getElementById("catalogProducts");
//поиск
const searchInput =
    document.getElementById("searchInput");
const categoryFilter =
    document.getElementById("categoryFilter");
const sortSelect =
    document.getElementById("sortSelect");
function showProducts() {
    let result = [...products];
    const searchText =
        searchInput ? searchInput.value.toLowerCase() : "";
    const category =
        categoryFilter ? categoryFilter.value : "all";
    result = result.filter(function(product) {
        return product.name
            .toLowerCase()
            .includes(searchText);

    });
    if (category !== "all") {
        result = result.filter(function(product) {
            return product.category === category;
        });
    }
    if (sortSelect) {
        if (sortSelect.value === "cheap") {
            result.sort(function(a, b) {
                return a.price - b.price;
            });
        }
        if (sortSelect.value === "expensive") {
            result.sort(function(a, b) {
                return b.price - a.price;
            });
        }
    }
    if (catalogProducts) {
        catalogProducts.innerHTML =
            result.map(createProductCard).join("");
    }
}
if (catalogProducts) {
    showProducts();
    searchInput.addEventListener(
        "input",
        showProducts
    );
    categoryFilter.addEventListener(
        "change",
        showProducts
    );
    sortSelect.addEventListener(
        "change",
        showProducts
    );
}