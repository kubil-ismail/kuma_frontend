import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, ButtonGroup, Button, Table, Badge, Modal, Form } from 'react-bootstrap'
import ImageUploader from 'react-images-upload'
import profile from '../assets/img/profile.png'
import axios from 'axios'

// Component
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
// import Alert from '../component/Alert'
// import Loader from '../component/Loader'

export default class Profile extends Component {
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

  onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    const { bookName, bookDesc, file, bookPublished, bookLanguage} = this.state

    formData.append('name', bookName);
    formData.append('description', bookDesc);
    formData.append('picture', file);
    formData.append('genreId', 1);
    formData.append('authorId', 1);
    formData.append('statusId', 1);
    formData.append('published', bookPublished);
    formData.append('language', bookLanguage);
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios.post("http://localhost:8000/book", formData, config)
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }
  
  getBook = async () => {
    const book = await axios.get("http://localhost:8000/book")

    return book.data
  }

  async componentDidMount() {
    const getBook = await this.getBook()

    this.setState({
      books: getBook.data,
      isLoading: false
    })
  }

  render() {
    const { showAddModal, books } = this.state
    return (
      <Fragment>
        <Navbar />
        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={4} className="mb-5">
                <Card className="shadow-sm p-5">
                  <div className="d-flex justify-content-center">
                    <img src={profile} className="w-50 rounded-circle img-thumbnail" alt="profile" />
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
                <Card className="shadow-sm p-5 mb-5">
                  <h3>Favorites</h3>
                  <hr />
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>
                          <Badge pill variant="primary">Detail</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
                <Card className="shadow-sm p-5">
                  <div className="d-flex justify-content-between">
                    <h3>Book Management</h3>
                    <Button onClick={(e) => this.handleAddShow()}>New</Button>
                  </div>
                  <hr />
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((val, key) => (
                        <tr key={key}>
                          <td>
                            <img src={`http://localhost:8000/${val.cover}`} alt={val.name} width="50"/>
                          </td>
                          <td>{val.name}</td>
                          <td>
                            <Badge pill variant="primary" onClick={(e) => this.handleAddShow()}>Detail</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Add Book Modal */}
        <Modal show={showAddModal} onHide={this.handleAddClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>New Book</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.onSubmit}>
            <Modal.Body>
              <img src={this.state.bookCover} className="w-100 h-25" alt={this.state.bookCover} />
              <ImageUploader
                withIcon={true}
                singleImage={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
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
