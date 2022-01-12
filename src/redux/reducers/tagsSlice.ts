import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Tag, TagsState} from '@models/tags';

import initialState from '@redux/initialState';

import {RootState} from '../store';

type SetTagsPayload = Tag[];

export const tagsSlice = createSlice({
  name: 'tagsSlice',
  initialState: initialState.tags,
  reducers: {
    setTags: (state: Draft<TagsState>, action: PayloadAction<SetTagsPayload>) => {
      state.tagsList = action.payload;
    },
  },
});

export const selectTags = (state: RootState) => state.tags.tagsList;

export const {setTags} = tagsSlice.actions;

export default tagsSlice.reducer;
