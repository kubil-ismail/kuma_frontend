/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Button,
  NavDropdown,
  ButtonGroup,
} from 'react-bootstrap';
import Store from 'store2';

import logo from '../../../assets/img/logo.png';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLogin: Store('login') || false,
    };
  }

  logout = () => {
    Store(false);
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    const { hasLogin } = this.state;
    return (
      <>
        <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
          <Container>
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Logo" width="100" />
            </Link>
            <Navbar.Toggle className="border-0" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link " to="/">
                  Home
                </Link>
                <Link className="nav-link " to="/book">
                  Book
                </Link>
                <NavDropdown title="Genre" id="basic-nav-dropdown" className="">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="ml-auto">
                <NavDropdown.Divider className="d-lg-none" />
                <Form className="mx-2 my-2 my-lg-0" inline>
                  <FormControl
                    type="text"
                    placeholder="Search book..."
                    className="mr-sm-2 bg-light"
                  />
                </Form>
                {hasLogin ? (
                  <>
                    <NavDropdown title="Member" id="basic-nav-dropdown">
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
                      <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    {/* Not Logged In */}
                    <NavDropdown.Divider className="d-lg-none" />
                    <Link className="nav-link " to="/login">
                      <span className="d-none d-lg-block">Log In</span>
                      <Button className="w-100 d-lg-none" size="sm" variant="dark">
                        Log In
                      </Button>
                    </Link>
                    <Link className="nav-link" to="/sign-up">
                      <Button className="w-100" size="sm">
                        Sign Up
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
