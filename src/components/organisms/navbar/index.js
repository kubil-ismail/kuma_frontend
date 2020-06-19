import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Container, Button, NavDropdown } from 'react-bootstrap';

import logo from '../../../assets/img/logo.png';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLogin: true,
    };
  }

  render() {
    const { hasLogin } = this.state;
    return (
      <>
        <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
          <Container>
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Logo" width="100" />
            </Link>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link " to="/">
                  Home
                </Link>
                <NavDropdown title="Genre" id="basic-nav-dropdown" className="">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
                <Form className="mx-2" inline>
                  <FormControl
                    type="text"
                    placeholder="Search book..."
                    className="mr-sm-2 bg-light"
                  />
                </Form>
              </Nav>
              <Nav className="ml-auto">
                {hasLogin ? (
                  <>
                    <NavDropdown title="Profile Name" id="basic-nav-dropdown">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <Link to="/profile" className="dropdown-item">
                        Favorite
                      </Link>
                      <Link to="/review" className="dropdown-item">
                        Review
                      </Link>
                      <NavDropdown.Divider />
                      <Link to="/logout" className="dropdown-item">
                        Logout
                      </Link>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    {/* Not Logged In */}
                    <Link className="nav-link " to="/login">
                      Login
                    </Link>
                    <Link className="nav-link" to="/sign-up">
                      <Button className="w-100" size="sm">
                        Register
                      </Button>
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
