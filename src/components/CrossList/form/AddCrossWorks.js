import React, { useState } from 'react'
import { Select, Form, Button, Input } from 'antd'
import { useSelector } from 'react-redux'

const { Option } = Select

export const AddCrossWorks = () => {
  const { categories, data } = useSelector((state) => state.roadmap)
  const [count, setCount] = useState([1, 2])
  const [options, setOptions] = useState()

  const renderSelectsGroup = (key) => {
    let arr =
      categories.status === 'success' ? categories.data.map((r) => r.name) : []

    return (
      <Form.Item style={{ marginRight: 20 }}>
        <Form.Item
          rules={[{ required: true, message: 'Необходимо заполнить поле!' }]}
        >
          <Select
            placeholder={'Категория работ'}
            style={{ width: 240 }}
            allowClear
            onChange={(value) =>
              setOptions((state) => ({
                ...state,
                [key]: data
                  .filter((i) => i.category === value)
                  .map((i) => i.id),
              }))
            }
          >
            {arr.map((i, index) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={`roadwork-${key}`}
          rules={[{ required: true, message: 'Необходимо заполнить поле!' }]}
          key={`roadwork-${key}`}
        >
          <Select
            placeholder={`Работа ${key}`}
            style={{ width: 240 }}
            allowClear
          >
            {options && options[key]
              ? options[key].map((i, index) => (
                  <Option value={i} key={i}>
                    {i}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
      </Form.Item>
    )
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {count.map((i) => renderSelectsGroup(i))}
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
      <Form.Item name='area'>
        <Input
          placeholder={'Участок пересечения'}
          style={{ width: '30%', marginTop: 15 }}
        />
      </Form.Item>
    </div>
  )
}
