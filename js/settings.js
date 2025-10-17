// Sidebar Toggle
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Logout Confirmation
document.getElementById('log_out').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
});

// Tab Switching
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');

settingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        settingsTabs.forEach(t => t.classList.remove('active'));
        settingsPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const targetPanel = tab.getAttribute('data-tab');
        const panelElement = document.getElementById(targetPanel + '-panel');
        if (panelElement) {
            panelElement.classList.add('active');
        }
    });
});

// Profile Photo Upload
const profilePhotoInput = document.getElementById('profilePhoto');
const profilePhotoPreview = document.querySelector('.photo-preview img');
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const removePhotoBtn = document.getElementById('removePhotoBtn');

uploadPhotoBtn.addEventListener('click', () => {
    profilePhotoInput.click();
});

profilePhotoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            showToast('Please select a valid image file (JPEG, PNG, GIF)', 'error');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size should be less than 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePhotoPreview.src = e.target.result;
            showToast('Profile photo updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

removePhotoBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove your profile photo?')) {
        profilePhotoPreview.src = '../images/profile.jpg';
        profilePhotoInput.value = '';
        showToast('Profile photo removed', 'success');
    }
});

// Password Visibility Toggle
const passwordInputs = document.querySelectorAll('.password-input input');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

togglePasswordBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const input = passwordInputs[index];
        const icon = btn;
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bx-show');
            icon.classList.add('bx-hide');
        } else {
            input.type = 'password';
            icon.classList.remove('bx-hide');
            icon.classList.add('bx-show');
        }
    });
});

// Profile Form Submission
document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate phone (Philippine format)
    if (phone) {
        const phoneRegex = /^(\+63|0)?9\d{9}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            showToast('Please enter a valid Philippine phone number', 'error');
            return;
        }
    }
    
    // Simulate API call
    setTimeout(() => {
        showToast('Profile updated successfully!', 'success');
    }, 500);
});

// Cancel Profile Form
document.getElementById('cancelProfile').addEventListener('click', () => {
    document.getElementById('profileForm').reset();
    showToast('Changes cancelled', 'info');
});

// Account Password Change
document.getElementById('accountForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate current password
    if (!currentPassword) {
        showToast('Please enter your current password', 'error');
        return;
    }
    
    // Validate new password
    if (newPassword.length < 8) {
        showToast('New password must be at least 8 characters', 'error');
        return;
    }
    
    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        showToast('Password must contain uppercase, lowercase, and numbers', 'error');
        return;
    }
    
    // Confirm password match
    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showToast('Password updated successfully!', 'success');
        document.getElementById('accountForm').reset();
    }, 500);
});

// Cancel Account Form
document.getElementById('cancelAccount').addEventListener('click', () => {
    document.getElementById('accountForm').reset();
    showToast('Changes cancelled', 'info');
});

// Delete Account
document.getElementById('deleteAccount').addEventListener('click', () => {
    const confirmed = confirm(
        'Are you sure you want to delete your account?\n\n' +
        'This action cannot be undone and will permanently delete:\n' +
        '• Your profile and account data\n' +
        '• All your orders and history\n' +
        '• All saved preferences\n\n' +
        'Type "DELETE" in the next prompt to confirm.'
    );
    
    if (confirmed) {
        const verification = prompt('Type "DELETE" to confirm account deletion:');
        if (verification === 'DELETE') {
            showToast('Account deletion initiated. You will be logged out shortly.', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            showToast('Account deletion cancelled', 'info');
        }
    }
});

// Notification Preferences
document.getElementById('notificationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const orderUpdates = document.getElementById('orderUpdates').checked;
    const productAlerts = document.getElementById('productAlerts').checked;
    const teamActivity = document.getElementById('teamActivity').checked;
    const marketingEmails = document.getElementById('marketingEmails').checked;
    const desktopNotifications = document.getElementById('desktopNotifications').checked;
    const messageAlerts = document.getElementById('messageAlerts').checked;
    
    // Save preferences (simulated)
    setTimeout(() => {
        showToast('Notification preferences saved!', 'success');
    }, 500);
});

// Reset Notification Preferences
document.getElementById('resetNotifications').addEventListener('click', () => {
    if (confirm('Reset all notification preferences to default?')) {
        document.getElementById('orderUpdates').checked = true;
        document.getElementById('productAlerts').checked = true;
        document.getElementById('teamActivity').checked = false;
        document.getElementById('marketingEmails').checked = false;
        document.getElementById('desktopNotifications').checked = true;
        document.getElementById('messageAlerts').checked = true;
        showToast('Notification preferences reset to default', 'success');
    }
});

// Enable Two-Factor Authentication
document.getElementById('enable2FA').addEventListener('click', () => {
    // Simulate 2FA setup
    const qrCode = 'JBSWY3DPEHPK3PXP'; // Mock authenticator secret
    alert(
        'Two-Factor Authentication Setup\n\n' +
        '1. Download Google Authenticator or Authy app\n' +
        '2. Scan the QR code (simulation)\n' +
        '3. Enter the 6-digit code from your app\n\n' +
        'Mock Secret Key: ' + qrCode
    );
    
    const code = prompt('Enter the 6-digit code from your authenticator app:');
    if (code && code.length === 6 && !isNaN(code)) {
        showToast('Two-Factor Authentication enabled successfully!', 'success');
        document.getElementById('enable2FA').textContent = 'Disable 2FA';
        document.getElementById('enable2FA').classList.remove('btn-primary');
        document.getElementById('enable2FA').classList.add('btn-danger');
    } else if (code) {
        showToast('Invalid code. Please try again.', 'error');
    }
});

// Revoke Session
const revokeButtons = document.querySelectorAll('.btn-revoke');
revokeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const sessionItem = this.closest('.session-item');
        const deviceName = sessionItem.querySelector('h5').textContent;
        
        if (confirm(`Revoke session for ${deviceName}?`)) {
            sessionItem.style.opacity = '0.5';
            setTimeout(() => {
                sessionItem.remove();
                showToast('Session revoked successfully', 'success');
            }, 300);
        }
    });
});

// Theme Selection
const themeCards = document.querySelectorAll('.preference-card');
themeCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active from all theme cards in appearance section only
        const appearanceSection = this.closest('.preference-section');
        if (appearanceSection) {
            const themesInSection = appearanceSection.querySelectorAll('.preference-card');
            themesInSection.forEach(c => c.classList.remove('active'));
        }
        
        // Add active to clicked card
        this.classList.add('active');
        
        const themeName = this.querySelector('h5').textContent;
        showToast(`Theme changed to ${themeName}`, 'success');
        
        // Apply theme (simulation)
        // In real implementation, this would change CSS variables or add/remove classes
    });
});

// Preferences Form
document.getElementById('preferencesForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const language = document.getElementById('language').value;
    const timezone = document.getElementById('timezone').value;
    const currency = document.getElementById('currency').value;
    const dateFormat = document.getElementById('dateFormat').value;
    const analytics = document.getElementById('analytics').checked;
    const personalization = document.getElementById('personalization').checked;
    
    // Save preferences (simulated)
    setTimeout(() => {
        showToast('Preferences saved successfully!', 'success');
    }, 500);
});

// Reset All Preferences
document.getElementById('resetPreferences').addEventListener('click', () => {
    if (confirm('Reset all preferences to default settings?')) {
        // Reset language & region
        document.getElementById('language').value = 'en';
        document.getElementById('timezone').value = 'manila';
        document.getElementById('currency').value = 'php';
        document.getElementById('dateFormat').value = 'mm-dd-yyyy';
        
        // Reset data & privacy
        document.getElementById('analytics').checked = true;
        document.getElementById('personalization').checked = true;
        
        // Reset theme to light
        themeCards.forEach(card => card.classList.remove('active'));
        themeCards[0].classList.add('active'); // Light mode
        
        showToast('All preferences reset to default', 'success');
    }
});

// Toast Notification Function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set icon based on type
    let iconClass = 'bx-check-circle';
    let iconColor = 'var(--success-color)';
    
    if (type === 'error') {
        iconClass = 'bx-error-circle';
        iconColor = 'var(--danger-color)';
    } else if (type === 'info') {
        iconClass = 'bx-info-circle';
        iconColor = 'var(--info-color)';
    }
    
    toast.innerHTML = `
        <i class='bx ${iconClass}' style="color: ${iconColor}"></i>
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('active');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Real-time Password Strength Indicator (optional enhancement)
const newPasswordInput = document.getElementById('newPassword');
if (newPasswordInput) {
    newPasswordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[@$!%*?&#]/.test(password)) strength++;
        
        // You could add a visual indicator here
        // For example, change border color based on strength
        if (strength < 3) {
            e.target.style.borderColor = 'var(--danger-color)';
        } else if (strength < 5) {
            e.target.style.borderColor = 'var(--warning-color)';
        } else {
            e.target.style.borderColor = 'var(--success-color)';
        }
    });
}

// Auto-save drafts (optional enhancement)
let autoSaveTimeout;
const formInputs = document.querySelectorAll('.settings-form input, .settings-form textarea, .settings-form select');

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            // Save to localStorage as draft
            const formId = input.closest('form').id;
            const formData = new FormData(input.closest('form'));
            const data = Object.fromEntries(formData);
            localStorage.setItem(`${formId}_draft`, JSON.stringify(data));
        }, 2000); // Save 2 seconds after user stops typing
    });
});

// Load drafts on page load
window.addEventListener('load', () => {
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
        const draft = localStorage.getItem(`${form.id}_draft`);
        if (draft) {
            const data = JSON.parse(draft);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input && input.type !== 'password') { // Don't restore passwords
                    input.value = data[key];
                }
            });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save (prevent default browser save)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const activePanel = document.querySelector('.settings-panel.active');
        if (activePanel) {
            const form = activePanel.querySelector('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
    
    // Escape to cancel/close
    if (e.key === 'Escape') {
        const activePanel = document.querySelector('.settings-panel.active');
        if (activePanel) {
            const cancelBtn = activePanel.querySelector('[id^="cancel"]');
            if (cancelBtn) {
                cancelBtn.click();
            }
        }
    }
});

// Smooth scroll to top when switching tabs
settingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.settings-content').scrollTop = 0;
    });
});

console.log('Settings page initialized successfully');
