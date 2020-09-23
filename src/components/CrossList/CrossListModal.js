import React, { useState } from 'react'
import { Button, Modal } from 'antd'

import { AddCrossWorks } from './form/AddCrossWorks'
import { CustomYandexMap as YandexMap } from '../../common'

export const CrossListModal = () => {
  const [visible, setVisible] = useState()

  return (
    <>
      <Button
        type='primary'
        onClick={() => setVisible(true)}
        style={{ marginBottom: 10 }}
      >
        Добавить пересечение
      </Button>
      <Modal
        title='Форма ввода данных по пересечению работ'
        visible={visible}
        onOk={() => setVisible(true)}
        onCancel={() => setVisible(false)}
        width={'80%'}
        footer={[
          <Button key='back' onClick={() => setVisible(false)}>
            Отменить
          </Button>,
          <Button key='submit' type='primary' onClick={() => setVisible(true)}>
            Отправить
          </Button>,
        ]}
      >
        <>
          <AddCrossWorks />
          <div style={{ width: '100%', paddingLeft: 10 }}>
            <YandexMap />
          </div>
        </>
      </Modal>
    </>
  )
}
