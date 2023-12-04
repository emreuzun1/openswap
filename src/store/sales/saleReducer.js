import { createSlice } from "@reduxjs/toolkit";

const saleSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
    salesCount: 0,
    loading: false,
  },
  reducers: {
    getAllSales: (state) => {
      state.loading = true;
    },
    getAllSalesSuccess: (state, payload) => {
      state.loading = false;
      state.sales = payload.payload.sales;
      state.salesCount = payload.payload.salesCount;
    },
  },
});

export const { getAllSales, getAllSalesSuccess } = saleSlice.actions;

export default saleSlice.reducer;
