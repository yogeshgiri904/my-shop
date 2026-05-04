function func() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
}

let __appInitDone = false;

const initApp = async function () {
    if (__appInitDone) return;
    __appInitDone = true;

    const pageName = window.location.pathname.split("/").pop() || "";
    const shouldLoadFertilizer = pageName === "fertilizers.html" || pageName === "index.html" || pageName === "";
    const shouldLoadPesticide = pageName === "pesticides.html" || pageName === "index.html" || pageName === "";
    const shouldLoadSeed = pageName === "seeds.html" || pageName === "index.html" || pageName === "";

    const fertilizerProductsRaw = shouldLoadFertilizer ? await loadProducts?.("fertilizer") : { items: [] };
    const pesticideProductsRaw = shouldLoadPesticide ? await loadProducts?.("pesticide") : { items: [] };
    const seedProductsRaw = shouldLoadSeed ? await loadProducts?.("seed") : { items: [] };

    const fertilizerProducts = Array.isArray(fertilizerProductsRaw)
        ? fertilizerProductsRaw
        : fertilizerProductsRaw?.items || fertilizerProductsRaw?.data || [];

    const pesticideProducts = Array.isArray(pesticideProductsRaw)
        ? pesticideProductsRaw
        : pesticideProductsRaw?.items || pesticideProductsRaw?.data || [];

    const seedProducts = Array.isArray(seedProductsRaw)
        ? seedProductsRaw
        : seedProductsRaw?.items || seedProductsRaw?.data || [];

    const products = [
        ...fertilizerProducts,
        ...pesticideProducts,
        ...seedProducts
    ];
    // DOM elements
    const fertilizerGrid = document.getElementById("fertilizer-grid");
    const fertilizerSearch = document.getElementById("fertilizer-search");
    const fertilizerPagination = document.getElementById("fertilizer-pagination");

    const pesticideGrid = document.getElementById("pesticide-grid");
    const pesticideSearch = document.getElementById("pesticide-search");
    const pesticidePagination = document.getElementById("pesticide-pagination");

    const seedGrid = document.getElementById("seed-grid");
    const seedSearch = document.getElementById("seed-search");
    const seedPagination = document.getElementById("seed-pagination");

    const cartToggle = document.getElementById("cart-toggle");
    const cartClose = document.getElementById("cart-close");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const whatsappOrderBtn = document.getElementById("whatsapp-order");

    const CART_STORAGE_KEY = "gkb-cart-v1";
    const PAGE_SIZE = 8;

    let cart = {};
    let fertilizerPage = 1;
    let pesticidePage = 1;
    let seedPage = 1;

    let fertilizerQuery = "";
    let pesticideQuery = "";
    let seedQuery = "";

    // Build lookup map (⚡ performance improvement)
    const productMap = new Map(products.map((product) => [String(product.id), product]));
    const loadCart = function () {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            cart = savedCart ? JSON.parse(savedCart) : {};
        } catch {
            cart = {};
        }
    };

    const saveCart = function () {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    };

    const openCart = function () {
        cartDrawer?.classList.add("open");
        cartOverlay?.classList.add("open");
    };

    const closeCart = function () {
        cartDrawer?.classList.remove("open");
        cartOverlay?.classList.remove("open");
    };

    const getTotalItems = function () {
        return Object.values(cart).reduce((t, q) => t + q, 0);
    };

    const getCartLines = function () {
        return Object.entries(cart)
            .map(([id, qty]) => {
                const product = productMap.get(String(id));
                if (!product) return null;
                return { product, quantity: qty };
            })
            .filter(Boolean);
    };

    const renderCart = function () {
        const cartLines = getCartLines();

        if (cartCount) cartCount.textContent = getTotalItems();
        if (cartTotal) cartTotal.textContent = "Total Items: " + getTotalItems();

        if (!cartItemsContainer) return;

        if (!cartLines.length) {
            cartItemsContainer.innerHTML =
                "<p class='empty-cart'>Your cart is empty. Add products to continue.</p>";
            return;
        }

        cartItemsContainer.innerHTML = cartLines.map(line => `
            <div class='cart-row'>
                <div>
                    <h4>${line.product.name}</h4>
                    <p><small>${line.product.unit}</small></p>
                    <p class='cart-price'>Rs ${line.product.price}</p>
                </div>
                <div class='cart-qty'>
                    <button data-action='decrease' data-id='${line.product.id}'>-</button>
                    <span>${line.quantity}</span>
                    <button data-action='increase' data-id='${line.product.id}'>+</button>
                </div>
            </div>
        `).join("");
    };

    const addToCart = function (id) {
        cart[id] = (cart[id] || 0) + 1;
        saveCart();
        renderCart();
        openCart();
    };

    const updateQuantity = function (id, delta) {
        if (!cart[id]) return;

        cart[id] += delta;
        if (cart[id] <= 0) delete cart[id];

        saveCart();
        renderCart();
    };

    const filterProducts = function (list, query) {
        query = (query || "").toLowerCase().trim();
        return list.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    };

    const renderProductCards = function (grid, items) {
        if (!grid) return;

        if (!items.length) {
            grid.innerHTML = "<p class='empty-products'>No products found.</p>";
            return;
        }

        grid.innerHTML = items.map(product => {
            const fallback = `https://picsum.photos/seed/${encodeURIComponent(product.id)}/600/400`;

            return `
                <article class='product-card'>
                    <img src='${product.imageUrl || product.image || fallback}' alt='${product.name}'
                        loading='lazy'
                        onerror="this.src='${fallback}'" />

                    <div class='product-content'>
                        <h4>${product.name}</h4>
                        <p><small>${product.description}</small></p>

                        <div class='product-meta'>
                            <p class='product-price'>Rs ${product.price} / ${product.unit}</p>
                            <button class='add-btn' data-id='${product.id}'>Add to Cart</button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    };

    const renderPagination = function (container, total, page) {
        if (!container) return;

        if (total <= 1) {
            container.innerHTML = "";
            return;
        }

        let html = `
            <button class='page-btn' data-page='${page - 1}' ${page === 1 ? "disabled" : ""}>Prev</button>
        `;

        for (let i = 1; i <= total; i++) {
            html += `<button class='page-btn ${i === page ? "active" : ""}' data-page='${i}'>${i}</button>`;
        }

        html += `
            <button class='page-btn' data-page='${page + 1}' ${page === total ? "disabled" : ""}>Next</button>
        `;

        container.innerHTML = html;
    };

    const renderCatalog = function (catalog) {
        const filtered = filterProducts(catalog.items, catalog.query());

        const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

        if (catalog.page() > totalPages) {
            catalog.setPage(totalPages);
        }

        const start = (catalog.page() - 1) * PAGE_SIZE;

        renderProductCards(catalog.grid, filtered.slice(start, start + PAGE_SIZE));
        renderPagination(catalog.pagination, totalPages, catalog.page());
    };

    const generateWhatsappMessage = function () {
        const lines = getCartLines().map((line, i) =>
            `${i + 1}. ${line.product.name} x ${line.quantity} (${line.product.unit})`
        ).join("\n");

        return (
            "Namaskar Goswami Khad Bhandar,\n\n" +
            "Please confirm my order:\n" +
            lines +
            "\n\nTotal items: " + getTotalItems() +
            "\n\nName:\nMobile:\nAddress:\n"
        );
    };

    // Load cart
    if (cartDrawer && cartItemsContainer) {
        loadCart();
        renderCart();
    }

    const catalogs = [
        {
            items: fertilizerProducts,
            grid: fertilizerGrid,
            search: fertilizerSearch,
            pagination: fertilizerPagination,
            page: () => fertilizerPage,
            setPage: v => fertilizerPage = v,
            query: () => fertilizerQuery,
            setQuery: v => fertilizerQuery = v
        },
        {
            items: pesticideProducts,
            grid: pesticideGrid,
            search: pesticideSearch,
            pagination: pesticidePagination,
            page: () => pesticidePage,
            setPage: v => pesticidePage = v,
            query: () => pesticideQuery,
            setQuery: v => pesticideQuery = v
        },
        {
            items: seedProducts,
            grid: seedGrid,
            search: seedSearch,
            pagination: seedPagination,
            page: () => seedPage,
            setPage: v => seedPage = v,
            query: () => seedQuery,
            setQuery: v => seedQuery = v
        }
    ];

    catalogs.forEach(catalog => {
        if (!catalog.grid || !catalog.search || !catalog.pagination) return;

        renderCatalog(catalog);

        catalog.search.addEventListener("input", e => {
            catalog.setQuery(e.target.value);
            catalog.setPage(1);
            renderCatalog(catalog);
        });

        catalog.grid.addEventListener("click", e => {
            const btn = e.target.closest(".add-btn");
            if (btn) addToCart(btn.dataset.id);
        });

        catalog.pagination.addEventListener("click", e => {
            const btn = e.target.closest(".page-btn");
            if (!btn || btn.disabled) return;

            catalog.setPage(Number(btn.dataset.page));
            renderCatalog(catalog);
        });
    });

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("click", e => {
            const btn = e.target.closest("button[data-action]");
            if (!btn) return;

            updateQuantity(
                btn.dataset.id,
                btn.dataset.action === "increase" ? 1 : -1
            );
        });
    }

    // WhatsApp
    whatsappOrderBtn?.addEventListener("click", function () {
        if (!getTotalItems()) {
            alert("Your cart is empty.");
            return;
        }

        const url =
            "https://wa.me/919758846111?text=" +
            encodeURIComponent(generateWhatsappMessage());

        window.open(url, "_blank");
    });

    // Cart controls
    cartToggle?.addEventListener("click", openCart);
    cartClose?.addEventListener("click", closeCart);
    cartOverlay?.addEventListener("click", closeCart);

    clearCartBtn?.addEventListener("click", function () {
        cart = {};
        saveCart();
        renderCart();
    });
};

// Init safely (prevents double run bugs)
const safeInitApp = function () {
    if (__appInitDone) return;
    initApp();
};

document.addEventListener("sections:loaded", safeInitApp);

if (!document.querySelector("[data-section-src]")) {
    safeInitApp();
}