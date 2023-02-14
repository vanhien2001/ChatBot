import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../index";
import conversationApi, { IConversationData } from "../../api/conversation.api";

export const getAll = createAsyncThunk(
    "conversation/getAll",
    async (userId: string) => {
        const response = await conversationApi.getAll(userId);
        return response;
    }
);

export const addConversation = createAsyncThunk(
    "conversation/addConversation",
    async (conversationForm: IConversationData) => {
        const response = await conversationApi.add(conversationForm);
        return response;
    }
);

export const editConversation = createAsyncThunk(
    "conversation/editConversation",
    async ({
        id,
        conversationForm,
    }: {
        id: string;
        conversationForm: IConversationData;
    }) => {
        const response = await conversationApi.edit(id, conversationForm);
        return response;
    }
);

export const deleteConversation = createAsyncThunk(
    "conversation/deleteConversation",
    async (id: string) => {
        const response = await conversationApi.delete(id);
        return response;
    }
);

interface defaultState {
    conversationLoading: boolean;
    conversations: IConversationData[];
    conversationId: string;
}

const initialState: defaultState = {
    conversationLoading: false,
    conversations: [],
    conversationId: '',
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversation(state, action: PayloadAction<string>){
            console.log(action.payload)
            state.conversationId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.conversationLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action: { payload: any }) => {
            state.conversationLoading = false;
            if (action.payload.success) {
                state.conversations = action.payload.conversations;
            } else {
                state.conversations = [];
            }
        });
        builder.addCase(deleteConversation.pending, (state, action) => {
            state.conversationLoading = true;
        });
        builder.addCase(deleteConversation.fulfilled, (state, action) => {
            state.conversationLoading = false;
        });
        builder.addCase(addConversation.pending, (state, action) => {
            state.conversationLoading = true;
        });
        builder.addCase(addConversation.fulfilled, (state, action) => {
            state.conversationLoading = false;
        });
        builder.addCase(editConversation.pending, (state, action) => {
            state.conversationLoading = true;
        });
        builder.addCase(editConversation.fulfilled, (state, action) => {
            state.conversationLoading = false;
        });
    },
});

const conversationReducer = conversationSlice.reducer;

export const conversationSelector = (state: RootState) =>
    state.conversationReducer;

export const { setConversation } = conversationSlice.actions;

export default conversationReducer;
