import React, { useState } from 'react'

import { Steps, Button, Form } from 'antd'

const { Step } = Steps

export const CustomSteps = ({ steps, dispatch, setCurrent, formValidate }) => {
  const [form] = Form.useForm()

  const [current, setCurrentt] = useState(0)

  const next = () => {
    setCurrentt((state) => state + 1)
    dispatch(setCurrent(current + 1))
  }

  const prev = () => {
    setCurrentt((state) => state - 1)
    dispatch(setCurrent(current - 1))
  }

  const validate = async () => {
    try {
      const data = await form.validateFields()
      Object.keys(data).map((key) => {
        if (typeof data[key] === 'object') {
          data[key] = data[key]['_i']
        }
      })
      dispatch(formValidate(data))

      next()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Steps current={current} size='small'>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='steps-content'>
        <Form form={form} name='roadwork-form'>
          {steps[current].content}
        </Form>
      </div>
      <div className='steps-action'>
        {current < steps.length - 1 && (
          <Button type='primary' onClick={validate}>
            Далее
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Назад
          </Button>
        )}
      </div>
    </div>
  )
}
