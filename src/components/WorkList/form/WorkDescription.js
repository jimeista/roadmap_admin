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

export const WorkDescription = ({ organisations, regions, categories }) => {
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
    <>
      {renderSelects({ regions, organisations, categories })}
      <Form.Item name='address'>
        <Input placeholder='Адрес/Улица' />
      </Form.Item>
      {renderTextArea('area', 'Описание участка')}
      <Form.Item name={'is-closured'} valuePropName='checked' noStyle>
        <Checkbox onChange={hanldeChangeOnOpen}>Перекрытие улиц </Checkbox>
      </Form.Item>
      {renderTextArea('closure-descr', 'Описание перекрытия', onOpen)}
      <Form.Item name={'is-canvas-opened'} valuePropName='checked' noStyle>
        <Checkbox onChange={hanldeChangeOnClose}>
          Вскрытие дорожного полотна{' '}
        </Checkbox>
      </Form.Item>
      {renderTextArea('canvas-descr', 'Описание вскрытия', onClose)}
      {renderDatePicker(
        pickerStart,
        handleChangeYearStart,
        'start-date',
        'Дата начала'
      )}
      {renderDatePicker(
        pickerEnd,
        handleChangeYearEnd,
        'end-date',
        'Дата окончания'
      )}
      {renderUpload()}
    </>
  )
}

const renderSelects = (prop) => {
  const { regions, organisations, categories } = prop
  const arr = [
    {
      name: 'category',
      placeholder: 'Категоря работ',
      options:
        categories.status === 'success'
          ? categories.data.map((r) => r.name)
          : [],
    },
    {
      name: 'organisation',
      placeholder: 'Ответсвенный орган',
      options:
        organisations.status === 'success'
          ? organisations.data.map((o) => o.name)
          : [],
    },
    {
      name: 'region',
      placeholder: 'Район',
      options:
        regions.status === 'success' ? regions.data.map((r) => r.name) : [],
    },
  ]

  return (
    <>
      {arr.map((i, index) => (
        <Form.Item
          name={i.name}
          rules={[{ required: true, message: 'Необходимо заполнить поле!' }]}
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

const renderTextArea = (name, placeholder, disabled) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: disabled === false && name !== 'area' && true,
          message: 'Необходимо заполнить поле!',
        },
      ]}
    >
      <TextArea
        style={{ height: 90 }}
        placeholder={placeholder}
        allowClear
        disabled={disabled}
      />
    </Form.Item>
  )
}

const renderDatePicker = (picker, handleChange, name, text) => {
  return (
    <Form.Item label={text}>
      <Input.Group compact>
        <Form.Item
          name={name}
          rules={[{ required: true, message: 'Необходимо заполнить поле!' }]}
          getValueFromEvent={(e, string) => moment(string, 'YYYY-MM-DD')}
        >
          <DatePicker
            placeholder='Выбрать дату'
            format={picker ? 'YYYY' : 'YYYY-MM-DD'}
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
    name='file-paths'
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
