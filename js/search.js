// ===================================
// Search Results Page Logic
// ===================================

let currentResults = [];
let filteredResults = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeSearchResults();
});

function initializeSearchResults() {
    // Get search parameters from localStorage
    const searchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
    
    if (!searchParams.origin || !searchParams.destination) {
        window.location.href = 'index.html';
        return;
    }

    // Display search summary
    displaySearchSummary(searchParams);

    // Perform search
    performSearch(searchParams);

    // Setup filters
    setupFilters();

    // Setup sorting
    setupSorting();
}

function displaySearchSummary(params) {
    const title = document.getElementById('searchTitle');
    const details = document.getElementById('searchDetails');

    const typeIcon = params.type === 'flight' ? '✈️' : '🚄';
    const typeText = params.type === 'flight' ? 'Flights' : 'Trains';

    title.textContent = `Available ${typeText}`;
    
    const dateStr = formatDate(params.departDate);
    const returnStr = params.returnTrip ? ` - Return: ${formatDate(params.returnDate)}` : '';
    
    details.textContent = `${typeIcon} ${params.origin} → ${params.destination} | ${dateStr}${returnStr} | ${params.passengers} Passenger(s) | ${params.class.charAt(0).toUpperCase() + params.class.slice(1)} Class`;
}

async function performSearch(params) {
    const resultsContainer = document.getElementById('resultsContainer');
    showLoading(resultsContainer);

    try {
        // Fetch data from backend API
        const endpoint = params.type === 'flight' ? '/api/flights/search' : '/api/trains/search';
        const response = await fetch(`http://localhost:5000${endpoint}?from=${encodeURIComponent(params.origin)}&to=${encodeURIComponent(params.destination)}&date=${params.departDate}&class=${params.class}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch trips');
        }
        
        const data = await response.json();
        currentResults = data.data || [];
        
        // Transform backend data to match frontend format
        currentResults = currentResults.map(trip => transformTripData(trip, params));
        filteredResults = [...currentResults];
        
        if (currentResults.length === 0) {
            showNoResults();
        } else {
            displayResults(filteredResults);
        }
    } catch (error) {
        console.error('Error fetching trips:', error);
        showError('Failed to load trips. Please try again.');
    }
}

// Transform backend data to frontend format
function transformTripData(trip, params) {
    const isFlight = params.type === 'flight';
    return {
        id: isFlight ? `FL${trip.id}` : `TR${trip.id}`,
        type: params.type,
        name: isFlight ? trip.airline : trip.train_name,
        number: isFlight ? trip.flight_number : trip.train_number,
        origin: trip.from_city,
        originCode: trip.from_city.substring(0, 3).toUpperCase(),
        destination: trip.to_city,
        destinationCode: trip.to_city.substring(0, 3).toUpperCase(),
        departure: convertTo24Hour(trip.departure_time),
        arrival: convertTo24Hour(trip.arrival_time),
        duration: trip.duration,
        stops: trip.stops === 0 ? 'nonstop' : trip.stops === 1 ? 'onestop' : 'twostop',
        class: params.class,
        price: parseFloat(trip.price),
        availableSeats: 50, // Default value, can be updated if backend provides this
        date: params.departDate
    };
}

// Convert time to 24-hour format
function convertTo24Hour(time) {
    // If already in 24-hour format (HH:MM), return as is
    if (/^\d{2}:\d{2}$/.test(time)) {
        return time;
    }
    
    // If in 12-hour format with AM/PM
    const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
        let hours = parseInt(match[1]);
        const minutes = match[2];
        const period = match[3].toUpperCase();
        
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    
    return time; // Return original if format not recognized
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    resultsCount.textContent = `${results.length} trip(s) found`;
    noResults.style.display = 'none';

    if (results.length === 0) {
        showNoResults();
        return;
    }

    const html = results.map(trip => createResultCard(trip)).join('');
    resultsContainer.innerHTML = html;

    // Add click handlers to book buttons
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', function() {
            const tripId = this.dataset.tripId;
            selectTrip(tripId);
        });
    });
}

function createResultCard(trip) {
    const typeIcon = trip.type === 'flight' ? '✈️' : '🚄';
    const stopsText = trip.stops === 'nonstop' ? 'Non-stop' : 
                      trip.stops === 'onestop' ? '1 Stop' : '2+ Stops';

    return `
        <div class="result-card">
            <div class="result-header">
                <div>
                    <span class="result-type">${typeIcon}</span>
                    <span class="result-name">${trip.name}</span>
                    <div class="result-number">${trip.number}</div>
                </div>
            </div>
            <div class="result-body">
                <div class="result-location">
                    <div class="result-city">${trip.origin}</div>
                    <div class="result-time">${trip.departure}</div>
                    <div class="result-code">${trip.originCode}</div>
                </div>
                <div class="result-arrow">
                    <div class="result-duration">${trip.duration}</div>
                    <div style="font-size: 2rem;">→</div>
                    <div class="result-stops">${stopsText}</div>
                </div>
                <div class="result-location">
                    <div class="result-city">${trip.destination}</div>
                    <div class="result-time">${trip.arrival}</div>
                    <div class="result-code">${trip.destinationCode}</div>
                </div>
            </div>
            <div class="result-footer">
                <div class="result-class">
                    <span class="class-badge">${trip.class.charAt(0).toUpperCase() + trip.class.slice(1)}</span>
                    <span class="class-badge">${trip.availableSeats} seats left</span>
                </div>
                <div class="result-price">
                    <span class="price-amount">${formatCurrency(trip.price)}</span>
                    <button class="btn btn-primary btn-book" data-trip-id="${trip.id}">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

function showNoResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    resultsContainer.innerHTML = '';
    resultsCount.textContent = '0 trips found';
    noResults.style.display = 'block';
}

function selectTrip(tripId) {
    const trip = currentResults.find(t => t.id === tripId);
    if (!trip) return;

    const searchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
    
    // Store selected trip data
    const bookingData = {
        trip: trip,
        searchParams: searchParams,
        passengers: [],
        seats: [],
        contactEmail: '',
        contactPhone: ''
    };

    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    window.location.href = 'booking.html';
}

function setupFilters() {
    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const maxPriceLabel = document.getElementById('maxPrice');

    // Set initial max price based on results
    if (currentResults.length > 0) {
        const maxPrice = Math.max(...currentResults.map(t => t.price));
        priceRange.max = Math.ceil(maxPrice / 100) * 100;
        priceRange.value = priceRange.max;
        maxPriceLabel.textContent = formatCurrency(priceRange.max);
    }

    priceRange.addEventListener('input', function() {
        maxPriceLabel.textContent = formatCurrency(this.value);
        applyFilters();
    });

    // Time filters
    document.querySelectorAll('.time-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Stops filters
    document.querySelectorAll('.stops-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    let results = [...currentResults];

    // Apply price filter
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    results = filterByPrice(results, maxPrice);

    // Apply time filters
    const timeFilters = Array.from(document.querySelectorAll('.time-filter:checked'))
        .map(cb => cb.value);
    if (timeFilters.length > 0) {
        results = filterByTime(results, timeFilters);
    }

    // Apply stops filters
    const stopsFilters = Array.from(document.querySelectorAll('.stops-filter:checked'))
        .map(cb => cb.value);
    if (stopsFilters.length > 0) {
        results = filterByStops(results, stopsFilters);
    }

    filteredResults = results;
    
    // Apply current sorting
    const sortBy = document.getElementById('sortBy').value;
    filteredResults = sortTrips(filteredResults, sortBy);
    
    displayResults(filteredResults);
}

function setupSorting() {
    const sortSelect = document.getElementById('sortBy');
    sortSelect.addEventListener('change', function() {
        filteredResults = sortTrips(filteredResults, this.value);
        displayResults(filteredResults);
    });
}

function resetFilters() {
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    priceRange.value = priceRange.max;
    document.getElementById('maxPrice').textContent = formatCurrency(priceRange.max);

    // Uncheck all checkboxes
    document.querySelectorAll('.time-filter, .stops-filter').forEach(cb => {
        cb.checked = false;
    });

    // Reset sorting
    document.getElementById('sortBy').value = 'price-low';

    // Reapply filters (which will show all results)
    applyFilters();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner">⏳ Searching for trips...</div>';
}

function showError(message) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #e74c3c;">
            <h3>⚠️ Error</h3>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
        </div>
    `;
    resultsCount.textContent = 'Error loading results';
}

// Made with Bob
