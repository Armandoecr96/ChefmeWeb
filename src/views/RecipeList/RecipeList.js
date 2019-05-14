import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import '../../assets/css/login.css'
import { NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import StarRatingComponent from 'react-star-rating-component'

class RecipeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listRecipes: []
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:8080/recetas', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => {
      response.json().then(
        json => {
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
        <Container className='container'>
          <Row>
            <Col md={12}>
              <div className="send">
                <Container id="menu">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <th>Image</th>
                        <th>Titlte</th>
                        <th>Score</th>
                      </tr>

                      {
                        this.state.listRecipes.map((i, key) => {
                          return (
                            <tr key={key}>
                              <td><img src={i.image} alt='recipes' style={{ width: 50, height: 'auto' }} /></td>
                              <td>{i.title}</td>
                              <td> <StarRatingComponent
                                starCount={5}
                                editing={false}
                                value={i.calification}
                              /></td>
                              <td><NavLink to={'/search/result/' + i.receta_id}><i>Enter</i></NavLink></td>
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </Table>
                  <div>

                  </div>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default RecipeList
