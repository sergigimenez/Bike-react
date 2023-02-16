import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { BikeApp } from './BikeApp'
import { store } from './store/store'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      {/*<BrowserRouter>*/}
      <HashRouter>
        <BikeApp></BikeApp>
      </HashRouter>
      {/*</BrowserRouter> */}
    </Provider>

)
