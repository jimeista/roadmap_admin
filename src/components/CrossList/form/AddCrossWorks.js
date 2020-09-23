import React, { useState } from 'react'
import { Select, Form, Button } from 'antd'
import { useSelector } from 'react-redux'

const { Option } = Select

export const AddCrossWorks = () => {
  const { categories } = useSelector((state) => state.roadmap)
  const [count, setCount] = useState([1, 2])

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {count.map((i) => renderSelectsGroup(categories, [], i))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
        <div style={{ marginRight: 25 }}>
          <Button
            size='small'
            type='primary'
            shape='circle'
            onClick={() => setCount([...count, count.length + 1])}
          >
            +
          </Button>{' '}
          <span>Добавить еще одну</span>
        </div>
        <>
          <Button
            disabled={count.length === 2}
            size='small'
            type='primary'
            shape='circle'
            onClick={() => {
              setCount([...count.filter((i) => i !== count.length)])
            }}
          >
            -
          </Button>{' '}
          <span style={{ marginLeft: 5 }}>Убрать одну</span>
        </>
      </div>
    </div>
  )
}

const renderSelectsGroup = (categories, roadworks = [], count) => {
  const arr =
    categories.status === 'success' ? categories.data.map((r) => r.name) : []

  return (
    <div style={{ marginRight: 20 }}>
      <Form.Item
        name={'category'}
        rules={[{ required: true, message: 'Необходимо заполнить поле!' }]}
        key={`category}`}
        hasFeedback
      >
        <Select
          placeholder={'Категория работ'}
          style={{ width: 240 }}
          allowClear
        >
          {arr.map((i, index) => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={'roadwork'}
        rules={[{ required: true, message: 'Необходимо заполнить поле!' }]}
        key={`roadwork}`}
        hasFeedback
      >
        <Select
          placeholder={`Работа ${count}`}
          style={{ width: 240 }}
          allowClear
        >
          {roadworks.map((i, index) => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  )
}
