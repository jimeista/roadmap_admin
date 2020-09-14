import React from 'react'

import { Input, Checkbox, Space } from 'antd'

const { TextArea } = Input

export const WorkStatus = () => {
  const hanldeChange = (e) => console.log(e.target.checked)

  return (
    <Space direction='vertical' style={{ width: '100%', margin: 'auto' }}>
      <Input placeholder='Статус исполнения (%)' />
      <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      <div>
        <Checkbox onChange={hanldeChange} /> <span>Скрыть работу с карты</span>
      </div>
      <div>
        <>
          <Checkbox onChange={hanldeChange} />{' '}
          <span>Закуп пабот отменен / приостановлен </span>
        </>
        <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      </div>
    </Space>
  )
}
