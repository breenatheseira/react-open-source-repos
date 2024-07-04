import { createAction } from "@reduxjs/toolkit";

// by default createAction accept a single argument, which becomes action.payload
export const fetchRepos = {
  start: createAction('repositories/fetch_pending'),
  fulfilled: createAction('repositories/fetch_fulfilled'),
  rejected: createAction('repositories/fetch_rejected'),
  completed: createAction('repositories/fetch_completed'),
}

// // To get subscribers count
// export const REPOSITORY_FETCH_STARTED = createAction('REPOSITORY_FETCH_STARTED')
// export const REPOSITORY_FETCH_SUCCEEDED = createAction('REPOSITORY_FETCH_SUCCEEDED')
// export const REPOSITORY_FETCH_FAILED = createAction('REPOSITORY_FETCH_FAILED')

// export const REPOSITORIES_SEARCH_STARTED = createAction('REPOSITORIES_SEARCH_STARTED')
// export const REPOSITORIES_SEARCH_SUCCEEDED = createAction('REPOSITORIES_SEARCH_SUCCEEDED')
// export const REPOSITORIES_SEARCH_FAILED = createAction('REPOSITORIES_SEARCH_FAILED')
// export const REPOSITORIES_SEARCH_RESULT_LOADED = createAction('REPOSITORIES_SEARCH_RESULT_LOADED')