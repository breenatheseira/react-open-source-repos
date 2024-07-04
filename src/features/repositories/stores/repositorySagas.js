import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { call, put, fork, select, take, cancel } from 'redux-saga/effects'

import githubApi from '../../../utils/githubApi';
import { fetchRepos } from './repositoryActions'

import { 
  selectRepositoriesStatus,
  selectRepositoriesPage,
 } from './repositoriesSlice'

import { formatManyRepositories, formatRepository } from './repositorySerializer'

// export const delay = (ms) => new Promise(res => setTimeout(res, ms))
// yield delay(1000)

function isLastPage(response){
  const linkString = response.headers.link
  return !(linkString && linkString.includes('last'))
}

export function* loadRepositoryList(){
  while(true){
    try {
      yield take(fetchRepos.start)
      let page = yield select(selectRepositoriesPage)
      page = page + 1

      const response = yield call(githubApi.fetchRepos, page)
      
      const data = formatManyRepositories(response.data)
      const allDataServed = yield call(isLastPage, response)
      const payload = { data, page }
      if(allDataServed){
        yield put(fetchRepos.completed(payload))
      } else {
        yield put(fetchRepos.fulfilled(payload))
      }
      // load the first repo
    } catch (error) {
      console.log(error)
      yield put(fetchRepos.rejected(error))
    }
  }
}

export default function* repositorySagas(){
  console.log('repositorySagas')
  const loadList = yield fork(loadRepositoryList)

  yield take(fetchRepos.completed)
  yield cancel(loadList)
}
