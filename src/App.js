import React from 'react'
import { Provider } from 'react-redux'
import store from './app/store'

import { RoadMap } from './components/RoadMap'
import { CustomYandexMap as YandexMap } from './common/YandexMap'

import './App.css'
import 'antd/dist/antd.css'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        {/* <RoadMap /> */}
        <YandexMap />
      </div>
    </Provider>
  )
}

export default App
