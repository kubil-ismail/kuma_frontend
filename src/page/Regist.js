import React, { Component, Fragment } from 'react'
import '../assets/sass/page/regist.scss'

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
        <div className="register">
          <div class="cover">
            <div class="text">
              <div class="quote">
                Book is a Window <br /> to the World
              </div>
              <div class="watermark">
                Photo by Mark Pan4ratte on Unsplash
              </div>
            </div>
          </div>
          <div class="form">
            <div class="brand">
              <div class="logo">
                <img src="bookshelf.png" alt="logo" />
              </div>
            </div>
            <div class="form-register">
              <div class="greetings">
                <div class="title">Register</div>
                <div class="subtitle">Welcome back, <br /> Please Login to Your Account</div>
                <form class="input">
                  <label class="username">
                    <div>User Name</div>
                    <input type="text" onChange={(e) => this.setState({ username: e.target.value })}/>
                  </label>
                  <label class="fullname">
                    <div>Full Name</div>
                    <input type="text" onChange={(e) => this.setState({ fullname: e.target.value })}/>
                  </label>
                  <label class="email">
                    <div>Email Address</div>
                    <input type="email" onChange={(e) => this.setState({ email: e.target.value })}/>
                  </label>
                  <label class="password">
                    <div>Password</div>
                    <input type="password" onChange={(e) => this.setState({ password: e.target.value })}/>
                  </label>
                  <div class="submit">
                    <button type="submit" class="signup">SignUp</button>
                    <button type="button" class="login">Login</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="tnc">
              <div class="agreement">By signing up, you agree to Book’s</div>
              <div class="link">
                <a href="#tnc">Terms and Conditions</a>
                <a>&</a>
                <a href="#p">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
