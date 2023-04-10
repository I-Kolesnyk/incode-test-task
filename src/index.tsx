import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';

import './index.scss';
import App from 'components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>      
          <App />         
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
