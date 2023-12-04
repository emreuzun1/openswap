const { createSlice } = require("@reduxjs/toolkit");

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventory: [],
    loading: false,
  },
  reducers: {
    getInventory: (state) => {
      state.loading = true;
    },
    getInventorySuccess: (state, payload) => {
      state.loading = false;
      state.inventory = payload.payload;
    },
    createItem: () => {},
  },
});

export const { getInventory, getInventorySuccess, createItem } =
  inventorySlice.actions;

export default inventorySlice.reducer;
