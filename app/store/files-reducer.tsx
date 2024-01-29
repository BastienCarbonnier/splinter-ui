import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    deleteFile: (state, action: PayloadAction<string>) => {
      state.files = [...state.files.filter((file) => file.id !== action.payload)];
    },
    clearFiles: (state) => {
      state.files = [];
    }
  }
});

export const { add, deleteFile, clearFiles } = filesSlice.actions;

export const selectFiles = (state: RootState) => state.files;

export default filesSlice.reducer;