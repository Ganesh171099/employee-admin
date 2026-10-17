import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchCompanies = createAsyncThunk('companies/fetchAll', async () =>
  mockApi.getCompanies(),
);

export const createCompany = createAsyncThunk(
  'companies/create',
  async (payload) => mockApi.createCompany(payload),
);

export const updateCompany = createAsyncThunk(
  'companies/update',
  async ({ id, data }) => mockApi.updateCompany(id, data),
);

export const setCompanyStatus = createAsyncThunk(
  'companies/setStatus',
  async ({ id, status }) => mockApi.setCompanyStatus(id, status),
);

export const onboardCompany = createAsyncThunk(
  'companies/onboard',
  async (payload) => mockApi.onboardCompany(payload),
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      search: '',
      status: 'all',
      industry: 'all',
    },
  },
  reducers: {
    setCompanyFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(setCompanyStatus.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(onboardCompany.fulfilled, (state, action) => {
        state.items = [action.payload.company, ...state.items];
      });
  },
});

export const { setCompanyFilters } = companiesSlice.actions;
export default companiesSlice.reducer;
