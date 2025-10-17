// Orders Page JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeOrders();
});

function initializeOrders() {
    // Filters
    setupFilters();
    
    // Bulk Actions
    setupBulkActions();
    
    // Order Actions
    setupOrderActions();
    
    // Modal
    setupModal();
    
    // Search
    setupSearch();
    
    // Pagination
    setupPagination();
    
    // Export
    setupExport();
}

// Filters
function setupFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const paymentFilter = document.getElementById('paymentFilter');
    const dateFromFilter = document.getElementById('dateFromFilter');
    const dateToFilter = document.getElementById('dateToFilter');
    const orderSearch = document.getElementById('orderSearch');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    // Status filter
    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrders);
    }
    
    // Payment filter
    if (paymentFilter) {
        paymentFilter.addEventListener('change', filterOrders);
    }
    
    // Date filters
    if (dateFromFilter) {
        dateFromFilter.addEventListener('change', filterOrders);
    }
    
    if (dateToFilter) {
        dateToFilter.addEventListener('change', filterOrders);
    }
    
    // Search filter
    if (orderSearch) {
        orderSearch.addEventListener('input', debounce(filterOrders, 300));
    }
    
    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            if (statusFilter) statusFilter.value = '';
            if (paymentFilter) paymentFilter.value = '';
            if (dateFromFilter) dateFromFilter.value = '';
            if (dateToFilter) dateToFilter.value = '';
            if (orderSearch) orderSearch.value = '';
            
            filterOrders();
            showToast('Filters cleared', 'info');
        });
    }
}

function filterOrders() {
    const statusFilter = document.getElementById('statusFilter');
    const paymentFilter = document.getElementById('paymentFilter');
    const orderSearch = document.getElementById('orderSearch');
    
    const status = statusFilter ? statusFilter.value.toLowerCase() : '';
    const payment = paymentFilter ? paymentFilter.value.toLowerCase() : '';
    const search = orderSearch ? orderSearch.value.toLowerCase() : '';
    
    const orderRows = document.querySelectorAll('#ordersTableBody tr');
    let visibleCount = 0;
    
    orderRows.forEach(row => {
        const rowStatus = row.dataset.status || '';
        const rowPayment = row.dataset.payment || '';
        const orderId = row.querySelector('.order-id');
        const customerName = row.querySelector('.customer-name');
        const customerEmail = row.querySelector('.customer-email');
        
        const orderIdText = orderId ? orderId.textContent.toLowerCase() : '';
        const customerNameText = customerName ? customerName.textContent.toLowerCase() : '';
        const customerEmailText = customerEmail ? customerEmail.textContent.toLowerCase() : '';
        
        const matchesStatus = !status || rowStatus === status;
        const matchesPayment = !payment || rowPayment === payment;
        const matchesSearch = !search || 
            orderIdText.includes(search) || 
            customerNameText.includes(search) || 
            customerEmailText.includes(search);
        
        if (matchesStatus && matchesPayment && matchesSearch) {
            row.style.display = '';
            visibleCount++;
            // Add fade in animation
            row.style.animation = 'fadeIn 0.3s ease';
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update pagination info
    updatePaginationInfo(visibleCount);
}

function updatePaginationInfo(count) {
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Showing 1-${count} of ${count} orders`;
    }
}

// Bulk Actions
function setupBulkActions() {
    const bulkActionsBar = document.getElementById('bulkActionsBar');
    const checkboxes = document.querySelectorAll('.order-checkbox');
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
            checkboxes.forEach(cb => {
                cb.checked = this.checked;
            });
            updateBulkActionsBar();
        });
    }
    
    // Bulk action buttons
    const bulkUpdateStatusBtn = document.getElementById('bulkUpdateStatusBtn');
    const bulkExportBtn = document.getElementById('bulkExportBtn');
    const bulkCancelBtn = document.getElementById('bulkCancelBtn');
    
    if (bulkUpdateStatusBtn) {
        bulkUpdateStatusBtn.addEventListener('click', function() {
            const selected = getSelectedOrders();
            showToast(`Update status for ${selected.length} orders`, 'info');
        });
    }
    
    if (bulkExportBtn) {
        bulkExportBtn.addEventListener('click', function() {
            const selected = getSelectedOrders();
            showToast(`Exporting ${selected.length} orders...`, 'info');
        });
    }
    
    if (bulkCancelBtn) {
        bulkCancelBtn.addEventListener('click', function() {
            const selected = getSelectedOrders();
            if (confirm(`Are you sure you want to cancel ${selected.length} orders?`)) {
                showToast(`${selected.length} orders cancelled`, 'success');
                // Reset checkboxes
                checkboxes.forEach(cb => cb.checked = false);
                updateBulkActionsBar();
            }
        });
    }
}

function updateBulkActionsBar() {
    const bulkActionsBar = document.getElementById('bulkActionsBar');
    const selected = getSelectedOrders();
    const selectedCount = bulkActionsBar.querySelector('.selected-count');
    
    if (selected.length > 0) {
        bulkActionsBar.style.display = 'flex';
        if (selectedCount) {
            selectedCount.textContent = `${selected.length} order${selected.length > 1 ? 's' : ''} selected`;
        }
    } else {
        bulkActionsBar.style.display = 'none';
    }
}

function getSelectedOrders() {
    const checkboxes = document.querySelectorAll('.order-checkbox:checked');
    return Array.from(checkboxes);
}

// Order Actions
function setupOrderActions() {
    // View order buttons
    const viewButtons = document.querySelectorAll('.view-order');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const orderId = row.querySelector('.order-id');
            showToast(`Loading order details...`, 'info');
            setTimeout(() => {
                openOrderDetailsModal(orderId ? orderId.textContent : '#ORD-0000');
            }, 500);
        });
    });
    
    // Print invoice buttons
    const printButtons = document.querySelectorAll('.print-invoice');
    printButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const orderId = row.querySelector('.order-id');
            showToast(`Preparing invoice for ${orderId ? orderId.textContent : 'order'}...`, 'info');
            setTimeout(() => {
                showToast('Invoice ready to print!', 'success');
                // In real implementation, this would trigger print dialog
                window.print();
            }, 1000);
        });
    });
    
    // More actions buttons
    const moreButtons = document.querySelectorAll('.more-actions');
    moreButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showToast('More actions menu coming soon!', 'info');
        });
    });
    
    // Create order button
    const createOrderBtn = document.getElementById('createOrderBtn');
    if (createOrderBtn) {
        createOrderBtn.addEventListener('click', function() {
            showToast('Create order feature coming soon!', 'info');
        });
    }
}

// Modal
function setupModal() {
    const modal = document.getElementById('orderDetailsModal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const printInvoiceBtn = document.getElementById('printInvoiceBtn');
    const updateStatusBtn = document.getElementById('updateStatusBtn');
    
    // Close modal
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeOrderDetailsModal();
        });
    });
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeOrderDetailsModal();
            }
        });
    }
    
    // Print invoice from modal
    if (printInvoiceBtn) {
        printInvoiceBtn.addEventListener('click', function() {
            showToast('Preparing invoice...', 'info');
            setTimeout(() => {
                showToast('Invoice ready to print!', 'success');
                window.print();
            }, 1000);
        });
    }
    
    // Update status
    if (updateStatusBtn) {
        updateStatusBtn.addEventListener('click', function() {
            showToast('Update status feature coming soon!', 'info');
        });
    }
}

function openOrderDetailsModal(orderId) {
    const modal = document.getElementById('orderDetailsModal');
    
    // Update order ID in modal (in real app, would fetch actual data)
    const orderTitle = modal.querySelector('.order-info-section h3');
    if (orderTitle) {
        orderTitle.textContent = `Order ${orderId}`;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderDetailsModal() {
    const modal = document.getElementById('orderDetailsModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Search
function setupSearch() {
    const globalSearch = document.getElementById('globalSearch');
    
    if (globalSearch) {
        globalSearch.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            const orderRows = document.querySelectorAll('#ordersTableBody tr');
            
            orderRows.forEach(row => {
                const orderId = row.querySelector('.order-id');
                const customerName = row.querySelector('.customer-name');
                const customerEmail = row.querySelector('.customer-email');
                
                const orderIdText = orderId ? orderId.textContent.toLowerCase() : '';
                const customerNameText = customerName ? customerName.textContent.toLowerCase() : '';
                const customerEmailText = customerEmail ? customerEmail.textContent.toLowerCase() : '';
                
                if (orderIdText.includes(searchTerm) || 
                    customerNameText.includes(searchTerm) || 
                    customerEmailText.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
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
            showToast(`Showing ${this.value} orders per page`, 'info');
        });
    }
}

// Export functionality
function setupExport() {
    const exportOrdersBtn = document.getElementById('exportOrdersBtn');
    
    if (exportOrdersBtn) {
        exportOrdersBtn.addEventListener('click', function() {
            showToast('Exporting orders to CSV...', 'info');
            // Simulate export
            setTimeout(() => {
                showToast('Orders exported successfully!', 'success');
            }, 1500);
        });
    }
}

// Animate statistics on load
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = !finalValue.includes('₱');
        
        if (isNumber) {
            const target = parseInt(finalValue.replace(/,/g, ''));
            let current = 0;
            const increment = target / 50;
            const duration = 1000;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, stepTime);
        }
    });
}

// Call animate stats after a short delay
setTimeout(animateStats, 500);

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

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
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
