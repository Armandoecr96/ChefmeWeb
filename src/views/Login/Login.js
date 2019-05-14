import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import '../../assets/css/login.css'
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  login = () => {
    fetch('http://localhost:8080/login', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: this.state.email, password: this.state.password }),
    }).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          localStorage.setItem('token', json.token)
          localStorage.setItem('name', this.state.email)
          this.props.history.push('/search')
        })
      }
      if (response.status === 404) {
        alert('No existe el usuario')
      }
    })
  }

  render() {
    return (
      <Container className='container'>
        <Row>
          <Col>
            <div className='logoContainer'>
              <img src={logo} className='logo' alt='ChefMe' />
            </div>
          </Col>
          <Col>
            <Form className='formLogin'>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type='email' placeholder='Enter email' onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type='password' placeholder='Password' onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId='formBasicChecbox'>
              </Form.Group>
              <Button variant='primary' onClick={this.login}>
                Login
              </Button>
            </Form>
            <p>¿No está registrado? <NavLink to='/register'>
              Registrese aquí
            </NavLink></p>
            <p>¿Olvido su contraseña? <Button variant='link' type='submit'>
              Recuperala aquí
            </Button></p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login
