import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fecthOrganizations,
  fecthRegions,
  fetchCategories,
  fetchRoadMap,
} from '../features/roadmap/roadmapSlice'

import { CustomTabs as Tabs } from '../common'

import { WorkList } from './WorkList'
import { CrossList } from './CrossList'

export const RoadMap = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.roadmap)

  useEffect(() => {
    dispatch(fecthOrganizations())
    dispatch(fecthRegions())
    dispatch(fetchCategories())
    dispatch(fetchRoadMap())
  }, [])

  return <Tabs tabs={tabs} />
}

const tabs = [
  {
    title: 'Список работ',
    child: <WorkList />,
  },
  {
    title: 'Список пересечений',
    child: <CrossList />,
  },
]
