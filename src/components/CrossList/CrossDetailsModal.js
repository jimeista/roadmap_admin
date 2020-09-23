import React from 'react'
import { Modal, Button } from 'antd'

export const CrossDetailsModal = (props) => {
  const { visible, setVisible, record } = props

  console.log(record)

  return (
    <Modal
      title='Детали улицы'
      visible={visible}
      width={'50%'}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
      footer={[
        <Button key='close' onClick={() => setVisible(false)}>
          Закрыть
        </Button>,
      ]}
    >
      hahhahaha
    </Modal>
  )
}
