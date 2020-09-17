import React, { useState } from 'react'

import {
  CustomModal as Modal,
  CustomTable as Table,
  CustomSteps as Steps,
} from '../common'
import { WorkDescription, WorkContractor, WorkStatus } from './steps'

export const WorkList = () => {
  const [data, setData] = useState([])

  const steps = [
    {
      title: 'Описание работ',
      content: <WorkDescription />,
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
    title: 'Улица',
    dataIndex: 'Улица',
    key: 'Улица',
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
    title: 'Отв орган',
    dataIndex: 'Отв орган',
    key: 'Отв орган',
  },
  {
    title: 'Дата начала',
    dataIndex: 'Дата начала',
    key: 'Дата начала',
  },
  {
    title: 'Дата начала',
    dataIndex: 'Дата начала',
    key: 'Дата начала',
  },
  {
    title: 'Статус (%)',
    dataIndex: 'Статус',
    key: 'Статус',
  },
]
