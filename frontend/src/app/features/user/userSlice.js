import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const signupUrl = import.meta.env.VITE_SIGNUP_URl;
const loginUrl = import.meta.env.VITE_LOGIN_URl;
const logOutUser = import.meta.env.VITE_LOGOUT_URL;
const getUser = import.meta.env.VITE_USER_URl;
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(signupUrl, userData, {
        withCredentials: true,
      });
      console.log(res);

      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
      // err.response.data.error
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(loginUrl, userData, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err?.response?.data?.error || err.message
      );
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logout",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.get(logOutUser, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err?.response?.data?.error || err.message
      );
    }
  }
);
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.get(getUser, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err?.response?.data?.error || err.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    status: "",
    error: null,
  },
  reducers: {
    clearUser: (state, action) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        (state.status = "success"), (state.error = "");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        (state.status = "success"), (state.error = "");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.userData = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        (state.userData = action.payload),
          (state.status = "success"),
          (state.error = "");
      });
  },
});
// export const { clearUser } = actions.reducers;
export default userSlice.reducer;
