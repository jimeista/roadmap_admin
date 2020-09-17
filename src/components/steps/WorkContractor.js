import React from 'react'

import { Input, Form } from 'antd'

// const { TextArea } = Input

export const WorkContractor = () => {
  return (
    <>
      <Form.Item name='name' rules={[{ required: true }]}>
        <Input placeholder='Наименование компании' />
      </Form.Item>
      <Form.Item name='supervisor-name' rules={[{ required: true }]}>
        <Input placeholder='ФИО руководителя' />
      </Form.Item>
      <Form.Item name='contacts' rules={[{ required: true }]}>
        <Input placeholder='№ телефона' />
      </Form.Item>
      <Form.Item name='warranty-period' rules={[{ required: true }]}>
        <Input placeholder='Гарантийный период' />
      </Form.Item>
      {/* <Form.Item
        name='contractor-comment-textarea'
        rules={[{ required: true }]}
      >
        <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      </Form.Item> */}
    </>
  )
}
