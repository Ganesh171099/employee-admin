import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchDashboard = createAsyncThunk('dashboard/fetch', async () =>
  mockApi.getDashboard(),
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    recentActivity: [],
    companyGrowth: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.stats;
        state.recentActivity = action.payload.recentActivity;
        state.companyGrowth = action.payload.companyGrowth;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
