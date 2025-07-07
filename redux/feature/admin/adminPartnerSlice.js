import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPartner = createAsyncThunk(
    "campaign/getAllPartner",
    async (data, { rejectWithValue }) => {
        const query = data?.query || "";
        const status = data?.status || "";
        const page = data?.page || 0;
        const size = 7;

        try {
            if (query == "") {
                const response = await axiosInstance.get(
                    `/partner?status=${status}&page=${page}&size=${size}`
                );
                return response.data;
            }

            const response = await axiosInstance.get(
                `/partner?name=${query}&status=${status}&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

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

export const approvePartner = createAsyncThunk(
    "partner/approvePartner",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/partner/${id}/approve`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to approve");
        }
    }
);

export const rejectPartner = createAsyncThunk(
    "partner/rejectPartner",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/partner/${id}/reject`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to reject");
        }
    }
);

const adminPartnerSlice = createSlice({
    name: "adminPartner",
    initialState: {
        partners: null,
        currentPartner: null,
        currentPartnerUrl: null,
        paging: {
            page: 0,
            size: 7,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        setCurrentPartner: (state, action) => {
            state.currentPartner = action.payload.item;
            // state.currentPartnerUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPartner.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.partners = data.content;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.status = "success";
            })
            .addCase(getAllPartner.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getDetailPartner.fulfilled, (state, action) => {
                state.currentPartner = action.payload.data;
                state.status = "success";
            })
            .addCase(getDetailPartner.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(approvePartner.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(approvePartner.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(rejectPartner.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(rejectPartner.rejected, (state) => {
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

export const { setCurrentPartner } = adminPartnerSlice.actions;
export default adminPartnerSlice.reducer;
