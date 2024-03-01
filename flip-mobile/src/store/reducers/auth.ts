import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-root-toast";
import { Auth } from "aws-amplify";
import { RootState } from "store";
import { IAuthState, ISignInCredentials, ISignUpCredentials } from "src/types/auth";

export const signUp = createAsyncThunk("auth/signUp", async (credentials: ISignUpCredentials, { rejectWithValue }) => {
  const { email, password, firstName, lastName, phone } = credentials;
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: firstName,
        family_name: lastName,
        email: email,
        phone_number: phone,
      },
      autoSignIn: {
        enabled: true,
      },
    });

    return email;
  } catch (ex) {
    return rejectWithValue(ex);
  }
});

export const confirmVerificationCode = createAsyncThunk(
  "auth/confirmVerificationCode",
  async (code: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { email } = state.auth.user;

      return await Auth.confirmSignUp(email, code);
    } catch (ex) {
      return rejectWithValue(ex);
    }
  },
);

export const resendVerificationCode = createAsyncThunk(
  "auth/resendVerificationCode",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { email } = state.auth.user;

      return await Auth.resendSignUp(email);
    } catch (ex) {
      return rejectWithValue(ex);
    }
  },
);

export const signIn = createAsyncThunk("auth/signIn", async (credentials: ISignInCredentials, { rejectWithValue }) => {
  const { email, password } = credentials;

  try {
    return await Auth.signIn(email, password);
  } catch (ex) {
    return rejectWithValue({ email, code: ex.code });
  }
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  Auth.signOut();
});

export const sendForgotPasswordCode = createAsyncThunk(
  "auth/sendForgotPasswordCode",
  async (_, { rejectWithValue, getState }) => {
    // TODO: Send forgot password
  },
);

export const verifyForgotPasswordCode = createAsyncThunk("auth/verifyForgotPasswordCode", async () => {
  // TODO: Verify forgot password code
  // On success, set step to 3
});

const initialState: IAuthState = {
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isConfigured: true,
    isVerified: false,
  },
  isAuthPending: false,
  isVerifyCodePending: false,
  isSendCodePending: false,
  forgotPasswordStep: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setForgotPasswordStep(state, action) {
      state.forgotPasswordStep = action.payload;
    },
    autoSignInSuccess(state, action) {
      state.user = action.payload;
    },
    autoSignInFailure(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
      Toast.show("Auto Sign In failed, please sign in manually");
      return state;
    },
    signInSuccess(state, action) {
      state.user = action.payload;
      state.isAuthPending = false;
    },
    signInFailure(state) {
      state.isAuthPending = false;
    },
  },
  extraReducers: {
    [signUp.pending.type]: (state) => {
      state.isAuthPending = true;
      return state;
    },
    [signUp.fulfilled.type]: (state, action) => {
      state.user.email = action.payload;
      state.isAuthPending = false;

      return state;
    },
    [signUp.rejected.type]: (state) => {
      state.isAuthPending = false;

      Toast.show("Error signing in, Please Try again", { duration: Toast.durations.LONG });
      return state;
    },

    // Confirm Verification Code
    [confirmVerificationCode.pending.type]: (state) => {
      state.isVerifyCodePending = true;
      return state;
    },
    [confirmVerificationCode.fulfilled.type]: (state) => {
      state.isVerifyCodePending = false;
      state.user.isVerified = true;

      return state;
    },
    [confirmVerificationCode.rejected.type]: (state, action) => {
      state.isVerifyCodePending = false;

      Toast.show(`Error verifying code: ${action.payload}`, { duration: Toast.durations.LONG });
      return state;
    },

    // Resend Verification Code
    [resendVerificationCode.fulfilled.type]: () => {
      Toast.show("New code has been sent");
    },
    [resendVerificationCode.rejected.type]: () => {
      Toast.show("Error sending code");
    },

    // Sign In
    [signIn.pending.type]: (state) => {
      state.isAuthPending = true;
      return state;
    },
    [signIn.fulfilled.type]: (state, action) => {
      const { attributes } = action.payload;

      state.user = {
        id: attributes.sub,
        email: attributes.email,
        firstName: attributes.given_name,
        lastName: attributes.family_name,
        phoneNumber: attributes.phone_number,
        isVerified: attributes.email_verified,
        isConfigured: false,
      };
      state.isAuthPending = false;

      return state;
    },
    [signIn.rejected.type]: (state, action) => {
      const { email, code } = action.payload;

      state.isAuthPending = false;
      Toast.show("Failed to Sign In", { duration: Toast.durations.LONG });

      if (code === "UserNotConfirmedException") {
        state.user.email = email;
        state.user.isVerified = false;
      }
      return state;
    },

    // Sign Out
    [signOut.pending.type]: (state) => {
      state.isAuthPending = true;
      return state;
    },
    [signOut.fulfilled.type]: (state) => {
      state.isAuthPending = false;
      state.user = null;
      return state;
    },
    [signOut.rejected.type]: (state) => {
      state.isAuthPending = false;
      return state;
    },

    // Forgot Password
    [sendForgotPasswordCode.pending.type]: (state) => {
      state.isSendCodePending = true;
      return state;
    },
    [sendForgotPasswordCode.fulfilled.type]: (state) => {
      state.isSendCodePending = false;
      state.forgotPasswordStep = 1;
      return state;
    },
    [sendForgotPasswordCode.rejected.type]: (state) => {
      state.isSendCodePending = false;
      return state;
    },
  },
});

export const { setForgotPasswordStep, autoSignInSuccess, autoSignInFailure, signInSuccess, signInFailure } =
  authSlice.actions;

export default authSlice;
