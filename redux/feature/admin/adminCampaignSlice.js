import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCampaign = createAsyncThunk(
    "campaign/getAllCampaign",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/campaign`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const getAllCampaignByStatus = createAsyncThunk(
    "campaign/getAllCampaignByStatus",
    async (data, { rejectWithValue }) => {
        const query = data?.query || "";
        const status = data?.status || "";
        const page = data?.page || 0;
        const size = 7;

        try {
            if (query == "") {
                const response = await axiosInstance.get(
                    `/campaign/status?status=${status}&page=${page}&size=${size}`
                );
                return response.data;
            }

            const response = await axiosInstance.get(
                `/campaign/status?name=${query}&status=${status}&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const getCampaignByPartnerId = createAsyncThunk(
    "campaign/getCampaignByPartnerId",
    async (data, { rejectWithValue }) => {
        const id = data?.id;
        const query = data?.query || "";
        const status = data?.status || "";
        const page = data?.page || 0;
        const size = data?.size || 6;

        try {
            if (query == "") {
                const response = await axiosInstance.get(
                    `/campaign/partner/${id}?status=${status}&page=${page}&size=${size}`
                );
                return response.data;
            }
            const response = await axiosInstance.get(
                `/campaign/partner/${id}?name=${query}&status=${status}&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const approveCampaign = createAsyncThunk(
    "campaign/approveCampaign",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/campaign/${id}/approve`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const rejectCampaign = createAsyncThunk(
    "campaign/rejectCampaign",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/campaign/${id}/reject`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

const adminCampaignSlice = createSlice({
    name: "adminCampaign",
    initialState: {
        campaigns: null,
        currentCampaign: null,
        currentCampaignUrl: null,
        paging: {
            page: 0,
            size: 7,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        setCurrentCampaign: (state, action) => {
            state.currentCampaign = action.payload.item;
            // state.currentCampaignUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCampaign.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.campaigns = data.content;
                state.status = "success";
            })
            .addCase(getAllCampaign.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getAllCampaignByStatus.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.campaigns = data.content;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.status = "success";
            })
            .addCase(getAllCampaignByStatus.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getCampaignByPartnerId.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.currentCampaign = data.content;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.status = "success";
            })
            .addCase(getCampaignByPartnerId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(approveCampaign.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(approveCampaign.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(rejectCampaign.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(rejectCampaign.rejected, (state) => {
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

export const { setCurrentCampaign } = adminCampaignSlice.actions;
export default adminCampaignSlice.reducer;
