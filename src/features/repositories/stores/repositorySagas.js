import { call, put, fork, select, take, takeEvery, cancel } from 'redux-saga/effects'

import githubApi from '../../../utils/githubApi';
import { fetchOneRepo, fetchRepos, searchRepos } from './repositoryActions'

import { 
  selectRepositoriesStatus,
  selectRepositoriesPage,
  selectRepositoryById,
 } from './repositoriesSlice'

import { formatRepositories, formatRepository } from './repositorySerializer'

// export const delay = (ms) => new Promise(res => setTimeout(res, ms))
// yield delay(1000)

export function* loadOneRepository(){
  while(true){
    try{
      const { type, payload } = yield take(fetchOneRepo.start)
      const repository = yield select(selectRepositoryById, payload)

      if(repository.subscribersStatus === 'loaded'){
        continue
      }

      const response = yield call(githubApi.fetchOneRepo, repository.fullName)

      yield put(fetchOneRepo.fulfilled(formatRepository(response.data)))

    } catch (error) {
      console.log(error)
      yield put(fetchOneRepo.rejected(error))
    }
  }
}

function isLastPage(linkString){
  return !(linkString && linkString.includes('last'))
}

function* getNextPage(selector){
  const page = yield select(selector)
  return page + 1
}

export function* loadRepositoryList(){
  while(true){
    try {
      yield take(fetchRepos.start)
      let page = yield call (getNextPage, selectRepositoriesPage)

      const response = yield call(githubApi.fetchRepos, page)

      const data = formatRepositories(response.data)
      const allDataServed = yield call(isLastPage, response.headers.link)
      const payload = { data, page }

      if(allDataServed){
        yield put(fetchRepos.completed(payload))
      } else {
        yield put(fetchRepos.fulfilled(payload))
      }

      if(page === 1){
        yield put(fetchOneRepo.start(data[0].id))
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
  const loadOne = yield fork(loadOneRepository)

  yield take(fetchRepos.completed)
  yield cancel(loadList)
}
