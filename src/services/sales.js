import axios from "axios";
const BASE_URL = "http://localhost:3000/api/";
const ENDPOINT = "sales";

export const postSaleService = async (data) => {
  axios.post(`${BASE_URL}${ENDPOINT}`, data);
};

export const getAllSaleService = async () => {
  return axios.get(`${BASE_URL}${ENDPOINT}`);
};

export const getSaleById = async (id) =>
  axios.get(`${BASE_URL}${ENDPOINT}/${id}`);
