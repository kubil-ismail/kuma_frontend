import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Table, Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

// Service
import { genreService } from '../../service/genreService'

// Component
import Navbar from '../../component/Navbar'

export default class adminGenre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: true,
      showAddModal: false,
      genres: [],
      genreName: null,
      genreId: null,
      edit: false
    }
    this.genreService = new genreService()
  }

  // Get all data
  getData = async () => {
    try {
      const genres = await this.genreService.getAllGenre()
      this.setState({
        genres: genres.data,
        loading: false,
        error: false
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: false
      })
    }
  }

  // Show modal
  handleAddClose = () => {
    this.setState({ showAddModal: false })
  }

  // Hide modal
  handleAddShow = () => {
    this.setState({ showAddModal: true })
  }

  // Delete single data
  deleteData = async (id) => {
    try {
      await this.genreService.deleteGenre(id)
      Swal.fire({
        title: 'Delete Success',
        text: '',
        icon: 'success'
      }).then(() => this.getData())
    } catch (error) {
      Swal.fire({
        title: 'Delete Failed',
        text: 'Something Wrong',
        icon: 'error'
      })
    }
  }

  // Get data on btn edit clicked
  getSelectData = async (id) => {
    try {
      const select = await this.genreService.getSelectData(id)
      this.setState({
        showAddModal: true,
        genreName: select.name,
        genreId: select.id,
        edit: true
      })
    } catch (error) {
      Swal.fire({
        title: 'Edit Failed',
        text: 'Something Wrong',
        icon: 'error'
      })
    }
  }

  // Send edit data
  onEdit = async (e) => {
    e.preventDefault()
    try {
      await this.genreService.editGenre(this.state)
      Swal.fire({
        title: 'Edit Genre Success',
        text: '',
        icon: 'success'
      }).then(() => {
        this.getData()
        this.setState({
          showAddModal: false,
          edit: false
        })
      })
    } catch (error) {
      Swal.fire({
        title: 'Edit Genre Failed',
        text: '',
        icon: 'error'
      })
    }
  }

  componentDidMount() {
    this.getData()
  }

  onSubmit = async (e) => {
    e.preventDefault()
    if (this.state.edit) {
      this.onEdit(e)
    } else {
      try {
        await this.genreService.addGenre({ genreName: this.state.genreName })
        Swal.fire({
          title: 'Add Genre Success',
          text: '',
          icon: 'success'
        }).then(() => {
          this.getData()
          this.setState({
            showAddModal: false
          })
        })
      } catch (error) {
        Swal.fire({
          title: 'Add Genre Failed',
          text: '',
          icon: 'error'
        })
      }
    }
  }

  render() {
    const { showAddModal, genres } = this.state
    return (
      <Fragment>
        <Navbar {...this.props} />
        <section>
          <Container className="mt-5">
            <Card className="p-3">
              <Button className="mb-3 w-25" onClick={() => this.handleAddShow()}>New</Button>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th width="75%">Genre Name</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {genres.map((val, key) => (
                    <tr key={key}>
                      <td>{val.name}</td>
                      <td>
                        <Link className="btn btn-primary" to={{ pathname: `/books/${val.name}`, query: { genreId: val.id } }}>Detail</Link>
                        <Button variant="warning mx-2 my-2" onClick={() => this.getSelectData(val.id)}>Edit</Button>
                        <Button variant="danger" onClick={() => this.deleteData(val.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>

            <Modal show={showAddModal} onHide={this.handleAddClose} size="md">
              <Modal.Header closeButton>
                <Modal.Title>Genres</Modal.Title>
              </Modal.Header>
              <Form onSubmit={this.onSubmit}>
                <Modal.Body>
                  <Form.Group controlId="bookName">
                    <Form.Label>Genres Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={this.state.genreName}
                      onChange={(e) => this.setState({ genreName: e.target.value })}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleAddClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save
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
