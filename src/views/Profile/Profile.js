import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: ''
    }
  }

  componentDidMount = () => {
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
    if(user !== undefined) {
      const user1 = user.toUpperCase()
      return <p>{user1}</p>
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={{ padding: 16 }}>
        <div>
          <h3>Nombre</h3>
          <p>{this.replaceUsername(this.state.profile.user)}</p>
        </div>
        <div>
          <h3>Recetas</h3>
          <Table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Titlte</th>
                <th>Preparation</th>
              </tr>
              {this.state.profile.recetas &&
                this.state.profile.recetas.map((receta, key) => {
                  return (
                    <tr key={key}>
                      <td><img src={receta.image} alt='recipes' style={{ width: 50, height: 'auto' }} /></td>
                      <td>{receta.title}</td>
                      <td>{receta.preparation}</td>
                      <td><NavLink to={'/search/result/' + receta.receta_id}><i>Enter</i></NavLink></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
        </div>
      </div>
    )
  }
}

export default Profile
