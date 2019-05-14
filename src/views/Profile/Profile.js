import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Table, Button, Modal } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: '',
      id: '',
      show: false
    }
  }

  handleClose = () => {
    this.setState({ id: '' })
    this.setState({ show: false });
  }

  handleShow = (id) => {
    this.setState({ id: id })
    this.setState({ show: true });
  }

  componentDidMount = () => {
    this.obtainUser()
  }

  obtainUser = () => {
    fetch('http://localhost:8080/usuarios/' + localStorage.getItem('name'), {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => {
      response.json().then(
        json => {
          let profile = json
          this.setState({ profile: profile })
        }
      )
    })
  }

  replaceUsername = (user) => {
    if (user !== undefined) {
      const user1 = user.toUpperCase()
      return <p>{user1}</p>
    }
  }

  deleteRecipe = () => {
    fetch('http://localhost:8080/recetas/' + this.state.id, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => {
      this.handleClose()
      this.obtainUser()
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={{ padding: 16 }}>
          <div>
            <h3>Name</h3>
            <p>{this.replaceUsername(this.state.profile.user)}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <NavLink to={'/createRecipe'}><Button>Create new recipe</Button></NavLink>
          </div>
          <div>
            <h3>My Recipes</h3>
            <Table>
              <tbody>
                <tr>
                  <th>Image</th>
                  <th>Titlte</th>
                  <th>Score</th>
                  <th>View</th>
                </tr>
                {this.state.profile.recetas &&
                  this.state.profile.recetas.map((receta, key) => {
                    return (
                      <tr key={key}>
                        <td><img src={receta.image} alt='recipes' style={{ width: 50, height: 'auto' }} /></td>
                        <td>{receta.title}</td>
                        <td> <StarRatingComponent
                          starCount={5}
                          editing={false}
                          value={receta.calification}
                        /></td>
                        <td><NavLink to={'/search/result/' + receta.receta_id}>View</NavLink></td>
                        <td><NavLink to={'/editRecipe/' + receta.receta_id}> Edit </NavLink></td>
                        <td><Button variant="outline-danger" onClick={() => this.handleShow(receta.receta_id)} style={{ marginTop: -8 }}> Delete </Button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want delete this recipe?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.deleteRecipe}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Profile
