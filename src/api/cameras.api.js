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

export const getAllCameras = () => {
  return axios.get(`${baseURL}/cameras`);
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

export const getUser = id => {
  return axios.get(`${baseURL}/users/${id}`);
};
