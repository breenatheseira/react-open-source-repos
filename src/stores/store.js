import { configureStore } from '@reduxjs/toolkit'

import repositoriesReducer from '../features/repositories/repositoriesSlice'

const store = configureStore({
  reducer: {
    repositories: repositoriesReducer
  }
})

export default store