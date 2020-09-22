import React, { useState } from 'react'
import { Modal, Button } from 'antd'

export const CustomModal = (props) => {
  const { btntext, btnstyle, title, children, formData, current } = props
  const [visible, setVisible] = useState(false)

  const handleOk = () => {
    console.log(formData)
    setVisible(false)
  }
  const handleCancel = () => setVisible(false)

  return (
    <>
      <Button
        type='primary'
        onClick={() => setVisible(true)}
        style={btnstyle || {}}
      >
        {btntext || 'Open'}
      </Button>
      <Modal
        title={title || 'Modal'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        content={children}
        width={'80%'}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Отменить
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={handleOk}
            disabled={current !== 3 ? true : false}
          >
            Отправить
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  )
}
