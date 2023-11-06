import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface JsonFilesState {
  files: IJsonFile[];
}

const initialState: JsonFilesState = {
  files: []
};

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IJsonFile>) => {
      state.files = [...state.files, action.payload];
    },
    remove: (state, action: PayloadAction<string>) => {
      state.files = [...state.files.filter((file) => file.id !== action.payload)];
    }
  }
});

export const { add, remove } = filesSlice.actions;

export const selectFiles = (state: RootState) => state.files;

export default filesSlice.reducer;