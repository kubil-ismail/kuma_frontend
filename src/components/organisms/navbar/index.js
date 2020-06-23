/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Container, Button, NavDropdown } from 'react-bootstrap';
import Store from 'store2';
import { get } from '../../../services';

import logo from '../../../assets/img/logo.png';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLogin: Store('login') || false,
      keyword: null,
      genre: [],
    };
  }

  search = (e) => {
    e.preventDefault();

    const { history } = this.props;
    const { keyword } = this.state;
    history.push({
      pathname: '/book',
      search: `?search=${keyword}`,
      state: keyword,
    });
  };

  logout = () => {
    Swal.fire('Logout success', 'successfully logout', 'success');
    Store(false);
    const { history } = this.props;
    history.push('/login');
  };

  bookPage = () => {
    const { history } = this.props;
    history.push({
      pathname: '/book',
    });
  };

  getGenre = async () => {
    try {
      const genre = await get({
        url: 'genre',
      });
      const { data } = genre.data;
      this.setState({ genre: data });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  componentDidMount = () => {
    this.getGenre();
  };

  render() {
    const { genre, hasLogin } = this.state;
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
                <Nav.Link onClick={this.bookPage}>Book</Nav.Link>
                <NavDropdown title="Genre" id="basic-nav-dropdown">
                  {genre.length > 1 &&
                    genre.map((val) => (
                      <Link
                        className="dropdown-item"
                        key={val.id}
                        to={{
                          pathname: `/genre/${val.name}`,
                          state: { genreId: val.id, name: val.name },
                        }}
                      >
                        {val.name}
                      </Link>
                    ))}
                </NavDropdown>
              </Nav>
              <Nav className="ml-auto">
                <NavDropdown.Divider className="d-lg-none" />
                <Form className="mx-2 my-2 my-lg-0" onSubmit={this.search} inline>
                  <FormControl
                    type="text"
                    placeholder="Search book..."
                    className="mr-sm-2 bg-light"
                    onChange={(e) => this.setState({ keyword: e.target.value })}
                  />
                </Form>
                {hasLogin ? (
                  <>
                    <NavDropdown title="Member" id="basic-nav-dropdown">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <Link to="/favorite" className="dropdown-item">
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
