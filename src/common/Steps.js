import React, { useState } from 'react'

import { Steps, Button, message } from 'antd'

const { Step } = Steps

export const CustomSteps = ({
  steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ],
}) => {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((state) => state + 1)
  }

  const prev = () => {
    setCurrent((state) => state - 1)
  }

  return (
    <>
      <Steps current={current} size='small'>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='steps-content'>{steps[current].content}</div>
      <div className='steps-action'>
        {current < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Далее
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type='primary'
            onClick={() => message.success('Processing complete!')}
          >
            Завершить
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Назад
          </Button>
        )}
      </div>
    </>
  )
}
