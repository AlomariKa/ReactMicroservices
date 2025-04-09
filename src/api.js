import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
};

export const fetchOrders = async (token) => {
    return await axios.get(`${API_BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createOrder = async (orderData, token) => {
    return await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const register = async (userData) => {
    return await axios.post(`${API_BASE_URL}/register`, userData);
};