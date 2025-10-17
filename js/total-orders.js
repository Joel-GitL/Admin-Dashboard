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

// Export Report Button
const exportReportBtn = document.getElementById('exportReportBtn');
if (exportReportBtn) {
    exportReportBtn.addEventListener('click', () => {
        showToast('Preparing comprehensive report...', 'info');
        
        setTimeout(() => {
            showToast('Report exported successfully!', 'success');
        }, 2000);
    });
}

// Refresh Data Button
const refreshDataBtn = document.getElementById('refreshDataBtn');
if (refreshDataBtn) {
    refreshDataBtn.addEventListener('click', () => {
        const icon = refreshDataBtn.querySelector('i');
        icon.style.animation = 'spin 1s linear';
        
        showToast('Refreshing order data...', 'info');
        
        setTimeout(() => {
            icon.style.animation = '';
            showToast('Data refreshed successfully!', 'success');
            animateStats();
        }, 1000);
    });
}

// Chart Period Controls
const chartBtns = document.querySelectorAll('.chart-btn');
chartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const period = btn.dataset.period;
        
        // Update active button
        chartBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        showToast(`Loading ${period} days data...`, 'info');
        
        // Simulate chart update
        setTimeout(() => {
            showToast('Chart updated successfully!', 'success');
        }, 500);
    });
});

// Apply Filters
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const status = document.getElementById('statusFilter').value;
        const payment = document.getElementById('paymentFilter').value;
        const value = document.getElementById('valueFilter').value;
        
        let filterCount = 0;
        if (startDate && endDate) filterCount++;
        if (status) filterCount++;
        if (payment) filterCount++;
        if (value) filterCount++;
        
        if (filterCount === 0) {
            showToast('Please select at least one filter', 'warning');
            return;
        }
        
        showToast(`Applying ${filterCount} filter${filterCount > 1 ? 's' : ''}...`, 'info');
        
        setTimeout(() => {
            showToast('Filters applied successfully!', 'success');
        }, 1000);
    });
}

// Reset Filters
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('paymentFilter').value = '';
        document.getElementById('valueFilter').value = '';
        
        showToast('All filters reset', 'info');
    });
}

// View Order Function
function viewOrder(orderId) {
    showToast(`Opening order #ORD-2024-${orderId}...`, 'info');
    
    setTimeout(() => {
        // Redirect to orders page or open modal
        window.location.href = `orders.html?id=${orderId}`;
    }, 500);
}

// Animate Statistics on Load
function animateStats() {
    const statValues = document.querySelectorAll('.stat-info h3');
    
    statValues.forEach((stat, index) => {
        const text = stat.textContent;
        const hasComma = text.includes(',');
        const hasPeso = text.includes('₱');
        
        // Extract numeric value
        let finalValue = parseInt(text.replace(/[^0-9]/g, ''));
        
        const duration = 2000;
        const steps = 60;
        const increment = finalValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            
            // Format with commas
            if (hasComma) {
                displayValue = displayValue.toLocaleString();
            }
            
            // Add peso sign
            if (hasPeso) {
                displayValue = '₱' + displayValue;
            }
            
            stat.textContent = displayValue;
        }, duration / steps);
    });
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        const finalWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = finalWidth;
        }, 100 * index);
    });
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize animations on page load
window.addEventListener('load', () => {
    animateStats();
    animateProgressBars();
    
    // Animate chart line
    const trendLine = document.querySelector('.trend-line');
    if (trendLine) {
        const length = trendLine.getTotalLength();
        trendLine.style.strokeDasharray = length;
        trendLine.style.strokeDashoffset = length;
        
        setTimeout(() => {
            trendLine.style.transition = 'stroke-dashoffset 2s ease-in-out';
            trendLine.style.strokeDashoffset = '0';
        }, 300);
    }
    
    // Animate donut chart segments
    const donutSegments = document.querySelectorAll('.donut-segment');
    donutSegments.forEach((segment, index) => {
        const dashArray = segment.getAttribute('stroke-dasharray');
        const dashOffset = segment.getAttribute('stroke-dashoffset');
        
        segment.style.strokeDashoffset = '440';
        
        setTimeout(() => {
            segment.style.transition = 'stroke-dashoffset 1.5s ease';
            segment.style.strokeDashoffset = dashOffset;
        }, 500 + (index * 200));
    });
});

// Add hover effects to chart data points
const dataPoints = document.querySelectorAll('.data-points circle');
dataPoints.forEach(point => {
    point.addEventListener('mouseenter', function() {
        this.setAttribute('r', '8');
        this.style.transition = 'r 0.3s ease';
    });
    
    point.addEventListener('mouseleave', function() {
        this.setAttribute('r', '5');
    });
});

// Add hover effects to status items
const statusItems = document.querySelectorAll('.status-item');
statusItems.forEach(item => {
    item.addEventListener('click', () => {
        const statusName = item.querySelector('.status-name').textContent;
        showToast(`Filtering orders by ${statusName} status...`, 'info');
    });
});

// Add hover effects to product items
const productItems = document.querySelectorAll('.product-item');
productItems.forEach(item => {
    item.addEventListener('click', () => {
        const productName = item.querySelector('.product-details h4').textContent;
        showToast(`Viewing details for ${productName}...`, 'info');
    });
});

// Add hover effects to payment items
const paymentItems = document.querySelectorAll('.payment-item');
paymentItems.forEach(item => {
    item.addEventListener('click', () => {
        const paymentMethod = item.querySelector('.payment-info h4').textContent;
        showToast(`Filtering orders by ${paymentMethod}...`, 'info');
    });
});

// Real-time updates simulation
let updateInterval;

function startRealtimeUpdates() {
    updateInterval = setInterval(() => {
        // Simulate random stat updates
        const stats = document.querySelectorAll('.stat-info h3');
        if (stats.length > 0) {
            const randomStat = stats[Math.floor(Math.random() * stats.length)];
            const currentValue = parseInt(randomStat.textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor(Math.random() * 10) + 1;
            const newValue = currentValue + change;
            
            const hasPeso = randomStat.textContent.includes('₱');
            let displayValue = newValue.toLocaleString();
            
            if (hasPeso) {
                displayValue = '₱' + displayValue;
            }
            
            randomStat.textContent = displayValue;
            randomStat.parentElement.parentElement.style.animation = 'pulse 0.5s ease';
            
            setTimeout(() => {
                randomStat.parentElement.parentElement.style.animation = '';
            }, 500);
        }
    }, 10000); // Every 10 seconds
}

// Start real-time updates
startRealtimeUpdates();

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Set default date range (last 30 days)
function setDefaultDateRange() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput && endDateInput) {
        startDateInput.value = formatDate(startDate);
        endDateInput.value = formatDate(endDate);
    }
}

// Set default date range on load
setDefaultDateRange();

// Date validation
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

if (startDateInput && endDateInput) {
    startDateInput.addEventListener('change', () => {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        
        if (endDate < startDate) {
            showToast('End date cannot be before start date', 'error');
            endDateInput.value = startDateInput.value;
        }
    });
    
    endDateInput.addEventListener('change', () => {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        
        if (endDate < startDate) {
            showToast('End date cannot be before start date', 'error');
            endDateInput.value = startDateInput.value;
        }
    });
}

// Filter change listeners
const filterSelects = document.querySelectorAll('.filter-input');
filterSelects.forEach(select => {
    if (select.tagName === 'SELECT') {
        select.addEventListener('change', () => {
            const filterName = select.previousElementSibling.textContent;
            const filterValue = select.options[select.selectedIndex].text;
            
            if (select.value) {
                showToast(`${filterName} set to: ${filterValue}`, 'info');
            }
        });
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + E: Export Report
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportReportBtn.click();
    }
    
    // Ctrl/Cmd + R: Refresh Data
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshDataBtn.click();
    }
    
    // Ctrl/Cmd + F: Focus on filters
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('statusFilter').focus();
    }
});

// Add tooltip functionality
function createTooltip(element, text) {
    element.setAttribute('title', text);
}

// Add tooltips to action buttons
document.querySelectorAll('.btn-action').forEach(btn => {
    createTooltip(btn, 'View order details');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});

// Print statistics summary to console
console.log('%c📊 Total Orders Dashboard Loaded', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #8b5cf6;');
console.log('%cFeatures:', 'color: #ec4899; font-weight: bold;');
console.log('✓ Real-time statistics with animations');
console.log('✓ Orders trend chart with 7/30/90 day views');
console.log('✓ Revenue by payment method breakdown');
console.log('✓ Order status distribution with donut chart');
console.log('✓ Top 5 selling products ranking');
console.log('✓ Advanced filtering system');
console.log('✓ Recent orders table');
console.log('✓ Export and refresh functionality');
console.log('✓ Responsive design for all devices');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #8b5cf6;');

// Initialize all interactive elements
document.querySelectorAll('[data-interactive]').forEach(element => {
    element.style.cursor = 'pointer';
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

console.log('✅ Total Orders page initialized successfully!');
