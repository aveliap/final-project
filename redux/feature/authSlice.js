import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/auth/login`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Login failed");
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/auth/register/partner`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Registration failed");
        }
    }
);

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/auth/change-password`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Registration failed");
        }
    }
);

const authSLice = createSlice({
    name: "auth",
    initialState: {
        isLogin: null,
        token: null,
        role: null,
        user: null,
        status: null,
    },
    reducers: {
        setAuth: (state, action) => {
            const { token, isLogin, role, user } = action.payload;
            state.token = token;
            state.isLogin = isLogin;
            state.role = role;
            state.user = user;
        },
        logout: (state) => {
            state.isLogin = false;
            state.token = null;
            state.user = null;
            state.role = null;
            state.status = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");
        },
        clearAuthStatus: (state) => {
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const { token, role, userData } = action.payload.data;
                state.isLogin = true;
                state.token = token;
                state.role = role;
                state.user = userData;
                state.status = "success";
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                localStorage.setItem("user", JSON.stringify(userData));
            })
            .addCase(login.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(register.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(register.rejected, (state, action) => {
                state.status = action.payload.message;
            })

            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = action.payload.message;
            })

            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state) => {
                    state.status = "failed";
                }
            );
    },
});
export const { setAuth, logout, clearAuthStatus } = authSLice.actions;
export default authSLice.reducer;
