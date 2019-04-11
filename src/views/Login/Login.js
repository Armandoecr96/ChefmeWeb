import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

class Login extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
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
              <Button variant='primary' type='submit'>
                Submit
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
