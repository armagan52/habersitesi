import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getToken = () => localStorage.getItem("token");

const getAll = async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

const create = async (data) => {
  await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const remove = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export default { getAll, create, remove };
