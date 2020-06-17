import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Container, Button, NavDropdown } from 'react-bootstrap'
import store from 'store2'
import logo from '../assets/img/logo.png'

// Service
import { genreService } from '../service/genreService'

export default class Navbars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLogin: store('login') || false,
      keyword: null,
      genres: []
    }
    this.genreService = new genreService()
  }

  logout = () => {
    store({ exit: true })
    this.props.history.push({
      pathname: '/login'
    })
  }

  onSearch = (e) => {
    e.preventDefault()
    this.props.history.push({
      pathname: '/books',
      search: `?search=${this.state.keyword}`
    })
  }

  async componentDidMount() {
    try {
      const genre = await this.genreService.getGenre()
      this.setState({
        genres: genre.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { hasLogin, genres } = this.state
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
                <NavDropdown title="Genre" id="basic-nav-dropdown">
                  {genres ? genres.map((val, key) => (
                    <Link key={key} className={store('genreId') === val.id ? "dropdown-item active" : "dropdown-item"} to={{ pathname: `/books/${val.name}`, query: { genreId: val.id } }}>{val.name}</Link>
                  )) : null}
                </NavDropdown>
              </Nav>
              <Nav className="ml-auto">
                <Form onSubmit={this.onSearch} className="d-lg-flex d-none" inline>
                  <FormControl type="text" placeholder="Search book..." className="mr-sm-2 w-100" onChange={(e) => this.setState({ keyword: e.target.value })} />
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
          <Form onSubmit={this.onSearch} className="w-100 mt-4 mb-2 px-2 d-lg-none">
            <FormControl type="text" placeholder="Search book..." className="mr-sm-2 w-100" onChange={(e) => this.setState({ keyword: e.target.value })} />
          </Form>
        </Navbar>
        <div className="nav-margin-md d-lg-none"></div>
        <div className="nav-margin-lg d-lg-block d-none"></div>
      </Fragment>
    )
  }
}
