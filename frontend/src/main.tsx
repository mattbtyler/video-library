import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './input.css';
import App from './App.tsx';
import { ConfigProvider, theme } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#B4FE17'
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
