// src/apis/api.js
import axiosInstance, { endpoints } from 'src/utils/axios';

// Fetch multiple career applications with pagination
export const getCareerApplications = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`${endpoints.career}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching career applications:", error);
    throw error;
  }
};

// Fetch a single career application by ID
export const getCareerApplicationById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.career}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching career application:", error);
    throw error;
  }
};

// Add a new career application
export const addCareerApplication = async (data) => {
  try {
    const response = await axiosInstance.post(`${endpoints.career}`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding career application:", error);
    throw error;
  }
};

// Update an existing career application by ID
export const updateCareerApplication = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoints.career}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating career application:", error);
    throw error;
  }
};

// Delete a career application by ID
export const deleteCareerApplication = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.career}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting career application:", error);
    throw error;
  }
};
