import axios from 'axios';

const API_URL = 'https://task-management-uujy.onrender.com/api/tasks';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'x-auth-token': token } : {};
};

export const getTasks = async (status) => {
    const config = {
        headers: getAuthHeader(),
        params: status ? { status } : {}
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

export const createTask = async (taskData) => {
    const config = {
        headers: getAuthHeader()
    };
    const response = await axios.post(API_URL, taskData, config);
    return response.data;
};

export const updateTask = async (id, taskData) => {
    const config = {
        headers: getAuthHeader()
    };
    const response = await axios.put(`${API_URL}/${id}`, taskData, config);
    return response.data;
};

export const deleteTask = async (id) => {
    const config = {
        headers: getAuthHeader()
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
};

