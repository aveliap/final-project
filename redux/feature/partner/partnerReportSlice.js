import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPartnerReport = createAsyncThunk(
    "partner/getPartnerReport",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/partner/report/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

const partnerReportSlice = createSlice({
    name: "partnerPartner",
    initialState: {
        report: null,
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPartnerReport.fulfilled, (state, action) => {
                state.report = action.payload.data;
                state.status = "success";
            })
            .addCase(getPartnerReport.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default partnerReportSlice.reducer;
