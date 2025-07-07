import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createWithdrawal = createAsyncThunk(
    "withDrawal/createWithdrawal",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/withdrawal`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to create");
        }
    }
);

export const updateWithdrawal = createAsyncThunk(
    "withDrawal/updateWithdrawal",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/withdrawal/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to create");
        }
    }
);

export const getWithdrawalByPartnerId = createAsyncThunk(
    "withdrawal/getWithdrawalByPartnerId",
    async (data, { rejectWithValue }) => {
        const id = data?.id;
        const query = data?.query || "";
        const status = data?.status || "";
        const page = data?.page || 0;
        const size = data?.size || 6;

        try {
            if (query == "") {
                const response = await axiosInstance.get(
                    `/withdrawal/partner/${id}?status=${status}&page=${page}&size=${size}`
                );
                return response.data;
            }
            const response = await axiosInstance.get(
                `/withdrawal/partner/${id}?name=${query}&status=${status}&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

const withdrawalSlice = createSlice({
    name: "withdrawal",
    initialState: {
        withdrawals: null,
        currentWithdrawal: null,
        currentWithdrawalUrl: null,
        paging: {
            page: 0,
            size: 6,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        clearWithdrawalStatus: (state) => {
            state.status = null;
        },
        clearCurrentWithdrawal: (state) => {
            state.currentWithdrawal = null;
            state.currentWithdrawalUrl = null;
        },
        setCurrentWithdrawal: (state, action) => {
            state.currentWithdrawal = action.payload.item;
            state.currentWithdrawalUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWithdrawal.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(createWithdrawal.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(updateWithdrawal.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(updateWithdrawal.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getWithdrawalByPartnerId.fulfilled, (state, action) => {
                const { data } = action.payload;
                console.log(data);
                state.withdrawals = data.content;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.status = "success";
            })
            .addCase(getWithdrawalByPartnerId.rejected, (state) => {
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

export const {
    clearWithdrawalStatus,
    clearCurrentWithdrawal,
    setCurrentWithdrawal,
} = withdrawalSlice.actions;

export default withdrawalSlice.reducer;
