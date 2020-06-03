import React, { Component, Fragment } from 'react'
import '../assets/sass/page/login.scss'

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

export default class Regist extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <div class="wrapper fadeInDown">
          <div id="formContent">
            <h2 class="inactive underlineHover">Login </h2>
            <h2 class="active">Daftar </h2>
            <form>
              <input type="text" id="login" name="name" placeholder="Nama Lengkap" />
              <input type="text" id="login" name="email" placeholder="email" />
              <input type="password" id="password" name="password" placeholder="password" />
              <input type="submit" class="fadeIn fourth" value="Log In" />
            </form>
            <div id="formFooter">
              <a class="underlineHover" href="/login">Sudah Punya Akun ?</a>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  }
}
