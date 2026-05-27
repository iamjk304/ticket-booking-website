// ===================================
// Authentication Logic
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Check if user is already logged in
    checkAuthStatus();
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    
    // Clear previous errors
    emailError.textContent = '';
    
    // Validate email
    if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.color = '#ef4444';
        emailError.style.fontSize = '0.875rem';
        emailError.style.marginTop = '0.25rem';
        emailError.style.display = 'block';
        return;
    }
    
    // Validate password
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Store user data in localStorage
    const userData = {
        email: email,
        loginTime: new Date().toISOString(),
        isLoggedIn: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Show success message
    showSuccess('Login successful! Redirecting...');
    
    // Redirect to homepage after 1 second
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function handleLogout() {
    // Remove user data from localStorage
    localStorage.removeItem('currentUser');
    
    // Show success message
    showSuccess('Logged out successfully!');
    
    // Redirect to login page after 1 second
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navMenu) return;
    
    // Remove existing auth links
    const existingAuthLinks = navMenu.querySelectorAll('.auth-link');
    existingAuthLinks.forEach(link => link.remove());
    
    if (currentUser && currentUser.isLoggedIn) {
        // User is logged in - show email and logout button
        const userEmail = document.createElement('li');
        userEmail.className = 'auth-link';
        userEmail.innerHTML = `<span style="color: var(--primary-color); font-weight: 600;">👤 ${currentUser.email}</span>`;
        
        const logoutLink = document.createElement('li');
        logoutLink.className = 'auth-link';
        logoutLink.innerHTML = `<a href="#" onclick="handleLogout(); return false;" style="color: var(--danger-color);">Logout</a>`;
        
        navMenu.appendChild(userEmail);
        navMenu.appendChild(logoutLink);
    } else {
        // User is not logged in - show login link
        const loginLink = document.createElement('li');
        loginLink.className = 'auth-link';
        loginLink.innerHTML = `<a href="login.html">Login</a>`;
        
        navMenu.appendChild(loginLink);
    }
}

function validateEmail(email) {
    // Comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => successDiv.remove(), 300);
    }, 2000);
}

// Make handleLogout available globally
window.handleLogout = handleLogout;

// Made with Bob
