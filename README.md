# 🎫 TravelEase - Flight & Train Ticket Booking Website

A modern, responsive ticket booking website built with vanilla HTML, CSS, and JavaScript. Book flights and trains with an intuitive interface, seat selection, and complete booking workflow.

![TravelEase](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎯 Core Functionality
- **Dual Mode Booking**: Book both flights and trains from a single platform
- **Smart Search**: Search by origin, destination, date, and passenger count
- **Real-time Filtering**: Filter results by price, time, and stops
- **Interactive Seat Selection**: Visual seat map with availability status
- **Multi-passenger Support**: Book for up to 6+ passengers
- **Class Selection**: Choose from Economy, Business, or First Class
- **Round Trip Support**: Book one-way or round-trip journeys

### 💳 Booking Flow
1. **Search**: Enter travel details and search for available trips
2. **Select**: Browse results with filtering and sorting options
3. **Book**: Choose seats and enter passenger information
4. **Pay**: Complete payment with multiple payment methods
5. **Confirm**: Receive booking confirmation with printable ticket

### 🎨 Design Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: High contrast mode and reduced motion support
- **Print-friendly**: Optimized ticket printing layout
- **Dark Mode Ready**: Prepared for dark mode implementation

### 🔧 Technical Features
- **No Backend Required**: Fully client-side application
- **Local Storage**: Persistent booking data and history
- **Form Validation**: Comprehensive input validation
- **Mock Payment**: Simulated payment processing for demo
- **Sample Data**: Pre-loaded flight and train data

## 📁 Project Structure

```
ticket-booking-website/
├── index.html              # Homepage with search form
├── search-results.html     # Search results with filters
├── booking.html            # Seat selection & passenger details
├── payment.html            # Payment processing
├── confirmation.html       # Booking confirmation & ticket
├── css/
│   ├── style.css          # Main stylesheet
│   └── responsive.css     # Responsive design rules
├── js/
│   ├── data.js            # Sample data & utility functions
│   ├── app.js             # Homepage logic
│   ├── search.js          # Search results logic
│   └── booking.js         # Booking flow logic
├── assets/
│   └── images/            # Images and icons (optional)
├── README.md              # This file
└── .gitignore            # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/yourusername/ticket-booking-website.git
   cd ticket-booking-website
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better experience:
   
   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Using Node.js:**
   ```bash
   npx http-server
   ```
   
   **Using VS Code:**
   - Install "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Start Booking!**
   - Navigate to `http://localhost:8000` (or your local server URL)
   - Start searching for flights or trains

## 📖 Usage Guide

### Searching for Trips

1. **Select Travel Type**: Choose between Flights ✈️ or Trains 🚄
2. **Enter Details**:
   - Origin city
   - Destination city
   - Departure date
   - Number of passengers (1-6+)
   - Travel class (Economy/Business/First)
3. **Optional**: Check "Round Trip" for return journey
4. **Click "Search Tickets"**

### Booking Process

1. **Browse Results**: View available trips with prices and timings
2. **Apply Filters**: 
   - Price range slider
   - Departure time (Morning/Afternoon/Evening/Night)
   - Number of stops
3. **Sort Results**: By price, duration, or departure time
4. **Select Trip**: Click "Book Now" on your preferred option
5. **Choose Seats**: Click on available seats (shown in white)
6. **Enter Passenger Details**: Fill in information for all passengers
7. **Provide Contact Info**: Email and phone number
8. **Payment**: Select payment method and enter details
9. **Confirmation**: View and print your ticket

### Sample Cities

The system includes 50 popular US cities for easy testing:
- New York, Los Angeles, Chicago, Houston, Phoenix
- San Francisco, Boston, Seattle, Miami, Denver
- And 40+ more cities

### Sample Routes

**Flights:**
- New York ↔ Los Angeles
- Chicago ↔ Miami
- San Francisco ↔ Seattle
- Boston ↔ Washington
- Dallas ↔ Denver

**Trains:**
- New York ↔ Washington
- Chicago ↔ Detroit
- Boston ↔ New York
- San Francisco ↔ Los Angeles
- Philadelphia ↔ Boston

## 🎨 Customization

### Modifying Sample Data

Edit `js/data.js` to add or modify flights and trains:

```javascript
const flightsData = [
    {
        id: 'FL001',
        type: 'flight',
        name: 'Your Airline',
        number: 'YA-1234',
        origin: 'City A',
        destination: 'City B',
        departure: '08:00 AM',
        arrival: '11:30 AM',
        duration: '3h 30m',
        stops: 'nonstop',
        class: 'economy',
        price: 299,
        availableSeats: 45
    }
    // Add more flights...
];
```

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --primary-dark: #1e40af;       /* Darker shade */
    --secondary-color: #64748b;    /* Secondary color */
    --success-color: #10b981;      /* Success messages */
    --danger-color: #ef4444;       /* Error messages */
    /* ... more variables */
}
```

### Adding Features

The modular structure makes it easy to add features:
- Add new payment methods in `payment.html`
- Extend filtering options in `search.js`
- Add user authentication system
- Integrate with real APIs
- Add email notifications

## 🌐 Deployment

### GitHub Pages

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ticket-booking-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "main" branch as source
   - Click Save
   - Your site will be live at: `https://yourusername.github.io/ticket-booking-website/`

### Other Hosting Options

- **Netlify**: Drag and drop the folder
- **Vercel**: Import from GitHub
- **Firebase Hosting**: Use Firebase CLI
- **Surge**: `surge` command in terminal

## 🔒 Security Notes

⚠️ **Important**: This is a demo application with mock payment processing.

For production use:
- Implement real backend API
- Use secure payment gateway (Stripe, PayPal, etc.)
- Add user authentication
- Implement server-side validation
- Use HTTPS
- Add CSRF protection
- Sanitize all user inputs

## 🐛 Known Limitations

- **No Real Payment**: Payment is simulated for demo purposes
- **Client-side Only**: All data stored in browser's localStorage
- **No User Accounts**: No login/registration system
- **Limited Data**: Sample data for demonstration
- **No Email**: Email notifications are simulated

## 🛠️ Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Mobile Support

Fully responsive design tested on:
- iOS Safari
- Chrome Mobile
- Samsung Internet
- Firefox Mobile

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 TravelEase

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Icons: Emoji icons used throughout the interface
- Fonts: System fonts for optimal performance
- Inspiration: Modern travel booking platforms

## 📞 Support

For support, email support@travelease.com or open an issue on GitHub.

## 🗺️ Roadmap

Future enhancements planned:
- [ ] User authentication system
- [ ] Real-time price updates
- [ ] Integration with real flight/train APIs
- [ ] Email confirmation system
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Loyalty program
- [ ] Mobile app version
- [ ] Admin dashboard
- [ ] Analytics integration

## 📊 Version History

- **1.0.0** (2026-05-27)
  - Initial release
  - Flight and train booking
  - Seat selection
  - Mock payment system
  - Responsive design
  - Print-friendly tickets

---

**Made with ❤️ for travelers worldwide**

*Happy Booking! ✈️🚄*