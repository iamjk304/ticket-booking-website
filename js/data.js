// ===================================
// Sample Flight and Train Data
// ===================================

const flightsData = [
    {
        id: 'FL001',
        type: 'flight',
        name: 'SkyWings Airlines',
        number: 'SW-2401',
        origin: 'New York',
        originCode: 'JFK',
        destination: 'Los Angeles',
        destinationCode: 'LAX',
        departure: '08:00 AM',
        arrival: '11:30 AM',
        duration: '5h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 299,
        availableSeats: 45,
        date: ''
    },
    {
        id: 'FL002',
        type: 'flight',
        name: 'AeroJet',
        number: 'AJ-1523',
        origin: 'New York',
        originCode: 'JFK',
        destination: 'Los Angeles',
        destinationCode: 'LAX',
        departure: '02:15 PM',
        arrival: '05:45 PM',
        duration: '5h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 349,
        availableSeats: 32,
        date: ''
    },
    {
        id: 'FL003',
        type: 'flight',
        name: 'CloudNine Airways',
        number: 'CN-8842',
        origin: 'New York',
        originCode: 'JFK',
        destination: 'Los Angeles',
        destinationCode: 'LAX',
        departure: '06:30 PM',
        arrival: '10:00 PM',
        duration: '5h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 279,
        availableSeats: 28,
        date: ''
    },
    {
        id: 'FL004',
        type: 'flight',
        name: 'SkyWings Airlines',
        number: 'SW-3305',
        origin: 'Chicago',
        originCode: 'ORD',
        destination: 'Miami',
        destinationCode: 'MIA',
        departure: '09:00 AM',
        arrival: '01:30 PM',
        duration: '3h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 189,
        availableSeats: 52,
        date: ''
    },
    {
        id: 'FL005',
        type: 'flight',
        name: 'AeroJet',
        number: 'AJ-7721',
        origin: 'Chicago',
        originCode: 'ORD',
        destination: 'Miami',
        destinationCode: 'MIA',
        departure: '03:45 PM',
        arrival: '08:15 PM',
        duration: '3h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 219,
        availableSeats: 38,
        date: ''
    },
    {
        id: 'FL006',
        type: 'flight',
        name: 'SkyWings Airlines',
        number: 'SW-4412',
        origin: 'San Francisco',
        originCode: 'SFO',
        destination: 'Seattle',
        destinationCode: 'SEA',
        departure: '07:30 AM',
        arrival: '09:45 AM',
        duration: '2h 15m',
        stops: 'nonstop',
        class: 'economy',
        price: 149,
        availableSeats: 41,
        date: ''
    },
    {
        id: 'FL007',
        type: 'flight',
        name: 'CloudNine Airways',
        number: 'CN-9923',
        origin: 'Boston',
        originCode: 'BOS',
        destination: 'Washington',
        destinationCode: 'DCA',
        departure: '10:00 AM',
        arrival: '11:30 AM',
        duration: '1h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 129,
        availableSeats: 35,
        date: ''
    },
    {
        id: 'FL008',
        type: 'flight',
        name: 'AeroJet',
        number: 'AJ-5544',
        origin: 'Dallas',
        originCode: 'DFW',
        destination: 'Denver',
        destinationCode: 'DEN',
        departure: '11:15 AM',
        arrival: '12:45 PM',
        duration: '2h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 169,
        availableSeats: 44,
        date: ''
    },
    // Indian Flights
    {
        id: 'FL009',
        type: 'flight',
        name: 'Air India',
        number: 'AI-101',
        origin: 'Delhi',
        originCode: 'DEL',
        destination: 'Mumbai',
        destinationCode: 'BOM',
        departure: '06:00 AM',
        arrival: '08:15 AM',
        duration: '2h 15m',
        stops: 'nonstop',
        class: 'economy',
        price: 89,
        availableSeats: 55,
        date: ''
    },
    {
        id: 'FL010',
        type: 'flight',
        name: 'IndiGo',
        number: '6E-202',
        origin: 'Delhi',
        originCode: 'DEL',
        destination: 'Mumbai',
        destinationCode: 'BOM',
        departure: '10:30 AM',
        arrival: '12:45 PM',
        duration: '2h 15m',
        stops: 'nonstop',
        class: 'economy',
        price: 79,
        availableSeats: 48,
        date: ''
    },
    {
        id: 'FL011',
        type: 'flight',
        name: 'SpiceJet',
        number: 'SG-303',
        origin: 'Delhi',
        originCode: 'DEL',
        destination: 'Mumbai',
        destinationCode: 'BOM',
        departure: '03:00 PM',
        arrival: '05:15 PM',
        duration: '2h 15m',
        stops: 'nonstop',
        class: 'economy',
        price: 75,
        availableSeats: 42,
        date: ''
    },
    {
        id: 'FL012',
        type: 'flight',
        name: 'Air India',
        number: 'AI-404',
        origin: 'Mumbai',
        originCode: 'BOM',
        destination: 'Bangalore',
        destinationCode: 'BLR',
        departure: '07:30 AM',
        arrival: '09:00 AM',
        duration: '1h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 69,
        availableSeats: 50,
        date: ''
    },
    {
        id: 'FL013',
        type: 'flight',
        name: 'IndiGo',
        number: '6E-505',
        origin: 'Mumbai',
        originCode: 'BOM',
        destination: 'Bangalore',
        destinationCode: 'BLR',
        departure: '01:00 PM',
        arrival: '02:30 PM',
        duration: '1h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 65,
        availableSeats: 45,
        date: ''
    },
    {
        id: 'FL014',
        type: 'flight',
        name: 'Vistara',
        number: 'UK-606',
        origin: 'Delhi',
        originCode: 'DEL',
        destination: 'Bangalore',
        destinationCode: 'BLR',
        departure: '08:00 AM',
        arrival: '10:45 AM',
        duration: '2h 45m',
        stops: 'nonstop',
        class: 'economy',
        price: 95,
        availableSeats: 52,
        date: ''
    },
    {
        id: 'FL015',
        type: 'flight',
        name: 'Air India',
        number: 'AI-707',
        origin: 'Kolkata',
        originCode: 'CCU',
        destination: 'Delhi',
        destinationCode: 'DEL',
        departure: '09:00 AM',
        arrival: '11:30 AM',
        duration: '2h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 85,
        availableSeats: 47,
        date: ''
    },
    {
        id: 'FL016',
        type: 'flight',
        name: 'IndiGo',
        number: '6E-808',
        origin: 'Chennai',
        originCode: 'MAA',
        destination: 'Hyderabad',
        destinationCode: 'HYD',
        departure: '11:00 AM',
        arrival: '12:15 PM',
        duration: '1h 15m',
        stops: 'nonstop',
        class: 'economy',
        price: 59,
        availableSeats: 40,
        date: ''
    },
    {
        id: 'FL017',
        type: 'flight',
        name: 'SpiceJet',
        number: 'SG-909',
        origin: 'Pune',
        originCode: 'PNQ',
        destination: 'Goa',
        destinationCode: 'GOI',
        departure: '02:00 PM',
        arrival: '03:15 PM',
        duration: '1h 15m',
        stops: 'nonstop',
        class: 'economy',
        price: 55,
        availableSeats: 38,
        date: ''
    },
    {
        id: 'FL018',
        type: 'flight',
        name: 'Vistara',
        number: 'UK-110',
        origin: 'Jaipur',
        originCode: 'JAI',
        destination: 'Mumbai',
        destinationCode: 'BOM',
        departure: '10:30 AM',
        arrival: '12:15 PM',
        duration: '1h 45m',
        stops: 'nonstop',
        class: 'economy',
        price: 72,
        availableSeats: 43,
        date: ''
    }
];

const trainsData = [
    {
        id: 'TR001',
        type: 'train',
        name: 'Express Rail',
        number: 'ER-101',
        origin: 'New York',
        originCode: 'NYP',
        destination: 'Washington',
        destinationCode: 'WAS',
        departure: '06:00 AM',
        arrival: '09:30 AM',
        duration: '3h 30m',
        stops: 'onestop',
        class: 'economy',
        price: 89,
        availableSeats: 120,
        date: ''
    },
    {
        id: 'TR002',
        type: 'train',
        name: 'Metro Express',
        number: 'ME-205',
        origin: 'New York',
        originCode: 'NYP',
        destination: 'Washington',
        destinationCode: 'WAS',
        departure: '10:30 AM',
        arrival: '02:00 PM',
        duration: '3h 30m',
        stops: 'onestop',
        class: 'economy',
        price: 79,
        availableSeats: 95,
        date: ''
    },
    {
        id: 'TR003',
        type: 'train',
        name: 'Express Rail',
        number: 'ER-303',
        origin: 'New York',
        originCode: 'NYP',
        destination: 'Washington',
        destinationCode: 'WAS',
        departure: '04:15 PM',
        arrival: '07:45 PM',
        duration: '3h 30m',
        stops: 'onestop',
        class: 'economy',
        price: 99,
        availableSeats: 88,
        date: ''
    },
    {
        id: 'TR004',
        type: 'train',
        name: 'Rapid Transit',
        number: 'RT-412',
        origin: 'Chicago',
        originCode: 'CHI',
        destination: 'Detroit',
        destinationCode: 'DET',
        departure: '08:00 AM',
        arrival: '01:30 PM',
        duration: '5h 30m',
        stops: 'twostop',
        class: 'economy',
        price: 69,
        availableSeats: 110,
        date: ''
    },
    {
        id: 'TR005',
        type: 'train',
        name: 'Metro Express',
        number: 'ME-518',
        origin: 'Chicago',
        originCode: 'CHI',
        destination: 'Detroit',
        destinationCode: 'DET',
        departure: '02:00 PM',
        arrival: '07:30 PM',
        duration: '5h 30m',
        stops: 'twostop',
        class: 'economy',
        price: 75,
        availableSeats: 102,
        date: ''
    },
    {
        id: 'TR006',
        type: 'train',
        name: 'Express Rail',
        number: 'ER-621',
        origin: 'Boston',
        originCode: 'BOS',
        destination: 'New York',
        destinationCode: 'NYP',
        departure: '07:30 AM',
        arrival: '11:45 AM',
        duration: '4h 15m',
        stops: 'onestop',
        class: 'economy',
        price: 65,
        availableSeats: 125,
        date: ''
    },
    {
        id: 'TR007',
        type: 'train',
        name: 'Rapid Transit',
        number: 'RT-734',
        origin: 'San Francisco',
        originCode: 'SFC',
        destination: 'Los Angeles',
        destinationCode: 'LAX',
        departure: '09:00 AM',
        arrival: '05:30 PM',
        duration: '8h 30m',
        stops: 'twostop',
        class: 'economy',
        price: 95,
        availableSeats: 98,
        date: ''
    },
    {
        id: 'TR008',
        type: 'train',
        name: 'Metro Express',
        number: 'ME-845',
        origin: 'Philadelphia',
        originCode: 'PHL',
        destination: 'Boston',
        destinationCode: 'BOS',
        departure: '11:00 AM',
        arrival: '05:00 PM',
        duration: '6h 00m',
        stops: 'onestop',
        class: 'economy',
        price: 85,
        availableSeats: 115,
        date: ''
    },
    // Indian Trains
    {
        id: 'TR009',
        type: 'train',
        name: 'Rajdhani Express',
        number: '12301',
        origin: 'Delhi',
        originCode: 'NDLS',
        destination: 'Mumbai',
        destinationCode: 'CSTM',
        departure: '04:55 PM',
        arrival: '08:35 AM',
        duration: '15h 40m',
        stops: 'twostop',
        class: 'economy',
        price: 45,
        availableSeats: 150,
        date: ''
    },
    {
        id: 'TR010',
        type: 'train',
        name: 'Shatabdi Express',
        number: '12002',
        origin: 'Delhi',
        originCode: 'NDLS',
        destination: 'Jaipur',
        destinationCode: 'JP',
        departure: '06:05 AM',
        arrival: '10:30 AM',
        duration: '4h 25m',
        stops: 'onestop',
        class: 'economy',
        price: 28,
        availableSeats: 130,
        date: ''
    },
    {
        id: 'TR011',
        type: 'train',
        name: 'Duronto Express',
        number: '12213',
        origin: 'Mumbai',
        originCode: 'CSTM',
        destination: 'Bangalore',
        destinationCode: 'SBC',
        departure: '08:00 PM',
        arrival: '06:30 PM',
        duration: '22h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 52,
        availableSeats: 140,
        date: ''
    },
    {
        id: 'TR012',
        type: 'train',
        name: 'Garib Rath',
        number: '12909',
        origin: 'Delhi',
        originCode: 'NDLS',
        destination: 'Kolkata',
        destinationCode: 'HWH',
        departure: '02:20 PM',
        arrival: '10:05 AM',
        duration: '19h 45m',
        stops: 'twostop',
        class: 'economy',
        price: 38,
        availableSeats: 160,
        date: ''
    },
    {
        id: 'TR013',
        type: 'train',
        name: 'Shatabdi Express',
        number: '12028',
        origin: 'Chennai',
        originCode: 'MAS',
        destination: 'Bangalore',
        destinationCode: 'SBC',
        departure: '06:00 AM',
        arrival: '11:00 AM',
        duration: '5h 00m',
        stops: 'onestop',
        class: 'economy',
        price: 32,
        availableSeats: 125,
        date: ''
    },
    {
        id: 'TR014',
        type: 'train',
        name: 'Rajdhani Express',
        number: '12432',
        origin: 'Delhi',
        originCode: 'NDLS',
        destination: 'Bangalore',
        destinationCode: 'SBC',
        departure: '08:50 PM',
        arrival: '06:00 AM',
        duration: '33h 10m',
        stops: 'twostop',
        class: 'economy',
        price: 58,
        availableSeats: 145,
        date: ''
    },
    {
        id: 'TR015',
        type: 'train',
        name: 'Vande Bharat',
        number: '22439',
        origin: 'Delhi',
        originCode: 'NDLS',
        destination: 'Varanasi',
        destinationCode: 'BSB',
        departure: '06:00 AM',
        arrival: '02:00 PM',
        duration: '8h 00m',
        stops: 'onestop',
        class: 'economy',
        price: 42,
        availableSeats: 110,
        date: ''
    },
    {
        id: 'TR016',
        type: 'train',
        name: 'Humsafar Express',
        number: '12295',
        origin: 'Mumbai',
        originCode: 'CSTM',
        destination: 'Pune',
        destinationCode: 'PUNE',
        departure: '05:10 AM',
        arrival: '08:25 AM',
        duration: '3h 15m',
        stops: 'nonstop',
        class: 'economy',
        price: 22,
        availableSeats: 135,
        date: ''
    },
    {
        id: 'TR017',
        type: 'train',
        name: 'Tejas Express',
        number: '82501',
        origin: 'Mumbai',
        originCode: 'CSTM',
        destination: 'Goa',
        destinationCode: 'MAO',
        departure: '05:00 AM',
        arrival: '05:00 PM',
        duration: '12h 00m',
        stops: 'onestop',
        class: 'economy',
        price: 35,
        availableSeats: 120,
        date: ''
    },
    {
        id: 'TR018',
        type: 'train',
        name: 'Gatimaan Express',
        number: '12049',
        origin: 'Delhi',
        originCode: 'NDLS',
        destination: 'Agra',
        destinationCode: 'AGC',
        departure: '08:10 AM',
        arrival: '09:50 AM',
        duration: '1h 40m',
        stops: 'nonstop',
        class: 'economy',
        price: 18,
        availableSeats: 100,
        date: ''
    }
];

// Popular cities for autocomplete
const popularCities = [
    // US Cities
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
    'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington',
    'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City',
    'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore',
    'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Mesa',
    'Sacramento', 'Atlanta', 'Kansas City', 'Colorado Springs', 'Omaha',
    'Raleigh', 'Miami', 'Long Beach', 'Virginia Beach', 'Oakland',
    'Minneapolis', 'Tulsa', 'Tampa', 'Arlington', 'New Orleans',
    // Indian Cities
    'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
    'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi',
    'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai',
    'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur',
    'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
    'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Goa'
];

// Class pricing multipliers
const classPricing = {
    economy: 1.0,
    business: 2.5,
    first: 4.0
};

// Generate occupied seats randomly
function generateOccupiedSeats(totalSeats, availableSeats) {
    const occupied = [];
    const occupiedCount = totalSeats - availableSeats;
    
    while (occupied.length < occupiedCount) {
        const row = Math.floor(Math.random() * Math.ceil(totalSeats / 6)) + 1;
        const col = String.fromCharCode(65 + Math.floor(Math.random() * 6)); // A-F
        const seat = `${row}${col}`;
        
        if (!occupied.includes(seat)) {
            occupied.push(seat);
        }
    }
    
    return occupied;
}

// Get all trips (flights and trains)
function getAllTrips() {
    return [...flightsData, ...trainsData];
}

// Search trips
function searchTrips(searchParams) {
    const { origin, destination, date, type, travelClass, passengers } = searchParams;
    
    let results = type === 'flight' ? [...flightsData] : [...trainsData];
    
    // Filter by origin and destination (case-insensitive partial match)
    if (origin) {
        results = results.filter(trip => 
            trip.origin.toLowerCase().includes(origin.toLowerCase())
        );
    }
    
    if (destination) {
        results = results.filter(trip => 
            trip.destination.toLowerCase().includes(destination.toLowerCase())
        );
    }
    
    // Add date to results
    results = results.map(trip => ({
        ...trip,
        date: date,
        class: travelClass,
        price: Math.round(trip.price * classPricing[travelClass])
    }));
    
    // Filter by available seats
    if (passengers) {
        results = results.filter(trip => trip.availableSeats >= parseInt(passengers));
    }
    
    return results;
}

// Get trip by ID
function getTripById(id) {
    const allTrips = getAllTrips();
    return allTrips.find(trip => trip.id === id);
}

// Sort trips
function sortTrips(trips, sortBy) {
    const sorted = [...trips];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'duration':
            return sorted.sort((a, b) => {
                const durationA = parseDuration(a.duration);
                const durationB = parseDuration(b.duration);
                return durationA - durationB;
            });
        case 'departure':
            return sorted.sort((a, b) => {
                const timeA = parseTime(a.departure);
                const timeB = parseTime(b.departure);
                return timeA - timeB;
            });
        default:
            return sorted;
    }
}

// Helper function to parse duration
function parseDuration(duration) {
    const parts = duration.match(/(\d+)h\s*(\d+)m/);
    if (parts) {
        return parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return 0;
}

// Helper function to parse time
function parseTime(time) {
    const parts = time.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (parts) {
        let hours = parseInt(parts[1]);
        const minutes = parseInt(parts[2]);
        const period = parts[3];
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return hours * 60 + minutes;
    }
    return 0;
}

// Filter trips by price range
function filterByPrice(trips, maxPrice) {
    return trips.filter(trip => trip.price <= maxPrice);
}

// Filter trips by time of day
function filterByTime(trips, timeFilters) {
    if (timeFilters.length === 0) return trips;
    
    return trips.filter(trip => {
        const time = parseTime(trip.departure);
        
        return timeFilters.some(filter => {
            switch (filter) {
                case 'morning':
                    return time >= 360 && time < 720; // 6 AM - 12 PM
                case 'afternoon':
                    return time >= 720 && time < 1080; // 12 PM - 6 PM
                case 'evening':
                    return time >= 1080 && time < 1440; // 6 PM - 12 AM
                case 'night':
                    return time >= 0 && time < 360; // 12 AM - 6 AM
                default:
                    return true;
            }
        });
    });
}

// Filter trips by stops
function filterByStops(trips, stopsFilters) {
    if (stopsFilters.length === 0) return trips;
    
    return trips.filter(trip => stopsFilters.includes(trip.stops));
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        flightsData,
        trainsData,
        popularCities,
        classPricing,
        generateOccupiedSeats,
        getAllTrips,
        searchTrips,
        getTripById,
        sortTrips,
        filterByPrice,
        filterByTime,
        filterByStops
    };
}

// Made with Bob
