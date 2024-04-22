import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider/UserProvider';
import CustomThemeProvider from './providers/ThemeProvider/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <BrowserRouter>
        <UserProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </UserProvider>
      </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
