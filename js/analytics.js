// Analytics Page JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
});

function initializeAnalytics() {
    // Date Range Filter
    setupDateRangeFilter();
    
    // Chart Controls
    setupChartControls();
    
    // Export Report
    setupExportReport();
    
    // Animate Metrics
    animateMetrics();
    
    // Animate Progress Bars
    animateProgressBars();
    
    // Add interactions
    setupInteractions();
}

// Date Range Filter
function setupDateRangeFilter() {
    const dateRangeSelect = document.querySelector('.date-range-select');
    
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            const period = this.value;
            let message = '';
            
            switch(period) {
                case '7':
                    message = 'Showing data for last 7 days';
                    break;
                case '30':
                    message = 'Showing data for last 30 days';
                    break;
                case '90':
                    message = 'Showing data for last 90 days';
                    break;
                case '365':
                    message = 'Showing data for last year';
                    break;
                case 'custom':
                    message = 'Custom date range coming soon!';
                    break;
            }
            
            showToast(message, 'info');
            
            // Simulate data reload
            setTimeout(() => {
                animateMetrics();
                animateProgressBars();
                showToast('Data updated successfully', 'success');
            }, 500);
        });
    }
}

// Chart Controls
function setupChartControls() {
    const chartButtons = document.querySelectorAll('.chart-btn');
    
    chartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.dataset.period;
            const parent = this.closest('.chart-controls');
            
            // Remove active class from siblings
            parent.querySelectorAll('.chart-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show toast
            let message = '';
            switch(period) {
                case 'week':
                    message = 'Showing weekly data';
                    break;
                case 'month':
                    message = 'Showing monthly data';
                    break;
                case 'year':
                    message = 'Showing yearly data';
                    break;
            }
            
            showToast(message, 'info');
            
            // Simulate chart update
            const chartCard = this.closest('.chart-card');
            const chartArea = chartCard.querySelector('.line-chart-area');
            if (chartArea) {
                chartArea.style.animation = 'none';
                setTimeout(() => {
                    chartArea.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
        });
    });
}

// Export Report
function setupExportReport() {
    const exportBtn = document.getElementById('exportReportBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showToast('Preparing analytics report...', 'info');
            
            // Simulate export process
            setTimeout(() => {
                showToast('Report exported successfully!', 'success');
            }, 2000);
        });
    }
}

// Animate Metrics
function animateMetrics() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach((element, index) => {
        const text = element.textContent;
        
        // Check if it's a number (with or without currency/percentage)
        const hasSymbol = text.includes('₱') || text.includes('%');
        const numberText = text.replace(/[₱,%]/g, '').replace(/,/g, '');
        const isDecimal = numberText.includes('.');
        
        if (!isNaN(parseFloat(numberText))) {
            const target = parseFloat(numberText);
            let current = 0;
            const increment = target / 60;
            const duration = 1500;
            const stepTime = duration / 60;
            
            // Reset to 0
            element.textContent = hasSymbol ? (text.includes('₱') ? '₱0' : '0%') : '0';
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    // Format final value
                    if (text.includes('₱')) {
                        element.textContent = '₱' + Math.round(target).toLocaleString();
                    } else if (text.includes('%')) {
                        element.textContent = target.toFixed(2) + '%';
                    } else {
                        element.textContent = Math.round(target).toLocaleString();
                    }
                    clearInterval(counter);
                } else {
                    // Format current value
                    if (text.includes('₱')) {
                        element.textContent = '₱' + Math.round(current).toLocaleString();
                    } else if (text.includes('%')) {
                        element.textContent = current.toFixed(2) + '%';
                    } else {
                        element.textContent = Math.round(current).toLocaleString();
                    }
                }
            }, stepTime);
        }
    });
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500 + (index * 100));
    });
}

// Setup Interactions
function setupInteractions() {
    // Metric cards hover effect
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const sparklineBars = this.querySelectorAll('.sparkline-bar');
            sparklineBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1.1)';
                    bar.style.opacity = '1';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const sparklineBars = this.querySelectorAll('.sparkline-bar');
            sparklineBars.forEach(bar => {
                bar.style.transform = 'scaleY(1)';
                bar.style.opacity = '0.7';
            });
        });
    });
    
    // Product items click
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('.product-name').textContent;
            showToast(`Viewing details for: ${productName}`, 'info');
        });
    });
    
    // Traffic items click
    const trafficItems = document.querySelectorAll('.traffic-item');
    trafficItems.forEach(item => {
        item.addEventListener('click', function() {
            const sourceName = this.querySelector('.traffic-name').textContent;
            showToast(`Viewing traffic details from: ${sourceName}`, 'info');
        });
    });
    
    // Activity items click
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityTitle = this.querySelector('.activity-title').textContent;
            showToast(`Activity: ${activityTitle}`, 'info');
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f9fafb';
            this.style.borderRadius = '12px';
            this.style.padding = '16px';
            this.style.margin = '0 -16px 24px -16px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.padding = '0';
            this.style.margin = '0 0 24px 0';
        });
    });
    
    // View all link
    const viewAllLink = document.querySelector('.view-all-link');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Redirecting to products page...', 'info');
            setTimeout(() => {
                window.location.href = 'products.html';
            }, 500);
        });
    }
}

// Sparkline animation on hover
function animateSparkline(sparkline) {
    const bars = sparkline.querySelectorAll('.sparkline-bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const originalHeight = bar.style.height;
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = originalHeight;
            }, 50);
        }, index * 50);
    });
}

// Chart SVG animations
function animateChart() {
    const chartSvg = document.querySelector('.chart-svg');
    if (chartSvg) {
        const polylines = chartSvg.querySelectorAll('polyline');
        polylines.forEach((line, index) => {
            const length = line.getTotalLength();
            line.style.strokeDasharray = length;
            line.style.strokeDashoffset = length;
            
            setTimeout(() => {
                line.style.transition = 'stroke-dashoffset 2s ease';
                line.style.strokeDashoffset = '0';
            }, index * 500);
        });
    }
}

// Call chart animation after a delay
setTimeout(animateChart, 800);

// Donut chart animation
function animateDonutChart() {
    const donutCircles = document.querySelectorAll('.donut-svg circle');
    donutCircles.forEach((circle, index) => {
        const dashArray = circle.getAttribute('stroke-dasharray');
        if (dashArray) {
            const values = dashArray.split(' ');
            circle.setAttribute('stroke-dasharray', `0 ${values[1]}`);
            
            setTimeout(() => {
                circle.style.transition = 'stroke-dasharray 1s ease';
                circle.setAttribute('stroke-dasharray', dashArray);
            }, 1000 + (index * 200));
        }
    });
}

// Call donut animation after a delay
setTimeout(animateDonutChart, 1200);

// Global search functionality
const globalSearch = document.getElementById('globalSearch');
if (globalSearch) {
    globalSearch.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 0) {
            showToast(`Searching for: ${searchTerm}`, 'info');
        }
    }, 500));
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
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Refresh data periodically (simulate real-time updates)
setInterval(() => {
    // Update a random metric trend
    const trends = document.querySelectorAll('.metric-trend');
    if (trends.length > 0) {
        const randomIndex = Math.floor(Math.random() * trends.length);
        const trend = trends[randomIndex];
        
        // Add pulse animation
        trend.style.animation = 'pulse 1s ease';
        setTimeout(() => {
            trend.style.animation = '';
        }, 1000);
    }
}, 10000); // Every 10 seconds
