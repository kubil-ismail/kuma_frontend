import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, ButtonGroup, Button, Table, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import profile from '../assets/img/profile.png'
import store from 'store2'
import Swal from 'sweetalert2'

// Service
import { bookService } from '../service/bookService'
import { profileService } from '../service/profileService'

// Component
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Alert from '../component/Alert'
// import Loader from '../component/Loader'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      role: null,
      bio: null,
      facebook: null,
      instagram: null,
      twitter: null,
      email: null,
      favorites: [],
      loading: true,
      error: false,
      reviews: []
    }

    this.profileService = new profileService()
    this.bookService = new bookService()
  }

  getProfile = async () => {
    const profile = await this.profileService.getProfile({ id: store('userId') })
    const reviewBook = await this.bookService.getUserReview(store('userId'))
    const { fullname, bio, role_id, email, facebook, twitter, instagram } = profile.data[0]
    this.setState({
      name: fullname,
      role: role_id === 2 ? 'Admin' : 'Member',
      bio: bio,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      email: email,
      edit: false,
      reviews: reviewBook.data.data
    })
  }

  getFavorite = async () => {
    const favorites = await this.profileService.getFavorite({ id: store('userId') })
    this.setState({
      favorites: favorites.data
    })
  }

  componentDidMount = async () => {
    try {
      await this.getProfile()
      await this.getFavorite()
      this.setState({
        loading: false
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: true
      })
      console.log(error)
    }
  }

  showEditForm = () => {
    this.setState({
      edit: true
    })
  }

  closeEditForm = () => {
    this.setState({
      edit: false
    })
  }

  editProfile = async () => {
    const update = await this.profileService.updateProfile(store('userId'), {
      name: this.state.name,
      bio: this.state.bio
    })
    return update
  }

  onEdit = async (e) => {
    e.preventDefault()
    try {
      const update = await this.editProfile()
      if (update.status) {
        Swal.fire({
          title: 'Update profile success',
          text: '',
          icon: 'success'
        })
      } else {
        Swal.fire({
          title: 'Update profile gagal',
          text: '',
          icon: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  editSosmed = async () => {
    const update = await this.profileService.updateSosmed(store('userId'), {
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      instagram: this.state.instagram
    })
    return update
  }

  onEdit2 = async (e) => {
    e.preventDefault()
    try {
      const update = await this.editSosmed()
      if (update.status) {
        Swal.fire({
          title: 'Update profile success',
          text: '',
          icon: 'success'
        })
      } else {
        Swal.fire({
          title: 'Update profile gagal',
          text: '',
          icon: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteFavorite = async (id) => {
    try {
      const deleted = await this.profileService.deleteFavorite({ id: id })
      if (deleted.data.status) {
        Swal.fire({
          title: 'Delete Favorite success',
          text: '',
          icon: 'success'
        }).then(() => this.getFavorite())
      } else {
        Swal.fire({
          title: 'Delete Favorite failed',
          text: '',
          icon: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteReview = async (id) => {
    try {
      const deleted = await this.bookService.deleteReview(id)
      if (deleted.data.status) {
        Swal.fire({
          title: 'Delete Review success',
          text: '',
          icon: 'success'
        }).then(() => this.getProfile())
      } else {
        Swal.fire({
          title: 'Delete Review failed',
          text: '',
          icon: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { edit, name, bio, role, email, facebook, twitter, instagram, favorites, reviews } = this.state
    return (
      <Fragment>
        <Navbar {...this.props} />
        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={4} className="mb-5">
                <Card className="shadow-sm p-5 animate__animated animate__fadeIn">
                  <div className="d-flex justify-content-center">
                    <img src={profile} className="w-50 rounded-circle img-thumbnail" alt="profile" />
                  </div>
                  <div className="text-center">
                    <div className="profile-name font-weight-bold d-block mt-4">{name}</div>
                    <div className="profile-status text-secondary">{role}</div>
                  </div>
                  <div className="profile-desc text-center mt-2">{bio}</div>
                  <ButtonGroup aria-label="edit" className="my-3">
                    <Button variant={edit ? 'dark' : 'primary'} onClick={(e) => this.closeEditForm()}>Favorite</Button>
                    <Button variant={!edit ? 'dark' : 'primary'} onClick={(e) => this.showEditForm()}>Edit Profile</Button>
                  </ButtonGroup>
                  <ul className="pl-3 profile-list">
                    <li><i className="fa fa-envelope mr-2" aria-hidden="true"/> {email} </li>
                    <li><i className="fa fa-facebook-official mr-2" aria-hidden="true"/> {facebook}</li>
                    <li><i className="fa fa-instagram mr-2" aria-hidden="true"/> {instagram}</li>
                    <li><i className="fa fa-twitter-square mr-2" aria-hidden="true"/> {twitter}</li>
                  </ul>
                </Card>
              </Col>
              {edit ? (
                <Col lg={8} className="animate__animated animate__fadeInRight">
                  <Card className="shadow-sm p-5 mb-5 animate__animated animate__fadeInRight">
                    <h3>Edit Profile</h3>
                    <hr />
                    <Form onSubmit={this.onEdit}>
                      <Form.Group controlId="fullname.ControlInput1">
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control type="text" defaultValue={name} onChange={(e) => this.setState({ name: e.target.value })} required />
                      </Form.Group>
                      <Form.Group controlId="bio.ControlTextarea1">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows="3" defaultValue={bio} onChange={(e) => this.setState({ bio: e.target.value })} required />
                      </Form.Group>
                      <Button type="submit">Save</Button>
                    </Form>
                  </Card>

                  <Card className="shadow-sm p-5 mb-5 animate__animated animate__fadeInRight">
                    <h3>Social Media</h3>
                    <hr />
                    <Form onSubmit={this.onEdit2}>
                      <Form.Group controlId="fullname.ControlInput1">
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control type="text" defaultValue={facebook} onChange={(e) => this.setState({ facebook: e.target.value })} required />
                      </Form.Group>
                      <Form.Group controlId="bio.ControlTextarea1">
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control type="text" rows="3" defaultValue={instagram} onChange={(e) => this.setState({ instagram: e.target.value })} required />
                      </Form.Group>
                      <Form.Group controlId="bio.ControlTextarea1">
                        <Form.Label>Twitter</Form.Label>
                        <Form.Control type="text" rows="3" defaultValue={twitter} onChange={(e) => this.setState({ twitter: e.target.value })} required />
                      </Form.Group>
                      <Button type="submit">Save</Button>
                    </Form>
                  </Card>
                </Col>
              ) : (
                  <Col lg={8}>
                    <Card className="shadow-sm p-5 mb-5 animate__animated animate__fadeInRight">
                      <h3>Favorites</h3>
                      <hr />
                      {favorites.length === 0 ? 
                        <Alert variant="warning" message="Favorite book not found" /> 
                      : 
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
                            {favorites.map((res, key) => (
                              <tr key={key}>
                                <td>{++key}</td>
                                <td><img src={`http://localhost:8000/${res.cover}`} alt={res.name} width="50" /></td>
                                <td>{res.name}</td>
                                <td>
                                  <Link className="btn btn-primary mr-2" to={{ pathname: `/detail/${res.name.replace(/\s/g, '-')}`, query: { id: res.id, hasFavorite: true } }}>Detail</Link>
                                  <Button onClick={(e) => this.deleteFavorite(res.book_favorites_id)} variant="danger">Delete</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      }
                    </Card>

                    <Card className="shadow-sm p-5 mb-5 animate__animated animate__fadeInRight">
                      <h3>Review</h3>
                      <hr />
                      {reviews.length ?
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Book</th>
                              <th>Review</th>
                              <th>Manage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {console.log(reviews)}
                            {reviews.map((res, key) => (
                              <tr key={key}>
                                <td>{++key}</td>
                                <td>{res.name}</td>
                                <td>{res.review}</td>
                                <td>
                                  <Button onClick={(e) => this.deleteReview(res.id)} variant="danger">Delete</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        :
                        <Alert variant="warning" message="Review book not found" />
                      }
                    </Card>
                  </Col>
                )}
            </Row>
          </Container>
        </section>

        <Footer />
      </Fragment>
    )
  }
}
