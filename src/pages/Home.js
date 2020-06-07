import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import banner from '../assets/img/banner.png'
import axios from 'axios'

// Component
import Navbar from '../component/Navbar'
import Book from '../component/Book'
import Genre from '../component/Genre'
import Footer from '../component/Footer'
import Alert from '../component/Alert'
import Loader from '../component/Loader'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      books: [],
      genres: []
    }
  }

  getBook = async () => {
    const result = await axios.get('http://localhost:8000/book?limit=4')
    const { data } = result
    return data
  }

  getGenres = async () => {
    const result = await axios.get('http://localhost:8000/genre')
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
      const book = await this.getBook()
      const genre = await this.getGenres()
      this.setState({ 
        loading: false,
        books: book.data,
        genres: genre.data
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  }

  render() {
    const { books, genres, error, loading } = this.state
    return (
      <Fragment>
        <Navbar />

        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={6}>
                <img src={banner} className="w-100 animate__animated animate__pulse animate__infinite" alt="banner" />
              </Col>
              <Col lg={{ span: 5, offset: 1 }} className="d-flex align-items-center mt-5 mt-lg-0 animate__animated animate__fadeInRight">
                <div className="banner-content">
                  <h1 className="font-weight-bold">Kuma Bookstore</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam condimentum aliquam ultrices. Sed bibendum enim sed congue commodo.
                    Nunc suscipit quam quis accumsan congue.
                  </p>
                  <Button>More Info</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="my-5 animate__animated animate__fadeIn">
            <div className="head-title">
              <h2 className="font-weight-bold">Popular Book</h2>
              <div className="divinder"></div>
            </div>
            <Row>
              {this.isLoading(loading) || this.isError(error)}
              {books.map((val,index) => (
                <Col lg={3} md={6} xs={6} key={index} className="mb-5">
                  <Book cover={val.cover} title={val.name} author={val.author} genre={val.genre} language={val.language} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section>
          <Container className="my-5 animate__animated animate__fadeIn">
            <div className="head-title">
              <h2 className="font-weight-bold">Genre Book</h2>
              <div className="divinder"></div>
            </div>
            <Row>
              {this.isLoading(loading) || this.isError(error)}
              {genres.map((val, index) => (
                <Col lg={2} md={4} xs={6} key={index} className="mb-5">
                  <Genre name={val.name}/>
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
