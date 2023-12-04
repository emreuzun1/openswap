import axios from "axios";
const BASE_URL = "http://localhost:3000/api/";
const ENDPOINT = "offers";

export const makeOfferService = (data) =>
  axios.post(`${BASE_URL}${ENDPOINT}`, data);

export const getOfferByIdService = (id) =>
  axios.get(`${BASE_URL}${ENDPOINT}/${id}`);
