import React, { useState } from 'react'

import { Input, Checkbox, Form, InputNumber } from 'antd'

const { TextArea } = Input

export const WorkStatus = () => {
  const [disabled, setDisabled] = useState(true)
  const hanldeChange = (e) =>
    e.target.checked ? setDisabled(false) : setDisabled(true)

  return (
    <>
      <Form.Item name='status-percentage"' rules={[{ required: true }]}>
        <InputNumber
          placeholder='Статус исполнения (%)'
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
        />
      </Form.Item>
      <Form.Item name='textarea-comment1' rules={[{ required: true }]}>
        <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      </Form.Item>
      <Form.Item name='hide-work-on-map' valuePropName='checked'>
        <Checkbox> Скрыть работу с карты</Checkbox>
      </Form.Item>
      <Form.Item name='denied' valuePropName='checked' noStyle>
        <Checkbox onChange={hanldeChange}>
          Закуп работ отменен / приостановлен
        </Checkbox>
      </Form.Item>
      <Form.Item name='textarea-comment2'>
        <TextArea
          style={{ height: 90 }}
          placeholder='Комментарий'
          disabled={disabled}
        />
      </Form.Item>
    </>
  )
}
