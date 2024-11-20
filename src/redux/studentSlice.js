import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk(
  "student/fetchCourses",
  async () => {
    const response = await axios.get("http://localhost:5000/courses");
    return response.data;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    courses: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
    });
  },
});

export default studentSlice.reducer;
