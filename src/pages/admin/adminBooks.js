import React, { Component, Fragment } from 'react'
import { Container, Card, Table, Button, Form, FormControl, Modal, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload'
import Swal from 'sweetalert2'

// Service
import { bookService } from '../../service/bookService'

import Navbar from '../../component/Navbar'

export default class adminBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      bookName: null,
      bookDesc: null,
      bookCover: null,
      bookGenre: null,
      bookAuthor: null,
      bookPublished: null,
      bookLanguage: null,
      file: null,
      books: []
    }
    this.bookService = new bookService()
    this.onSubmit = this.onSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  handleAddClose = () => {
    this.setState({ showAddModal: false })
  }

  handleAddShow = () => {
    this.setState({ showAddModal: true })
  }

  onDrop = (event) => {
    this.setState({
      bookCover: URL.createObjectURL(event[0]),
      file: event[0]
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      await this.bookService.addBook(this.state)
      Swal.fire({
        title: 'Add Book Success',
        text: '',
        icon: 'success'
      })
    } catch (error) {
      Swal.fire({
        title: 'Add Book Failed',
        text: '',
        icon: 'error'
      })
    }
  }

  onSearch = (e) => {
    e.preventDefault()
    window.location.href = `/books?search=${this.state.keyword}`
  }

  async componentDidMount() {
    try {
      let search = this.props.location.search ? this.props.location.search + '&limit=8' : '?limit=8'
      const getBook = await this.bookService.getAllBook(search)

      this.setState({
        books: getBook.data,
        isLoading: false
      })
    } catch (error) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const { showAddModal, books } = this.state
    return (
      <Fragment>
        <Navbar />
        <section>
          <Container className="mt-5">
            <Card className="p-3">
              <div className="d-flex">
                <Form onSubmit={this.onSearch}>
                  <FormControl type="text" placeholder="Search book..." className="mr-sm-2 w-100" onChange={(e) => this.setState({ keyword: e.target.value })} />
                </Form>
                <Button className="mb-3 w-25 ml-auto" onClick={(e) => this.handleAddShow()}>New</Button>
              </div>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Book Name</th>
                    <th>Status</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {books.map((val, key) => (
                    <tr key={key}>
                      <td>
                        <img src={`http://localhost:8000/${val.cover}`} alt={val.name} width="50" />
                      </td>
                      <td>{val.name}</td>
                      <td>{val.status}</td>
                      <td>
                        <Link className="btn btn-primary" to={{ pathname: `/detail/${val.name.replace(/\s/g, '-')}`, query: { id: val.id } }}>Detail</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>

            <Modal show={showAddModal} onHide={this.handleAddClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>New Book</Modal.Title>
              </Modal.Header>
              <Form onSubmit={this.onSubmit}>
                <Modal.Body>
                  <Row>
                    <Col lg={4}>
                      {this.state.bookCover ?
                        <img src={this.state.bookCover} className="w-100 h-50" alt={this.state.bookCover} />
                        : null
                      }
                      <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                    </Col>
                    <Col lg={8}>
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
          </Container>
        </section>
      </Fragment>
    )
  }
}
