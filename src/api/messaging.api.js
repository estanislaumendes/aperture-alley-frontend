import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const getMessages = (senderId, receiverId) => {
  return axios.get(`${baseURL}/messages/${senderId}/${receiverId}`);
};

export const sendMessage = (senderId, receiverId, message) => {
  return axios.post(`${baseURL}/messages`, {
    sender: senderId,
    receiver: receiverId,
    message: message,
  });
};

export const getOtherUsers = senderId => {
  return axios.get(`${baseURL}/otherusers/${senderId}`);
};
