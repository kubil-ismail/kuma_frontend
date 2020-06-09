import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Badge, Button, Form } from 'react-bootstrap'
import store from 'store2'
import ImageUploader from 'react-images-upload'
import Swal from 'sweetalert2'

// Service
import { bookService } from '../../service/bookService'

// Component
import Navbar from "../../component/Navbar"
import Footer from '../../component/Footer'
import Alert from '../../component/Alert'
import Loader from '../../component/Loader'

export default class adminDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      bookName: null,
      bookDesc: null,
      bookGenre: null,
      bookAuthor: null,
      bookPublished: null,
      bookLanguage: null,
      bookDetail: []
    }
    if (this.props.location.query) {
      store({ bookId: this.props.location.query.id })
    }
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

  onDrop = async (event) => {
    try {
      await this.bookService.editCover(event[0], store('bookId'))
      Swal.fire({
        title: 'Edit Cover success',
        text: '',
        icon: 'success'
      }).then(() => window.location.reload())
    } catch (error) {
      Swal.fire({
        title: 'Edit Failed',
        text: 'Make sure the code is correct',
        icon: 'error'
      })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await this.bookService.editBook(this.state, store('bookId'))
      Swal.fire({
        title: 'Edit success',
        text: '',
        icon: 'success'
      }).then(() => window.location.reload())
    } catch (error) {
      Swal.fire({
        title: 'Edit Failed',
        text: 'Make sure the code is correct',
        icon: 'error'
      })
    }
  }

  deleteBook = async () => {
    try {
      this.bookService.deletBook(store('bookId'))
      Swal.fire({
        title: 'Delete success',
        text: '',
        icon: 'success'
      }).then(() => this.props.history.push("/books"))
    } catch (error) {
      Swal.fire({
        title: 'Delete Failed',
        text: 'Make sure the code is correct',
        icon: 'error'
      })
    }
  }

  async componentDidMount() {
    try {
      const getBookDetail = await this.bookService.getBookDetail(store('bookId'))
      this.setState({
        loading: false,
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
    const { bookDetail, loading, error } = this.state
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
                  <Button className="ml-3" variant="danger" onClick={(e) => this.deleteBook()}>Delete Book</Button>
                </Col>
              </Row>
            )}
          </Container>
        </section>

        <section>
          <Container className="my-5 animate__animated animate__fadeIn">
            <div className="head-title">
              <h2 className="font-weight-bold">Edit Book</h2>
              <div className="divinder"></div>
            </div>
            <Form onSubmit={this.onSubmit}>
              <Row>
                  <Col lg={5}>
                      <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                  </Col>
                  <Col lg={7}>
                    <Form.Group controlId="bookName">
                      <Form.Label>Book Name</Form.Label>
                      <Form.Control type="text" placeholder="Book Name..." onChange={(e) => this.setState({ bookName: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="bookLanguage">
                      <Form.Label>Language</Form.Label>
                      <Form.Control type="text" placeholder="Language..." onChange={(e) => this.setState({ bookLanguage: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="bookDate">
                      <Form.Label>Publish Date</Form.Label>
                      <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={(e) => this.setState({ bookPublished: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="bookGenre">
                      <Form.Label>Genre</Form.Label>
                      <Form.Control as="select" onChange={(e) => this.setState({ bookGenre: e.target.value })} >
                        <option>1</option>
                        <option>2</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="bookAuthor">
                      <Form.Label>Author</Form.Label>
                      <Form.Control as="select" onChange={(e) => this.setState({ bookAuthor: e.target.value })} >
                        <option>1</option>
                        <option>2</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows="5" onChange={(e) => this.setState({ bookDesc: e.target.value })} />
                    </Form.Group>

                    <Button className="mb-3 w-25 ml-auto" type="submit">Update</Button>
                  </Col>
              </Row>
            </Form>
          </Container>
        </section>

        <Footer />
      </Fragment>
    )
  }
}
