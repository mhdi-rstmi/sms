import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCourseAbsences = createAsyncThunk(
  "update",
  async (courseId, updatedStudentAbsences) => {
    try {
      const courseResponse = await axios.get(`http://localhost:5000/courses`);
      const test = await axios.get(
        `http://localhost:5000/courses?=${courseId.courseId}`
      );
      const allCourses = courseResponse.data;
      console.log(test);

      const courseData = allCourses.find((c) => c.id === courseId.courseId);

      const updatedStudents = courseData.students.map((student) => {
        const updatedAbsence = courseId.students.find(
          (abs) => abs.studentId === student.studentId
        );

        return updatedAbsence
          ? { ...student, absences: updatedAbsence.absences }
          : student;
      });

      const updatedCourseData = {
        ...courseData,
        students: updatedStudents,
      };

      const courseIndex = courseResponse.data.findIndex(
        (c) => c.id === courseId.courseId
      );

      const updateCourses = [
        ...courseResponse.data.slice(0, courseIndex),
        updatedCourseData,
        ...courseResponse.data.slice(courseIndex + 1),
      ];
      // Put the updated course data back to the server
      const updateResponse = axios.put(
        `http://localhost:5000/courses?=${courseId.courseId}`,
        updateCourses
      );
      return updateResponse.data;
    } catch (error) {
      console.error("Error updating course absences:", error);
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "attendance",
  initialState: {
    attendanceData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAttendance: (state, action) => {
      state.attendanceData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCourseAbsences.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseAbsences.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceData = action.payload;
      })
      .addCase(updateCourseAbsences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAttendance } = courseSlice.actions;
export default courseSlice.reducer;
