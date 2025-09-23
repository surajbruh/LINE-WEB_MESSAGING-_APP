import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, fetchAvatar, login, logout, signUp, updateAvatar } from "./authAPI";
import { connectSocket, disconnectSocket } from "../../socket";

// TODO: setup socket and real-time communication, Proper Error handling in the HandleValidation middleware

export const signUpThunk = createAsyncThunk("auth/signup", async (payload, { rejectWithValue }) => {

    try {
        const result = await signUp(payload)
        const { success, message } = result
        if (!success) return rejectWithValue(message)
        return result.user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const loginThunk = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
    try {
        const result = await login(payload)
        const { success, message } = result

        if (!success) return rejectWithValue(message)

        connectSocket(result.user?.id)
        return result.user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const checkAuthThunk = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const result = await checkAuth()
        const { success, message } = result

        if (!success) return rejectWithValue(message)

        connectSocket(result.user?.id)
        return result.user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const result = await logout()
        const { success, message } = result

        if (!success) return rejectWithValue(message)

        disconnectSocket()
        return result.user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateAvatarThunk = createAsyncThunk("auth/updateavatar", async (payload, { rejectWithValue }) => {
    try {
        const result = await updateAvatar(payload)
        const { success, message } = result

        if (!success) return rejectWithValue(message)
        // return result.user.profilePic
        return
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchAvatarThunk = createAsyncThunk("auth/fetchAvatar", async (_, { rejectWithValue }) => {
    try {
        const result = await fetchAvatar()
        const { success, message } = result
        if (!success) rejectWithValue(message)
        return result.avatar
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        authUserAvatar: null,
        onlineUsers: null,
        initialized: false,
        isLoading: {
            signUp: false,
            login: false,
            logout: false,
            checkAuth: false,
            avatar: false,
            fetchAvatar: false,
        },
    },
    reducers: {
        setOnlineUsers: (state, action) => { state.onlineUsers = action.payload },
    },
    extraReducers: (builder) => {
        builder
            // signUp
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.isLoading.signUp = false;
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.isLoading.signUp = false;
            })
            .addCase(signUpThunk.pending, (state) => {
                state.isLoading.signUp = true;
            })
            // login
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading.login = false;
                state.authUser = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading.login = false;
            })
            .addCase(loginThunk.pending, (state) => {
                state.isLoading.login = true;
            })
            // logout
            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.isLoading.logout = false;
                state.authUser = null;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.isLoading.logout = false;
            })
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading.logout = true;
            })
            // checkAuth
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.isLoading.checkAuth = false;
                state.authUser = action.payload;
                state.initialized = true;
            })
            .addCase(checkAuthThunk.rejected, (state, action) => {
                state.isLoading.checkAuth = false;
                state.authUser = null;
                state.initialized = true;
            })
            .addCase(checkAuthThunk.pending, (state) => {
                state.isLoading.checkAuth = true;
            })
            // updateAvatar
            .addCase(updateAvatarThunk.fulfilled, (state, action) => {
                state.isLoading.avatar = false;
                // state.authUser.avatar = action.payload;
            })
            .addCase(updateAvatarThunk.rejected, (state, action) => {
                state.isLoading.avatar = false;
            })
            .addCase(updateAvatarThunk.pending, (state) => {
                state.isLoading.avatar = true;
            })
            // fetchAvatar
            .addCase(fetchAvatarThunk.fulfilled, (state, action) => {
                state.isLoading.fetchAvatar = false;
                state.authUserAvatar = action.payload;
            })
            .addCase(fetchAvatarThunk.rejected, (state, action) => {
                state.isLoading.fetchAvatar = false;
            })
            .addCase(fetchAvatarThunk.pending, (state) => {
                state.isLoading.fetchAvatar = true;
            });
    }

})

export const { setOnlineUsers } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer