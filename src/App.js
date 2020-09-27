import React from 'react'
import { Provider } from 'react-redux'
import store from './app/store'

import { RoadMap } from './components/RoadMap'

import './App.css'
import 'antd/dist/antd.css'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <RoadMap />
      </div>
    </Provider>
  )
}

export default App
