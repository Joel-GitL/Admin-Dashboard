/* ============================================
   ADMINPRO - Main JavaScript File
   Common Utilities & Functions for All Pages
   ============================================ */

// ==========================================
// 1. SIDEBAR TOGGLE FUNCTIONALITY
// ==========================================
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");

if (sidebarBtn) {
  sidebarBtn.onclick = function() {
    sidebar.classList.toggle("active");
    
    // Save sidebar state to localStorage
    if(sidebar.classList.contains("active")){
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      localStorage.setItem('sidebarState', 'collapsed');
    } else {
      sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      localStorage.setItem('sidebarState', 'expanded');
    }
  }
}

// Restore sidebar state on page load
window.addEventListener('load', () => {
  const sidebarState = localStorage.getItem('sidebarState');
  if (sidebarState === 'collapsed' && sidebar && sidebarBtn) {
    sidebar.classList.add('active');
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  }
});

// ==========================================
// 2. TOAST NOTIFICATION SYSTEM
// ==========================================
window.showToast = function(message, type = 'success', duration = 3000) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Set icon based on type
  let iconClass = 'bx-check-circle';
  if (type === 'error') {
    iconClass = 'bx-error-circle';
  } else if (type === 'info') {
    iconClass = 'bx-info-circle';
  } else if (type === 'warning') {
    iconClass = 'bx-error';
  }
  
  toast.innerHTML = `
    <i class='bx ${iconClass}'></i>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 100);
  
  // Auto remove after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// ==========================================
// 3. CONFIRMATION DIALOG
// ==========================================
window.confirmDialog = function(message, onConfirm, onCancel) {
  const confirmed = confirm(message);
  if (confirmed && typeof onConfirm === 'function') {
    onConfirm();
  } else if (!confirmed && typeof onCancel === 'function') {
    onCancel();
  }
  return confirmed;
}

// ==========================================
// 4. LOGOUT FUNCTIONALITY
// ==========================================
const logoutBtn = document.getElementById('log_out');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    confirmDialog(
      'Are you sure you want to logout?',
      () => {
        // Clear any saved data
        sessionStorage.clear();
        // Redirect to login page (or index)
        window.location.href = 'index.html';
      }
    );
  });
}

// ==========================================
// 5. SEARCH FUNCTIONALITY (for pages with search)
// ==========================================
window.initSearch = function(inputSelector, itemsSelector, searchableProps) {
  const searchInput = document.querySelector(inputSelector);
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(itemsSelector);
    
    items.forEach(item => {
      let textContent = '';
      searchableProps.forEach(prop => {
        const element = item.querySelector(prop);
        if (element) {
          textContent += element.textContent.toLowerCase() + ' ';
        }
      });
      
      if (textContent.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// ==========================================
// 6. FILTER FUNCTIONALITY
// ==========================================
window.initFilter = function(filterSelector, itemsSelector, dataAttribute) {
  const filterElement = document.querySelector(filterSelector);
  if (!filterElement) return;
  
  filterElement.addEventListener('change', (e) => {
    const filterValue = e.target.value;
    const items = document.querySelectorAll(itemsSelector);
    
    items.forEach(item => {
      if (filterValue === 'all') {
        item.style.display = '';
      } else {
        const itemValue = item.getAttribute(dataAttribute);
        if (itemValue === filterValue) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
}

// ==========================================
// 7. FORM VALIDATION
// ==========================================
window.validateForm = function(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = 'var(--danger-color)';
      
      // Remove error styling after user types
      input.addEventListener('input', () => {
        input.style.borderColor = '';
      }, { once: true });
    }
  });
  
  return isValid;
}

// ==========================================
// 8. EMAIL VALIDATION
// ==========================================
window.validateEmail = function(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ==========================================
// 9. PHONE VALIDATION (Philippine Format)
// ==========================================
window.validatePhone = function(phone) {
  const phoneRegex = /^(\+63|0)?9\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ==========================================
// 10. FORMAT CURRENCY (Philippine Peso)
// ==========================================
window.formatCurrency = function(amount) {
  return '₱' + parseFloat(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ==========================================
// 11. FORMAT NUMBER
// ==========================================
window.formatNumber = function(number) {
  return parseFloat(number).toLocaleString('en-PH');
}

// ==========================================
// 12. FORMAT DATE
// ==========================================
window.formatDate = function(date, format = 'short') {
  const d = new Date(date);
  
  if (format === 'short') {
    // MM/DD/YYYY
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  } else if (format === 'long') {
    // January 1, 2024
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } else if (format === 'time') {
    // 12:30 PM
    return d.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } else if (format === 'full') {
    // January 1, 2024 12:30 PM
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}

// ==========================================
// 13. TIME AGO FUNCTION
// ==========================================
window.timeAgo = function(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
  
  return 'just now';
}

// ==========================================
// 14. DEBOUNCE FUNCTION
// ==========================================
window.debounce = function(func, wait = 300) {
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

// ==========================================
// 15. COPY TO CLIPBOARD
// ==========================================
window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Failed to copy', 'error');
  });
}

// ==========================================
// 16. EXPORT TO CSV
// ==========================================
window.exportToCSV = function(data, filename = 'export.csv') {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Data exported successfully!', 'success');
}

function convertToCSV(data) {
  if (!data || !data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return `"${value}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}

// ==========================================
// 17. PRINT PAGE
// ==========================================
window.printPage = function() {
  window.print();
}

// ==========================================
// 18. LOADING SPINNER
// ==========================================
window.showLoading = function() {
  const loading = document.createElement('div');
  loading.id = 'loading-overlay';
  loading.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;
  loading.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loading);
}

window.hideLoading = function() {
  const loading = document.getElementById('loading-overlay');
  if (loading) {
    loading.remove();
  }
}

// ==========================================
// 19. SMOOTH SCROLL TO TOP
// ==========================================
window.scrollToTop = function(smooth = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

// ==========================================
// 20. LOCAL STORAGE HELPERS
// ==========================================
window.storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage', e);
      return false;
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing from localStorage', e);
      return false;
    }
  },
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Error clearing localStorage', e);
      return false;
    }
  }
};

// ==========================================
// 21. KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K: Focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  // Escape: Close modals/dialogs
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal.active, [class*="modal"][style*="display: flex"]');
    modals.forEach(modal => {
      modal.style.display = 'none';
      modal.classList.remove('active');
    });
  }
});

// ==========================================
// 22. ONLINE/OFFLINE STATUS
// ==========================================
window.addEventListener('online', () => {
  showToast('Connection restored', 'success');
});

window.addEventListener('offline', () => {
  showToast('No internet connection', 'warning', 5000);
});

// ==========================================
// 23. PREVENT DOUBLE SUBMISSION
// ==========================================
window.preventDoubleSubmit = function(form) {
  form.addEventListener('submit', function(e) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      
      // Re-enable after 3 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 3000);
    }
  });
}

// ==========================================
// 24. INITIALIZE ALL TOOLTIPS (if needed)
// ==========================================
window.initTooltips = function() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = `
        position: absolute;
        background: var(--dark);
        color: var(--white);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
      `;
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
      tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      
      this._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });
}

// ==========================================
// 25. AUTO-INIT ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('AdminPro Dashboard Initialized');
  
  // Initialize tooltips if any exist
  if (document.querySelectorAll('[data-tooltip]').length > 0) {
    initTooltips();
  }
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Log page load time
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
  }
});

// ==========================================
// END OF MAIN SCRIPT
// ==========================================
