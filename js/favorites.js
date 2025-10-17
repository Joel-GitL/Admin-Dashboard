// Sidebar Toggle
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".bx-menu");

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Logout Confirmation
const logoutBtn = document.getElementById("log_out");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to logout?")) {
            window.location.href = "../templates/login.html";
        }
    });
}

// Sample Favorites Data
let favorites = [
    {
        id: 1,
        type: "product",
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 1299.99,
        stock: 45,
        status: "in-stock",
        rating: 4.8,
        addedDate: Date.now() - 86400000, // 1 day ago
        icon: "bx-headphone"
    },
    {
        id: 2,
        type: "product",
        name: "Smart Watch Pro",
        category: "Wearables",
        price: 2499.99,
        stock: 12,
        status: "low-stock",
        rating: 4.6,
        addedDate: Date.now() - 172800000, // 2 days ago
        icon: "bx-time"
    },
    {
        id: 3,
        type: "order",
        name: "Order #ORD-2024-1042",
        customer: "John Doe",
        total: 3850.00,
        status: "completed",
        items: 5,
        orderDate: "Oct 10, 2024",
        addedDate: Date.now() - 259200000, // 3 days ago
        icon: "bx-shopping-bag"
    },
    {
        id: 4,
        type: "product",
        name: "Ergonomic Office Chair",
        category: "Furniture",
        price: 4599.99,
        stock: 28,
        status: "in-stock",
        rating: 4.9,
        addedDate: Date.now() - 345600000, // 4 days ago
        icon: "bx-chair"
    },
    {
        id: 5,
        type: "product",
        name: "4K Ultra HD Camera",
        category: "Electronics",
        price: 8999.99,
        stock: 8,
        status: "low-stock",
        rating: 4.7,
        addedDate: Date.now() - 432000000, // 5 days ago
        icon: "bx-camera"
    },
    {
        id: 6,
        type: "order",
        name: "Order #ORD-2024-1038",
        customer: "Jane Smith",
        total: 1250.00,
        status: "processing",
        items: 3,
        orderDate: "Oct 8, 2024",
        addedDate: Date.now() - 518400000, // 6 days ago
        icon: "bx-shopping-bag"
    },
    {
        id: 7,
        type: "product",
        name: "Mechanical Gaming Keyboard",
        category: "Accessories",
        price: 1899.99,
        stock: 35,
        status: "in-stock",
        rating: 4.5,
        addedDate: Date.now() - 604800000, // 7 days ago
        icon: "bx-keyboard"
    },
    {
        id: 8,
        type: "product",
        name: "Portable SSD 2TB",
        category: "Storage",
        price: 3299.99,
        stock: 52,
        status: "in-stock",
        rating: 4.8,
        addedDate: Date.now() - 691200000, // 8 days ago
        icon: "bx-hdd"
    },
    {
        id: 9,
        type: "order",
        name: "Order #ORD-2024-1025",
        customer: "Mike Johnson",
        total: 5620.00,
        status: "pending",
        items: 8,
        orderDate: "Oct 5, 2024",
        addedDate: Date.now() - 777600000, // 9 days ago
        icon: "bx-shopping-bag"
    }
];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById("searchFavorites");
    searchInput.addEventListener("input", () => {
        renderFavorites();
    });

    // Type filter
    const typeFilter = document.getElementById("typeFilter");
    typeFilter.addEventListener("change", () => {
        renderFavorites();
    });

    // Sort by
    const sortBy = document.getElementById("sortBy");
    sortBy.addEventListener("change", () => {
        renderFavorites();
    });

    // Clear all button
    const clearAllBtn = document.getElementById("clearAllBtn");
    clearAllBtn.addEventListener("click", () => {
        clearAllFavorites();
    });

    // Close modal
    const closeModalBtn = document.querySelector(".close-modal");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            document.getElementById("detailsModal").classList.remove("active");
        });
    }

    // Close modal on backdrop click
    const modal = document.getElementById("detailsModal");
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}

// Render Favorites
function renderFavorites() {
    const searchTerm = document.getElementById("searchFavorites").value.toLowerCase();
    const typeFilter = document.getElementById("typeFilter").value;
    const sortBy = document.getElementById("sortBy").value;

    // Filter favorites
    let filteredFavorites = favorites.filter(item => {
        // Type filter
        if (typeFilter && item.type !== typeFilter) return false;

        // Search filter
        if (searchTerm) {
            const searchableText = (item.name + " " + (item.category || "") + " " + (item.customer || "")).toLowerCase();
            if (!searchableText.includes(searchTerm)) return false;
        }

        return true;
    });

    // Sort favorites
    filteredFavorites.sort((a, b) => {
        switch (sortBy) {
            case "recent":
                return b.addedDate - a.addedDate;
            case "oldest":
                return a.addedDate - b.addedDate;
            case "name":
                return a.name.localeCompare(b.name);
            case "price-high":
                return (b.price || 0) - (a.price || 0);
            case "price-low":
                return (a.price || 0) - (b.price || 0);
            default:
                return b.addedDate - a.addedDate;
        }
    });

    // Update items count
    document.getElementById("itemsCount").textContent = `${filteredFavorites.length} item${filteredFavorites.length !== 1 ? 's' : ''}`;

    // Render or show empty state
    const favoritesGrid = document.getElementById("favoritesGrid");
    const emptyState = document.getElementById("emptyState");

    if (filteredFavorites.length === 0) {
        favoritesGrid.style.display = "none";
        emptyState.style.display = "flex";
        return;
    }

    favoritesGrid.style.display = "grid";
    emptyState.style.display = "none";

    // Generate HTML
    const favoritesHTML = filteredFavorites.map(item => {
        if (item.type === "product") {
            return `
                <div class="favorite-card">
                    <div class="card-image">
                        <i class='bx ${item.icon}'></i>
                        <span class="card-type-badge product">Product</span>
                        <div class="favorite-icon" onclick="removeFavorite(${item.id})">
                            <i class='bx bxs-heart'></i>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="card-title">${item.name}</h3>
                            <p class="card-subtitle">${item.category}</p>
                        </div>
                        <div class="card-meta">
                            <div class="meta-item">
                                <span class="meta-label">Price:</span>
                                <span class="meta-value price">₱${item.price.toLocaleString()}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Stock:</span>
                                <span class="meta-value">${item.stock} units</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Status:</span>
                                <span class="status-badge ${item.status}">${capitalizeStatus(item.status)}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Rating:</span>
                                <span class="meta-value">⭐ ${item.rating}</span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="card-btn" onclick="viewDetails(${item.id})">
                                <i class='bx bx-show'></i>
                                View Details
                            </button>
                            <button class="card-btn remove" onclick="removeFavorite(${item.id})">
                                <i class='bx bx-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="favorite-card">
                    <div class="card-image">
                        <i class='bx ${item.icon}'></i>
                        <span class="card-type-badge order">Order</span>
                        <div class="favorite-icon" onclick="removeFavorite(${item.id})">
                            <i class='bx bxs-heart'></i>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="card-title">${item.name}</h3>
                            <p class="card-subtitle">${item.customer}</p>
                        </div>
                        <div class="card-meta">
                            <div class="meta-item">
                                <span class="meta-label">Total:</span>
                                <span class="meta-value price">₱${item.total.toLocaleString()}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Items:</span>
                                <span class="meta-value">${item.items} items</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Status:</span>
                                <span class="status-badge ${item.status}">${capitalizeStatus(item.status)}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Date:</span>
                                <span class="meta-value">${item.orderDate}</span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="card-btn" onclick="viewDetails(${item.id})">
                                <i class='bx bx-show'></i>
                                View Details
                            </button>
                            <button class="card-btn remove" onclick="removeFavorite(${item.id})">
                                <i class='bx bx-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join("");

    favoritesGrid.innerHTML = favoritesHTML;
}

// View Details
function viewDetails(id) {
    const item = favorites.find(fav => fav.id === id);
    if (!item) return;

    const modalBody = document.getElementById("modalBody");
    
    if (item.type === "product") {
        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="width: 120px; height: 120px; margin: 0 auto 16px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 60px;">
                    <i class='bx ${item.icon}'></i>
                </div>
                <h3 style="font-size: 20px; font-weight: 600; color: var(--dark); margin-bottom: 8px;">${item.name}</h3>
                <p style="font-size: 14px; color: var(--gray);">${item.category}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Price</p>
                    <p style="font-size: 20px; font-weight: 600; color: var(--primary-color);">₱${item.price.toLocaleString()}</p>
                </div>
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Stock</p>
                    <p style="font-size: 20px; font-weight: 600; color: var(--dark);">${item.stock} units</p>
                </div>
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Status</p>
                    <span class="status-badge ${item.status}">${capitalizeStatus(item.status)}</span>
                </div>
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Rating</p>
                    <p style="font-size: 20px; font-weight: 600; color: var(--dark);">⭐ ${item.rating}</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="btn-primary" style="flex: 1;" onclick="showToast('Added to cart!')">
                    <i class='bx bx-cart'></i>
                    Add to Cart
                </button>
                <button class="btn-secondary" style="flex: 1; color: var(--danger-color); background: rgba(239, 68, 68, 0.1);" onclick="removeFavorite(${item.id}); document.getElementById('detailsModal').classList.remove('active');">
                    <i class='bx bx-heart-circle'></i>
                    Remove from Favorites
                </button>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="width: 120px; height: 120px; margin: 0 auto 16px; background: linear-gradient(135deg, var(--success-color), #34d399); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 60px;">
                    <i class='bx ${item.icon}'></i>
                </div>
                <h3 style="font-size: 20px; font-weight: 600; color: var(--dark); margin-bottom: 8px;">${item.name}</h3>
                <p style="font-size: 14px; color: var(--gray);">${item.customer}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Total Amount</p>
                    <p style="font-size: 20px; font-weight: 600; color: var(--primary-color);">₱${item.total.toLocaleString()}</p>
                </div>
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Items</p>
                    <p style="font-size: 20px; font-weight: 600; color: var(--dark);">${item.items} items</p>
                </div>
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Status</p>
                    <span class="status-badge ${item.status}">${capitalizeStatus(item.status)}</span>
                </div>
                <div style="padding: 16px; background: var(--bg-color); border-radius: 8px;">
                    <p style="font-size: 12px; color: var(--gray); margin-bottom: 4px;">Order Date</p>
                    <p style="font-size: 14px; font-weight: 600; color: var(--dark);">${item.orderDate}</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="btn-primary" style="flex: 1;" onclick="showToast('Redirecting to order details...')">
                    <i class='bx bx-show'></i>
                    View Full Order
                </button>
                <button class="btn-secondary" style="flex: 1; color: var(--danger-color); background: rgba(239, 68, 68, 0.1);" onclick="removeFavorite(${item.id}); document.getElementById('detailsModal').classList.remove('active');">
                    <i class='bx bx-heart-circle'></i>
                    Remove from Favorites
                </button>
            </div>
        `;
    }

    document.getElementById("detailsModal").classList.add("active");
}

// Remove Favorite
function removeFavorite(id) {
    const item = favorites.find(fav => fav.id === id);
    if (!item) return;

    if (confirm(`Remove "${item.name}" from favorites?`)) {
        favorites = favorites.filter(fav => fav.id !== id);
        renderFavorites();
        showToast("Removed from favorites");
    }
}

// Clear All Favorites
function clearAllFavorites() {
    if (favorites.length === 0) {
        showToast("No favorites to clear");
        return;
    }

    if (confirm(`Are you sure you want to remove all ${favorites.length} items from favorites?`)) {
        favorites = [];
        renderFavorites();
        showToast("All favorites cleared");
    }
}

// Capitalize Status
function capitalizeStatus(status) {
    return status
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// Toast Notification
function showToast(message) {
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("active");
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove("active");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
