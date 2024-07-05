import { call, put, fork, select, take, cancel, cancelled } from 'redux-saga/effects'

import githubApi from '../../../utils/githubApi';
import { fetchOneRepo, fetchRepos, searchRepos } from './repositoryActions'

import { 
  selectRepositoriesLoadCompleted,
  selectRepositoriesPage,
  selectRepositoryById,
 } from './repositoriesSlice'

import { formatRepositories, formatRepository } from './repositorySerializer'

export function* loadOneRepository(){
  while(true){
    try{
      const { type, payload } = yield take(fetchOneRepo.start)
      const repository = yield select(selectRepositoryById, payload)

      if(repository.subscribersStatus === 'loaded'){
        yield put(searchRepos.fulfilled([]))
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

export function* searchRepositoryList(){
  while(true){
    try {
      const { type, payload } = yield take(searchRepos.start)

      const fullyLoaded = yield select(selectRepositoriesLoadCompleted)
      if(fullyLoaded){
        continue
      }

      let page = 1
      let repositories = []
      let totalCount = 0
      let response

      do {
        response = yield call (githubApi.searchForRepos, payload.trim(), page)
        repositories = repositories.concat(response.data.items)
        totalCount = response.data.total_count
        page = page + 1
      } while(totalCount > repositories.length)
        
      yield put(searchRepos.fulfilled(formatRepositories(repositories)))

    } catch (error) {
      console.log(error)
      yield put(searchRepos.rejected(error))
    } finally {
      if (yield cancelled()){
        yield put(searchRepos.fulfilled([]))
      }
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

      const fullyLoaded = yield select(selectRepositoriesLoadCompleted)
      if(fullyLoaded){
        continue
      }
      yield put(fetchRepos.loading())
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
    } catch (error) {
      console.log(error)
      yield put(fetchRepos.rejected(error))
    }
  }
}

export default function* repositorySagas(){
  const loadOne = yield fork(loadOneRepository)
  
  const loadList = yield fork(loadRepositoryList)
  const searchList = yield fork(searchRepositoryList)

  yield take(fetchRepos.completed)
  yield cancel(loadList)
  yield cancel(searchList)
}
