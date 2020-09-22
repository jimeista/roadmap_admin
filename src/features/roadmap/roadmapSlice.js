import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_ORGANIZATIONS_URL = 'sc-roadworks/api/organisations'
const BASE_REGIONS_URL = 'sc-roadworks/api/regions'
const BASE_CATEGORIES_URL = 'sc-roadworks/api/categories'
const BASE_ROADMAP_URL = 'sc-roadworks/api/roadworks'

export const fecthOrganizations = createAsyncThunk(
  'roadmap/fetchOrganizations',
  async () => {
    const res = await axios.get(BASE_ORGANIZATIONS_URL)
    return res.data
  }
)

export const fecthRegions = createAsyncThunk(
  'roadmap/fetchRegions',
  async () => {
    const res = await axios.get(BASE_REGIONS_URL)
    return res.data
  }
)

export const fetchCategories = createAsyncThunk(
  'roadmap/fetchCategories',
  async () => {
    const res = await axios.get(BASE_CATEGORIES_URL)
    return res.data
  }
)

export const fetchRoadMap = createAsyncThunk(
  'roadmap/fetchRoadMap',
  async () => {
    const res = await axios.get(BASE_ROADMAP_URL)
    return res.data
  }
)

export const postRoadMap = createAsyncThunk(
  'roadmap/post',
  async (initialPost) => {
    const res = await axios.post(BASE_ROADMAP_URL, initialPost)
    return res.post
  }
)

export const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState: {
    organisations: {
      status: 'idle',
      data: [],
      error: null,
    },
    regions: {
      status: 'idle',
      data: [],
      error: null,
    },
    categories: {
      status: 'idle',
      data: [],
      error: null,
    },
    data: [],
    status: 'idle',
    error: null,
    formData: {},
    current: 0,
  },
  reducers: {
    formValidate: (state, action) => {
      // console.log(action.payload)
      state.formData = { ...state.formData, ...action.payload }
    },
    setCurrent: (state, action) => {
      state.current = action.payload
    },
  },
  extraReducers: {
    [fecthOrganizations.fulfilled]: (state, action) => {
      state.organisations.status = 'success'
      state.organisations.data = action.payload
    },
    [fecthOrganizations.pending]: (state, action) => {
      state.organisations.status = 'loading'
    },
    [fecthOrganizations.rejected]: (state, action) => {
      state.organisations.status = 'failed'
      state.organisations.error = action.payload
    },
    [fecthRegions.fulfilled]: (state, action) => {
      state.regions.status = 'success'
      state.regions.data = action.payload
    },
    [fecthRegions.pending]: (state, action) => {
      state.regions.status = 'loading'
    },
    [fecthRegions.rejected]: (state, action) => {
      state.regions.status = 'failed'
      state.regions.error = action.payload
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories.status = 'success'
      state.categories.data = action.payload
    },
    [fetchCategories.pending]: (state, action) => {
      state.categories.status = 'loading'
    },
    [fetchCategories.rejected]: (state, action) => {
      state.categories.status = 'failed'
      state.categories.error = action.payload
    },
    [fetchRoadMap.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [fetchRoadMap.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchRoadMap.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [postRoadMap.success]: (state, action) => {
      state.data.push(action.payload)
    },
  },
})

export const { formValidate, setCurrent } = roadmapSlice.actions

export const selectRoadMap = (state) => state.roadmap

export default roadmapSlice.reducer
