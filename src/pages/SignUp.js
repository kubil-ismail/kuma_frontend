import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import store from 'store2'
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
      signUp: store('signUp') || false
    }
  }

  onsignUp = async () => {
    const { email, password } = this.state

    const url = 'http://localhost:8000/auth/signIn'
    const login = await axios.post(url, {
      email: email,
      password: password
    })

    const { data } = login.data
    return data
  }

  onActivate = async (e) => {
    e.preventDefault()

    try {
      const { email, code } = this.state
      const url = 'http://localhost:8000/auth/activate'
      
      await axios.post(url, {
        email: email,
        code: code
      })

      store({ signUp: true})

      Swal.fire({
        title: 'Activate Success',
        text: 'Login to continue',
        icon: 'success'
      }).then(() => {
        this.props.history.push("/login")
      })
    } catch (error) {
      Swal.fire({
        title: 'Activate Failed',
        text: 'Make sure the code is correct',
        icon: 'error'
      })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { email, password, password2 } = this.state

    if (password === password2) {
      try {
        await this.onsignUp()
        store({ sendCode: true, email: email})

        Swal.fire({
          title: 'Sign In Success',
          text: 'Check your email for code activation',
          icon: 'success'
        }).then(() => {
          window.location.href = '/sign-up'
        })
      } catch (error) {
        Swal.fire({
          title: 'Sign In Failed',
          text: 'Make sure the data is correct',
          icon: 'error'
        })
      }
    } else {
      Swal.fire({
        title: 'Password not match',
        text: 'Make sure the data is correct',
        icon: 'error'
      })
    }

  }

  render() {
    const { sendCode } = this.state
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

                            <Button className="btn-lg btn-block btn-login mb-2" type="submit">Activate</Button>
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

                            <Button className="btn-lg btn-block btn-login mb-2" type="submit">Sign Up</Button>
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
