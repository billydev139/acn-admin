// src/apis/api.js
import axiosInstance from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';

export const getCareerApplications = async (page = 1, limit=10) => {
  try {
    const response = await axiosInstance.get(`${endpoints.career}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching career applications:", error);
    throw error;
  }
};
export const addCareerApplication = async (data) => {
  try {
    const response = await axiosInstance.post(`${endpoints.career}`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding career application:", error);
    throw error;
  }
};

export const deleteCareerApplication = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.career}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting career application:", error);
    throw error;
  }
};
