import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Container, Button } from 'react-bootstrap'
import store from 'store2'
import logo from '../assets/img/logo.png'

export default class Navbars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLogin: store('login') || false
    }
  }

  logout = () => {
    store(false)
    window.location.href = '/login'
  }

  render() {
    const { hasLogin } = this.state
    return (
      <Fragment>
        <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm animate__animated animate__fadeInDown">
          <Container>
            <Link className="navbar-brand" to="/">
              <img src={logo} width="100" alt="logo" />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto ml-lg-3 text-center">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/books">Book</Link>
              </Nav>
              <Nav className="ml-auto">
                <Form className="d-lg-flex d-none" inline>
                  <FormControl type="text" placeholder="Search book..." className="mr-sm-2 w-100" />
                </Form>
                {hasLogin
                  ? (
                    <Fragment>
                      <Link className="nav-link" to="/profile">
                        <Button className="w-100">Profile</Button>
                      </Link>
                      <Nav.Link>
                        <Button className="w-100" variant="outline-dark" onClick={(e) => this.logout()}>Logout</Button>
                      </Nav.Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Link className="nav-link" to="/sign-up">
                        <Button className="w-100">Sign Up</Button>
                      </Link>
                      <Link className="nav-link" to="/login">
                        <Button className="w-100" variant="outline-dark">Login</Button>
                      </Link>
                    </Fragment>
                  )}
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Form className="w-100 mt-4 mb-2 px-2 d-lg-none">
            <FormControl type="text" placeholder="Search book..." className="mr-sm-2 w-100" />
          </Form>
        </Navbar>
        <div className="nav-margin-md d-lg-none"></div>
        <div className="nav-margin-lg d-lg-block d-none"></div>
      </Fragment>
    )
  }
}
