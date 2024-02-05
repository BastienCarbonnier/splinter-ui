import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mergedFileReducer from './store/merged-file-reducer';
import filesReducer from './store/files-reducer';
import loaderReducer from './store/loader-reducer';

export const store = configureStore({
  reducer: {
    files: filesReducer,
    updatedFiles: filesReducer,
    mergedFile: mergedFileReducer,
    loader: loaderReducer 
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