import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchPlans = createAsyncThunk('plans/fetchAll', async () =>
  mockApi.getPlans(),
);

export const createPlan = createAsyncThunk('plans/create', async (payload) =>
  mockApi.createPlan(payload),
);

export const updatePlan = createAsyncThunk(
  'plans/update',
  async ({ id, data }) => mockApi.updatePlan(id, data),
);

const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      });
  },
});

export default plansSlice.reducer;
