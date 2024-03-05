import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import GridBackGround from './components/ui/GridBackGround.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
    <GridBackGround> 
    <App />
    </GridBackGround>
    </BrowserRouter>
  </React.StrictMode>,
)
