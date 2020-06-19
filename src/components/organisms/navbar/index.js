import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Container, Button, NavDropdown } from 'react-bootstrap';

import logo from '../../../assets/img/logo.png';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLogin: false,
    };
  }

  render() {
    const { hasLogin } = this.state;
    return (
      <>
        <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
          <Container>
            <Navbar.Brand href="#home">
              <img src={logo} alt="Logo" width="100" />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link " to="/">
                  Home
                </Link>
                <NavDropdown title="Genre" id="basic-nav-dropdown" className="">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
                <Form className="mx-2" inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
              </Nav>
              <Nav className="ml-auto">
                {hasLogin ? (
                  <>
                    <Link className="nav-link" to="/sign-up">
                      <Button className="w-100">Profile</Button>
                    </Link>
                    <Link className="nav-link" to="/login">
                      <Button className="w-100" variant="outline-dark">
                        Logout
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Not Logged In */}
                    <Link className="nav-link " to="/login">
                      Login
                    </Link>
                    <Link className="nav-link" to="/sign-up">
                      <Button className="w-100" size="sm">Register</Button>
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
