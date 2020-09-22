import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { formValidate, setCurrent } from '../features/roadmap/roadmapSlice'

import {
  CustomModal as Modal,
  CustomSteps as Steps,
  CustomTable as Table,
} from '../common'
import { WorkDescription, WorkContractor, WorkStatus } from './steps'

export const WorkList = () => {
  const dispatch = useDispatch()
  const {
    organisations,
    regions,
    categories,
    status,
    data,
    formData,
    current,
  } = useSelector((state) => state.roadmap)

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

  const columns = [
    {
      title: '№',
      dataIndex: '№',
      key: '№',
      width: '2%',
    },
    {
      title: 'Улица',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    },
    {
      title: 'Участок',
      dataIndex: 'area',
      key: 'area',
      editable: true,
    },
    {
      title: 'Категория работ',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      type: 'select',
      rule: true,
      placeholder: 'Категоря работ',
      data:
        categories.status === 'success'
          ? categories.data.map((r) => r.name)
          : [],
    },
    {
      title: 'Отв орган',
      dataIndex: 'organisation',
      key: 'organisation',
      editable: true,
      type: 'select',
      rule: true,
      placeholder: 'Ответсвенный орган',
      data:
        organisations.status === 'success'
          ? organisations.data.map((o) => o.name)
          : [],
    },
    {
      title: 'Дата начала',
      dataIndex: 'start-date',
      key: 'start-date',
      editable: true,
      rule: true,
      width: '10%',
      type: 'picker',
    },
    {
      title: 'Дата окончания',
      dataIndex: 'end-date',
      key: 'end-date',
      rule: true,
      editable: true,
      type: 'picker',
      width: '10%',
    },
    {
      title: 'Статус (%)',
      dataIndex: 'status-percentage',
      key: 'status-percentage',
      editable: true,
      width: '5%',
      rule: true,
      type: 'number',
    },
  ]

  return (
    <>
      <Modal
        btntext='Добавить'
        title='Форма ввода данных по ремонтным работам'
        formData={formData}
        current={current}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Steps
            steps={steps}
            setCurrent={setCurrent}
            formValidate={formValidate}
            dispatch={dispatch}
          />
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
