import React from 'react'

import { Form } from 'antd'

export const WorkConfirm = ({ formData }) => {
  let arr = []
  Object.keys(formData).map((key) => {
    if (typeof formData[key] !== 'undefined') {
      arr.push({ name: key, value: formData[key] })
    }
  })

  const renderForm = arr.map((i) => (
    <Form.Item
      key={i.name}
      label={<span style={{ color: '#92B4A7' }}>{nameHelper(i.name)}</span>}
    >
      {i.value}
    </Form.Item>
  ))
  return <>{renderForm}</>
}

const nameHelper = (name) => {
  switch (name) {
    case 'area':
      return 'Участок'
    case 'address':
      return 'Адрес/улица'
    case 'contractor':
      return 'Подрядчик'
    case 'category':
      return 'Категоря работ'
    case 'end-date':
      return 'Дата окончания'
    case 'start-date':
      return 'Дата начала'
    case 'closure-descr':
      return 'Описание перекрытия'
    case 'organisation':
      return 'Ответсвенный орган'
    case 'file-paths':
      return 'Файл'
    case 'lot-name':
      return 'Лот'
    case 'status-percentage':
      return 'Статус исполнения (%)'
    case 'region':
      return 'Район'
    case 'supervisor-name':
    case 'contacts':
      return 'Контакты'
    case 'warranty-period':
      return 'Гарантийный период'
    case 'canvas-descr':
      return 'Описание вскрытия'
    default:
      return name
  }
}
