import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllDonor = createAsyncThunk(
    "donor/getAllDonor",
    async (data, { rejectWithValue }) => {
        const query = data?.query || "";
        const page = data?.page || 0;
        const size = data?.size || 8;

        try {
            if (query == "") {
                const response = await axiosInstance.get(
                    `/donor?page=${page}&size=${size}`
                );
                return response.data;
            }

            const response = await axiosInstance.get(
                `/donor?name=${query}&page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const getDonorById = createAsyncThunk(
    "donor/getDonorById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/donor/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const getDonorImageByName = createAsyncThunk(
    "donor/getDonorImageByName",
    async (name, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/file/${name}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

const adminDonorSlice = createSlice({
    name: "adminDonor",
    initialState: {
        donors: null,
        currentDonor: null,
        currentDonorUrl: null,
        paging: {
            page: 0,
            size: 7,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    reducers: {
        clearCurrentDonorUrl: (state) => {
            state.currentDonorUrl = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDonor.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.donors = data.content;
                state.status = "success";
            })
            .addCase(getAllDonor.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getDonorById.fulfilled, (state, action) => {
                state.currentDonor = action.payload.data;
                state.status = "success";
            })
            .addCase(getDonorById.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getDonorImageByName.fulfilled, (state, action) => {
                state.currentDonorUrl = action.payload;
                state.status = "success";
            })
            .addCase(getDonorImageByName.rejected, (state, action) => {
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

export const { clearCurrentDonorUrl } = adminDonorSlice.actions;
export default adminDonorSlice.reducer;
