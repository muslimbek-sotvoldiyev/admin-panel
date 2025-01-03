import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await fetch(
      "https://doctorhelper.pythonanywhere.com/api/v1/service/"
    );
    return response.json();
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
