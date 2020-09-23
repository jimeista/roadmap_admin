import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'antd'

import { CrossDetailsModal } from './CrossDetailsModal'
import { CustomTable as Table } from '../../common'
import {
  setCrossListTableColumnsHelper,
  setCrossListDataSourceHelper,
} from '../../utils/helper'

export const CrossListTable = () => {
  const { categories, status, data } = useSelector((state) => state.roadmap)
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})

  const [form] = Form.useForm()

  const columns = useMemo(() => {
    return setCrossListTableColumnsHelper(categories, setVisible, setRecord)
  }, [categories, setVisible, setRecord])

  return (
    <Form form={form}>
      <Form.Item name='table'>
        <Table
          columns={columns}
          dataSource={setCrossListDataSourceHelper(data)}
          loading={status === 'loading' ? true : false}
        />
      </Form.Item>
      {visible && (
        <Form.Item name='modal'>
          <CrossDetailsModal
            visible={visible}
            setVisible={setVisible}
            record={record}
          />
        </Form.Item>
      )}
    </Form>
  )
}
