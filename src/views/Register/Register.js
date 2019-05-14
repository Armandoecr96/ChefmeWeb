import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import '../../assets/css/login.css'
import logo from '../../assets/images/logo.png'

class Register extends Component {
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

    register = () => {
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                "user": this.state.email,
                "password": this.state.password,
                "type": "USER"
            }),
        }).then(response => {
            console.log(response.status)
            if(response.status === 200) {
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
            if(response.status === 400) {
                alert('Ya existia el usuario')
            }
            if(response.status === 500) {
                alert('Disculpe ha habido un error de nuestro lado')
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
                            <Button variant='primary' onClick={this.register}>
                                Register
              </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Register
