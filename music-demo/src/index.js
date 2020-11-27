import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'
import { BrowserRouter } from 'react-router-dom'


import './assets/css/reset.css'
import './assets/js/remScale'
import '../node_modules/swiper/css/swiper.css'
import '../node_modules/swiper/js/swiper'

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
    , document.getElementById('root'))