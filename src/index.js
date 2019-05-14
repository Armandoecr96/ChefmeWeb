import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Search from './views/Search/Search'
import Login from './views/Login/Login'
import RecipeList from './views/RecipeList/RecipeList'
import Register from './views/Register/Register'
import Recipe from './views/Recipe/Recipe'
import Profile from './views/Profile/Profile'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/search' exact component={Search} />
      <Route path='/search/result' exact component={RecipeList} />
      <Route path='/search/result/:id' exact component={Recipe} />
      <Route path='/profile' exact component={Profile} />
      <Route path='/createRecipe' exact component={Search} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
