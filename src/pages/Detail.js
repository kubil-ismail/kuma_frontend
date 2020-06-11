import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Badge, Button } from 'react-bootstrap'
import store from 'store2'
import Swal from 'sweetalert2'

// Service
import { bookService } from '../service/bookService'
import { profileService } from '../service/profileService'

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

    this.profileService = new profileService()
    this.bookService = new bookService()
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
      const getBookDetail = await this.bookService.getBookDetail(store('bookId'))
      const SimilarBook = await this.bookService.getBook()
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

  addFavorite = async () => {
    try {
      const favorites = await this.profileService.addFavorite({
        id: store('userId'),
        bookId: store('bookId')
      })
      if (favorites.data.status) {
        Swal.fire({
          title: 'Add favorite success',
          text: '',
          icon: 'success'
        })
      } else {
        Swal.fire({
          title: 'Add favorite failed',
          text: '',
          icon: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  onSimilarBook = async (id) => {
    try {
      store({ 'bookId': id })
      const getBookDetail = await this.bookService.getBookDetail(store('bookId'))
      const SimilarBook = await this.bookService.getBook()
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
                  <img src={`http://localhost:8000/${bookDetail.cover}`} className="w-100 animate__animated animate__fadeInLeft rounded shadow-lg mb-5 mb-lg-0" alt="Cover" />
                </Col>
                <Col lg={9} className="animate__animated animate__fadeIn">
                  <h2 className="font-weight-bold text-dark">{bookDetail.name}</h2>
                  <p className="font-weight-bold text-dark">{bookDetail.author}</p>
                  <Badge pill variant="primary mr-2 py-2 px-2">{bookDetail.genre}</Badge>
                  <Badge pill variant="dark py-2 px-2">{bookDetail.language}</Badge>
                  <p className="mt-3 text-justify text-dark">{bookDetail.description}</p>
                  {store('login') ? <Button className="text-dark" onClick={(e) => this.addFavorite()}>Add to favorite</Button> : null}
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
                  <div onClick={(e) => this.onSimilarBook(val.id)}>
                    <Book
                      id={val.id}
                      cover={val.cover}
                      title={val.name}
                      author={val.author}
                      genre={val.genre}
                      language={val.language}
                    />
                  </div>
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
