import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import '../../assets/css/login.css'
import logo from '../../assets/images/logo.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  login = () => {
    this.props.history.push('/search')
    console.log(this.props)
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
                <Form.Control type='email' placeholder='Enter email' />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
              <Form.Group controlId='formBasicChecbox'>
              </Form.Group>
              <Button variant='primary' onClick={this.login}>
                Login
              </Button>
            </Form>
            <p>¿No está registrado?<Button variant='link' type='submit'>
              Registrese aquí
            </Button></p>
            <p>¿Olvido su contraseña?<Button variant='link' type='submit'>
              Recuperala aquí
            </Button></p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login
