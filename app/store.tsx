import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fileReducer from './store/file-reducer';
import filesReducer from './store/files-reducer';

export const store = configureStore({
  reducer: {
    files: filesReducer,
    file: fileReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;