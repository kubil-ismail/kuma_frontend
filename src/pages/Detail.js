import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Badge, Button, Form, Modal } from 'react-bootstrap'
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
import Review from '../component/Review'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      url: 'http://localhost:8000/',
      similarBooks: [],
      bookDetail: [],
      review: [],
      showAddModal: false,
      bookReview: null
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
      const SimilarBook = await this.bookService.getGenreBook(getBookDetail.genre_id, '?limit=4')
      const reviewBook = await this.bookService.getReview(store('bookId'))
      this.setState({
        loading: false,
        similarBooks: SimilarBook.data,
        bookDetail: getBookDetail,
        review: reviewBook.data.data
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
    this.setState({ loading: true })
    try {
      store({ 'bookId': id })
      const getBookDetail = await this.bookService.getBookDetail(store('bookId'))
      const SimilarBook = await this.bookService.getGenreBook(getBookDetail.genre_id, '?limit=4')
      const reviewBook = await this.bookService.getReview(store('bookId'))
      this.setState({
        loading: false,
        similarBooks: SimilarBook.data,
        bookDetail: getBookDetail,
        review: reviewBook.data.data
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  }

  handleAddClose = () => {
    this.setState({ showAddModal: false })
  }

  handleAddShow = () => {
    this.setState({ showAddModal: true })
  }

  onReview = async (e) => {
    this.setState({ loading: true })
    try {
      e.preventDefault()
      Swal.fire({
        title: 'Review Book success',
        text: 'Thanks for review',
        icon: 'success'
      })
      const data = {
        book_id: store('bookId'),
        user_id: store('userId'),
        review: this.state.bookReview,
        rating: 10
      }
      await this.bookService.addReview(data)
      const reviewBook = await this.bookService.getReview(store('bookId'))
      this.setState({
        loading: false,
        review: reviewBook.data.data,
        showAddModal: false
      })
    } catch (error) {
      Swal.fire({
        title: 'Review Book failed',
        text: 'Please try again later',
        icon: 'error'
      })
    }
  }

  render() {
    const { similarBooks, bookDetail, loading, error, review, showAddModal } = this.state
    return (
      <Fragment>
        <Navbar />

        <div className="banner-cover" style={{ backgroundImage: `url(${this.state.url}${bookDetail.cover})` }}></div>
        <section>
          <Container className="mt-5">
            {this.isLoading(loading) || this.isError(error)}
            {loading === false && error === false && (
              <Row>
                <Col lg={3}>
                  <img src={`${this.state.url}${bookDetail.cover}`} className="w-100 animate__animated animate__fadeInLeft rounded shadow-lg mb-5 mb-lg-0" alt="Cover" />
                </Col>
                <Col lg={9} className="animate__animated animate__fadeIn">
                  <h2 className="font-weight-bold text-dark">{bookDetail.name}</h2>
                  <p className="font-weight-bold text-dark">{bookDetail.author}</p>
                  <Badge pill variant="primary mr-2 py-2 px-2">{bookDetail.genre}</Badge>
                  <Badge pill variant="dark py-2 px-2">{bookDetail.language}</Badge>
                  <p className="mt-3 text-justify text-dark">{bookDetail.description}</p>
                  {
                    store('login')
                      ? <div>
                        <Button className="text-dark" onClick={(e) => this.addFavorite()}>Add to favorite</Button>
                        <Button variant="dark" className="ml-2" onClick={(e) => this.handleAddShow()}>Add Review</Button>
                      </div>
                      : null
                  }
                </Col>
              </Row>
            )}
          </Container>
        </section>

        <section>
          <Container className="my-5 animate__animated animate__fadeIn">
            <div className="head-title">
              <h2 className="font-weight-bold">Review Book</h2>
              <div className="divinder"></div>
            </div>
            <Row>
              {this.isLoading(loading) || this.isError(error)}
              {console.log(review)}
              {
                review.length
                  ? review.map((val, key) => (
                    <Col lg={12} key={key}>
                      <Review review={val.review} user={val.fullname} date={val.created_at} />
                    </Col>
                  )) :
                  <Col lg={12}>
                    <Alert variant="warning" message="Review not found" />
                  </Col>
              }
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

        <Modal show={showAddModal} onHide={this.handleAddClose}>
          <Modal.Header closeButton>
            <Modal.Title>Review Book</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.onReview}>
            <Modal.Body>
              <Row>
                <Col lg={12}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Review</Form.Label>
                    <Form.Control as="textarea" rows="5" onChange={(e) => this.setState({ bookReview: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleAddClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add New
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Footer />
      </Fragment>
    )
  }
}
