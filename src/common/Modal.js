import React from 'react'
import { Modal, Button } from 'antd'

export const CustomModal = (props) => {
  const { confirm } = Modal
  const { btntext, btnstyle, title, children } = props

  const config = {
    title: title || 'Modal',
    content: children,
    width: '80%',
    okText: 'Отправить',
    cancelText: 'Отменить',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
      }).catch(() => console.log('Oops errors!'))
    },
  }

  return (
    <Button
      type='primary'
      onClick={() => confirm(config)}
      style={btnstyle || {}}
    >
      {btntext || 'Open'}
    </Button>
  )
}
