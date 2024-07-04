import { put, takeEvery, all } from 'redux-saga/effects'

// import saga from repository

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the saga
// single entry point to start all Sagas at once
export default function* saga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}