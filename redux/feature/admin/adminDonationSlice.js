import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDonationById = createAsyncThunk(
    "donation/getDonationById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/donation/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const getDonationByDonorId = createAsyncThunk(
    "donation/getDonationByDonorId",
    async (data, { rejectWithValue }) => {
        const id = data?.id;
        const page = data?.page || 0;
        const size = data?.size || 8;

        try {
            const response = await axiosInstance.get(
                `/donation/donor/${id}?&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

const adminDonationSlice = createSlice({
    name: "adminDonation",
    initialState: {
        donations: null,
        currentDonation: null,
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
        },
        setCurrentDonation: (state, action) => {
            state.currentDonation = action.payload.item;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getDonationByDonorId.fulfilled, (state, action) => {
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
            .addCase(getDonationByDonorId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getDonationById.fulfilled, (state, action) => {
                state.currentDonation = action.payload.data;
                state.status = "success";
            })
            .addCase(getDonationById.rejected, (state) => {
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
    adminDonationSlice.actions;

export default adminDonationSlice.reducer;
