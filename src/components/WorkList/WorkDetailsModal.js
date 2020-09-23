import React from 'react'
import { Modal } from 'antd'

import { WorkConfirm } from '../steps/WorkConfirm'

export const WorkDetailsModal = (props) => {
  const { visible, setVisible, record } = props

  console.log(record)

  return (
    <Modal
      title='Детали улицы'
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={'80%'}
    >
      <WorkConfirm ob={record} />
    </Modal>
  )
}
