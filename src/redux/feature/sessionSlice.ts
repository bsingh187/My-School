// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "redux/store";
// import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
// import { toastError, toastSuccess } from "helpers/toastHelper";
// import { API_BASE_URL } from "common/ApiUrl";

// interface ErrorPayload {
//   message: string;
//   status: number;
// }

// function isErrorPayload(object: any): object is ErrorPayload {
//   return "message" in object && typeof object.message === "string";
// }

// interface SessionDetails {
//   // name: string;
//   start_date: string;
//   end_date: string;
//   description: string;
// }

// interface SessionState {
//   sessionList: SessionDetails[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: SessionState = {
//   sessionList: [],
//   isLoading: false,
//   error: null,
// };

// // Create Session Async here //
// export const createSessionAsync = createAsyncThunk(
//   "session/create",
//   async (credentials: SessionDetails, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     const dbToken = localStorage.getItem("db_token");

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/session/create`,
//         credentials,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Db-Token": dbToken,
//           },
//         }
//       );

//       if (response?.data?.success) {
//         toastSuccess(response?.data?.message);
//         return response?.data;
//       } else {
//         toastError(response?.data?.message);
//         return rejectWithValue(response?.data);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message;
//       toastError(errorMessage);
//       return rejectWithValue({
//         message: errorMessage,
//         status: error.response?.status,
//       });
//     }
//   }
// );

// // Create Session Slice here //

// export const sessionSlice = createSlice({
//   name: "sessionState",
//   initialState,
//   reducers: {
//     addSession: (state, action) => {
//       state.sessionList = [...state.sessionList, action.payload];
//     },
//     clearSessions: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createSessionAsync.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(createSessionAsync.fulfilled, (state, action) => {
//         state.isLoading = false;
//         if (action.payload) {
//           state.sessionList = [...state.sessionList, action.payload];
//         }
//       })
//       .addCase(createSessionAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         if (isErrorPayload(action.payload)) {
//           state.error = action.payload.message;
//         } else {
//           state.error = "Unknown error occurred";
//         }
//       });
//   },
// });

// // Selectors here //
// export const { clearSessions, addSession } = sessionSlice.actions;
// export default sessionSlice.reducer;

// export const selectedSessionDataList = (state: RootState) => {
//   return state.sessionState?.sessionList ?? [];
// };
