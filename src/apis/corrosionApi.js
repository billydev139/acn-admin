// src/apis/corrosionReportApi.js
import axiosInstance, { endpoints } from 'src/utils/axios';

// Create a new corrosion report (POST /corrosion-reports)
export const createCorrosionReport = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.corrosion, data);
    return response.data;
  } catch (error) {
    console.error("Error creating corrosion report:", error);
    throw error;
  }
};

// Get all corrosion reports (GET /corrosion-reports)
export const getAllCorrosionReports = async () => {
  try {
    const response = await axiosInstance.get(endpoints.corrosion);
    return response.data;
  } catch (error) {
    console.error("Error fetching corrosion reports:", error);
    throw error;
  }
};

// Get a corrosion report by ID (GET /corrosion-reports/:id)
export const getCorrosionReportById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.corrosion}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching corrosion report by ID:", error);
    throw error;
  }
};

// Update a corrosion report by ID (PUT /corrosion-reports/:id)
export const updateCorrosionReport = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoints.corrosion}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating corrosion report:", error);
    throw error;
  }
};

// Delete a corrosion report by ID (DELETE /corrosion-reports/:id)
export const deleteCorrosionReport = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.corrosion}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting corrosion report:", error);
    throw error;
  }
};
