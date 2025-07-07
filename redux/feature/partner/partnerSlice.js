import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDetailPartner = createAsyncThunk(
    "partner/getDetailPartner",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/partner/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const updateProfilePartner = createAsyncThunk(
    "partner/updateProfilePartner",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/partner/${id}`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to update");
        }
    }
);

export const createDocumentPartner = createAsyncThunk(
    "partner/createDocumentPartner",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/partner/document/upload/${id}`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to update");
        }
    }
);

export const updateDocumentPartner = createAsyncThunk(
    "partner/updateDocumentPartner",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/partner/document/update/${id}`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to update");
        }
    }
);

const partnerSlice = createSlice({
    name: "partner",
    initialState: {
        partner: null,
        status: null,
    },
    reducers: {
        clearPartnerStatus: (state) => {
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailPartner.fulfilled, (state, action) => {
                state.partner = action.payload.data;
                state.status = "success";
            })
            .addCase(getDetailPartner.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(updateProfilePartner.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(updateProfilePartner.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(createDocumentPartner.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(createDocumentPartner.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(updateDocumentPartner.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(updateDocumentPartner.rejected, (state) => {
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

export const { clearPartnerStatus } = partnerSlice.actions;
export default partnerSlice.reducer;
