const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  // Auth
  async signup(data: any) {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async login(data: any) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Bookings
  async getBookings() {
    const response = await fetch(`${API_URL}/api/bookings`);
    return response.json();
  },

  async getBookingById(id: string) {
    const response = await fetch(`${API_URL}/api/bookings/${id}`);
    return response.json();
  },

  async getBookingsByUserId(userId: string) {
    const response = await fetch(`${API_URL}/api/bookings/user/${userId}`);
    return response.json();
  },

  async createBooking(data: any) {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateBookingStatus(id: string, status: string) {
    const response = await fetch(`${API_URL}/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  async deleteBooking(id: string) {
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Services
  async getServices() {
    const response = await fetch(`${API_URL}/api/services`);
    return response.json();
  },

  async getServiceBySlug(slug: string) {
    const response = await fetch(`${API_URL}/api/services/slug/${slug}`);
    return response.json();
  },

  async getServiceById(id: string) {
    const response = await fetch(`${API_URL}/api/services/${id}`);
    return response.json();
  },

  async getServicesByCategory(category: string) {
    const response = await fetch(`${API_URL}/api/services/category/${category}`);
    return response.json();
  },

  async createService(data: any) {
    const response = await fetch(`${API_URL}/api/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateService(id: string, data: any) {
    const response = await fetch(`${API_URL}/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteService(id: string) {
    const response = await fetch(`${API_URL}/api/services/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Decorations
  async getDecorations() {
    const response = await fetch(`${API_URL}/api/decorations`);
    return response.json();
  },

  async getDecorationById(id: string) {
    const response = await fetch(`${API_URL}/api/decorations/${id}`);
    return response.json();
  },

  async getDecorationsByServiceId(serviceId: string) {
    const response = await fetch(`${API_URL}/api/decorations/service/${serviceId}`);
    return response.json();
  },

  async createDecoration(data: any) {
    const response = await fetch(`${API_URL}/api/decorations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateDecoration(id: string, data: any) {
    const response = await fetch(`${API_URL}/api/decorations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteDecoration(id: string) {
    const response = await fetch(`${API_URL}/api/decorations/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Hero
  async getHeroImages() {
    const response = await fetch(`${API_URL}/api/hero`);
    return response.json();
  },

  async saveHeroImages(data: any) {
    const response = await fetch(`${API_URL}/api/hero`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Admin
  async adminLogin(data: any) {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
