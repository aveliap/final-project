import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAdminReport = createAsyncThunk(
    "partner/getAdminReport",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/report`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

const adminReportSlice = createSlice({
    name: "adminPartner",
    initialState: {
        report: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminReport.fulfilled, (state, action) => {
                state.report = action.payload.data;
                state.status = "success";
            })
            .addCase(getAdminReport.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default adminReportSlice.reducer;
