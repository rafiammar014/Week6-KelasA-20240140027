
const orderForm = document.getElementById('orderForm');
const namaInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const formFeedback = document.getElementById('formFeedback');


orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const namaValue = namaInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (namaValue === '' || emailValue === '') {
        formFeedback.textContent = 'Error: Nama dan Email wajib diisi!';
        formFeedback.className = 'feedback-message feedback-error';
    } else if (!emailValue.includes('@')) {
        formFeedback.textContent = 'Error: Format email tidak valid!';
        formFeedback.className = 'feedback-message feedback-error';
    } else {
        formFeedback.innerHTML = `Terima kasih, <strong>${namaValue}</strong>! Pesanan Anda dengan email <em>${emailValue}</em> sedang diproses.`;
        formFeedback.className = 'feedback-message feedback-success';
        
        orderForm.reset();
    }
});



const productList = document.getElementById('productList');
const loadingText = document.getElementById('loading');
const errorText = document.getElementById('error');

async function fetchProducts() {
    try {
        loadingText.style.display = 'block';
        errorText.style.display = 'none';
        productList.innerHTML = ''; 

        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const data = await response.json();
        
    
        loadingText.style.display = 'none';

      
        const products = data.products;

    
        products.forEach(product => {

            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const productName = document.createElement('h3');
            productName.textContent = product.title;

            const productPrice = document.createElement('p');
            productPrice.textContent = `$${product.price}`;

            productCard.appendChild(productName);
            productCard.appendChild(productPrice);

            productList.appendChild(productCard);
        });

    } catch (error) {
        loadingText.style.display = 'none';
        errorText.style.display = 'block';
        errorText.textContent = `Gagal memuat produk. Pesan error: ${error.message}`;
        console.error("Fetch error:", error);
    }
}


fetchProducts();