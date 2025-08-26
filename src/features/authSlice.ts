import { login, verifyOtp } from "../services/api/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    formData: {
        email: string;
        password: string;
    };
    forgottenPasswordFormData: {
        email: string;
    };
    resetPasswordFormData: {
        newPassword: string;
        confirmPassword: string;
    };
    registerFormData: {
        fullName: string;
        email: string;
        password: string;
    };
    otp: string[];
}

const initialState: AuthState = {
    formData: {
        email: "",
        password: "",
    },
    forgottenPasswordFormData: {
        email: "",
    },
    resetPasswordFormData: {
        newPassword: "",
        confirmPassword: "",
    },
    registerFormData: {
        fullName: "",
        email: "",
        password: "",
    },
    otp: new Array(6).fill(""),
};

export const loginForm = createAsyncThunk(
    "login",
    async (data: { email: string }, { rejectWithValue }) => {
        try {
            const response = await login(data);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const verifyOtpForm = createAsyncThunk(
    "verifyOtp",
    async (data: { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await verifyOtp(data);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const AuthSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const { key, value } = action.payload;
            state.formData = {
                ...state?.formData,
                [key]: value,
            };
        },
        setForgottenPasswordFormData: (state, action) => {
            const { key, value } = action.payload;
            state.forgottenPasswordFormData = {
                ...state?.forgottenPasswordFormData,
                [key]: value,
            };
        },
        setResetFormData: (state, action) => {
            const { key, value } = action.payload;
            state.resetPasswordFormData = {
                ...state?.resetPasswordFormData,
                [key]: value,
            };
        },
        setRegisterFormData: (state, action) => {
            const { key, value } = action.payload;
            state.registerFormData = {
                ...state?.registerFormData,
                [key]: value,
            };
        },
        setOTPCode: (state, action) => {
            state.otp = action.payload;
        },
        clearFormData: (state) => {
            state.formData = {
                email: "",
                password: "",
            };
            state.otp = new Array(6).fill("");
        },
        clearResetFormData: (state) => {
            state.resetPasswordFormData = {
                newPassword: "",
                confirmPassword: "",
            };
        },
        clearForgottenPasswordFormData: (state) => {
            state.forgottenPasswordFormData = {
                email: "",
            };
        },
        clearRegisterFormData: (state) => {
            state.registerFormData = {
                fullName: "",
                email: "",
                password: ""
            }
        }
    },
});

export const {
    setFormData,
    setResetFormData,
    setRegisterFormData,
    setForgottenPasswordFormData,
    setOTPCode,
    clearFormData,
    clearResetFormData,
    clearForgottenPasswordFormData,
    clearRegisterFormData
} = AuthSlice.actions;
export default AuthSlice.reducer;
