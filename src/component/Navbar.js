import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Container, Button } from 'react-bootstrap'
import logo from '../assets/img/logo.png'

export default class Navbars extends Component {
  render() {
    return (
      <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm animate__animated animate__fadeInDown">
        <Container>
          <Link className="navbar-brand" to="/">
            <img src={logo} width="100" alt="logo"/>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ml-lg-3 text-center">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/book">Book</Link>
            </Nav>
            <Nav className="ml-auto">
              <Form inline>
                <FormControl type="text" placeholder="Search book..." className="mr-sm-2 w-100" />
              </Form>
              <Link className="nav-link" to="/sign-up">
                <Button className="w-100">Sign Up</Button>
              </Link>
              <Link className="nav-link" to="/login">
                <Button className="w-100" variant="outline-dark">Login</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
