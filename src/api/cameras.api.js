import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    //retrieve the token from local storage

    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });
};

setAuthorizationHeaders();

export const getAllCameras = (searchQuery = '') => {
  const url = searchQuery
    ? `${baseURL}/cameras?search=${encodeURIComponent(searchQuery)}`
    : `${baseURL}/cameras`;
  return axios.get(url);
};

export const getCamera = id => {
  return axios.get(`${baseURL}/cameras/${id}`);
};

export const getUserCamera = userId => {
  return axios.get(`${baseURL}/cameras/users/${userId}`);
};

export const addCamera = camera => {
  return axios.post(`${baseURL}/cameras`, camera);
};

export const updateCamera = updatedCamera => {
  return axios.put(`${baseURL}/cameras/${updatedCamera._id}`, updatedCamera);
};

export const deleteCamera = id => {
  return axios.delete(`${baseURL}/cameras/${id}`);
};

export const getUser = id => {
  return axios.get(`${baseURL}/users/${id}`);
};

export const upload = image => {
  return axios.post(`${baseURL}/upload`, image);
};
