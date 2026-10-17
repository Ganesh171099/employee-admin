import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchFeatureFlags = createAsyncThunk(
  'featureFlags/fetchAll',
  async () => mockApi.getFeatureFlags(),
);

export const updateFeatureFlag = createAsyncThunk(
  'featureFlags/update',
  async ({ id, data }) => mockApi.updateFeatureFlag(id, data),
);

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatureFlags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeatureFlags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFeatureFlags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateFeatureFlag.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      });
  },
});

export default featureFlagsSlice.reducer;
