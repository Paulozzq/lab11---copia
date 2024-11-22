import axios from "axios";

const PREFIX_URL = 'http://localhost:8000/categories/';

export const getAllCategoryService = async () => {
    const response = await axios.get(PREFIX_URL);
    return response;
};

export const getCategoryByIdService = async (id) => {
    try {
        const response = await axios.get(`${PREFIX_URL}${id}/`);
        return response.data; 
    } catch (error) {
        console.error(`Error al obtener la categoría con id ${id}`, error);
        throw error;
    }
};

export const createCategoryService = async (categoryData) => {
    try {
        const response = await axios.post(PREFIX_URL, categoryData);
        return response.data; 
    } catch (error) {
        console.error("Error al crear la categoría", error);
        throw error;
    }
};

export const updateCategoryService = async (id, categoryData) => {
    try {
        const response = await axios.put(`${PREFIX_URL}${id}/`, categoryData);
        return response.data; 
    } catch (error) {
        console.error(`Error al actualizar la categoría con id ${id}`, error);
        throw error;
    }
};

export const deleteCategoryService = async (id) => {
    try {
        const response = await axios.delete(`${PREFIX_URL}${id}/`);
        return response.data; 
    } catch (error) {
        console.error(`Error al eliminar la categoría con id ${id}`, error);
        throw error;
    }
};
