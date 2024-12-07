import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    role: null,
    userDetails: null,
    islogin: false,
  },
  reducers: {
    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.islogin = !!action.payload;
    },
  },
});

export const { addUserDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
