import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchAuditLogs = createAsyncThunk('auditLogs/fetchAll', async () =>
  mockApi.getAuditLogs(),
);

const auditLogsSlice = createSlice({
  name: 'auditLogs',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    search: '',
  },
  reducers: {
    setAuditSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setAuditSearch } = auditLogsSlice.actions;
export default auditLogsSlice.reducer;
