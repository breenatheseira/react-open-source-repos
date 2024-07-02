import { 
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { sampleData } from '../../result-sample'
import getAllRepos from '../../utils/githubApi';

const repositoriesAdapter = createEntityAdapter()

const initialState = repositoriesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: () => {},
  extraReducers(builder){
    builder
      .addCase(fetchRepositories.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        repositoriesAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default repositoriesSlice.reducer

export const {
  selectAll: selectAllRepositories,
  selectIds: selectRepositoryIds,
} = repositoriesAdapter.getSelectors(state => state.repositories)

export const fetchRepositories = createAsyncThunk('repositories/fetchRepositories', async () => {
  // works, don't use the rates unnecessarily
    // getAllRepos(page).then( response => {
    //   setRepos(response.data);
    // });
  // const response = 
  return sampleData
})



