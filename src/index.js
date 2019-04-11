import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Search from './views/Search/Search'
import Login from './views/Login/Login'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/search' exact component={Search} />
      <Route path='/profile' exact component={Search} />
      <Route path='/createRecipe' exact component={Search} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
