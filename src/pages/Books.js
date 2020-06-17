import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import Pagination from "react-js-pagination"

// Service
import { bookService } from '../service/bookService'

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
      books: [],
      options: [],
      page: 1,
      sort: 1
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

  async componentDidMount() {
    try {
      let search = this.props.location.search ? this.props.location.search + '&limit=8' : '?limit=8'
      const book = await this.bookService.getAllBook(search)
      this.setState({
        loading: false,
        books: book.data,
        options: book.options
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  }

  handlePageChange = async (pageNumber) => {
    try {
      let search = this.props.location.search
        ? this.props.location.search + `&limit=8&page=${pageNumber}`
        : `?limit=8&page=${pageNumber}`

      const book = await this.bookService.getAllBook(search)
      this.setState({
        page: pageNumber,
        books: book.data,
        options: book.options
      })
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  onSort = (sort) => {
    const { books } = this.state
    if (parseInt(sort, 10) === 2) {
      books.sort(function (a, b) {
        return a - b
      })
      this.setState({ books: books, sort: 2 })
    } else {
      books.sort(function (a, b) {
        return a - b
      })
      this.setState({ books: books, sort: 1 })
    }
  }

  render() {
    const { books, error, loading, options, sort } = this.state
    return (
      <Fragment>
        <Navbar {...this.props} />

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
                  <Dropdown.Item active={sort === 1 ? true : false} onClick={() => this.onSort('1')}>Sort by name A - Z</Dropdown.Item>
                  <Dropdown.Item active={sort === 2 ? true : false} onClick={() => this.onSort('2')}>Sort by name Z - A</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Row>
              {this.isLoading(loading) || this.isError(error)}
              {books.map((val, index) => (
                <Col lg={3} md={6} xs={6} key={index} className="mb-5">
                  <Book id={val.id} cover={val.cover} title={val.name} author={val.author} genre={val.genre} language={val.language} />
                </Col>
              ))}
            </Row>
            <Pagination
              activePage={options.page}
              itemsCountPerPage={options.perPage}
              totalItemsCount={parseInt(options.totalData, 10)}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
              itemClass="page-item"
              linkClass="page-link"
              hideNavigation={true}
            />
          </Container>
        </section>

        <Footer />
      </Fragment>
    )
  }
}
