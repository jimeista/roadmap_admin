import React from 'react'

import { Input, Form } from 'antd'

const { TextArea } = Input

export const WorkInitiator = ({ form }) => {
  return (
    <Form form={form}>
      <Form.Item name='initiator-name' rules={[{ required: true }]}>
        <Input placeholder='Наименование проекта (№ лота)' />
      </Form.Item>
      <Form.Item name='initiator-company-name' rules={[{ required: true }]}>
        <Input placeholder='Наименование компании' />
      </Form.Item>
      <Form.Item name='initiator-fio' rules={[{ required: true }]}>
        <Input placeholder='ФИО руководителя' />
      </Form.Item>
      <Form.Item name='initiator-phone-number' rules={[{ required: true }]}>
        <Input placeholder='№ телефона' />
      </Form.Item>
      <Form.Item name='initiator-guarantee-date' rules={[{ required: true }]}>
        <Input placeholder='Гарантийный период' />
      </Form.Item>
      <Form.Item name='initiator-comment-textarea' rules={[{ required: true }]}>
        <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      </Form.Item>
    </Form>
  )
}
