import React, { useState } from 'react'

import {
  Upload,
  message,
  Button,
  Input,
  Checkbox,
  DatePicker,
  Form,
  Select,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Option } = Select

export const WorkDescription = ({ form }) => {
  //disabling textareas
  const [onOpen, setOnOpen] = useState(true)
  const [onClose, setOnClose] = useState(true)

  //checkbox on datepicker
  const [pickerStart, setPickerStart] = useState()
  const [pickerEnd, setPickerEnd] = useState()

  //disabling textareas
  const hanldeChangeOnOpen = (e) =>
    e.target.checked ? setOnOpen(false) : setOnOpen(true)
  const hanldeChangeOnClose = (e) =>
    e.target.checked ? setOnClose(false) : setOnClose(true)

  //checkbox on datepicker
  const handleChangeYearStart = (e) =>
    e.target.checked ? setPickerStart('year') : setPickerStart()

  const handleChangeYearEnd = (e) =>
    e.target.checked ? setPickerEnd('year') : setPickerEnd()

  return (
    <Form name='work_description' form={form}>
      {renderSelects()}
      <Form.Item name='input-address'>
        <Input placeholder='Адрес/Улица' />
      </Form.Item>
      {renderTextArea(form, 'textarea-area', 'Описание участка')}
      <>
        <Checkbox onChange={hanldeChangeOnOpen} /> <span>Перекрытие улиц</span>{' '}
      </>
      {renderTextArea(
        form,
        'textarea-check-on-close',
        'Описание перекрытия',
        onOpen
      )}
      <>
        <Checkbox onChange={hanldeChangeOnClose} />{' '}
        <span>Вскрытие дорожного полотна</span>
      </>
      {renderTextArea(
        form,
        'textarea-check-on-open',
        'Описание вскрытия',
        onClose
      )}
      {renderDatePicker(
        form,
        pickerStart,
        handleChangeYearStart,
        'picker-start',
        'Дата начала'
      )}
      {renderDatePicker(
        form,
        pickerEnd,
        handleChangeYearEnd,
        'picker-end',
        'Дата окончания'
      )}
      {renderUpload()}
    </Form>
  )
}

const renderSelects = () => {
  const arr = [
    {
      name: 'select-category',
      placeholder: 'Категоря работ',
      options: ['option 1', 'option 2'],
    },
    {
      name: 'select_organization',
      placeholder: 'Ответсвенный орган',
      options: ['option 1', 'option 2', 'option 3'],
    },
    {
      name: 'select_district',
      placeholder: 'Район',
      options: ['option 1', 'option 2'],
    },
  ]

  return (
    <>
      {arr.map((i, index) => (
        <Form.Item
          name={i.name}
          rules={[{ required: true }]}
          key={`${i.name}${index}`}
        >
          <Select placeholder={i.placeholder} style={{ width: 240 }} allowClear>
            {i.options.map((op) => (
              <Option value={op} key={op}>
                {op}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ))}
    </>
  )
}

const renderTextArea = (form, name, placeholder, disabled) => {
  return (
    <Form.Item name={name}>
      <TextArea
        style={{ height: 90 }}
        placeholder={placeholder}
        allowClear
        disabled={disabled}
        onChange={(e) => form.setFieldsValue({ [name]: e.target.value })}
      />
    </Form.Item>
  )
}

const renderDatePicker = (form, picker, handleChange, name, text) => {
  return (
    <Form.Item name={name}>
      <span>{text}</span>{' '}
      <DatePicker
        placeholder='Выбрать дату'
        format={picker ? 'YYYY' : 'DD-MM-YYYY'}
        picker={picker}
        onChange={(moment, string) => form.setFieldsValue({ [name]: string })}
      />{' '}
      <Checkbox onChange={handleChange} /> <span>Год</span>
    </Form.Item>
  )
}

const renderUpload = () => (
  <Form.Item name='upload'>
    <Upload {...upload_props}>
      <Button icon={<UploadOutlined />}>Добавить рисунок / презентацию</Button>
    </Upload>
  </Form.Item>
)

const upload_props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} успешно загружен`)
    } else if (info.file.status === 'error') {
      message.error(`Ошибка загрузки файла ${info.file.name}`)
    }
  },
}
