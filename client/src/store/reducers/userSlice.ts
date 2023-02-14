import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import userApi, { IUserData } from "../../api/user.api";

export const register = createAsyncThunk(
    "user/register",
    async (userform: IUserData) => {
        const response = await userApi.register(userform);
        return response;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (userform: IUserData) => {
        const response = await userApi.login(userform);
        return response;
    }
);

export const load = createAsyncThunk("user/load", async () => {
    const response = await userApi.load();
    return response;
});

export const changePass = createAsyncThunk(
    "user/changePass",
    async (userform: IUserData) => {
        const response = await userApi.changePass(userform);
        return response;
    }
);

export const changeInfor = createAsyncThunk(
    "user/changeInfor",
    async (userform: string) => {
        const response = await userApi.changeInfor(userform);
        return response;
    }
);

interface defaultState {
    authLoading: boolean;
    userId: string;
    user: IUserData | null;
    message: null | {
        success: Boolean;
        messages: string;
    };
}

const initialState: defaultState = {
    authLoading: false,
    userId: "",
    user: null,
    message: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearMessage(state) {   
            state.message = null;
        },
        logout(state) {
            localStorage.removeItem("userChatBot");
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(
            register.fulfilled,
            (state, action: { payload: any }) => {
                state.authLoading = false;
                if (action.payload.success) {
                    state.message = action.payload
                    localStorage.setItem(
                        "userChatBot",
                        action.payload.accessToken
                    );
                } else {
                    state.message = action.payload
                    state.user = null;
                }
            }
        );

        builder.addCase(login.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action: { payload: any }) => {
            state.authLoading = false;
            console.log(action.payload)
            if (action.payload.success) {
                state.message = action.payload
                localStorage.setItem("userChatBot", action.payload.accessToken);
            } else {
                state.message = action.payload
                state.user = null;
            }
        });
        builder.addCase(load.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(load.fulfilled, (state, action: { payload: any }) => {
            state.authLoading = false;
            if (action.payload.success) {
                state.user = action.payload.user;
            } else {
                state.user = null;
            }
        });
    },
});

const userReducer = userSlice.reducer;

export const userSelector = (state: RootState) => state.userReducer;

export const { logout, clearMessage } = userSlice.actions;

export default userReducer;
