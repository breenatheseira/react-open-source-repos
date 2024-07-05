import { fork } from 'redux-saga/effects'

// import saga from repository
import repositorySagas from '../features/repositories/stores/repositorySagas'

// notice how we now only export the saga
// single entry point to start all Sagas at once
export default function* saga() {
  yield fork(repositorySagas)
}