import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import store from 'store2'

// Service
import { authService } from '../service/authService'

//Component 
import Navbar from '../component/Navbar'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      loading: false
    }
    this.authService = new authService()
  }

  onLogin = async () => {
    const login = await this.authService.login(this.state)
    return login
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    try {
      const login = await this.onLogin()
      this.setState({ loading: false })
      if (login.status === 200) {
        const {role, apiKey} = login.data.data
        if (role == 2) {
          store({ apikey: apiKey, role: role, login: true, adminLogin: true, pin: '070402' })
        } else {
          store({ apikey: apiKey, role: role, login: true })
        }
        Swal.fire({
          title: 'Login Success',
          text: 'Welcome to kuma book',
          icon: 'success'
        }).then(() => {
          window.location.href = "/profile"
        })
      } else {
        Swal.fire({
          title: login.data.message,
          text: 'Check your email and password',
          icon: 'error'
        })
      }
    } catch (error) {
      this.setState({ loading: false })
      Swal.fire({
        title: 'Account not registered',
        text: 'Check your email and password',
        icon: 'error'
      })
    }
  }

  render() {
    const { loading } = this.state
    return (
      <Fragment>
        <div className="d-lg-none">
          <Navbar />
        </div>
        <Container fluid>
          <Row className="no-gutter">
            <Col md={4} lg={5} className="d-none d-md-flex bg-image"></Col>
            <Col md={12} lg={7}>
              <div className="login d-lg-flex align-items-center py-5 mt-0 mt-lg-5">
                <Container>
                  <Row>
                    <Col md={9} lg={8} className="mx-auto">
                      <h3 className="login-heading mb-4">Welcome back!</h3>
                      <Form onSubmit={this.onSubmit}>
                        <Form.Group className="form-label-group" controlId="inputEmail">
                          <Form.Control type="email" placeholder="Email address" onChange={(e) => this.setState({ email: e.target.value })} required autoFocus />
                          <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-label-group" controlId="inputPassword">
                          <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} required />
                          <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <div className="custom-control custom-checkbox mb-3">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                        </div>

                        <Button className="btn-lg btn-block btn-login mb-2" type="submit" disabled={loading}>
                          {loading ? 'Loading…' : 'Login'}
                        </Button>

                        <div className="text-center">
                          <Link className="small" to="/sign-up">Create new account</Link>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}
