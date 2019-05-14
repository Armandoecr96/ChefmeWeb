import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Search from './views/Search/Search'
import Login from './views/Login/Login'
import RecipeList from './views/RecipeList/RecipeList'
import Register from './views/Register/Register'
import Recipe from './views/Recipe/Recipe'
import Profile from './views/Profile/Profile'
import CreateRecipe from './views/CreateRecipe/CreateRecipe'
import EditRecipe from './views/CreateRecipe/EditRecipe'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />)
      }
    />
  )
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <PrivateRoute path='/search' exact component={Search} />
      <PrivateRoute path='/search/result' exact component={RecipeList} />
      <PrivateRoute path='/search/result/:id' exact component={Recipe} />
      <PrivateRoute path='/profile' exact component={Profile} />
      <PrivateRoute path='/createRecipe' exact component={CreateRecipe} />
      <PrivateRoute path='/editRecipe/:id' exact component={EditRecipe} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
