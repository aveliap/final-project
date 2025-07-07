import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://10.10.102.91:1337/api'; 

export const fetchFAQs = createAsyncThunk('faq/fetchFAQs', async () => {
  const response = await axios.get(`${BASE_URL}/faqs`);
  return response.data; 
});


export const fetchFaqDonate = createAsyncThunk('faq/fetchFaqDonate', async () => {
  const response = await axios.get(`${BASE_URL}/faq-donations`);
  return response.data; 
});

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    faqItems: [],
    donateItems: [],
    error: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.faqItems = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(fetchFaqDonate.fulfilled, (state, action) => {
        state.donateItems = action.payload.data;
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
          state.status = "failed";
        }
      );
  },
});

export default faqSlice.reducer;
