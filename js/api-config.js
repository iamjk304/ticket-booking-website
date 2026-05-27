// ===================================
// API Configuration
// ===================================

const API_CONFIG = {
    // Base URL for API - change this when deploying
    BASE_URL: 'http://localhost:5000/api',
    
    // Endpoints
    ENDPOINTS: {
        // Auth endpoints
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        GET_CURRENT_USER: '/auth/me',
        
        // Flight endpoints
        GET_ALL_FLIGHTS: '/flights',
        SEARCH_FLIGHTS: '/flights/search',
        GET_FLIGHT_BY_ID: '/flights',
        
        // Train endpoints
        GET_ALL_TRAINS: '/trains',
        SEARCH_TRAINS: '/trains/search',
        GET_TRAIN_BY_ID: '/trains',
        
        // Booking endpoints
        CREATE_BOOKING: '/bookings',
        GET_USER_BOOKINGS: '/bookings',
        GET_BOOKING_BY_ID: '/bookings',
        GET_BOOKING_BY_REFERENCE: '/bookings/reference',
        CANCEL_BOOKING: '/bookings',
        
        // User endpoints
        GET_PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile',
        CHANGE_PASSWORD: '/users/password',
        DELETE_ACCOUNT: '/users/account'
    },
    
    // Helper function to get full URL
    getUrl: function(endpoint) {
        return this.BASE_URL + endpoint;
    },
    
    // Helper function to get auth headers
    getAuthHeaders: function() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    },
    
    // Helper function to get headers without auth
    getHeaders: function() {
        return {
            'Content-Type': 'application/json'
        };
    }
};

// API Helper Functions
const API = {
    // Generic request handler
    async request(url, options = {}) {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    // Auth API calls
    auth: {
        async register(userData) {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.REGISTER), {
                method: 'POST',
                headers: API_CONFIG.getHeaders(),
                body: JSON.stringify(userData)
            });
        },
        
        async login(credentials) {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.LOGIN), {
                method: 'POST',
                headers: API_CONFIG.getHeaders(),
                body: JSON.stringify(credentials)
            });
        },
        
        async logout() {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.LOGOUT), {
                method: 'POST',
                headers: API_CONFIG.getAuthHeaders()
            });
        },
        
        async getCurrentUser() {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_CURRENT_USER), {
                method: 'GET',
                headers: API_CONFIG.getAuthHeaders()
            });
        }
    },
    
    // Flight API calls
    flights: {
        async getAll() {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_ALL_FLIGHTS), {
                method: 'GET',
                headers: API_CONFIG.getHeaders()
            });
        },
        
        async search(params) {
            const queryString = new URLSearchParams(params).toString();
            return API.request(`${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.SEARCH_FLIGHTS)}?${queryString}`, {
                method: 'GET',
                headers: API_CONFIG.getHeaders()
            });
        },
        
        async getById(id) {
            return API.request(`${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_FLIGHT_BY_ID)}/${id}`, {
                method: 'GET',
                headers: API_CONFIG.getHeaders()
            });
        }
    },
    
    // Train API calls
    trains: {
        async getAll() {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_ALL_TRAINS), {
                method: 'GET',
                headers: API_CONFIG.getHeaders()
            });
        },
        
        async search(params) {
            const queryString = new URLSearchParams(params).toString();
            return API.request(`${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.SEARCH_TRAINS)}?${queryString}`, {
                method: 'GET',
                headers: API_CONFIG.getHeaders()
            });
        },
        
        async getById(id) {
            return API.request(`${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_TRAIN_BY_ID)}/${id}`, {
                method: 'GET',
                headers: API_CONFIG.getHeaders()
            });
        }
    },
    
    // Booking API calls
    bookings: {
        async create(bookingData) {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.CREATE_BOOKING), {
                method: 'POST',
                headers: API_CONFIG.getAuthHeaders(),
                body: JSON.stringify(bookingData)
            });
        },
        
        async getUserBookings(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString 
                ? `${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_USER_BOOKINGS)}?${queryString}`
                : API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_USER_BOOKINGS);
            
            return API.request(url, {
                method: 'GET',
                headers: API_CONFIG.getAuthHeaders()
            });
        },
        
        async getById(id) {
            return API.request(`${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_BOOKING_BY_ID)}/${id}`, {
                method: 'GET',
                headers: API_CONFIG.getAuthHeaders()
            });
        },
        
        async getByReference(reference) {
            return API.request(`${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_BOOKING_BY_REFERENCE)}/${reference}`, {
                method: 'GET',
                headers: API_CONFIG.getHeaders()
            });
        },
        
        async cancel(id) {
            return API.request(`${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.CANCEL_BOOKING)}/${id}/cancel`, {
                method: 'PUT',
                headers: API_CONFIG.getAuthHeaders()
            });
        }
    },
    
    // User API calls
    users: {
        async getProfile() {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GET_PROFILE), {
                method: 'GET',
                headers: API_CONFIG.getAuthHeaders()
            });
        },
        
        async updateProfile(profileData) {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.UPDATE_PROFILE), {
                method: 'PUT',
                headers: API_CONFIG.getAuthHeaders(),
                body: JSON.stringify(profileData)
            });
        },
        
        async changePassword(passwordData) {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.CHANGE_PASSWORD), {
                method: 'PUT',
                headers: API_CONFIG.getAuthHeaders(),
                body: JSON.stringify(passwordData)
            });
        },
        
        async deleteAccount() {
            return API.request(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.DELETE_ACCOUNT), {
                method: 'DELETE',
                headers: API_CONFIG.getAuthHeaders()
            });
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, API };
}

// Made with Bob
