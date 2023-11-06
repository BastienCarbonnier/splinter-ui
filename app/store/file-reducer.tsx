import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';

export interface JsonFileState {
  file: IJsonFile | null
}

const initialState: JsonFileState = {
  file: null
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IJsonFile>) => {
      state.file = action.payload;
    }
  }
});

export const { add } = fileSlice.actions;

export const selectFile = (state: RootState) => state.file;

export default fileSlice.reducer;