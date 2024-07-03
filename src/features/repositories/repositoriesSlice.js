import { 
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import fetchInitialRepos from '../../utils/githubApi';
import { repositorySerializer } from './repositorySerializer'

const repositoriesAdapter = createEntityAdapter()

const initialState = repositoriesAdapter.getInitialState({
  currentPage: 0,
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
        const loadedRepos = action.payload.data
        if(loadedRepos.length === 0){
          state.status = 'fully_loaded'
          return
        }
        state.status = 'succeeded'
        repositoriesAdapter.upsertMany(state, loadedRepos)
        state.currentPage = action.payload.page
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

export const fetchRepositories = createAsyncThunk('repositories/fetchRepositories', async (dispatch, { getState }) => {
  const status = getState().repositories.status
  if(status === 'fully_loaded'){
    return
  }
  const page = getState().repositories.currentPage + 1
  console.log('fetching repos, page: ' + page)
  const response = await fetchInitialRepos(page)

  return { data: formatManyRepositories(response.data), page }
})

function formatManyRepositories(repositoriesArray){
  return repositoriesArray.map(repo => repositorySerializer(repo))
}