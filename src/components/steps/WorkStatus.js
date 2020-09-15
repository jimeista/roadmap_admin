import React, { useState } from 'react'

import { Input, Checkbox, Form } from 'antd'

const { TextArea } = Input

export const WorkStatus = ({ form }) => {
  const [disabled, setDisabled] = useState(true)
  const hanldeChange = (e) =>
    e.target.checked ? setDisabled(false) : setDisabled(true)

  return (
    <Form form={form}>
      <Form.Item name='input-status' rules={[{ required: true }]}>
        <Input placeholder='Статус исполнения (%)' />
      </Form.Item>
      <Form.Item name='textarea-comment1' rules={[{ required: true }]}>
        <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      </Form.Item>
      <Form.Item name='hide-work-on-map' valuePropName='checked'>
        <Checkbox onChange={hanldeChange}> Скрыть работу с карты</Checkbox>
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
    </Form>
  )
}
