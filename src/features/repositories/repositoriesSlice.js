import { 
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import {
  fetchInitialRepos,
  fetchOneRepo,
} from '../../utils/githubApi';

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
        const linksString = action.payload.pageLinks
        state.status = (linksString && linksString.includes('last')) ? 'succeeded' : 'fully_loaded'
        repositoriesAdapter.upsertMany(state, loadedRepos)
        state.currentPage = action.payload.page
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log(action.error)
      })
      .addCase(fetchRepository.fulfilled, repositoriesAdapter.setOne)
      .addCase(fetchRepository.rejected, (state, action) => {
        const id = action.meta.arg
        state.entities[id].subscribers_status = 'failed'
        console.log(action.error.message)
      })
  }
})

export default repositoriesSlice.reducer

export const {
  selectAll: selectAllRepositories,
  selectIds: selectRepositoryIds,
  selectById: selectRepositoryById,
} = repositoriesAdapter.getSelectors(state => state.repositories)

export const fetchRepositories = createAsyncThunk('repositories/fetchRepositories', async (dispatch, { getState }) => {
  const status = getState().repositories.status
  if(status === 'fully_loaded'){
    return
  }
  const page = getState().repositories.currentPage + 1
  console.log('fetching repos, page: ' + page)
  const response = await fetchInitialRepos(page)

  return { data: formatManyRepositories(response.data), page, pageLinks: response.headers.link }
})

function formatManyRepositories(repositoriesArray){
  return repositoriesArray.map(repo => repositorySerializer(repo))
}

export const fetchRepository = createAsyncThunk('repositories/fetchRepository', async (id, { getState }) => {
  const repo = getState().repositories.entities[id]

  if(repo.subscribers_status === 'loaded'){
    return repo
  } 
  const response = await fetchOneRepo(repo.fullName)
  return repositorySerializer(response.data)
})