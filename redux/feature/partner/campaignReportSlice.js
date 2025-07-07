import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCampaignReport = createAsyncThunk(
    "campaignReport/createCampaignReport",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/campaign-report`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to create");
        }
    }
);

export const getCampaignReportByCampaignId = createAsyncThunk(
    "campaign/getCampaignReportByCampaignId",
    async (data, { rejectWithValue }) => {
        const id = data?.id;
        const page = data?.page || 0;
        const size = data?.size || 4;

        try {
            const response = await axiosInstance.get(
                `/campaign-report/campaign/${id}?page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const deleteCampaignReportById = createAsyncThunk(
    "campaignReport/deleteCampaignReportByPartnerId",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `/campaign-report/${id}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to delete");
        }
    }
);

const campaignReportSlice = createSlice({
    name: "campaignReport",
    initialState: {
        campaignReports: null,
        currentCampaignReport: null,
        currentCampaignReportUrl: null,
        paging: {
            page: 0,
            size: 6,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        clearCampaignReportStatus: (state) => {
            state.status = null;
        },
        clearCurrentCampaignReport: (state) => {
            state.currentCampaignReport = null;
            state.currentCampaignReportUrl = null;
        },
        setCurrentCampaignReport: (state, action) => {
            state.currentCampaignReport = action.payload.item;
            state.currentCampaignReportUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCampaignReport.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(createCampaignReport.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(
                getCampaignReportByCampaignId.fulfilled,
                (state, action) => {
                    const { data } = action.payload;
                    state.campaignReports = data.content;
                    state.paging = {
                        page: data.pageable.pageNumber,
                        size: data.size,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                    };
                    state.status = "success";
                }
            )
            .addCase(getCampaignReportByCampaignId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(deleteCampaignReportById.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(deleteCampaignReportById.rejected, (state) => {
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
    clearCampaignReportStatus,
    clearCurrentCampaignReport,
    setCurrentCampaignReport,
} = campaignReportSlice.actions;

export default campaignReportSlice.reducer;
