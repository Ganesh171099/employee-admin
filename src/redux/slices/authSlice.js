import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

const AUTH_TOKEN_KEY = 'admin_access_token';
const AUTH_USER_KEY = 'admin_user';

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await mockApi.login(credentials);
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user));
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async () => {
  const session = await mockApi.getSession();
  return session;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: readStoredUser(),
    token: localStorage.getItem(AUTH_TOKEN_KEY),
    status: 'idle',
    error: null,
    bootstrapped: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    },
    clearAuthError(state) {
      state.error = null;
    },
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.bootstrapped = true;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.bootstrapped = true;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearAuthError, updateProfile } = authSlice.actions;
export default authSlice.reducer;
