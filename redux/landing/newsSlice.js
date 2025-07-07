import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://10.10.102.91:1337/api";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(
    `${BASE_URL}/articles?populate=imagecontent`
  );

  // Map through the news items and construct the image URL
  const newsWithImageUrls = response.data.data.map((item) => {
    // Check for image formats and fallback to alternative sizes if necessary
    const imageUrl = item.imagecontent[0]?.formats?.large?.url
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.large.url}` // large format
      : item.imagecontent[0]?.formats?.medium?.url
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.medium.url}` // medium format
      : item.imagecontent[0]?.formats?.small?.url
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.small.url}` // small format
      : item.imagecontent[0]?.formats?.thumbnail?.url // fallback to thumbnail format
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.thumbnail.url}`
      : null; // no image available

    return {
      ...item,
      imageUrl, // Attach the constructed image URL
    };
  });

  return newsWithImageUrls;
});

export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async (id) => {
    console.log(id);

    const response = await axios.get(
      `${BASE_URL}/articles/${id}?populate=imagecontent`
    );

    console.log(response.data);

    const item = response.data.data;

    // const paragraph = item.contentnews.map(par => par.children.map(child=> child.text).join(' ')).join('\n')

    const imageUrl = item.imagecontent[0]?.formats?.large?.url
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.large.url}` // large format
      : item.imagecontent[0]?.formats?.medium?.url
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.medium.url}` // medium format
      : item.imagecontent[0]?.formats?.small?.url
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.small.url}` // small format
      : item.imagecontent[0]?.formats?.thumbnail?.url // fallback to thumbnail format
      ? `http://10.10.102.91:1337${item.imagecontent[0].formats.thumbnail.url}`
      : null; // no image available

    return {
      ...item,
      imageUrl, // Attach the constructed image URL
    };
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsItems: [],
    selectedItem: null,
    error: null,
    status: "idle", // set the initial status to idle
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newsItems = action.payload.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        state.status = "succeeded";
      });
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      }
    );
  },
});

export default newsSlice.reducer;
