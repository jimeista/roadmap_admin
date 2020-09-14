import React from 'react'

import { Input, Space } from 'antd'

const { TextArea } = Input

export const WorkInitiator = () => {
  return (
    <Space direction='vertical' style={{ width: '100%', margin: 'auto' }}>
      <Input placeholder='Наименование проекта (№ лота)' />
      <Input placeholder='Наименование компании' />
      <Input placeholder='ФИО руководителя' />
      <Input placeholder='№ телефона' />
      <Input placeholder='Гарантийный период' />
      <TextArea style={{ height: 90 }} placeholder='Комментарий' />
    </Space>
  )
}
