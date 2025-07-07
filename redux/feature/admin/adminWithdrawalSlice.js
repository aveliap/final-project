import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllWithdrawal = createAsyncThunk(
    "withdrawal/getAllWithdrawal",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/withdrawal`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const getAllWithdrawalByStatus = createAsyncThunk(
    "campaign/getAllWithdrawalByStatus",
    async (data, { rejectWithValue }) => {
        const query = data?.query || "";
        const status = data?.status || "";
        const page = data?.page || 0;
        const size = 7;

        try {
            if (query == "") {
                const response = await axiosInstance.get(
                    `/withdrawal/status?status=${status}&page=${page}&size=${size}`
                );
                return response.data;
            }

            const response = await axiosInstance.get(
                `/withdrawal/status?name=${query}&status=${status}&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const approveWithdrawal = createAsyncThunk(
    "withdrawal/approveWithdrawal",
    async ({ id, file }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/withdrawal/${id}/approve`,
                file
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to approve");
        }
    }
);

export const rejectWithdrawal = createAsyncThunk(
    "withdrawal/rejectWithdrawal",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/withdrawal/${id}/reject`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to reject");
        }
    }
);

const adminWithdrawalSlice = createSlice({
    name: "adminwithdrawal",
    initialState: {
        withdrawals: null,
        currentWithdrawal: null,
        currentWithdrawalUrl: null,
        paging: {
            page: 0,
            size: 10,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        setCurrentWithdrawal: (state, action) => {
            state.currentWithdrawal = action.payload.item;
            // state.currentWithdrawalUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllWithdrawal.fulfilled, (state, action) => {
                state.withdrawals = action.payload.data;
                state.status = "success";
            })
            .addCase(getAllWithdrawal.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getAllWithdrawalByStatus.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.withdrawals = data.content;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.status = "success";
            })
            .addCase(getAllWithdrawalByStatus.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(approveWithdrawal.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(approveWithdrawal.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(rejectWithdrawal.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(rejectWithdrawal.rejected, (state) => {
                state.status = "failed";
            })

            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state) => {
                    state.status = "failed";
                }
            );
    },
});

export const { setCurrentWithdrawal } = adminWithdrawalSlice.actions;
export default adminWithdrawalSlice.reducer;
