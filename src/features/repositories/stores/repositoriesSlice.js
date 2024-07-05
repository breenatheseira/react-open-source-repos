import { 
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import githubApi from '../../../utils/githubApi';
import { fetchRepos, fetchOneRepo, searchRepos } from './repositoryActions'

import { formatRepositories, formatRepository } from './repositorySerializer'

const repositoriesAdapter = createEntityAdapter({
  sortComparer: (a,b) => a.name.localeCompare(b.name)
})

const initialState = repositoriesAdapter.getInitialState({
  currentPage: 0,
  status: 'idle',
  searchStatus: 'idle',
  loadCompleted: false,
  error: null,
})

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    clearError(state, action){
      state.error = null
    }
  },
  extraReducers(builder){
    builder
      .addCase(fetchRepos.loading, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentPage = action.payload.page
        repositoriesAdapter.upsertMany(state, action.payload.data)
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log(action)
      })
      .addCase(fetchRepos.completed, (state, action) => {
        state.status = 'suceeded'
        state.loadCompleted = true
        state.currentPage = action.payload.page
        repositoriesAdapter.upsertMany(state, action.payload.data)
      })
      .addCase(fetchOneRepo.fulfilled, repositoriesAdapter.setOne)
      .addCase(fetchOneRepo.rejected, (state, action) => {
        state.error = action.payload.message
      })
      .addCase(searchRepos.start, (state, action) => {
        state.status = 'loading'
      })
      .addCase(searchRepos.fulfilled, (state, action) => {
        const results = action.payload
        repositoriesAdapter.addMany(state, results)
        state.status = 'succeeded'
      })
      .addCase(searchRepos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log(action.error)
      })
  }
})

export default repositoriesSlice.reducer

export const {
  selectAll: selectAllRepositories,
  selectIds: selectRepositoryIds,
  selectById: selectRepositoryById,
} = repositoriesAdapter.getSelectors(state => state.repositories)

export const selectRepositoriesPage = (state) => state.repositories.currentPage
export const selectRepositoriesLoadCompleted = (state) => state.repositories.loadCompleted

export const searchRepositories = createAsyncThunk('repositories/searchRepositories', async (query, { getState }) => {
  const status = getState().repositories.status
  if(status === 'fully_loaded'){
    return []
  }
  
  let page = 1
  let repositories = []

  let response = await githubApi.searchForRepos(query, page)
  repositories = repositories.concat(response.data.items)
  const totalCount = response.data.total_count
  let continueCalling = totalCount > repositories.length

  while(continueCalling){
    page = page + 1
    response = await githubApi.searchForRepos(query, page)
    repositories = repositories.concat(response.data.items)
    continueCalling = totalCount > repositories.length
  }

  return formatRepositories(repositories)
})