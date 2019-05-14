import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class NavbarComponent extends Component {
    logout = () => {
        localStorage.removeItem('token')
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Navbar.Brand style={{ color: 'orange', fontWeight: 'bold' }}>Chef-Me</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to={'/search'}><span style={{ marginRight: 8, color: 'black' }}>Search</span></NavLink>
                        <NavLink to={'/profile'}><span style={{ marginRight: 8, color: 'black' }}>Profile</span></NavLink>
                        <NavLink to={'/createRecipe'}><span style={{ marginRight: 8, color: 'black' }}>Create Recipe</span></NavLink>
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
