import React, { useState, useEffect } from 'react'

import {
  CustomModal as Modal,
  CustomTable as Table,
  CustomSteps as Steps,
} from '../common'
import { WorkDescription } from './steps/WorkDescription'

export const WorkList = () => {
  const [data, setData] = useState([])

  return (
    <>
      <Modal btntext='Добавить' title='Форма ввода данных по ремонтным работам'>
        <Steps steps={steps} />
      </Modal>
      <Table columns={columns} data={data} setData={setData} />
    </>
  )
}

const steps = [
  {
    title: 'Описание работ',
    content: <WorkDescription />,
  },
  {
    title: 'Данные подрядчика',
    content: 'Second-content',
  },
  {
    title: 'Статус работ',
    content: 'Third-content',
  },
  {
    title: 'Отправка данных',
    content: 'Last-content',
  },
]

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
