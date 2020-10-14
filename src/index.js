import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import short from 'short-uuid';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

import App from './components/App';

const cookies = new Cookies();

// const API_ENDPOINT = process.env.REACT_APP_BACKEND_API;
const API_ENDPOINT = "https://ylxu707ys2.execute-api.eu-west-1.amazonaws.com/Prod";

if (!cookies.get('userID')) cookies.set('userID', short.generate(), { path: '/' });
const user_id = cookies.get('userID');

const urlParams = new URLSearchParams(window.location.search);
const event_id = urlParams.get('id');

const config = {
  api_endpoint: API_ENDPOINT,
  user_id: user_id,
  event_id: event_id
}

// ========================================

ReactDOM.render(
  <App
    config={config}
  />,
  document.getElementById('root')
);


