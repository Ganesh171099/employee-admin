import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchAwardTemplates = createAsyncThunk(
  'awardTemplates/fetchAll',
  async () => mockApi.getAwardTemplates(),
);

export const createAwardTemplate = createAsyncThunk(
  'awardTemplates/create',
  async (payload) => mockApi.createAwardTemplate(payload),
);

export const updateAwardTemplate = createAsyncThunk(
  'awardTemplates/update',
  async ({ id, data }) => mockApi.updateAwardTemplate(id, data),
);

const awardTemplatesSlice = createSlice({
  name: 'awardTemplates',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAwardTemplates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAwardTemplates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAwardTemplates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAwardTemplate.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateAwardTemplate.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      });
  },
});

export default awardTemplatesSlice.reducer;
