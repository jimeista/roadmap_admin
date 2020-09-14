import React from 'react'

import { CustomTabs as Tabs } from '../common'

import { WorkList } from './WorkList'
import { CrossList } from './CrossList'

export const RoadMap = () => {
  return (
    <>
      <Tabs tabs={tabs} />
    </>
  )
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
