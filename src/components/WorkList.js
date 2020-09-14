import React, { useState, useEffect } from 'react'
import { Form } from 'antd'

import {
  CustomModal as Modal,
  CustomTable as Table,
  CustomSteps as Steps,
} from '../common'
import { WorkDescription, WorkInitiator, WorkStatus } from './steps'

export const WorkList = () => {
  const [data, setData] = useState([])
  const [form1] = Form.useForm()

  const steps = [
    {
      title: 'Описание работ',
      content: <WorkDescription form={form1} />,
      form: form1,
    },
    {
      title: 'Данные подрядчика',
      content: <WorkInitiator />,
      form: form1,
    },
    {
      title: 'Статус работ',
      content: <WorkStatus />,
      form: form1,
    },
    {
      title: 'Отправка данных',
      content: 'Last-content',
      form: form1,
    },
  ]

  return (
    <>
      <Modal btntext='Добавить' title='Форма ввода данных по ремонтным работам'>
        <Steps steps={steps} />
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
