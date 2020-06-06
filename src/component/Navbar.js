import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Container, Button } from 'react-bootstrap'
import logo from '../assets/img/logo.png'

export default class Navbars extends Component {
  render() {
    return (
      <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm animate__animated animate__fadeInDown">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} width="100" alt="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ml-lg-3 text-center">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/book">Book</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Form inline>
                <FormControl type="text" placeholder="Search book..." className="mr-sm-2" />
              </Form>
              <Nav.Link href="/sign-in">
                <Button className="w-100">Sign In</Button>
              </Nav.Link>
              <Nav.Link href="/login">
                <Button className="w-100" variant="outline-dark">Login</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
