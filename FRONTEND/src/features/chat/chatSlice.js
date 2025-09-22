import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMessages, fetchUsers, getConversation, sendMessage } from "./chatAPI";


// ==================== THUNKS ====================

export const fetchUsersThunk = createAsyncThunk(
    "chat/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const result = await fetchUsers();
            const { success, message, users } = result;

            if (!success) return rejectWithValue(message);
            return users;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMessagesThunk = createAsyncThunk(
    "chat/fetchMessages",
    async (id, { rejectWithValue }) => {
        try {
            const result = await fetchMessages(id);
            const { success, message, messages } = result;

            if (!success) return rejectWithValue(message);
            return messages;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendMessageThunk = createAsyncThunk(
    "chat/sendMessage",
    async ({ receiver_id, payload }, { rejectWithValue }) => {
        try {
            const result = await sendMessage({ receiver_id, payload });
            const { success, message, newMessage } = result;

            if (!success) return rejectWithValue(message);
            return newMessage;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchConversationsThunk = createAsyncThunk("chat/conversations",
    async (userId, { rejectWithValue }) => {
        try {
            const result = await getConversation(userId)
            const { success, message, conversations, error } = result

            if (!success) return rejectWithValue(message || error)
            return conversations
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

// ==================== SLICE ====================

const chatSlice = createSlice({
    name: "chatStore",
    initialState: {
        users: [],
        conversations: [],
        messages: [],
        activeChat: null,
        isLoading: {
            users: false,
            messages: false,
            conversations: false,
            sendMessage: false,
        },
        error: null,
    },
    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setConversation: (state, action) => {
            state.conversation = action.payload
        },
        clearActiveChat: state => {
            state.activeChat = null
        }
    },
    extraReducers: (builder) => {
        builder
            // ========== fetchUsersThunk ==========
            .addCase(fetchUsersThunk.pending, (state) => {
                state.isLoading.users = true;
                state.error = null;
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.isLoading.users = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersThunk.rejected, (state, action) => {
                state.isLoading.users = false;
                state.error = action.payload || action.error.message;
            })

            // ========== fetchMessagesThunk ==========
            .addCase(fetchMessagesThunk.pending, (state) => {
                state.isLoading.messages = true;
                state.error = null;
            })
            .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
                state.isLoading.messages = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessagesThunk.rejected, (state, action) => {
                state.isLoading.messages = false;
                state.error = action.payload || action.error.message;
            })

            // ========== sendMessageThunk ==========
            .addCase(sendMessageThunk.pending, (state) => {
                state.isLoading.sendMessage = true;
                state.error = null;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.isLoading.sendMessage = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.isLoading.sendMessage = false;
                state.error = action.payload || action.error.message;
            })
            // ========== fetchConversationsThunk ==========
            .addCase(fetchConversationsThunk.pending, (state) => {
                state.isLoading.conversations = true;
                state.error = null;
            })
            .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
                state.isLoading.conversations = false;
                state.conversations = action.payload;
            })
            .addCase(fetchConversationsThunk.rejected, (state, action) => {
                state.isLoading.conversations = false;
                state.error = action.payload || action.error.message;
            });
    },
});

// ==================== EXPORTS ====================
export const { setActiveChat, clearActiveChat, setMessages, addMessage, setConversation } = chatSlice.actions;

const chatReducer = chatSlice.reducer;
export default chatReducer;
