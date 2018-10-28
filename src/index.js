import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';kk 

ReactDOM.render(
    <BrowserRouter>
        <Switch>
          <Route path='/' exact component = {App} />
        </Switch>
      </BrowserRouter>, 
    document.getElementById('root')
    );