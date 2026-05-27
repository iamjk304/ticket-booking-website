// ===================================
// Booking Page Logic
// ===================================

let bookingData = {};
let selectedSeats = [];
let occupiedSeats = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeBooking();
});

function initializeBooking() {
    // Load booking data
    bookingData = JSON.parse(localStorage.getItem('currentBooking') || '{}');
    
    if (!bookingData.trip) {
        window.location.href = 'index.html';
        return;
    }

    // Display trip summary
    displayTripSummary();

    // Generate seat map
    generateSeatMap();

    // Generate passenger fields
    generatePassengerFields();

    // Setup form submission
    setupFormSubmission();

    // Update booking summary
    updateBookingSummary();
}

function displayTripSummary() {
    const trip = bookingData.trip;
    const typeIcon = trip.type === 'flight' ? '✈️' : '🚄';
    
    const html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
                <h3 style="margin: 0;">${typeIcon} ${trip.name}</h3>
                <p style="margin: 0.5rem 0 0 0; color: var(--text-light);">${trip.number}</p>
            </div>
            <span class="class-badge">${trip.class.charAt(0).toUpperCase() + trip.class.slice(1)}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center;">
            <div>
                <div style="font-size: 1.5rem; font-weight: 600;">${trip.origin}</div>
                <div style="color: var(--primary-color); font-size: 1.1rem;">${trip.departure}</div>
            </div>
            <div style="text-align: center; color: var(--text-light);">
                <div>${trip.duration}</div>
                <div style="font-size: 1.5rem;">→</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.5rem; font-weight: 600;">${trip.destination}</div>
                <div style="color: var(--primary-color); font-size: 1.1rem;">${trip.arrival}</div>
            </div>
        </div>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <strong>Date:</strong> ${formatDate(trip.date)}
        </div>
    `;
    
    document.getElementById('tripSummary').innerHTML = html;
}

function generateSeatMap() {
    const trip = bookingData.trip;
    const totalSeats = 60; // 10 rows x 6 seats
    const passengers = parseInt(bookingData.searchParams.passengers);
    
    // Generate occupied seats
    occupiedSeats = generateOccupiedSeats(totalSeats, trip.availableSeats);
    
    const seatMap = document.getElementById('seatMap');
    let html = '';
    
    for (let row = 1; row <= 10; row++) {
        for (let col = 0; col < 6; col++) {
            const seatLetter = String.fromCharCode(65 + col); // A-F
            const seatNumber = `${row}${seatLetter}`;
            const isOccupied = occupiedSeats.includes(seatNumber);
            const seatClass = isOccupied ? 'seat occupied' : 'seat available';
            
            html += `<div class="${seatClass}" data-seat="${seatNumber}" onclick="toggleSeat('${seatNumber}')">${seatNumber}</div>`;
        }
    }
    
    seatMap.innerHTML = html;
}

function toggleSeat(seatNumber) {
    if (occupiedSeats.includes(seatNumber)) {
        return; // Can't select occupied seats
    }
    
    const passengers = parseInt(bookingData.searchParams.passengers);
    const seatElement = document.querySelector(`[data-seat="${seatNumber}"]`);
    
    if (selectedSeats.includes(seatNumber)) {
        // Deselect seat
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
        seatElement.classList.remove('selected');
        seatElement.classList.add('available');
    } else {
        // Select seat
        if (selectedSeats.length >= passengers) {
            alert(`You can only select ${passengers} seat(s) for ${passengers} passenger(s).`);
            return;
        }
        selectedSeats.push(seatNumber);
        seatElement.classList.remove('available');
        seatElement.classList.add('selected');
    }
    
    updateSelectedSeatsDisplay();
    updateBookingSummary();
}

function updateSelectedSeatsDisplay() {
    const seatsList = document.getElementById('seatsList');
    seatsList.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
}

function generatePassengerFields() {
    const passengers = parseInt(bookingData.searchParams.passengers);
    const container = document.getElementById('passengerFields');
    
    let html = '';
    for (let i = 1; i <= passengers; i++) {
        html += `
            <div class="passenger-card">
                <h4>Passenger ${i}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName${i}">First Name *</label>
                        <input type="text" id="firstName${i}" name="firstName${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="lastName${i}">Last Name *</label>
                        <input type="text" id="lastName${i}" name="lastName${i}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="age${i}">Age *</label>
                        <input type="number" id="age${i}" name="age${i}" min="1" max="120" required>
                    </div>
                    <div class="form-group">
                        <label for="gender${i}">Gender *</label>
                        <select id="gender${i}" name="gender${i}" required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function setupFormSubmission() {
    const form = document.getElementById('passengerForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate seat selection
        const passengers = parseInt(bookingData.searchParams.passengers);
        if (selectedSeats.length !== passengers) {
            alert(`Please select exactly ${passengers} seat(s).`);
            return;
        }
        
        // Collect passenger data
        const passengerData = [];
        for (let i = 1; i <= passengers; i++) {
            passengerData.push({
                firstName: document.getElementById(`firstName${i}`).value,
                lastName: document.getElementById(`lastName${i}`).value,
                age: document.getElementById(`age${i}`).value,
                gender: document.getElementById(`gender${i}`).value
            });
        }
        
        // Validate contact information
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (!validatePhone(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Update booking data
        bookingData.passengers = passengerData;
        bookingData.seats = selectedSeats;
        bookingData.contactEmail = email;
        bookingData.contactPhone = phone;
        
        // Save to localStorage
        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        
        // Redirect to payment page
        window.location.href = 'payment.html';
    });
}

function updateBookingSummary() {
    const trip = bookingData.trip;
    const passengers = parseInt(bookingData.searchParams.passengers);
    
    const summaryHTML = `
        <div style="margin-bottom: 1rem;">
            <strong>${trip.type === 'flight' ? '✈️' : '🚄'} ${trip.name}</strong>
            <p style="margin: 0.5rem 0; color: var(--text-light);">${trip.origin} → ${trip.destination}</p>
            <p style="margin: 0; color: var(--text-light);">${formatDate(trip.date)}</p>
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Passengers:</strong> ${passengers}<br>
            <strong>Class:</strong> ${trip.class.charAt(0).toUpperCase() + trip.class.slice(1)}<br>
            <strong>Selected Seats:</strong> ${selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
        </div>
    `;
    
    document.getElementById('bookingSummary').innerHTML = summaryHTML;
    
    // Calculate prices
    const basePrice = trip.price * passengers;
    const taxes = basePrice * 0.15;
    const total = basePrice + taxes;
    
    document.getElementById('baseFare').textContent = formatCurrency(basePrice);
    document.getElementById('taxesFees').textContent = formatCurrency(taxes);
    document.getElementById('totalAmount').textContent = formatCurrency(total);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Made with Bob
