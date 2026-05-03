import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { AppThunk } from "../store";
import { setLocalStorageItem, removeLocalStorageItem } from "../../utils/storage";
import { authService } from "../../api/authService";

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
  authToken: string | null;
  initializing: boolean;
  orgId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  authToken: null,
  role: null,
  initializing: true,
  orgId: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializationComplete: (state) => {
      state.initializing = false;
    },

    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action: PayloadAction<{ userId: string; token: string; role: string; orgId:string }>) => {

      // console.log(action)
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.authToken = action.payload.token;
      state.role = action.payload.role;
      state.orgId = action.payload.orgId;
      state.loading = false;
      state.error = null;

      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('orgId', action.payload.orgId);
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.authToken = null;
      state.role = null;
      state.orgId = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut, initializationComplete } = authSlice.actions;

export const signIn =
  (credentials: { email: string; password: string }): any =>
  async (dispatch:any) => {
    try {
      dispatch(signInStart());
      // Simulate API call
      const resp:any = await authService.signIn(credentials);

      // console.log(resp)

      setLocalStorageItem("authToken", resp.data.data.token);
      setLocalStorageItem("userId", resp.data.data.userId);
      setLocalStorageItem("role", resp.data.data.role);
      setLocalStorageItem("orgId", resp.data.data.orgId);

      dispatch(signInSuccess({ token:resp.data.data.token, userId: resp.data.data.userID, role:resp.data.data.role,  orgId: resp.data.data.org_id }))

    } catch (error:any) {
      dispatch(signInFailure(error.message));
    }
  };

export const signOutUser = (): any => (dispatch:any) => {
  removeLocalStorageItem("authToken");
  removeLocalStorageItem("userId");
  removeLocalStorageItem("orgId");
  removeLocalStorageItem("role");
  dispatch(signOut());
  
};

export default authSlice.reducer;