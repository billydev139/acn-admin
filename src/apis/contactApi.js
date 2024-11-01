import axiosInstance, { endpoints } from 'src/utils/axios';
import { toast } from 'sonner';

// Create a new contact request (POST /contact-requests)
export const createContactRequest = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.contact, data);
    return response.data;
  } catch (error) {
    console.error("Error creating contact request:", error);
    toast.error('Error creating contact request');
    throw error;
  }
};

// Get all contact requests (GET /contact-requests)
export const getAllContactRequests = async () => {
  try {
    const response = await axiosInstance.get(endpoints.contact);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact requests:", error);
    toast.error('Error fetching contact requests');
    throw error;
  }
};

// Get a contact request by ID (GET /contact-requests/:id)
export const getContactRequestById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.contact}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact request by ID:", error);
    toast.error('Error fetching contact request by ID');
    throw error;
  }
};

// Update a contact request by ID (PUT /contact-requests/:id)
export const updateContactRequest = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoints.contact}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating contact request:", error);
    toast.error('Error updating contact request');
    throw error;
  }
};

// Delete a contact request by ID (DELETE /contact-requests/:id)
export const deleteContactRequest = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.contact}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting contact request:", error);
    toast.error('Error deleting contact request');
    throw error;
  }
};
