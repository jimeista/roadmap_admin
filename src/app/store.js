import { configureStore } from '@reduxjs/toolkit'
import roadmapReducer from '../features/roadmap/roadmapSlice'

export default configureStore({
  reducer: {
    roadmap: roadmapReducer,
  },
})
