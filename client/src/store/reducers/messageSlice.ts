import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import messageApi, { IMessageData } from '../../api/message.api';


export const getAll = createAsyncThunk('message/getAll', async (userId : string) => {
    const response = await messageApi.getAll(userId)
    return response
});

export const addmessage = createAsyncThunk('message/addMessage', async (messageForm : IMessageData) => {
    const response = await messageApi.add(messageForm)
    return response
});

export const requestBot = createAsyncThunk('message/requestBot', async (messageForm : IMessageData) => {
    const response = await messageApi.requestBot(messageForm)
    return response
});

export const editmessage = createAsyncThunk('message/editMessage', async ({ id, messageForm } : { id : string, messageForm: IMessageData}) => {
    const response = await messageApi.edit(id, messageForm)
    return response
});

export const deletemessage = createAsyncThunk('message/deleteMessage', async (id : string) => {
    const response = await messageApi.delete(id)
    return response
});

interface defaultState {
    messageLoading: boolean;
    messages: IMessageData[];
    message: IMessageData | null;
}

const initialState: defaultState = {
    messageLoading: false,
    messages: [],
    message: null
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        clearData(state) {   
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action : { payload : any}) => {
            state.messageLoading = false;
            if (action.payload.success) {
                state.messages = action.payload.messages;
            } else {
                state.messages = [];
            }
        })
        builder.addCase(deletemessage.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(deletemessage.fulfilled, (state, action) => {
            state.messageLoading = false;
        })
        builder.addCase(addmessage.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(addmessage.fulfilled, (state, action) => {
            state.messageLoading = false;
        })
        builder.addCase(requestBot.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(requestBot.fulfilled, (state, action) => {
            state.messageLoading = false;
        })
        builder.addCase(editmessage.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(editmessage.fulfilled, (state, action) => {
            state.messageLoading = false;
        })
    },
});

const messageReducer = messageSlice.reducer;

export const messageSelector = (state : RootState) => state.messageReducer;

export const { clearData } = messageSlice.actions;

export default messageReducer;
