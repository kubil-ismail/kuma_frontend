import React, { Component, Fragment } from 'react'
import '../assets/sass/page/login.scss'

export default class Login extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      email: null,
      password: null
    }
  }

  render() {
    return (
      <Fragment>
        <div className="login">
          <div className="cover">
            <div className="text">
              <div className="quote">
                Book is a Window <br /> to the World
              </div>
              <div className="watermark">
                Photo by Mark Pan4ratte on Unsplash
              </div>
            </div>
          </div>
          <div className="form">
            <div className="brand">
              <div className="logo">
                <img src="bookshelf.png" alt="logo" />
              </div>
            </div>
            <div className="form-login">
              <div className="greetings">
                <div className="title">Login</div>
                <div className="subtitle">Welcome back, <br /> Please Login to Your Account</div>
                <form className="input">
                  <label className="email">
                    <div>Email Address</div>
                    <input type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                  </label>
                  <label className="password">
                    <div>Password</div>
                    <input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                  </label>
                  <div className="option">
                    <label className="remember">
                      <input type="checkbox" />
                      <span>Remember Me</span>
                    </label>
                    <div className="forgot">
                      <a href="#forgot">Forgot Password</a>
                    </div>
                  </div>
                  <div className="submit">
                    <button type="submit" className="login">Login</button>
                    <button type="button" className="signup">SignUp</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="tnc">
              <div className="agreement">By signing up, you agree to Book’s</div>
              <div className="link">
                <a href="/trems-and-conditions">Terms and Conditions</a>
                <a>&</a>
                <a href="/privacy-policy">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
