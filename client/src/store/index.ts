import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import conversationReducer from './reducers/conversationSlice';
import messageReducer from './reducers/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer: {
        userReducer,
        conversationReducer,
        messageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
