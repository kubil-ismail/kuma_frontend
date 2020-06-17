import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import banner from '../assets/img/banner.png'

// Service
import { connect } from 'react-redux'
import { genreList, bookList } from '../redux/actions/startActions'
import { bookService } from '../service/bookService'
import { genreService } from '../service/genreService'

// Component
import Navbar from '../component/Navbar'
import Book from '../component/Book'
import Genre from '../component/Genre'
import Footer from '../component/Footer'
import Alert from '../component/Alert'
import Loader from '../component/Loader'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      books: [],
      genres: []
    }
    this.bookService = new bookService()
    this.genreService = new genreService()
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
      const book = await this.bookService.getBook()
      const genre = await this.genreService.getGenre()
      this.props.genreList(genre.data)
      this.props.bookList(book.data)
      this.setState({
        loading: false,
        books: this.props.book,
        genres: this.props.genre
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
        <Navbar {...this.props} book={this.props.book}/>

        <section>
          <Container className="mt-5">
            <Row>
              <Col lg={6}>
                <img src={banner} className="w-100 animate__animated animate__pulse animate__infinite" alt="banner" />
              </Col>
              <Col lg={{ span: 5, offset: 1 }} className="d-flex align-items-center mt-5 mt-lg-0 animate__animated animate__fadeInRight">
                <div className="banner-content">
                  <h1 className="font-weight-bold">Kuma Book</h1>
                  <p>
                    The world's largest novel and manga wikipedia and database 100% free
                  </p>
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
              {books.map((val, index) => (
                <Col lg={3} md={6} xs={6} key={index} className="mb-5">
                  <Book id={val.id} cover={val.cover} title={val.name} author={val.author} genre={val.genre} language={val.language} />
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
                  <Genre name={val.name} id={val.id} />
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

const mapStateToProps = state => ({
  genre: state.start.genre[0],
  book: state.start.book[0]
})

const mapDispatchToProps = { genreList, bookList }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
