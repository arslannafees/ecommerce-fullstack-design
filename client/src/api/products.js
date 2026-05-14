import axios from 'axios';
import { auth } from '../firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = async () => {
    const token = await auth.currentUser?.getIdToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const fetchProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
};

export const addProduct = async (productData) => {
    const headers = await getAuthHeaders();
    const response = await axios.post(`${API_BASE_URL}/products`, productData, headers);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const headers = await getAuthHeaders();
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData, headers);
    return response.data;
};

export const deleteProduct = async (id) => {
    const headers = await getAuthHeaders();
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`, headers);
    return response.data;
};

export const checkout = async (items) => {
    const headers = await getAuthHeaders();
    const response = await axios.post(`${API_BASE_URL}/checkout`, { items }, headers);
    return response.data;
};

export const fetchOrders = async () => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/orders`, headers);
    return response.data;
};

export const subscribeNewsletter = async (email) => {
    const response = await axios.post(`${API_BASE_URL}/newsletter`, { email });
    return response.data;
};

export const sendInquiry = async (inquiryData) => {
    const response = await axios.post(`${API_BASE_URL}/inquiries`, inquiryData);
    return response.data;
};

export const sendMessage = async (messageData) => {
    const response = await axios.post(`${API_BASE_URL}/messages`, messageData);
    return response.data;
};