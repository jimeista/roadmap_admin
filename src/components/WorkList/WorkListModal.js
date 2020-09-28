import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'antd'

import {
  formValidate,
  setCurrent,
  postRoadMap,
  resetOnPost,
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
  const dispatch = useDispatch()
  const {
    organisations,
    regions,
    categories,
    formData,
    current,
    status,
    mapData,
  } = useSelector((state) => state.roadmap)

  const steps = setSteps(organisations, regions, categories, formData)

  const postFormData = async (data) => {
    try {
      let ob = postNewRoadWork(data, categories, organisations, regions)

      const coordinates = {
        geometries: mapData.map((i) => {
          let arr = []
          if (i.type === 'polyline') {
            arr = i.coordinates.map((ii) => ({ x: ii[1], y: ii[0] }))
          } else if (i.type === 'polygon') {
            arr = i.coordinates[0].map((k) => ({ x: k[1], y: k[0] }))
          } else {
            arr = [{ x: i.coordinates[1], y: i.coordinates[0] }]
          }
          return arr
        }),
      }

      ob = { data: ob, geometries: { coordinates } }

      dispatch(postRoadMap(ob))
      dispatch(setCurrent(null))
      dispatch(resetOnPost())

      status === 'success' && setVisible(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          dispatch(setCurrent(0))
          setVisible(true)
        }}
        style={{ marginBottom: 10 }}
      >
        Добавить
      </Button>
      {status === 'success' && (
        <Modal
          title='Форма ввода данных по ремонтным работам'
          visible={visible}
          onOk={() => {
            dispatch(setCurrent(null))
            setVisible(false)
          }}
          onCancel={() => {
            dispatch(setCurrent(null))
            setVisible(false)
          }}
          width={'80%'}
          footer={[
            <Button
              key='back'
              onClick={() => {
                dispatch(setCurrent(null))
                setVisible(false)
              }}
            >
              Отменить
            </Button>,
            <Button
              key='submit'
              type='primary'
              confirmLoading={status}
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
      )}
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
