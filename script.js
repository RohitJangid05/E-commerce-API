let apiUrl = "https://dummyjson.com/products";
let container = document.getElementById("productsContainer")

document.getElementById("form").addEventListener("submit", function (e) {
    const input = document.getElementById("input").value.trim();
    if (!input) {
        alert("Please enter a search term!");
        e.preventDefault();
    }
});


let renderCards = (e) => {
    const title = e.title.length > 15 ? `${e.title.slice(0, 15)}...` : e.title;
    const rating = Math.round(e.rating)
    container.innerHTML += `
    <div class="card">
        <img src=${e.images[0]} >
        <div class="text">
            <h1>${title}</h1>
            <span>${e.category}</span>
            <h3>rating: ${rating}/5 ⭐</h3>
            <div class="price-card">
                <h2 class="price">$${Math.round(e.price)}.00</h2>
                <button onclick="addToCart(${e.id})">Add to cart</button>
            </div>
        </div>
    </div>
    `
}

let fetchApi = async () => {
    let rawData = await fetch(apiUrl)
    let data = await rawData.json()
    let products = data.products
    products.map((e) => {
        renderCards(e)
    })
}
fetchApi()
let slideContainer = document.getElementById("slideContainer")
let input = document.getElementById('input')
let btn = document.getElementById("searchBtn")
input.addEventListener("keyup", async () => {
    slideContainer.style.display = "none"
    let rawData = await fetch(apiUrl)
    let data = await rawData.json()
    let products = data.products
    let filteredProducts = products.filter((e) => {
        let title = e.title.toLowerCase()
        let search = input.value.toLowerCase()
        if (title.includes(search)) {
            return e
        }

    })
    container.innerHTML = " "
    filteredProducts.map((e) => {
        renderCards(e)
    })
    if (input.value.length <= 0) {
        slideContainer.style.display = "inline-block"
    }
})

let cartBtn = document.getElementById("cart-btn")
let crossBtn = document.getElementById("cross-btn")
let cartContainer = document.getElementById("cartContainer")
let tbody = document.getElementById("tbody")


crossBtn.addEventListener("click", () => {
    cartContainer.style.display = "none"
    document.body.style.overflow = "scroll"
})
let cart = []
let emptyMessage = document.getElementById("emptyMessage")
let addToCart = async (id) => {
    let rawData = await fetch(apiUrl)
    let data = await rawData.json()
    let products = data.products
    products.filter((e) => {
        if (e.id == id) {
            cart.push(e)
        }
    })
    if (cart.length > 0) {
        emptyMessage.style.display = "none"
    }
    alert("Product has been added to cart!")
}
let totalPrice = document.getElementById("totalPrice")
cartBtn.addEventListener("click", () => {
    cartContainer.style.display = "inline-block"
    document.body.style.overflow = "hidden"
    tbody.innerHTML = ' '
    totalPrice.innerHTML = " "
    cart.map((e) => {
        tbody.innerHTML += `
        <tr>
        <td>
            <img src=${e.images[0]} >
        </td>
        <td>${e.title}</td>
        <td>$${Math.round(e.price)}.00</td>
        <td>${e.category}</td>
        </tr>
        `
    })
    let totalItems = cart.length
    let price = cart.reduce((acc, val) => {
        return acc + val.price
    }, 0)
    let salesTax = Math.round(price * 0.08)
    let grandTotal = price + salesTax

    totalPrice.innerHTML += `
    <div class="bill">
        <p>No of items: </p><p>${totalItems}</p>
    </div>
    <div class="bill">
        <p>Sub Price: </p><p>$${Math.round(price)}</p>
    </div>
        <div class="bill">
        <p>Sales Tax: </p><p>$${salesTax}</p>
    </div>
      </div>
        <div class="bill">
        <p>Grand total: </p><p>$${Math.round(grandTotal)}</p>
    </div>
        `
})



//slider 

const slides = document.getElementById("slides");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let currentIndex = 0;
const totalSlides = document.querySelectorAll(".slide").length;

rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
});
leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

function updateSlider() {
    const offset = currentIndex * -100;
    slides.style.transform = `translateX(${offset}%)`;
}

document.getElementById("year").textContent = new Date().getFullYear();