import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchSupportTickets = createAsyncThunk(
  'support/fetchAll',
  async () => mockApi.getSupportTickets(),
);

export const updateSupportTicket = createAsyncThunk(
  'support/update',
  async ({ id, data }) => mockApi.updateSupportTicket(id, data),
);

const supportSlice = createSlice({
  name: 'support',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSupportTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSupportTicket.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      });
  },
});

export default supportSlice.reducer;
