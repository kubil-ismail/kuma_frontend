/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Store from 'store2';
import { Container, Table, Dropdown, Alert } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

// Service
import { connect } from 'react-redux';
import { getBook } from '../../redux/actions/bookActions';

import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

export class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      options: [],
      error: false,
      sort: 1,
    };

    if (!Store('login') && !Store('adminLogin') && !Store('pin')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  getAllBooks = async () => {
    try {
      const { state } = this.props.location;
      if (state) {
        await this.props.getBook(`?search=${state}&limit=8`);
      } else {
        await this.props.getBook('?limit=8');
      }
      const { result, options } = this.props.books;
      this.setState({
        books: result,
        options,
        error: false,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  onSort = (sort) => {
    const { books } = this.state;
    if (parseInt(sort, 10) === 2) {
      // DESC
      books.sort((a, b) => {
        return a - b;
      });
      this.setState({ books, sort: 2 });
    } else {
      // ASC
      books.sort((a, b) => {
        return a - b;
      });
      this.setState({ books, sort: 1 });
    }
  };

  handlePageChange = async (page) => {
    try {
      await this.props.getBook(`?limit=8&page=${page}`);
      const { result, options } = this.props.books;
      this.setState({
        books: result,
        options,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  componentDidUpdate = (props) => {
    if (props.location.search !== this.props.location.search) {
      this.getAllBooks();
    }
  };

  render() {
    const { books, options, error, sort } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        <section>
          <Container>
            <div className="head-title">
              <h3 className="main-title font-weight-bold">List Book</h3>
              <div className="divinder" />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <Link className="btn btn-primary" to="/admin/book/new">
                  New Book
                </Link>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item active={sort === 1} onClick={() => this.onSort('1')}>
                    Sort by name A - Z
                  </Dropdown.Item>
                  <Dropdown.Item active={sort === 2} onClick={() => this.onSort('2')}>
                    Sort by name Z - A
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Show if failed fetch */}
            {error ? <Alert message="Can't get book from server" /> : null}

            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Book Name</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {books.map((val) => (
                  <tr key={val.id}>
                    <td>
                      <img src={`http://localhost:8000/${val.cover}`} alt={val.name} width="50" />
                    </td>
                    <td>{val.name}</td>
                    <td>{val.status}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/admin/book/detail/${val.name.replace(/\s/g, '-')}`,
                          state: { id: val.id },
                        }}
                        className="btn btn-primary"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              activePage={options.page}
              itemsCountPerPage={options.perPage}
              totalItemsCount={parseInt(options.totalData, 10)}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
              hideNavigation
            />
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = { getBook };

export default connect(mapStateToProps, mapDispatchToProps)(Books);
