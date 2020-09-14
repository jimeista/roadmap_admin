import React from 'react'

import { CustomSelect as Select } from '../../common'
import { Input, Checkbox, DatePicker, Space } from 'antd'

const { TextArea } = Input

export const WorkDescription = () => {
  const hanldeChange = (e) => console.log(e.target.checked)

  return (
    <Space direction='vertical'>
      <Select placeholder='Категоря работ' />
      <Select placeholder='Ответсвенный орган' />
      <Select placeholder='Район' />
      <Input placeholder='Адрес/Улица' />
      <TextArea style={{ height: 90 }} placeholder='Описание участка' />
      <div>
        <>
          <Checkbox onChange={hanldeChange} /> <span>Перекрытие улиц</span>
        </>
        <TextArea style={{ height: 90 }} placeholder='Описание перекрытия' />
      </div>
      <div>
        <>
          <Checkbox onChange={hanldeChange} />{' '}
          <span>Вскрытие дорожного полотна</span>
        </>
        <TextArea style={{ height: 90 }} placeholder='Описание вскрытия' />
      </div>
      <div>
        <span>Дата начала</span> <DatePicker />{' '}
        <Checkbox onChange={hanldeChange} /> <span>Год</span>
      </div>
      <div>
        <span>Дата окончания</span> <DatePicker />{' '}
        <Checkbox onChange={hanldeChange} /> <span>Год</span>
      </div>
    </Space>
  )
}
