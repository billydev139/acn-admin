import axiosInstance, { endpoints } from 'src/utils/axios';
import { toast } from 'sonner';

// Create a new resale request (POST /vehicles)
export const createResaleRequest = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.resale, data);
    return response.data;
  } catch (error) {
    console.error("Error creating resale request:", error);
    toast.error('Error creating resale request');
    throw error;
  }
};

// Get all vehicles (GET /vehicles)
export const getAllVehicles = async () => {
  try {
    const response = await axiosInstance.get(endpoints.resale);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    toast.error('Error fetching vehicles');
    throw error;
  }
};

// Get a vehicle by ID (GET /vehicles/:id)
export const getVehicleById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.resale}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    toast.error('Error fetching vehicle by ID');
    throw error;
  }
};

// Update a vehicle by ID (PUT /vehicles/:id)
export const updateVehicle = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoints.resale}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    toast.error('Error updating vehicle');
    throw error;
  }
};

// Delete a vehicle by ID (DELETE /vehicles/:id)
export const deleteVehicle = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.resale}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    toast.error('Error deleting vehicle');
    throw error;
  }
};
