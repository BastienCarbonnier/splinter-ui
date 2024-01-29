import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface JsonFileState {
  mergedFile: IJsonFile | null
}

const initialState: JsonFileState = {
  mergedFile: null
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setMergedFile: (state, action: PayloadAction<IJsonFile>) => {
      state.mergedFile = action.payload;
    },
    clearMergedFile: (state) => {
      state.mergedFile = null;
    }
  }
});

export const { setMergedFile, clearMergedFile } = fileSlice.actions;

export const selectMergedFile = (state: RootState) => state.mergedFile;

export default fileSlice.reducer;