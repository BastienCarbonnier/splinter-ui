import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface JsonFilesState {
  files: IJsonFile[];
  updatedFiles: IJsonFile[];
}

const initialState: JsonFilesState = {
  files: [],
  updatedFiles: []
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
      state.updatedFiles = [];
    },
    updateAllFiles: (state, action: PayloadAction<IJsonFile[]>) => {
      state.files = [...action.payload];
    },
    setUpdatedFiles: (state, action: PayloadAction<IJsonFile[]>) => {
      state.updatedFiles = [...action.payload];
    },
  }
});

export const { add, deleteFile, clearFiles, updateAllFiles, setUpdatedFiles } = filesSlice.actions;

export const selectFiles = (state: RootState) => state.files;
export const selectUpdatedFiles = (state: RootState) => state.updatedFiles;

export default filesSlice.reducer;