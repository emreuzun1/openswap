const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: "",
    loading: false,
  },
  reducers: {
    connectWallet: (state) => {
      state.loading = true;
    },
    connectWalletSuccess: (state, payload) => {
      state.account = payload.payload.account;
      state.loading = false;
    },
    loginWithWallet: (state) => {
      state.loading = true;
    },
  },
});

export const { connectWallet, connectWalletSuccess, loginWithWallet } =
  authSlice.actions;

export default authSlice.reducer;
