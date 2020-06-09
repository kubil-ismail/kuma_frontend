import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Badge, Button } from 'react-bootstrap'
import axios from 'axios'
import store from 'store2'

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
      similarBooks: [],
      bookDetail: []
    }
    if (this.props.location.query) {
      store({ bookId: this.props.location.query.id })
    }

    console.log(this.props.location)
  }

  getSimilarBook = async () => {
    const result = await axios.get('http://localhost:8000/book?limit=4')
    const { data } = result
    return data
  }

  getBookDetail = async () => {
    const result = await axios.get(`http://localhost:8000/book/${store('bookId')}`)
    const { data } = result
    return data.data[0]
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
      const getBookDetail = await this.getBookDetail()
      const SimilarBook = await this.getSimilarBook()
      this.setState({
        loading: false,
        similarBooks: SimilarBook.data,
        bookDetail: getBookDetail
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  }

  render() {
    const { similarBooks, bookDetail, loading, error } = this.state
    return (
      <Fragment>
        <Navbar />

        <div className="banner-cover" style={{ backgroundImage: `url(http://localhost:8000/${bookDetail.cover})` }}></div>
        <section>
          <Container className="mt-5">
              {this.isLoading(loading) || this.isError(error)}
              {loading === false && error === false && (
                <Row>
                  <Col lg={3}>
                    <img src={`http://localhost:8000/${bookDetail.cover}`} className="w-100 rounded shadow-lg mb-5 mb-lg-0" alt="Cover" />
                  </Col>
                  <Col lg={9}>
                    <h2 className="font-weight-bold text-dark">{bookDetail.name}</h2>
                    <p className="font-weight-bold text-dark">{bookDetail.author}</p>
                    <Badge pill variant="primary mr-2 py-2 px-2">{bookDetail.genre}</Badge>
                    <Badge pill variant="dark py-2 px-2">{bookDetail.language}</Badge>
                    <p className="mt-3 text-justify text-dark">{bookDetail.description}</p>
                    <Button className="text-dark">Add to favorite</Button>
                  </Col>
                </Row>
              )}
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
                  <Book id={val.id} cover={val.cover} title={val.name} author={val.author} genre={val.genre} language={val.language} />
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
