// Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.bx-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });
}

// Logout Functionality
const logoutBtn = document.getElementById('log_out');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            showToast('Logging out...', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        }
    });
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    // Change icon based on type
    toastIcon.className = type === 'success' ? 'bx bx-check-circle' : 
                         type === 'error' ? 'bx bx-error-circle' : 
                         type === 'warning' ? 'bx bx-error' : 
                         'bx bx-info-circle';
    
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// View Toggle (Table/Grid)
const viewBtns = document.querySelectorAll('.view-btn');
const stockViews = document.querySelectorAll('.stock-view');

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const viewType = btn.dataset.view;
        
        // Update active button
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active view
        stockViews.forEach(view => view.classList.remove('active'));
        document.querySelector(`.${viewType}-view`).classList.add('active');
        
        showToast(`Switched to ${viewType} view`, 'success');
    });
});

// Select All Checkbox
const selectAllCheckbox = document.getElementById('selectAll');
const rowCheckboxes = document.querySelectorAll('.row-checkbox');
const bulkActions = document.getElementById('bulkActions');
const bulkCount = document.querySelector('.bulk-count');

if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
        updateBulkActions();
    });
}

rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateBulkActions();
        
        // Update select all checkbox
        const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
        const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = someChecked && !allChecked;
    });
});

function updateBulkActions() {
    const checkedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
    
    if (checkedCount > 0) {
        bulkActions.style.display = 'flex';
        bulkCount.textContent = `${checkedCount} item${checkedCount > 1 ? 's' : ''} selected`;
    } else {
        bulkActions.style.display = 'none';
    }
}

// Search Functionality
const searchInput = document.getElementById('searchStock');
if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterStockTable(searchTerm);
    }, 300));
}

function filterStockTable(searchTerm) {
    const tableRows = document.querySelectorAll('.stock-table tbody tr');
    let visibleCount = 0;
    
    tableRows.forEach(row => {
        const productName = row.querySelector('.product-info h4')?.textContent.toLowerCase() || '';
        const sku = row.querySelector('.sku')?.textContent.toLowerCase() || '';
        
        if (productName.includes(searchTerm) || sku.includes(searchTerm)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    if (searchTerm && visibleCount === 0) {
        showToast('No products found', 'warning');
    }
}

// Filter by Category
const categoryFilter = document.getElementById('categoryFilter');
if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
        applyFilters();
    });
}

// Filter by Status
const statusFilter = document.getElementById('statusFilter');
if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
        applyFilters();
    });
}

function applyFilters() {
    const category = categoryFilter.value.toLowerCase();
    const status = statusFilter.value.toLowerCase();
    const tableRows = document.querySelectorAll('.stock-table tbody tr');
    let visibleCount = 0;
    
    tableRows.forEach(row => {
        const rowCategory = row.querySelector('.category-badge')?.textContent.toLowerCase() || '';
        const rowStatus = row.querySelector('.status-badge')?.classList[1] || '';
        
        const categoryMatch = !category || rowCategory.includes(category);
        const statusMatch = !status || rowStatus === status;
        
        if (categoryMatch && statusMatch) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    showToast(`Showing ${visibleCount} products`, 'info');
}

// Refresh Button
const refreshBtn = document.getElementById('refreshBtn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        refreshBtn.querySelector('i').style.animation = 'spin 0.5s linear';
        
        // Reset filters
        searchInput.value = '';
        categoryFilter.value = '';
        statusFilter.value = '';
        
        // Show all rows
        document.querySelectorAll('.stock-table tbody tr').forEach(row => {
            row.style.display = '';
        });
        
        setTimeout(() => {
            refreshBtn.querySelector('i').style.animation = '';
            showToast('Stock data refreshed', 'success');
        }, 500);
    });
}

// Export Button
const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        showToast('Exporting stock data to CSV...', 'info');
        
        setTimeout(() => {
            showToast('Stock data exported successfully!', 'success');
        }, 1500);
    });
}

// Add Stock Movement Button
const addStockBtn = document.getElementById('addStockBtn');
const stockModal = document.getElementById('stockModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const stockForm = document.getElementById('stockForm');

if (addStockBtn) {
    addStockBtn.addEventListener('click', () => {
        openStockModal();
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        closeStockModal();
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        closeStockModal();
    });
}

// Close modal on outside click
stockModal?.addEventListener('click', (e) => {
    if (e.target === stockModal) {
        closeStockModal();
    }
});

function openStockModal(productId = null) {
    stockModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (productId) {
        document.getElementById('modalTitle').textContent = 'Adjust Stock';
        document.getElementById('productSelect').value = productId;
        updateCurrentStock();
    } else {
        document.getElementById('modalTitle').textContent = 'Add Stock Movement';
        stockForm.reset();
        document.getElementById('stockPreview').style.display = 'none';
    }
}

function closeStockModal() {
    stockModal.classList.remove('active');
    document.body.style.overflow = '';
    stockForm.reset();
    document.getElementById('stockPreview').style.display = 'none';
}

// Product Select Change
const productSelect = document.getElementById('productSelect');
const currentStockInput = document.getElementById('currentStock');

if (productSelect) {
    productSelect.addEventListener('change', () => {
        updateCurrentStock();
    });
}

function updateCurrentStock() {
    const productId = productSelect.value;
    
    // Mock data - in real app, fetch from API
    const stockData = {
        '1': 142,
        '2': 23,
        '3': 0,
        '4': 87,
        '5': 156,
        '6': 12
    };
    
    if (productId && stockData[productId] !== undefined) {
        currentStockInput.value = stockData[productId];
        updateStockPreview();
    } else {
        currentStockInput.value = '';
        document.getElementById('stockPreview').style.display = 'none';
    }
}

// Movement Type and Quantity Change
const movementType = document.getElementById('movementType');
const quantityInput = document.getElementById('quantity');

[movementType, quantityInput].forEach(input => {
    if (input) {
        input.addEventListener('change', updateStockPreview);
        input.addEventListener('input', updateStockPreview);
    }
});

function updateStockPreview() {
    const current = parseInt(currentStockInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;
    const type = movementType.value;
    
    if (current === 0 && !productSelect.value) {
        document.getElementById('stockPreview').style.display = 'none';
        return;
    }
    
    let newStock = current;
    let change = 0;
    
    if (type === 'add') {
        newStock = current + quantity;
        change = quantity;
    } else if (type === 'remove') {
        newStock = Math.max(0, current - quantity);
        change = -quantity;
    } else if (type === 'adjust') {
        newStock = quantity;
        change = quantity - current;
    }
    
    const previewCurrent = document.getElementById('previewCurrent');
    const previewChange = document.getElementById('previewChange');
    const previewNew = document.getElementById('previewNew');
    const stockPreview = document.getElementById('stockPreview');
    
    previewCurrent.textContent = current;
    previewChange.textContent = change >= 0 ? `+${change}` : change;
    previewChange.className = change >= 0 ? 'positive' : 'negative';
    previewNew.textContent = newStock;
    
    stockPreview.style.display = 'block';
}

// Stock Form Submit
if (stockForm) {
    stockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const productId = productSelect.value;
        const type = movementType.value;
        const quantity = quantityInput.value;
        const reason = document.getElementById('reason').value;
        const notes = document.getElementById('notes').value;
        
        if (!productId || !quantity || !reason) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate API call
        showToast('Updating stock...', 'info');
        
        setTimeout(() => {
            showToast('Stock updated successfully!', 'success');
            closeStockModal();
            
            // Update the table row
            updateStockRow(productId);
        }, 1000);
    });
}

function updateStockRow(productId) {
    const row = document.querySelector(`tr[data-product-id="${productId}"]`);
    if (row) {
        const stockNumber = row.querySelector('.stock-number');
        const stockFill = row.querySelector('.stock-fill');
        const statusBadge = row.querySelector('.status-badge');
        
        // Get new stock from preview
        const newStock = parseInt(document.getElementById('previewNew').textContent);
        
        // Update stock number
        stockNumber.textContent = newStock;
        
        // Update stock bar
        const percentage = Math.min(100, newStock);
        stockFill.style.width = `${percentage}%`;
        
        // Update status and color
        if (newStock === 0) {
            stockFill.className = 'stock-fill out';
            statusBadge.className = 'status-badge out-of-stock';
            statusBadge.textContent = 'Out of Stock';
        } else if (newStock < 30) {
            stockFill.className = 'stock-fill low';
            statusBadge.className = 'status-badge low-stock';
            statusBadge.textContent = 'Low Stock';
        } else {
            stockFill.className = 'stock-fill';
            statusBadge.className = 'status-badge in-stock';
            statusBadge.textContent = 'In Stock';
        }
        
        // Update last updated
        row.querySelector('td:nth-last-child(2)').textContent = 'Just now';
        
        // Animate the row
        row.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            row.style.animation = '';
        }, 500);
    }
}

// Scan Barcode Button
const scanBarcodeBtn = document.getElementById('scanBarcodeBtn');
if (scanBarcodeBtn) {
    scanBarcodeBtn.addEventListener('click', () => {
        showToast('Barcode scanner feature coming soon!', 'info');
    });
}

// View Stock Details
function viewStockDetails(productId) {
    const detailsModal = document.getElementById('detailsModal');
    
    // Mock data - in real app, fetch from API
    const productData = {
        '1': {
            name: 'Nike Air Max 2024',
            sku: 'SKU-001',
            category: 'Clothing',
            stock: 142,
            minStock: 50,
            status: 'In Stock',
            lastUpdated: '2 hours ago'
        },
        '2': {
            name: 'Adidas Ultraboost',
            sku: 'SKU-002',
            category: 'Clothing',
            stock: 23,
            minStock: 50,
            status: 'Low Stock',
            lastUpdated: '5 hours ago'
        },
        '3': {
            name: 'Premium Leather Bag',
            sku: 'SKU-003',
            category: 'Accessories',
            stock: 0,
            minStock: 20,
            status: 'Out of Stock',
            lastUpdated: '1 day ago'
        }
    };
    
    const product = productData[productId];
    if (product) {
        document.getElementById('detailProductName').textContent = product.name;
        document.getElementById('detailSKU').textContent = product.sku;
        document.getElementById('detailCategory').textContent = product.category;
        document.getElementById('detailCurrentStock').textContent = product.stock;
        document.getElementById('detailMinStock').textContent = product.minStock;
        document.getElementById('detailStatus').textContent = product.status;
        document.getElementById('detailStatus').className = `status-badge ${product.status.toLowerCase().replace(' ', '-')}`;
        document.getElementById('detailLastUpdated').textContent = product.lastUpdated;
        
        detailsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Details Modal
const closeDetailsModal = document.getElementById('closeDetailsModal');
const detailsModal = document.getElementById('detailsModal');

if (closeDetailsModal) {
    closeDetailsModal.addEventListener('click', () => {
        detailsModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

detailsModal?.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
        detailsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Adjust Stock from Table
function adjustStock(productId) {
    openStockModal(productId);
}

// View Stock History
function viewHistory(productId) {
    showToast('Opening stock history...', 'info');
    setTimeout(() => {
        viewStockDetails(productId);
    }, 500);
}

// Bulk Actions
const bulkAdjustBtn = document.getElementById('bulkAdjustBtn');
const bulkExportBtn = document.getElementById('bulkExportBtn');
const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');

if (bulkAdjustBtn) {
    bulkAdjustBtn.addEventListener('click', () => {
        const checkedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
        showToast(`Adjusting stock for ${checkedCount} products...`, 'info');
    });
}

if (bulkExportBtn) {
    bulkExportBtn.addEventListener('click', () => {
        const checkedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
        showToast(`Exporting ${checkedCount} products...`, 'info');
        
        setTimeout(() => {
            showToast('Export completed successfully!', 'success');
        }, 1500);
    });
}

if (bulkDeleteBtn) {
    bulkDeleteBtn.addEventListener('click', () => {
        const checkedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
        
        if (confirm(`Are you sure you want to delete ${checkedCount} product${checkedCount > 1 ? 's' : ''}?`)) {
            showToast(`Deleting ${checkedCount} products...`, 'info');
            
            setTimeout(() => {
                // Remove checked rows
                rowCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        checkbox.closest('tr').remove();
                    }
                });
                
                updateBulkActions();
                showToast('Products deleted successfully!', 'success');
            }, 1000);
        }
    });
}

// Pagination
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumbers = document.querySelectorAll('.page-number');

if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.page-number.active');
        const prevPage = activePage.previousElementSibling;
        
        if (prevPage && prevPage.classList.contains('page-number')) {
            activePage.classList.remove('active');
            prevPage.classList.add('active');
            showToast('Loading previous page...', 'info');
        }
    });
}

if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.page-number.active');
        const nextPage = activePage.nextElementSibling;
        
        if (nextPage && nextPage.classList.contains('page-number')) {
            activePage.classList.remove('active');
            nextPage.classList.add('active');
            showToast('Loading next page...', 'info');
        }
    });
}

pageNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        pageNumbers.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Loading page ${btn.textContent}...`, 'info');
    });
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add spin animation for refresh icon
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Animate statistics on load
function animateStats() {
    const statValues = document.querySelectorAll('.stat-info h3');
    
    statValues.forEach((stat, index) => {
        const finalValue = parseInt(stat.textContent);
        const duration = 1500;
        const steps = 50;
        const increment = finalValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, duration / steps);
    });
}

// Animate stock bars on load
function animateStockBars() {
    const stockBars = document.querySelectorAll('.stock-fill');
    
    stockBars.forEach((bar, index) => {
        const finalWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = finalWidth;
        }, 100 * index);
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    animateStats();
    animateStockBars();
});

// Periodic stock refresh simulation
setInterval(() => {
    // Simulate real-time stock updates
    const randomRow = document.querySelectorAll('.stock-table tbody tr')[
        Math.floor(Math.random() * document.querySelectorAll('.stock-table tbody tr').length)
    ];
    
    if (randomRow) {
        randomRow.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            randomRow.style.animation = '';
        }, 500);
    }
}, 15000); // Every 15 seconds

console.log('Stock Management page loaded successfully!');
