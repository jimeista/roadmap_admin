import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'antd'

import { CustomModal as Modal, CustomSteps as Steps } from '../common'
import { WorkDescription, WorkContractor, WorkStatus } from './steps'

export const WorkList = () => {
  const { organisations, regions, categories, status, data } = useSelector(
    (state) => state.roadmap
  )

  const steps = [
    {
      title: 'Описание работ',
      content: (
        <WorkDescription
          organisations={organisations}
          regions={regions}
          categories={categories}
        />
      ),
    },
    {
      title: 'Данные подрядчика',
      content: <WorkContractor />,
    },
    {
      title: 'Статус работ',
      content: <WorkStatus />,
    },
    {
      title: 'Отправка данных',
      content: 'Last-content',
    },
  ]

  return (
    <>
      <Modal btntext='Добавить' title='Форма ввода данных по ремонтным работам'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Steps steps={steps} />
          <div style={{ width: '100%' }} />
        </div>
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSourceHelper(data)}
        loading={status === 'loading' ? true : false}
      />
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
    title: 'Улица',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Участок',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'Категория работ',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Отв орган',
    dataIndex: 'organisation',
    key: 'organisation',
  },
  {
    title: 'Дата начала',
    dataIndex: 'start-date',
    key: 'start-date',
  },
  {
    title: 'Дата окончания',
    dataIndex: 'end-date',
    key: 'end-date',
  },
  {
    title: 'Статус (%)',
    dataIndex: 'status-percentage',
    key: 'status-percentage',
  },
]

const dataSourceHelper = (arr) => {
  const dataSource = arr.map((i, index) => {
    let keys = { '№': index + 1, key: index + 1 }
    Object.keys(i).map((key) => {
      keys = { ...keys, [key]: i[key] }
    })
    return keys
  })

  return dataSource
}
