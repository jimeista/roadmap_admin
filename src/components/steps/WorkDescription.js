import React, { useState } from 'react'

import moment from 'moment'
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
      <Form.Item name='input-address' rules={[{ required: true }]}>
        <Input placeholder='Адрес/Улица' />
      </Form.Item>
      {renderTextArea(form, 'textarea-area', 'Описание участка')}
      <Form.Item name={'on-close-check'} valuePropName='checked' noStyle>
        <Checkbox onChange={hanldeChangeOnOpen}>Перекрытие улиц </Checkbox>
      </Form.Item>
      {renderTextArea(
        form,
        'textarea-check-on-close',
        'Описание перекрытия',
        onOpen
      )}
      <Form.Item name={'on-open-check'} valuePropName='checked' noStyle>
        <Checkbox onChange={hanldeChangeOnClose}>
          Вскрытие дорожного полотна{' '}
        </Checkbox>
      </Form.Item>
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
          hasFeedback
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
    <Form.Item
      name={name}
      rules={[{ required: typeof disabled === 'undefined' && true }]}
    >
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
    <Form.Item label={text}>
      <Input.Group compact>
        <Form.Item
          name={name}
          rules={[{ required: true }]}
          getValueFromEvent={(e, string) => moment(string, 'YYYY-MM-DD')}
        >
          <DatePicker
            placeholder='Выбрать дату'
            format={picker ? 'YYYY' : 'DD-MM-YYYY'}
            picker={picker}
          />
        </Form.Item>
        <Form.Item style={{ marginLeft: 10 }}>
          <Checkbox onChange={handleChange}>Год</Checkbox>
        </Form.Item>
      </Input.Group>
    </Form.Item>
  )
}

const renderUpload = () => (
  <Form.Item
    name='upload'
    valuePropName='fileList'
    getValueFromEvent={normFile}
  >
    <Upload {...upload_props}>
      <Button icon={<UploadOutlined />}>Добавить рисунок / презентацию</Button>
    </Upload>
  </Form.Item>
)

const upload_props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
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

const normFile = (e) => {
  console.log('Upload event:', e)

  if (Array.isArray(e)) {
    return e
  }

  return e && e.fileList
}
