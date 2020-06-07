import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import profile from '../assets/img/profile.png'
// import axios from 'axios'

// Component
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Alert from '../component/Alert'
import Loader from '../component/Loader'

export default class Profile extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={4} className="mb-5">
                <Card className="shadow-sm p-5">
                  <div className="d-flex justify-content-center">
                    <img src={profile} className="w-50 rounded-circle img-thumbnail" alt="profile"/>
                  </div>
                  <div className="text-center">
                    <div className="profile-name font-weight-bold d-block mt-4">Bilkis Ismail</div>
                    <div className="profile-status text-secondary">Member</div>
                  </div>
                  <div className="profile-desc text-center mt-2">lorem ipsum sir dolor amet, lorem ipsum sir dolor amet</div>
                  <ButtonGroup aria-label="edit" className="my-3">
                    <Button variant="primary">Edit Profile</Button>
                    <Button variant="dark">Upload Foto</Button>
                  </ButtonGroup>
                  <ul className="px-3">
                    <li>kumabookstore@Gmail.com</li>
                    <li>facebook.com</li>
                    <li>@kumabook</li>
                    <li>@kumabook</li>
                  </ul>
                </Card>
              </Col>
              <Col lg={8}>
                <Card className="shadow-sm p-5">
                  <h3>Favorites</h3>
                  <hr/>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer/>
      </Fragment>
    )
  }
}
