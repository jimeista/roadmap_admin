import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'antd'

import { formValidate, setCurrent } from '../../features/roadmap/roadmapSlice'
import {
  CustomSteps as Steps,
  CustomYandexMap as YandexMap,
} from '../../common'
import {
  WorkDescription,
  WorkContractor,
  WorkStatus,
  WorkConfirm,
} from './form'

export const WorkListModal = () => {
  const [visible, setVisible] = useState()
  const dispatch = useDispatch()
  const { organisations, regions, categories, formData, current } = useSelector(
    (state) => state.roadmap
  )

  const steps = setSteps(organisations, regions, categories, formData)

  return (
    <>
      <Button
        type='primary'
        onClick={() => setVisible(true)}
        style={{ marginBottom: 10 }}
      >
        Добавить
      </Button>
      <Modal
        title='Форма ввода данных по ремонтным работам'
        visible={visible}
        onOk={() => setVisible(true)}
        onCancel={() => setVisible(false)}
        width={'80%'}
        footer={[
          <Button key='back' onClick={() => setVisible(false)}>
            Отменить
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={() => setVisible(true)}
            disabled={current !== 3 ? true : false}
          >
            Отправить
          </Button>,
        ]}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Steps
            steps={steps}
            setCurrent={setCurrent}
            formValidate={formValidate}
            dispatch={dispatch}
          />
          <div style={{ width: '100%', paddingLeft: 10 }}>
            <YandexMap />
          </div>
        </div>
      </Modal>
    </>
  )
}

const setSteps = (organisations, regions, categories, formData) => [
  {
    title: 'Описание работ',
    content: (
      <WorkDescription
        organisations={organisations}
        regions={regions}
        categories={categories}
      />
    ),
  },
  {
    title: 'Данные подрядчика',
    content: <WorkContractor />,
  },
  {
    title: 'Статус работ',
    content: <WorkStatus />,
  },
  {
    title: 'Отправка данных',
    content: <WorkConfirm ob={formData} />,
  },
]
