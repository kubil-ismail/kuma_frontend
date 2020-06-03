import React, { Component, Fragment } from 'react'
import Navbar from '../component/Navbar'
import Card from '../component/Card'
import Footer from '../component/Footer'
import '../assets/sass/page/main.scss'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <main>
          <div className="bootstrap-wrapper">
            <div className="row">
              <div className="col-md-8">
                <Card />
              </div>
              <div className="col-md-4">
                <Card />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </Fragment>
    )
  }
}
