import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class NavbarComponent extends Component {
    logout = () => {
        localStorage.removeItem('token')
        console.log(this.props)
        // this.props.history.push('/')
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Navbar.Brand href="#home">Chef-Me</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to={'/search'}><span style={{ marginRight: 8, color: 'black', textDecoration: 'none' }}>Search</span></NavLink>
                        <NavLink to={'/profile'}><span style={{ marginRight: 8, color: 'black', textDecoration: 'none' }}>Profile</span></NavLink>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <NavLink to={'/'}>
                        <span onClick={this.logout}>
                            Logout
                        </span>
                    </NavLink>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarComponent
