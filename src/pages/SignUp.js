import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import store from 'store2'

// Service
import { authService } from '../service/authService'

// Component
import Navbar from '../component/Navbar'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: store('email') || null,
      password: null,
      password2: null,
      code: null,
      sendCode: store('sendCode') || false,
      signUp: store('signUp') || false,
      loading: false
    }
    this.authService = new authService()
    // store(false)
  }

  onsignUp = async () => {
    return await this.authService.signUp(this.state)
  }

  onActivate = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const activate = await this.authService.activate(this.state)
    this.setState({ loading: false })
    if (activate) {
      // store({ signUp: true})
      Swal.fire({
        title: 'Activate Success',
        text: 'Login to continue',
        icon: 'success'
      }).then(() => {
        // this.props.history.push("/login")
      })
    } else {
      Swal.fire({
        title: 'Activate Failed',
        text: 'Make sure the code is correct',
        icon: 'error'
      })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { email, password, password2 } = this.state

    if (password === password2) {
      try {
        const signUp = await this.onsignUp()
        this.setState({ loading: false })
        if (signUp.status === 200) {
          store({ sendCode: true, email: email })

          Swal.fire({
            title: 'Sign In Success',
            text: 'Check your email for code activation',
            icon: 'success'
          }).then(() => {
            window.location.href = '/sign-up'
          })
        } else {
          Swal.fire({
            title: signUp.data.message,
            text: 'Make sure the data is correct',
            icon: 'error'
          })
        }
      } catch (error) {
        this.setState({ loading: false })
        Swal.fire({
          title: 'Sign In Failed',
          text: 'Make sure the data is correct',
          icon: 'error'
        })
      }
    } else {
      this.setState({ loading: false })
      Swal.fire({
        title: 'Password not match',
        text: 'Make sure the data is correct',
        icon: 'error'
      })
    }

  }

  render() {
    const { sendCode, loading } = this.state
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
                      {sendCode ? (
                        <Fragment>
                          <h3 className="login-heading mb-4">Activate Account</h3>
                          <Form onSubmit={this.onActivate}>
                            <Form.Group className="form-label-group" controlId="inputEmail">
                              <Form.Control type="text" placeholder="Code" onChange={(e) => this.setState({ code: e.target.value })} required />
                              <Form.Label>Code</Form.Label>
                            </Form.Group>

                            <Button className="btn-lg btn-block btn-login mb-2" type="submit" disabled={loading}>
                              {loading ? 'Loading…' : 'Activate'}
                            </Button>
                            <div className="text-center">
                              <Link className="small" to="/login">Already Have Account ??</Link>
                            </div>
                          </Form>
                        </Fragment>
                      ) : (
                          <Fragment>
                            <h3 className="login-heading mb-4">Sign Up</h3>
                            <Form onSubmit={this.onSubmit}>
                              <Form.Group className="form-label-group" controlId="inputEmail">
                                <Form.Control type="email" placeholder="Email address" onChange={(e) => this.setState({ email: e.target.value })} required />
                                <Form.Label>Email address</Form.Label>
                              </Form.Group>

                              <Form.Group className="form-label-group" controlId="inputPassword">
                                <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} required />
                                <Form.Label>Password</Form.Label>
                              </Form.Group>

                              <Form.Group className="form-label-group" controlId="inputPassword2">
                                <Form.Control type="password" placeholder="Password Confirmation" onChange={(e) => this.setState({ password2: e.target.value })} required />
                                <Form.Label>Password Confirmation</Form.Label>
                              </Form.Group>

                              <Button className="btn-lg btn-block btn-login mb-2" type="submit" disabled={loading}>
                                {loading ? 'Loading…' : 'Sign Up'}
                              </Button>
                              <div className="text-center">
                                <Link className="small" to="/login">Already Have Account ??</Link>
                              </div>
                            </Form>
                          </Fragment>
                        )}
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
