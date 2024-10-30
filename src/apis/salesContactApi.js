// src/apis/salesContactApi.js
import axiosInstance, { endpoints } from 'src/utils/axios';

// Create a new sales contact (POST /sales-contacts)
export const createSalesContact = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.sales, data);
    return response.data;
  } catch (error) {
    console.error("Error creating sales contact:", error);
    throw error;
  }
};

// Get all sales contacts (GET /sales-contacts)
export const getAllSalesContacts = async () => {
  try {
    const response = await axiosInstance.get(endpoints.sales);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales contacts:", error);
    throw error;
  }
};

// Get a sales contact by ID (GET /sales-contacts/:id)
export const getSalesContactById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.sales}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales contact by ID:", error);
    throw error;
  }
};

// Update a sales contact by ID (PUT /sales-contacts/:id)
export const updateSalesContact = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoints.sales}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating sales contact:", error);
    throw error;
  }
};

// Delete a sales contact by ID (DELETE /sales-contacts/:id)
export const deleteSalesContact = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.sales}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting sales contact:", error);
    throw error;
  }
};
     