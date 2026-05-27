// ===================================
// Homepage - Main Application Logic
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeHomepage();
});

function initializeHomepage() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departDate').setAttribute('min', today);
    document.getElementById('returnDate').setAttribute('min', today);

    // Tab switching for flight/train
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            // Update hidden input
            document.getElementById('travelType').value = this.dataset.type;
        });
    });

    // Round trip checkbox handler
    const returnTripCheckbox = document.getElementById('returnTrip');
    const returnDateGroup = document.querySelector('.return-date-group');
    
    returnTripCheckbox.addEventListener('change', function() {
        if (this.checked) {
            returnDateGroup.style.display = 'block';
            document.getElementById('returnDate').required = true;
        } else {
            returnDateGroup.style.display = 'none';
            document.getElementById('returnDate').required = false;
        }
    });

    // Form submission
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearchSubmit);

    // Add autocomplete to origin and destination
    setupAutocomplete('origin');
    setupAutocomplete('destination');
}

function handleSearchSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        type: document.getElementById('travelType').value,
        origin: document.getElementById('origin').value.trim(),
        destination: document.getElementById('destination').value.trim(),
        departDate: document.getElementById('departDate').value,
        passengers: document.getElementById('passengers').value,
        class: document.getElementById('class').value,
        returnTrip: document.getElementById('returnTrip').checked,
        returnDate: document.getElementById('returnDate').value
    };

    // Validation
    if (!formData.origin || !formData.destination) {
        alert('Please enter both origin and destination cities.');
        return;
    }

    if (formData.origin.toLowerCase() === formData.destination.toLowerCase()) {
        alert('Origin and destination cannot be the same.');
        return;
    }

    if (!formData.departDate) {
        alert('Please select a departure date.');
        return;
    }

    if (formData.returnTrip && !formData.returnDate) {
        alert('Please select a return date.');
        return;
    }

    if (formData.returnTrip && formData.returnDate < formData.departDate) {
        alert('Return date must be after departure date.');
        return;
    }

    // Store search parameters in localStorage
    localStorage.setItem('searchParams', JSON.stringify(formData));

    // Redirect to search results page
    window.location.href = 'search-results.html';
}

function setupAutocomplete(inputId) {
    const input = document.getElementById(inputId);
    let datalistId = inputId + 'List';
    
    // Create datalist if it doesn't exist
    let datalist = document.getElementById(datalistId);
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = datalistId;
        input.setAttribute('list', datalistId);
        input.parentNode.appendChild(datalist);
    }

    // Populate with popular cities
    popularCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });

    // Add input event for filtering
    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        datalist.innerHTML = '';
        
        const filtered = popularCities.filter(city => 
            city.toLowerCase().includes(value)
        ).slice(0, 10); // Limit to 10 suggestions

        filtered.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    });
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function to validate phone
function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show loading spinner
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner">⏳ Loading...</div>';
}

// Hide loading spinner
function hideLoading(element, content) {
    element.innerHTML = content;
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
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
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loading-spinner {
        text-align: center;
        padding: 2rem;
        font-size: 1.2rem;
        color: #64748b;
    }
`;
document.head.appendChild(style);

// Made with Bob
