// ===================================
// Database Initialization Script
// ===================================

const { sequelize, Flight, Train } = require('./database');

// Sample flight data
const flightsData = [
    // US Flights
    { flight_number: 'AA101', airline: 'American Airlines', from_city: 'New York', to_city: 'Los Angeles', departure_time: '08:00', arrival_time: '11:30', duration: '5h 30m', price: 299.99, stops: 0, class_type: 'Economy' },
    { flight_number: 'UA202', airline: 'United Airlines', from_city: 'Chicago', to_city: 'Miami', departure_time: '09:15', arrival_time: '13:45', duration: '3h 30m', price: 249.99, stops: 0, class_type: 'Economy' },
    { flight_number: 'DL303', airline: 'Delta Airlines', from_city: 'San Francisco', to_city: 'Seattle', departure_time: '10:30', arrival_time: '12:45', duration: '2h 15m', price: 179.99, stops: 0, class_type: 'Economy' },
    { flight_number: 'SW404', airline: 'Southwest Airlines', from_city: 'Dallas', to_city: 'Denver', departure_time: '11:00', arrival_time: '12:30', duration: '2h 30m', price: 159.99, stops: 0, class_type: 'Economy' },
    { flight_number: 'AA505', airline: 'American Airlines', from_city: 'Boston', to_city: 'Atlanta', departure_time: '14:20', arrival_time: '17:10', duration: '2h 50m', price: 219.99, stops: 0, class_type: 'Economy' },
    { flight_number: 'UA606', airline: 'United Airlines', from_city: 'Houston', to_city: 'Phoenix', departure_time: '15:45', arrival_time: '17:15', duration: '2h 30m', price: 189.99, stops: 0, class_type: 'Economy' },
    { flight_number: 'DL707', airline: 'Delta Airlines', from_city: 'Orlando', to_city: 'Las Vegas', departure_time: '16:30', arrival_time: '18:45', duration: '4h 15m', price: 279.99, stops: 1, class_type: 'Economy' },
    { flight_number: 'SW808', airline: 'Southwest Airlines', from_city: 'Philadelphia', to_city: 'San Diego', departure_time: '07:00', arrival_time: '10:30', duration: '5h 30m', price: 319.99, stops: 1, class_type: 'Economy' },
    
    // Indian Flights
    { flight_number: 'AI101', airline: 'Air India', from_city: 'Delhi', to_city: 'Mumbai', departure_time: '06:00', arrival_time: '08:15', duration: '2h 15m', price: 4500.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'SG202', airline: 'SpiceJet', from_city: 'Bangalore', to_city: 'Kolkata', departure_time: '09:30', arrival_time: '12:15', duration: '2h 45m', price: 5200.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'IG303', airline: 'IndiGo', from_city: 'Chennai', to_city: 'Hyderabad', departure_time: '11:00', arrival_time: '12:15', duration: '1h 15m', price: 3800.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'AI404', airline: 'Air India', from_city: 'Pune', to_city: 'Ahmedabad', departure_time: '13:45', arrival_time: '15:00', duration: '1h 15m', price: 3500.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'SG505', airline: 'SpiceJet', from_city: 'Jaipur', to_city: 'Goa', departure_time: '14:30', arrival_time: '16:45', duration: '2h 15m', price: 4800.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'IG606', airline: 'IndiGo', from_city: 'Lucknow', to_city: 'Chandigarh', departure_time: '16:00', arrival_time: '17:30', duration: '1h 30m', price: 4200.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'AI707', airline: 'Air India', from_city: 'Kochi', to_city: 'Bhopal', departure_time: '08:15', arrival_time: '11:00', duration: '2h 45m', price: 5500.00, stops: 1, class_type: 'Economy' },
    { flight_number: 'SG808', airline: 'SpiceJet', from_city: 'Indore', to_city: 'Surat', departure_time: '10:00', arrival_time: '11:15', duration: '1h 15m', price: 3200.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'IG909', airline: 'IndiGo', from_city: 'Nagpur', to_city: 'Patna', departure_time: '12:30', arrival_time: '14:15', duration: '1h 45m', price: 4000.00, stops: 0, class_type: 'Economy' },
    { flight_number: 'AI1010', airline: 'Air India', from_city: 'Coimbatore', to_city: 'Visakhapatnam', departure_time: '15:45', arrival_time: '17:30', duration: '1h 45m', price: 4600.00, stops: 0, class_type: 'Economy' }
];

// Sample train data
const trainsData = [
    // US Trains
    { train_number: 'AMT101', train_name: 'Northeast Regional', from_city: 'New York', to_city: 'Washington DC', departure_time: '07:00', arrival_time: '10:30', duration: '3h 30m', price: 89.99, stops: 3, class_type: 'Coach' },
    { train_number: 'AMT202', train_name: 'California Zephyr', from_city: 'Chicago', to_city: 'San Francisco', departure_time: '14:00', arrival_time: '16:30', duration: '51h 30m', price: 299.99, stops: 15, class_type: 'Sleeper' },
    { train_number: 'AMT303', train_name: 'Coast Starlight', from_city: 'Seattle', to_city: 'Los Angeles', departure_time: '09:45', arrival_time: '21:00', duration: '35h 15m', price: 249.99, stops: 12, class_type: 'Sleeper' },
    { train_number: 'AMT404', train_name: 'Empire Builder', from_city: 'Portland', to_city: 'Chicago', departure_time: '16:40', arrival_time: '15:55', duration: '46h 15m', price: 279.99, stops: 14, class_type: 'Sleeper' },
    { train_number: 'AMT505', train_name: 'Silver Meteor', from_city: 'Miami', to_city: 'New York', departure_time: '11:10', arrival_time: '18:35', duration: '28h 25m', price: 219.99, stops: 10, class_type: 'Sleeper' },
    { train_number: 'AMT606', train_name: 'Southwest Chief', from_city: 'Los Angeles', to_city: 'Chicago', departure_time: '18:00', arrival_time: '15:15', duration: '43h 15m', price: 289.99, stops: 13, class_type: 'Sleeper' },
    { train_number: 'AMT707', train_name: 'Sunset Limited', from_city: 'New Orleans', to_city: 'Los Angeles', departure_time: '09:00', arrival_time: '05:35', duration: '46h 35m', price: 299.99, stops: 14, class_type: 'Sleeper' },
    { train_number: 'AMT808', train_name: 'Lake Shore Limited', from_city: 'Boston', to_city: 'Chicago', departure_time: '12:50', arrival_time: '09:50', duration: '22h', price: 199.99, stops: 8, class_type: 'Sleeper' },
    
    // Indian Trains
    { train_number: '12301', train_name: 'Rajdhani Express', from_city: 'Delhi', to_city: 'Mumbai', departure_time: '16:55', arrival_time: '08:35', duration: '15h 40m', price: 2500.00, stops: 5, class_type: 'AC 2-Tier' },
    { train_number: '12429', train_name: 'Shatabdi Express', from_city: 'Bangalore', to_city: 'Chennai', departure_time: '06:00', arrival_time: '11:00', duration: '5h', price: 1800.00, stops: 2, class_type: 'AC Chair Car' },
    { train_number: '12951', train_name: 'Mumbai Rajdhani', from_city: 'Mumbai', to_city: 'Delhi', departure_time: '17:00', arrival_time: '08:35', duration: '15h 35m', price: 2600.00, stops: 5, class_type: 'AC 2-Tier' },
    { train_number: '12259', train_name: 'Duronto Express', from_city: 'Kolkata', to_city: 'Delhi', departure_time: '20:25', arrival_time: '10:05', duration: '17h 40m', price: 2200.00, stops: 0, class_type: 'AC 3-Tier' },
    { train_number: '12621', train_name: 'Tamil Nadu Express', from_city: 'Chennai', to_city: 'Delhi', departure_time: '22:00', arrival_time: '06:30', duration: '32h 30m', price: 1900.00, stops: 12, class_type: 'Sleeper' },
    { train_number: '12423', train_name: 'Dibrugarh Rajdhani', from_city: 'Delhi', to_city: 'Guwahati', departure_time: '11:00', arrival_time: '10:30', duration: '27h 30m', price: 3200.00, stops: 8, class_type: 'AC 2-Tier' },
    { train_number: '12009', train_name: 'Shatabdi Express', from_city: 'Mumbai', to_city: 'Ahmedabad', departure_time: '06:25', arrival_time: '13:35', duration: '7h 10m', price: 1500.00, stops: 4, class_type: 'AC Chair Car' },
    { train_number: '12217', train_name: 'Kerala Sampark Kranti', from_city: 'Kochi', to_city: 'Delhi', departure_time: '11:30', arrival_time: '06:00', duration: '42h 30m', price: 2800.00, stops: 15, class_type: 'AC 3-Tier' },
    { train_number: '12431', train_name: 'Rajdhani Express', from_city: 'Bangalore', to_city: 'Delhi', departure_time: '20:00', arrival_time: '05:55', duration: '33h 55m', price: 3000.00, stops: 10, class_type: 'AC 2-Tier' },
    { train_number: '12869', train_name: 'Csmt Howrah SF', from_city: 'Mumbai', to_city: 'Kolkata', departure_time: '18:40', arrival_time: '10:55', duration: '40h 15m', price: 2400.00, stops: 14, class_type: 'Sleeper' }
];

// Initialize database
async function initDatabase() {
    try {
        console.log('🔄 Connecting to database...');
        
        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        // Sync all models (create tables)
        console.log('🔄 Creating database tables...');
        await sequelize.sync({ force: true }); // WARNING: This will drop existing tables
        console.log('✅ Database tables created successfully.');

        // Insert flight data
        console.log('🔄 Seeding flight data...');
        await Flight.bulkCreate(flightsData);
        console.log(`✅ ${flightsData.length} flights added successfully.`);

        // Insert train data
        console.log('🔄 Seeding train data...');
        await Train.bulkCreate(trainsData);
        console.log(`✅ ${trainsData.length} trains added successfully.`);

        console.log('\n🎉 Database initialization completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Flights: ${flightsData.length}`);
        console.log(`   - Trains: ${trainsData.length}`);
        console.log('\n💡 You can now start the server with: npm run dev');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

// Run initialization
initDatabase();

// Made with Bob
