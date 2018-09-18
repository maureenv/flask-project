import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers'


const store = createStore(rootReducer)


ReactDOM.render(
    <Provider store={store}>
     <BrowserRouter>
      <App />
     </BrowserRouter>
   </Provider>,
   document.getElementById('root')
)
registerServiceWorker();
