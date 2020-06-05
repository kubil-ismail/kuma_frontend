import React, { Component, Fragment } from 'react'
import '../assets/sass/page/home.scss'
import { Container, Row, Col, Spinner } from 'reactstrap';
import Axios from 'axios'

// Component
import cover from '../assets/img/covernya.png'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import Card from '../component/Card'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    Axios.get('http://localhost:8000/book?page=3')
      .then(res => this.setState({ data: res.data.data }))
  }

  render() {
    const { data } = this.state
    return (
      <Fragment>
        <Row className='no-gutters'>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col lg={9}>
            <Navbar />

            <Container>
              <Row className="content">
                <Col lg={12} className="mb-5">
                  <img src={cover} className="w-100 rounded"></img>
                </Col>
              </Row>
              <Row>
                {data.length === 0 && (
                  <div className="mx-auto">
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="primary" />
                  </div>
                )}
                {data.map((val, key) => (
                  <Col lg={4} key={key} className="mb-4">
                    <Card id={val.id} title={val.name} desc={val.description} cover={val.cover}/>
                  </Col>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
