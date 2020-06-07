import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Badge, Button } from 'react-bootstrap'
import Cover from '../assets/img/cover.jpg'
import axios from 'axios'

// Component
import Navbar from "../component/Navbar"
import Footer from '../component/Footer'
import Alert from '../component/Alert'
import Loader from '../component/Loader'
import Book from '../component/Book'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      similarBooks: []
    }
  }

  getSimilarBook = async () => {
    const result = await axios.get('http://localhost:8000/book?limit=4')
    const { data } = result
    return data
  }

  isLoading = (load) => {
    if (load) {
      return (
        <Col lg={12}>
          <Loader />
        </Col>
      )
    }
  }

  isError = (err) => {
    if (err) {
      return (
        <Col lg={12}>
          <Alert variant="danger" message="Failed get data from server" />
        </Col>
      )
    }
  }

  async componentDidMount() {
    try {
      const SimilarBook = await this.getSimilarBook()
      this.setState({
        loading: false,
        similarBooks: SimilarBook.data
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  }

  render() {
    const { similarBooks, loading, error } = this.state
    return (
      <Fragment>
        <Navbar />

        <div className="banner-cover" style={{ backgroundImage: `url(${Cover})` }}></div>
        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={3}>
                <img src={Cover} className="w-100 rounded shadow-lg mb-5 mb-lg-0" alt="Cover" />
              </Col>
              <Col lg={9}>
                <h2 className="font-weight-bold text-dark">Overlord Vol.1 Undead King</h2>
                <p className="font-weight-bold text-dark">Maruyama Sensei</p>
                <Badge pill variant="primary mr-2 py-2 px-2">Fantasy</Badge>
                <Badge pill variant="dark py-2 px-2">Japan</Badge>
                <p className="mt-3 text-justify text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam odio elit,
                  maximus elementum velit sed, vulputate condimentum risus. Duis pulvinar,
                  sem id pharetra tincidunt, sem risus pharetra mauris, non vulputate justo lacus ut ante.
                  Nunc lobortis turpis mi, nec varius tortor tempus ut. In eros erat,
                  aliquam nec sollicitudin egestas, maximus in turpis. Phasellus eu commodo ante.
                  Donec iaculis dapibus sem. Pellentesque iaculis nibh eget tristique sodales.
                  Praesent blandit finibus enim, at mattis tortor auctor in. Pellentesque eu nisl dolor.
                  Sed bibendum arcu eget est molestie tincidunt. Vestibulum sem risus,
                  vehicula sed lectus vel, lobortis volutpat ex.
                </p>
                <Button className="text-dark">Add to favorite</Button>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="my-5 animate__animated animate__fadeIn">
            <div className="head-title">
              <h2 className="font-weight-bold">Similar Book</h2>
              <div className="divinder"></div>
            </div>
            <Row>
              {this.isLoading(loading) || this.isError(error)}
              {similarBooks.map((val, index) => (
                <Col lg={3} md={6} xs={6} key={index} className="mb-5">
                  <Book cover={val.cover} title={val.name} author={val.author} genre={val.genre} language={val.language} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <Footer />
      </Fragment>
    )
  }
}
