import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'antd'

import {
  formValidate,
  setCurrent,
  postRoadMap,
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

export const WorkListModal = () => {
  const [visible, setVisible] = useState()
  const dispatch = useDispatch()
  const { organisations, regions, categories, formData, current } = useSelector(
    (state) => state.roadmap
  )

  const steps = setSteps(organisations, regions, categories, formData)

  const postFormData = (data) => {
    let ob = {}
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === 'end-date' || key === 'start-date') {
          data[key].length > 4
            ? (ob = { ...ob, [key]: data[key] })
            : (ob = { ...ob, [key]: `${data[key]}-01-01` })
        } else if (key === 'category') {
          const id = categories.data.find((o) => o.name === data[key]).id
          ob = { ...ob, 'category-id': id }
        } else if (key === 'percentage') {
          const obb = {
            percentage: data[key],
            'is-hidden': data['is-hidden'],
            'is-canceled': data['is-canceled'],
            commentray: data.commentary,
          }

          let new_obb = {}

          Object.keys(obb).forEach((o) => {
            if (obb[o] !== undefined) {
              new_obb = { ...new_obb, [o]: obb[o] }
            }
          })

          ob = { ...ob, status: new_obb }
        } else if (key === 'organisation') {
          const id = organisations.data.find((o) => o.name === data[key]).id
          ob = { ...ob, 'organisation-id': id }
        } else if (key === 'region') {
          const id = regions.data.find((o) => o.name === data[key]).id
          ob = { ...ob, 'region-id': id }
        } else {
          ob = { ...ob, [key]: data[key] }
        }
      }
      if (key === 'is-canvas-opened' || key === 'is-closured') {
        ob = { ...ob, [key]: false }
      }
    })

    console.log(ob)

    dispatch(postRoadMap(ob))
    setVisible(false)
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
