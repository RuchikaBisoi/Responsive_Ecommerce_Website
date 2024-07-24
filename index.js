let currentPage = 1;
const itemsPerPage = 6;
let filteredItems = [];
let allProducts = [];

const fetchProducts = async () => {
    try {
        const response = await fetch('productItems.json');
        const data = await response.json();
        allProducts = data;
        filteredItems = allProducts;
        paginate(1);
    }
     catch (error) {
        console.error("Error fetching products:", error);
    }
};

const renderProducts = (products) => {
    const storeItems = document.getElementById("content");
    storeItems.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "fe-pro-content";
        productElement.innerHTML = `
            <img src="${product.img}" alt="">
            <h4>${product.brand}</h4>
            <h3>${product.title}</h3>
            <div class="star">
                ${`<i class="fa-solid fa-star"></i>`.repeat(product.stars)}
            </div>
            <div>
                <span>${product.price}</span>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
        `;
        storeItems.appendChild(productElement);
    });
};

const paginate = (page) => {
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    renderProducts(filteredItems.slice(start, end));
    renderPagination(totalPages);
};

const renderPagination = (totalPages) => {
    const paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("span");
        pageItem.innerHTML = i;
        pageItem.className = "page-item";
        if (i === currentPage) pageItem.classList.add("active");
        pageItem.onclick = () => paginate(i);
        paginationElement.appendChild(pageItem);
    }
};

const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    filteredItems = allProducts.filter(product => {
        return product.title.toUpperCase().includes(searchbox);
    });
    if (filteredItems.length === 0) {
        displayNoResultsMessage();
    } 
    else{
        paginate(1); 
    }
};

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

const displayNoResultsMessage = () => {
    const storeItems = document.getElementById("content");
    const paginationElement = document.getElementById("pagination");

    // Clear existing products and pagination
    storeItems.innerHTML = "";
    paginationElement.innerHTML = "";

    // Display no results message
    storeItems.innerHTML = "<p>No matches found</p>";
};
