import React, { Component, Fragment } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import logo from '../assets/img/logo.png'
import '../assets/sass/page/login.scss'
import { Link } from 'react-router-dom'

export default class Regist extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      fullname: null,
      username: null,
      email: null,
      password: null
    }
  }

  render() {
    return (
      <Fragment>
        <Row className='h-100 no-gutters'>
          <Col lg={7} className='login-cover'>
            <div className='d-flex flex-column justify-content-between login-overlay w-100 h-100'>
              <h1 className='text-white'>Book is a window to the world</h1>
              <div className='text-white'>Photo by Mark Pan4ratte on Unsplash</div>
            </div>
          </Col>
          <Col lg={5}>
            <div className='d-flex flex-column w-100 h-100'>
              <div className='d-flex justify-content-end'>
                <img className='p-3' src={logo} alt='Logo' width="100" />
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <Form>
                  <h1>Register</h1>
                  <p>Welcome Back, Please Regist to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Fullname</div>
                      <Input type='text' />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Username</div>
                      <Input type='text' />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type='email' />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Password</div>
                      <Input type='password' />
                    </Label>
                  </FormGroup>
                  <div className='mt-2'>
                    <Button >Sign Up</Button>
                    <Link to="/login">
                      <Button outline className='ml-2' href="/login">Login</Button>
                    </Link>
                  </div>
                </Form>
              </div>
              <div className='d-flex flex-column p-5'>
                <div>By signing up, you agree to Book’s</div>
                <div>Terms and Conditions &amp; Privacy Policy</div>
              </div>
            </div>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
