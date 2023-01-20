import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { BikeApp } from './BikeApp'
import { store } from './store/store'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BikeApp></BikeApp>
      </BrowserRouter>
    </Provider>
    </React.StrictMode>
)
