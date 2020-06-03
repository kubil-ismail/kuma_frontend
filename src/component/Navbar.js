import React, { Fragment } from 'react'
import logo from '../assets/img/logo.png'
import '../assets/sass/component/_navbar.scss'

export default function Navbar() {
  return (
    <Fragment>
      <header>
        <nav>
          <div className="brand">
            <img src={logo} alt="Logo" width="100"/>
          </div>
          <form method="get" className="search">
            <input type="text" placeholder="Cari buku..."/>
          </form>
          <div className="nav-auth">
            <button className="btn-outline-primary">Login</button>
            <button className="btn-primary">Daftar</button>
          </div>
        </nav>
      </header>
    </Fragment>
  )
}
