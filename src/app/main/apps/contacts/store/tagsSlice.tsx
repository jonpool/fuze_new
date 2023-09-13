import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import axios from 'axios';
import { RootState } from 'app/store/index';
import { TagsType, TagType } from '../model/TagModel';

export const getTags = createAppAsyncThunk<TagsType>('contactsApp/tags/getTags', async () => {
	const response = await axios.get('/api/contacts/tags');

	const data = (await response.data) as TagsType;

	return data;
});

const tagsAdapter = createEntityAdapter<TagType>({});

const initialState = tagsAdapter.getInitialState([]);

export const { selectAll: selectTags, selectById: selectTagsById } = tagsAdapter.getSelectors(
	(state: AppRootState) => state.contactsApp.tags
);

const tagsSlice = createSlice({
	name: 'contactsApp/tags',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTags.fulfilled, (state, action) => tagsAdapter.setAll(state, action.payload));
	}
});

export type AppRootState = RootState<typeof tagsSlice>;

export default tagsSlice.reducer;
