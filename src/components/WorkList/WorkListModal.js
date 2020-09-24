import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'antd'

import {
  formValidate,
  setCurrent,
  postRoadMap,
  fetchRoadMap,
} from '../../features/roadmap/roadmapSlice'
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
import { postNewRoadWork } from '../../utils/helper'

export const WorkListModal = () => {
  const [visible, setVisible] = useState()
  const [confirmLoading, setCofirmLoading] = useState(false)
  const dispatch = useDispatch()
  const { organisations, regions, categories, formData, current } = useSelector(
    (state) => state.roadmap
  )

  const steps = setSteps(organisations, regions, categories, formData)

  const postFormData = async (data) => {
    try {
      setCofirmLoading(true)
      let ob = postNewRoadWork(data, categories, organisations, regions)
      dispatch(postRoadMap(ob))
      await sleep(setVisible)
      setCofirmLoading(true)
    } catch (err) {
      console.log(err.message)
    }
  }

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
            confirmLoading={confirmLoading}
            onClick={() => postFormData(formData)}
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

const sleep = (setVisible) =>
  new Promise((res) => setTimeout(() => setVisible(false), 2000))
