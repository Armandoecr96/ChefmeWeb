import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: []
    }
  }

  componentDidMount = () => {
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
        }
      )
    })
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', margin: 16,  }}>
        <h1>{this.state.recipe.title}</h1>
        <img src={this.state.recipe.image} style={{ width: 300, height: 'auto', alignSelf: 'center', borderRadius: 8 }} alt='recipe' />
        <div>
          <h3>Ingredients</h3>
          <ul>
            <li>Leche</li>
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignContent: 'left' }}>
            <h3>Preparation</h3>
          </div>
          <p>{this.state.recipe.preparation}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50 }}>
          <StarRatingComponent
            starCount={5}
            editing={false}
            value={this.state.recipe.calification}
          />
        </div>
      </div>
    )
  }
}

export default Recipe
