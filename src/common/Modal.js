import React, { useState } from 'react'
import { Modal, Button } from 'antd'

export const CustomModal = (props) => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = (e) => {
    setVisible(false)
  }

  const handleCancel = (e) => {
    setVisible(false)
  }

  const { btntext, btnstyle, title, children } = props
  return (
    <>
      <Button type='primary' onClick={showModal} style={btnstyle || {}}>
        {btntext || 'Open'}
      </Button>
      <Modal
        title={title || 'Modal'}
        width='50%'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  )
}
