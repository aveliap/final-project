import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDonationByCampaignId = createAsyncThunk(
    "donation/getDonationByCampaignId",
    async (data, { rejectWithValue }) => {
        const id = data?.id;
        const page = data?.page || 0;
        const size = data?.size || 8;

        try {
            const response = await axiosInstance.get(
                `/donation/campaign/${id}?&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

const donationSlice = createSlice({
    name: "donation",
    initialState: {
        donations: null,
        currentDonation: null,
        currentDonationUrl: null,
        paging: {
            page: 0,
            size: 6,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        cleardonationStatus: (state) => {
            state.status = null;
        },
        clearCurrentDonation: (state) => {
            state.currentDonation = null;
            state.currentDonationUrl = null;
        },
        setCurrentDonation: (state, action) => {
            state.currentDonation = action.payload.item;
            state.currentDonationUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getDonationByCampaignId.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.donations = data.content;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.status = "success";
            })
            .addCase(getDonationByCampaignId.rejected, (state) => {
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

export const { cleardonationStatus, clearCurrentDonation, setCurrentDonation } =
    donationSlice.actions;

export default donationSlice.reducer;
