import React, { Component } from 'react'
import StartRaiting from 'react-star-ratings'
import Navbar from '../../components/Navbar/Navbar'

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: [],
      calification: 0.0
    }
  }

  fetchRecipe = () => {
    let id = this.props.match.params.id
    fetch('http://localhost:8080/recetas/receta/' + id, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => {
      response.json().then(
        json => {
          console.log(json)
          let recetas = json
          this.setState({ recipe: recetas })
          this.setState({ calification: recetas.calification })
        }
      )
    })
  }

  componentDidMount = () => {
    this.fetchRecipe()
  }

  changeRating = ( newRating, name ) => {
    this.setState({
      calification: newRating
    });
    this.fetchRecipe()
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'column', margin: 16, }}>
          <h1>{this.state.recipe.title}</h1>
          <img src={this.state.recipe.image} style={{ width: 300, height: 'auto', alignSelf: 'center', borderRadius: 8 }} alt='recipe' />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignContent: 'left' }}>
              <h3>Preparation</h3>
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.state.recipe.preparation }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 24 }}>
            <StartRaiting
              numberOfStars={5}
              isSelectable={true}
              starRatedColor='gold'
              starDimension='36px'
              name='calification'
              changeRating={this.changeRating}
              rating={this.state.calification}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe
