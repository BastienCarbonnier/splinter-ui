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
    add: (state, action: PayloadAction<IJsonFile>) => {
      state.mergedFile = action.payload;
    },
    init: (state) => {
      state.mergedFile = null;
    }
  }
});

export const { add, init } = fileSlice.actions;

export const selectFile = (state: RootState) => state.mergedFile;

export default fileSlice.reducer;