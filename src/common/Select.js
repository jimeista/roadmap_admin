import React from 'react'
import { Select } from 'antd'

const { Option } = Select

function handleChange(value) {
  console.log(`selected ${value}`)
}

export const CustomSelect = ({
  options = ['option 1', 'option 2'],
  style = { width: 240 },
  placeholder = '',
}) => {
  const renderSelect = () => (
    <Select placeholder={placeholder} onChange={handleChange} style={style}>
      {options.map((op) => (
        <Option value={op} key={op}>
          {op}
        </Option>
      ))}
    </Select>
  )

  return renderSelect()
}
