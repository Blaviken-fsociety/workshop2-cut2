document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://fakestoreapi.com/products';
    const productContainer = document.getElementById('productContainer');
    const productFilter = document.getElementById('productFilter');
    
    // Función para cargar productos
    async function loadProducts() {
        const response = await fetch(apiURL);
        const products = await response.json();
        
        // Limitar a los primeros 15 productos
        const limitedProducts = products.slice(0, 15);
        
        displayProducts(limitedProducts);
        populateFilterOptions(limitedProducts);
    }

    // Mostrar las tarjetas de productos
    function displayProducts(products) {
        productContainer.innerHTML = ''; // Limpiar container
        products.forEach(product => {
            const productCard = `
                <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                        </div>
                    </div>
                </div>
            `;
            productContainer.insertAdjacentHTML('beforeend', productCard);
        });
    }

    // Agregar opciones al filtro
    function populateFilterOptions(products) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.title;
            productFilter.appendChild(option);
        });
    }

    // Filtro de productos
    productFilter.addEventListener('change', async function() {
        const selectedProductId = this.value;
        const response = await fetch(apiURL);
        const products = await response.json();
        
        // Limitar nuevamente a los 15 productos al filtrar
        const limitedProducts = products.slice(0, 15);
        
        if (selectedProductId === 'all') {
            displayProducts(limitedProducts);
        } else {
            const filteredProduct = limitedProducts.filter(product => product.id == selectedProductId);
            displayProducts(filteredProduct);
        }
    });

    // Cargar productos al iniciar
    loadProducts();
});