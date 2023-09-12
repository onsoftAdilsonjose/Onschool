import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import { Provider } from 'react-redux';
//reducer
import { store } from './store'
import GlobalContextProvider from './context/GlobalContext';


//Style

import "./globalStyle.css"
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
     <AuthContextProvider>   
     < GlobalContextProvider>
      <Provider store={store}>       
        <App />           
      </Provider>
    </GlobalContextProvider>  
    </AuthContextProvider>
  </BrowserRouter>
)
