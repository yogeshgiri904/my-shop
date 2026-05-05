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
    const shouldLoadFertilizer = pageName === "fertilizers.html" || pageName === "fertilizers";
    const shouldLoadPesticide = pageName === "pesticides.html" || pageName === "pesticides";
    const shouldLoadSeed = pageName === "seeds.html" || pageName === "seeds";

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
    console.log('All Products:', products);
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
            `${i + 1}. ${line.product.name} x ${line.quantity}\n`
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


    // testimonial script
    const testimonialTrack = document.getElementById("move");
    const testimonialWrap = document.querySelector("#testimonial .wrap");
    const testimonialButtons = Array.from(document.querySelectorAll("#testimonial .test-btn"));
    const testimonialPrev = document.getElementById("test-prev");
    const testimonialNext = document.getElementById("test-next");

    if (testimonialTrack && testimonialWrap && testimonialButtons.length) {
        const originalSlides = Array.from(testimonialTrack.querySelectorAll(".test"));
        const testimonialSlider = document.querySelector("#testimonial .test-slider");
        const totalSlides = originalSlides.length;
        let activeTestimonialIndex = 1;
        let isSliding = false;
        let slideGuardTimer = null;
        let autoplayInterval = null;
        let autoplayResumeTimer = null;
        const AUTOPLAY_MS = 4500;
        const RESUME_IDLE_MS = 3500;

        const firstClone = originalSlides[0].cloneNode(true);
        const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
        testimonialTrack.appendChild(firstClone);
        testimonialTrack.insertBefore(lastClone, originalSlides[0]);

        const updateButtons = function (index) {
            testimonialButtons.forEach(function (button, buttonIndex) {
                button.classList.toggle("is-active", buttonIndex === index);
            });
        };

        const getRealIndex = function (trackIndex) {
            if (trackIndex === 0) {
                return totalSlides - 1;
            }
            if (trackIndex === totalSlides + 1) {
                return 0;
            }
            return trackIndex - 1;
        };

        const applyTrackLayout = function () {
            const slideWidth = testimonialWrap.clientWidth;
            const allSlides = Array.from(testimonialTrack.querySelectorAll(".test"));
            allSlides.forEach(function (slide) {
                slide.style.minWidth = slideWidth + "px";
                slide.style.maxWidth = slideWidth + "px";
            });
            testimonialTrack.style.width = (slideWidth * allSlides.length) + "px";
        };

        const moveToTestimonial = function (index, animate) {
            const slideWidth = testimonialWrap.clientWidth;
            testimonialTrack.style.transition = animate ? "transform .5s ease" : "none";
            activeTestimonialIndex = index;
            testimonialTrack.style.transform = "translateX(-" + (slideWidth * index) + "px)";
            updateButtons(getRealIndex(index));
            if (!animate) {
                isSliding = false;
            }
            if (slideGuardTimer) {
                clearTimeout(slideGuardTimer);
            }
            if (animate) {
                slideGuardTimer = setTimeout(function () {
                    isSliding = false;
                }, 700);
            }
        };

        const goToNextSlide = function () {
            if (isSliding) {
                return;
            }
            isSliding = true;
            moveToTestimonial(activeTestimonialIndex + 1, true);
        };

        const stopAutoplay = function () {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        };

        const startAutoplay = function () {
            stopAutoplay();
            autoplayInterval = setInterval(function () {
                goToNextSlide();
            }, AUTOPLAY_MS);
        };

        const scheduleAutoplayResume = function () {
            stopAutoplay();
            if (autoplayResumeTimer) {
                clearTimeout(autoplayResumeTimer);
            }
            autoplayResumeTimer = setTimeout(function () {
                startAutoplay();
            }, RESUME_IDLE_MS);
        };

        const onManualInteraction = function () {
            scheduleAutoplayResume();
        };

        testimonialButtons.forEach(function (button, index) {
            button.addEventListener("click", function () {
                const targetIndex = index + 1;
                if (targetIndex === activeTestimonialIndex || isSliding) {
                    return;
                }
                onManualInteraction();
                isSliding = true;
                moveToTestimonial(targetIndex, true);
            });
        });

        if (testimonialPrev) {
            testimonialPrev.addEventListener("click", function () {
                if (isSliding) {
                    return;
                }
                onManualInteraction();
                isSliding = true;
                moveToTestimonial(activeTestimonialIndex - 1, true);
            });
        }

        if (testimonialNext) {
            testimonialNext.addEventListener("click", function () {
                if (isSliding) {
                    return;
                }
                onManualInteraction();
                goToNextSlide();
            });
        }

        testimonialTrack.addEventListener("transitionend", function () {
            if (!isSliding) {
                return;
            }
            if (activeTestimonialIndex === totalSlides + 1) {
                moveToTestimonial(1, false);
            } else if (activeTestimonialIndex === 0) {
                moveToTestimonial(totalSlides, false);
            }
            isSliding = false;
        });

        window.addEventListener("resize", function () {
            applyTrackLayout();
            moveToTestimonial(activeTestimonialIndex, false);
        });

        if (testimonialSlider) {
            testimonialSlider.addEventListener("mouseenter", stopAutoplay);
            testimonialSlider.addEventListener("mouseleave", scheduleAutoplayResume);
            testimonialSlider.addEventListener("touchstart", stopAutoplay, { passive: true });
            testimonialSlider.addEventListener("touchend", scheduleAutoplayResume, { passive: true });
        }

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                stopAutoplay();
                return;
            }
            scheduleAutoplayResume();
        });

        applyTrackLayout();
        moveToTestimonial(1, false);
        startAutoplay();
    }

    // sidebar script
    const bar = document.getElementById("bar");
    const cross = document.getElementById("cross");
    const navExpand = document.getElementById("nav-expand");
    const navLinks = Array.from(document.querySelectorAll(".nav-links"));

    if (bar && cross && navExpand) {
        bar.addEventListener("click", function () {
            navExpand.style.transform = "translate(0px)";
            cross.style.display = "inline";
            bar.style.display = "none";
        });

        cross.addEventListener("click", function () {
            navExpand.style.transform = "translate(100vw)";
            bar.style.display = "inline";
            cross.style.display = "none";
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 720 && bar && cross && navExpand) {
                navExpand.style.transform = "translate(100vw)";
                bar.style.display = "inline";
                cross.style.display = "none";
            }
        });
    });


    const arrowDown = document.getElementById("arrow");
    if (arrowDown) {
        arrowDown.addEventListener("click", function () {
            window.scroll({
                top: 720,
                left: 0,
                behavior: "smooth"
            });
        });
    }

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