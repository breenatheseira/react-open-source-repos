import { createAction } from "@reduxjs/toolkit";

// by default createAction accept a single argument, which becomes action.payload
export const fetchRepos = {
  start: createAction('repositories/fetch_started'),
  loading: createAction('repositories/fetch_loading'),
  fulfilled: createAction('repositories/fetch_fulfilled'),
  rejected: createAction('repositories/fetch_rejected'),
  completed: createAction('repositories/fetch_completed'),
}

export const fetchOneRepo = {
  start: createAction('repositories/fetch_one_started'),
  fulfilled: createAction('repositories/fetch_one_fulfilled'),
  rejected: createAction('repositories/fetch_one_rejected'),
}

export const searchRepos = {
  start: createAction('repositories/search_started'),
  fulfilled: createAction('repositories/search_fulfilled'),
  rejected: createAction('repositories/search_rejected'),
}