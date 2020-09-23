import React, { useState } from 'react'

import { CustomTable as Table } from '../common'

export const CrossList = () => {
  const [data, setData] = useState([])

  return (
    <>
      <Table columns={columns} data={data} setData={setData} />
    </>
  )
}

const columns = [
  {
    title: '№',
    dataIndex: '№',
    key: '№',
  },
  {
    title: 'Участок',
    dataIndex: 'Участок',
    key: 'Участок',
  },
  {
    title: 'Категория работ',
    dataIndex: 'Категория работ',
    key: 'Категория работ',
  },
  {
    title: 'Работа 1',
    dataIndex: 'Работа 1',
    key: 'Работа 1',
  },
  {
    title: 'Работа 2',
    dataIndex: 'Работа 2',
    key: 'Работа 2',
  },
]
