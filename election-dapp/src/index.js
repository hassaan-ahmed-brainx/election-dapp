import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import castAVoteReducer from './castAVoteSlice';
import { Provider } from 'react-redux';



const store = configureStore({
  reducer: {
    castAVote: castAVoteReducer,
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
     <App />
   </Provider>,
  </React.StrictMode>
);

reportWebVitals();
