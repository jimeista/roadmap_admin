import React, { useState } from 'react'

import { Input, Checkbox, Form, InputNumber } from 'antd'

const { TextArea } = Input

export const WorkStatus = () => {
  const [disabled, setDisabled] = useState(true)
  const hanldeChange = (e) =>
    e.target.checked ? setDisabled(false) : setDisabled(true)

  return (
    <>
      <Form.Item
        name='percentage'
        rules={[{ required: true, message: 'Необходимо заполнить поле!' }]}
        label={'Статус исполнения (%)'}
      >
        <InputNumber
          style={{ width: '120px' }}
          min={1}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
        />
      </Form.Item>
      <Form.Item name='commentary'>
        <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      </Form.Item>
      <Form.Item name='is-hidden' valuePropName='checked'>
        <Checkbox> Скрыть работу с карты</Checkbox>
      </Form.Item>
      <Form.Item name='is-canceled' valuePropName='checked' noStyle>
        <Checkbox onChange={hanldeChange}>
          Закуп работ отменен / приостановлен
        </Checkbox>
      </Form.Item>
      <Form.Item name='canceled-comment'>
        <TextArea
          style={{ height: 90 }}
          placeholder='Комментарий'
          disabled={disabled}
        />
      </Form.Item>
    </>
  )
}
