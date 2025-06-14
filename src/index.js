    // index.js
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';
    import { Provider } from 'react-redux';
    import store from './app/store';
    import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter> {/* Wrap your App in BrowserRouter */}
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
    