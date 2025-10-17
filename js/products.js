// Products Page JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
});

function initializeProducts() {
    // View Toggle
    setupViewToggle();
    
    // Filters
    setupFilters();
    
    // Bulk Actions
    setupBulkActions();
    
    // Product Actions
    setupProductActions();
    
    // Modal
    setupModal();
    
    // Search
    setupSearch();
    
    // Pagination
    setupPagination();
}

// View Toggle (Grid/List)
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const gridView = document.getElementById('productsGrid');
    const listView = document.getElementById('productsList');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle views
            if (view === 'grid') {
                gridView.style.display = 'grid';
                listView.style.display = 'none';
            } else {
                gridView.style.display = 'none';
                listView.style.display = 'block';
            }
            
            // Add animation
            const activeView = view === 'grid' ? gridView : listView;
            activeView.style.animation = 'none';
            setTimeout(() => {
                activeView.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        });
    });
}

// Filters
function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const stockFilter = document.getElementById('stockFilter');
    const productSearch = document.getElementById('productSearch');
    
    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Status filter
    if (statusFilter) {
        statusFilter.addEventListener('change', filterProducts);
    }
    
    // Stock filter
    if (stockFilter) {
        stockFilter.addEventListener('change', filterProducts);
    }
    
    // Search filter
    if (productSearch) {
        productSearch.addEventListener('input', debounce(filterProducts, 300));
    }
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const stockFilter = document.getElementById('stockFilter');
    const productSearch = document.getElementById('productSearch');
    
    const category = categoryFilter ? categoryFilter.value.toLowerCase() : '';
    const stock = stockFilter ? stockFilter.value.toLowerCase() : '';
    const search = productSearch ? productSearch.value.toLowerCase() : '';
    
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const cardCategory = card.dataset.category || '';
        const cardStock = card.dataset.stock || '';
        const cardTitle = card.querySelector('.product-title');
        const cardSku = card.querySelector('.sku');
        
        const titleText = cardTitle ? cardTitle.textContent.toLowerCase() : '';
        const skuText = cardSku ? cardSku.textContent.toLowerCase() : '';
        
        const matchesCategory = !category || cardCategory === category;
        const matchesStock = !stock || cardStock === stock;
        const matchesSearch = !search || titleText.includes(search) || skuText.includes(search);
        
        if (matchesCategory && matchesStock && matchesSearch) {
            card.style.display = '';
            visibleCount++;
            // Add fade in animation
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update pagination info
    updatePaginationInfo(visibleCount);
}

function updatePaginationInfo(count) {
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Showing 1-${count} of ${count} products`;
    }
}

// Bulk Actions
function setupBulkActions() {
    const bulkActionsBar = document.getElementById('bulkActionsBar');
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const selectAllCheckbox = document.getElementById('selectAll');
    
    // Individual checkbox change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateBulkActionsBar();
        });
    });
    
    // Select all checkbox
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const rowCheckboxes = document.querySelectorAll('.row-checkbox');
            rowCheckboxes.forEach(cb => {
                cb.checked = this.checked;
            });
            updateBulkActionsBar();
        });
    }
    
    // Bulk action buttons
    const bulkEditBtn = document.getElementById('bulkEditBtn');
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    const bulkExportBtn = document.getElementById('bulkExportBtn');
    
    if (bulkEditBtn) {
        bulkEditBtn.addEventListener('click', function() {
            showToast('Bulk edit feature coming soon!', 'info');
        });
    }
    
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener('click', function() {
            const selected = getSelectedProducts();
            if (confirm(`Are you sure you want to delete ${selected.length} products?`)) {
                showToast(`${selected.length} products deleted successfully`, 'success');
                // Reset checkboxes
                checkboxes.forEach(cb => cb.checked = false);
                updateBulkActionsBar();
            }
        });
    }
    
    if (bulkExportBtn) {
        bulkExportBtn.addEventListener('click', function() {
            const selected = getSelectedProducts();
            showToast(`Exporting ${selected.length} products...`, 'info');
        });
    }
}

function updateBulkActionsBar() {
    const bulkActionsBar = document.getElementById('bulkActionsBar');
    const selected = getSelectedProducts();
    const selectedCount = bulkActionsBar.querySelector('.selected-count');
    
    if (selected.length > 0) {
        bulkActionsBar.style.display = 'flex';
        if (selectedCount) {
            selectedCount.textContent = `${selected.length} item${selected.length > 1 ? 's' : ''} selected`;
        }
    } else {
        bulkActionsBar.style.display = 'none';
    }
}

function getSelectedProducts() {
    const checkboxes = document.querySelectorAll('.product-checkbox:checked, .row-checkbox:checked');
    return Array.from(checkboxes);
}

// Product Actions
function setupProductActions() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card, tr');
            const productName = productCard.querySelector('.product-title, strong');
            showToast(`Editing: ${productName ? productName.textContent : 'Product'}`, 'info');
            openProductModal('edit');
        });
    });
    
    // Duplicate buttons
    const duplicateButtons = document.querySelectorAll('.btn-duplicate');
    duplicateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card, tr');
            const productName = productCard.querySelector('.product-title, strong');
            showToast(`Duplicated: ${productName ? productName.textContent : 'Product'}`, 'success');
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card, tr');
            const productName = productCard.querySelector('.product-title, strong');
            
            if (confirm(`Are you sure you want to delete "${productName ? productName.textContent : 'this product'}"?`)) {
                // Add fade out animation
                if (productCard.classList.contains('product-card')) {
                    productCard.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        productCard.remove();
                        showToast('Product deleted successfully', 'success');
                    }, 300);
                } else {
                    productCard.remove();
                    showToast('Product deleted successfully', 'success');
                }
            }
        });
    });
    
    // Quick view buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showToast('Quick view feature coming soon!', 'info');
        });
    });
}

// Modal
function setupModal() {
    const modal = document.getElementById('productModal');
    const addProductBtn = document.getElementById('addProductBtn');
    const closeButtons = document.querySelectorAll('.modal-close');
    const productForm = document.getElementById('productForm');
    
    // Open modal
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            openProductModal('add');
        });
    }
    
    // Close modal
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeProductModal();
        });
    });
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
    
    // Form submission
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Show success message
            showToast('Product saved successfully!', 'success');
            
            // Close modal
            closeProductModal();
            
            // Reset form
            this.reset();
        });
    }
    
    // File upload area
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileInput = fileUploadArea ? fileUploadArea.querySelector('input[type="file"]') : null;
    
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                fileUploadArea.querySelector('p').textContent = fileName;
                showToast('File uploaded successfully', 'success');
            }
        });
        
        // Drag and drop
        fileUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#667eea';
            this.style.background = '#f5f3ff';
        });
        
        fileUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d1d5db';
            this.style.background = '#f9fafb';
        });
        
        fileUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d1d5db';
            this.style.background = '#f9fafb';
            
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                fileInput.files = e.dataTransfer.files;
                const fileName = e.dataTransfer.files[0].name;
                this.querySelector('p').textContent = fileName;
                showToast('File uploaded successfully', 'success');
            }
        });
    }
}

function openProductModal(mode) {
    const modal = document.getElementById('productModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    
    if (mode === 'add') {
        modalTitle.textContent = 'Add New Product';
    } else {
        modalTitle.textContent = 'Edit Product';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Search
function setupSearch() {
    const globalSearch = document.getElementById('globalSearch');
    
    if (globalSearch) {
        globalSearch.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title');
                const sku = card.querySelector('.sku');
                const category = card.querySelector('.product-category');
                
                const titleText = title ? title.textContent.toLowerCase() : '';
                const skuText = sku ? sku.textContent.toLowerCase() : '';
                const categoryText = category ? category.textContent.toLowerCase() : '';
                
                if (titleText.includes(searchTerm) || skuText.includes(searchTerm) || categoryText.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    }
}

// Pagination
function setupPagination() {
    const paginationButtons = document.querySelectorAll('.btn-pagination');
    const itemsPerPage = document.querySelector('.items-per-page');
    
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled && !this.querySelector('i')) {
                // Remove active class from all buttons
                paginationButtons.forEach(b => {
                    if (!b.querySelector('i')) {
                        b.classList.remove('active');
                    }
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                showToast(`Loading page ${this.textContent}...`, 'info');
            }
        });
    });
    
    if (itemsPerPage) {
        itemsPerPage.addEventListener('change', function() {
            showToast(`Showing ${this.value} items per page`, 'info');
        });
    }
}

// Export functionality
const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
    exportBtn.addEventListener('click', function() {
        showToast('Exporting products to CSV...', 'info');
        // Simulate export
        setTimeout(() => {
            showToast('Products exported successfully!', 'success');
        }, 1500);
    });
}

// Toast Notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon;
    switch(type) {
        case 'success':
            icon = 'bx-check-circle';
            break;
        case 'error':
            icon = 'bx-error-circle';
            break;
        case 'warning':
            icon = 'bx-error';
            break;
        default:
            icon = 'bx-info-circle';
    }
    
    toast.innerHTML = `
        <i class='bx ${icon}' style='font-size: 24px; color: ${getToastColor(type)}'></i>
        <span style='color: #374151; font-weight: 500;'>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function getToastColor(type) {
    switch(type) {
        case 'success': return '#22c55e';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Utility function: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
