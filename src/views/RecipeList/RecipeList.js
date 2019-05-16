import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import '../../assets/css/login.css'
import { NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import StartRaiting from 'react-star-ratings'

class RecipeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listRecipes: [],
    }
  }

  componentDidMount = () => {
    let ingredient = ''
    if (this.props.location.state !== undefined) {
      ingredient = '/' + this.props.location.state.detail
    }
    fetch('http://localhost:8080/recetas' + ingredient, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => {
      response.json().then(
        json => {
          console.log(json)
          let recetas = [...json]
          this.setState({ listRecipes: recetas })
        }
      )
    })
  }

  render() {

    return (
      <div>
        <Navbar />
        <div style={{ padding: 32 }}>
          <div>
            <div>
              <div id="menu">
                <Table responsive>
                  <tbody>
                    <tr>
                      <th>Image</th>
                      <th>Titlte</th>
                      <th>Score</th>
                    </tr>

                    {this.state.listRecipes.length !== 0 ?
                      this.state.listRecipes.map((i, key) => {
                        console.log(i.calification)
                        let calification = 0.0
                        if(i.calification !== null) {
                          calification = i.calification
                        }
                        
                        return (
                          <tr key={key} style={{ alignContent: 'center' }}>
                            <td><img src={i.image} alt='recipes' style={{ width: 100, height: 'auto', borderRadius: 8 }} /></td>
                            <td>{i.title}</td>
                            <td><StartRaiting
                              numberOfStars={5}
                              isSelectable={false}
                              starRatedColor='gold'
                              starDimension='20px'
                              rating={calification}
                            /></td>
                            <td><NavLink to={'/search/result/' + i.receta_id}><i>Enter</i></NavLink></td>
                          </tr>
                        )
                      })
                      : <tr style={{ opacity: 0.8 }}>Without result</tr>
                    }

                  </tbody>
                </Table>
                <div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeList
