import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCampaign = createAsyncThunk(
    "campaign/createCampaign",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/campaign`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to create");
        }
    }
);

export const getCampaignDetailById = createAsyncThunk(
    "campaign/getCampaignDetailById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/campaign/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
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

export const getCampaignImageByName = createAsyncThunk(
    "campaign/getCampaignImageByName",
    async (name, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/file/${name}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const updateCampaignByPartnerId = createAsyncThunk(
    "campaign/updateCampaignByPartnerId",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/campaign/${id}`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to update");
        }
    }
);

export const stopCampaignById = createAsyncThunk(
    "campaign/stopCampaignById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/campaign/${id}/stop`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to update");
        }
    }
);

const campaignSlice = createSlice({
    name: "campaign",
    initialState: {
        campaigns: null,
        currentCampaign: null,
        currentCampaignUrl: null,
        paging: {
            page: 0,
            size: 6,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        clearCampaignStatus: (state) => {
            state.status = null;
        },
        clearCurrentCampaign: (state) => {
            state.currentCampaign = null;
            state.currentCampaignUrl = null;
        },
        clearCurrentCampaignUrl: (state) => {
            state.currentCampaignUrl = null;
        },
        setCurrentCampaign: (state, action) => {
            state.currentCampaign = action.payload.item;
            state.currentCampaignUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCampaign.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(createCampaign.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getCampaignByPartnerId.fulfilled, (state, action) => {
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
            .addCase(getCampaignByPartnerId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getCampaignImageByName.fulfilled, (state, action) => {
                state.currentCampaignUrl = action.payload;
                state.status = "success";
            })
            .addCase(getCampaignImageByName.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getCampaignDetailById.fulfilled, (state, action) => {
                state.currentCampaign = action.payload.data;
                state.status = "success";
            })
            .addCase(getCampaignDetailById.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(updateCampaignByPartnerId.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(updateCampaignByPartnerId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(stopCampaignById.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(stopCampaignById.rejected, (state) => {
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
    clearCampaignStatus,
    clearCurrentCampaign,
    setCurrentCampaign,
    clearCurrentCampaignUrl,
} = campaignSlice.actions;

export default campaignSlice.reducer;
