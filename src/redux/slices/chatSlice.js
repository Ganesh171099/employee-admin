import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockApi } from '../../services/mock';

export const fetchChatThreads = createAsyncThunk('chat/fetchAll', async () =>
  mockApi.getChatThreads(),
);

export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ threadId, body, sender }) => {
    const message = await mockApi.sendChatMessage(threadId, body, sender);
    return { threadId, message };
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    threads: [],
    activeThreadId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setActiveThread(state, action) {
      state.activeThreadId = action.payload;
      const thread = state.threads.find((t) => t.id === action.payload);
      if (thread) thread.unread = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
        if (!state.activeThreadId && action.payload.length) {
          state.activeThreadId = action.payload[0].id;
        }
      })
      .addCase(fetchChatThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        const { threadId, message } = action.payload;
        state.threads = state.threads.map((thread) =>
          thread.id === threadId
            ? { ...thread, messages: [...thread.messages, message], unread: 0 }
            : thread,
        );
      });
  },
});

export const { setActiveThread } = chatSlice.actions;
export default chatSlice.reducer;
