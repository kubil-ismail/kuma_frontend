import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Dropdown, Pagination } from 'react-bootstrap'
import axios from 'axios'

// Component
import Navbar from "../component/Navbar"
import Footer from '../component/Footer'
import Alert from '../component/Alert'
import Loader from '../component/Loader'
import Book from '../component/Book'

export default class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      books: []
    }
  }

  getAllBook = async () => {
    const result = await axios.get('http://localhost:8000/book?limit=8')
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
      const book = await this.getAllBook()
      this.setState({
        loading: false,
        books: book.data
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  }

  render() {
    const { books, error, loading } = this.state
    return (
      <Fragment>
        <Navbar/>

        <section>
          <Container className="mt-5 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between">
              <div className="head-title">
                <h2 className="font-weight-bold">List Book</h2>
                <div className="divinder-book"></div>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Sort by name</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Sort by lates</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Sort by popularity</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Row>
              {this.isLoading(loading) || this.isError(error)}
              {books.map((val, index) => (
                <Col lg={3} md={6} xs={6} key={index} className="mb-5">
                  <Book cover={val.cover} title={val.name} author={val.author} genre={val.genre} language={val.language} />
                </Col>
              ))}
            </Row>
            <Pagination className="justify-content-center">
              <div className="shadow-sm d-flex">
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis disabled/>
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
              </div>
            </Pagination>
          </Container>
        </section>

        <Footer />
      </Fragment>
    )
  }
}
