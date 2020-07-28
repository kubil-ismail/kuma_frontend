/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Store from 'store2';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Container, Table, Dropdown, Alert, Button, Modal, Form } from 'react-bootstrap';

// Service
import { connect } from 'react-redux';
import { fetchGenre, postGenre, updateGenre, deleteGenre } from '../../redux/actions/genreActions';

// Component
import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

export class Genres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      error: false,
      showAddModal: false,
      genreName: null,
      genreId: null,
      edit: false,
      sort: 1,
    };

    if (!Store('login') && !Store('adminLogin') && !Store('pin')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  getAllGenres = async () => {
    try {
      await this.props.fetchGenre();
      const { genres } = this.props;
      const { result } = genres;
      this.setState({
        genres: result,
        error: false,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  onSort = (sort) => {
    const { genres } = this.state;
    if (parseInt(sort, 10) === 2) {
      // DESC
      genres.sort((a, b) => {
        return a - b;
      });
      this.setState({ genres, sort: 2 });
    } else {
      // ASC
      genres.sort((a, b) => {
        return a - b;
      });
      this.setState({ genres, sort: 1 });
    }
  };

  selectGenre = async (id) => {
    try {
      await this.props.fetchGenre({ id });
      const { genres } = this.props;
      const { result } = genres;
      this.setState({
        showAddModal: true,
        genreName: result[0].name,
        genreId: result[0].id,
        edit: true,
      });
    } catch (error) {
      Swal.fire({
        title: 'Delete Failed',
        text: 'Something Wrong',
        icon: 'error',
      });
    }
  };

  deleteGenre = async (id) => {
    try {
      await this.props.deleteGenre({ id, apikey: Store('apikey') });
      Swal.fire({
        title: 'Delete Success',
        text: '',
        icon: 'success',
      }).then(() => this.getAllGenres());
    } catch (error) {
      Swal.fire({
        title: 'Delete Failed',
        text: 'Something Wrong',
        icon: 'error',
      });
    }
  };

  onEdit = async () => {
    try {
      const { genreId, genreName } = this.state;
      this.props.updateGenre({
        id: genreId,
        name: genreName,
        apikey: Store('apikey'),
      });
      Swal.fire({
        title: 'Edit Genre Success',
        text: '',
        icon: 'success',
      }).then(() => {
        this.getAllGenres();
        this.setState({
          showAddModal: false,
          edit: false,
        });
      });
    } catch (error) {
      Swal.fire({
        title: 'Edit Genre Failed',
        text: '',
        icon: 'error',
      });
    }
  };

  addNew = async () => {
    try {
      const { genreName } = this.state;
      this.props.postGenre({ name: genreName, apikey: Store('apikey') });
      Swal.fire({
        title: 'Add Genre Success',
        text: '',
        icon: 'success',
      }).then(() => {
        this.getAllGenres();
        this.setState({
          showAddModal: false,
        });
      });
    } catch (error) {
      Swal.fire({
        title: 'Add Genre Failed',
        text: '',
        icon: 'error',
      });
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.edit) {
      this.onEdit();
    } else {
      this.addNew();
    }
  };

  // Show modal
  handleAddClose = () => {
    this.setState({ showAddModal: false });
  };

  // Hide modal
  handleAddShow = () => {
    this.setState({ showAddModal: true });
  };

  componentDidMount = () => {
    this.getAllGenres();
  };

  render() {
    const { genres, error, sort, showAddModal } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        <section>
          <Container>
            <div className="head-title">
              <h3 className="main-title font-weight-bold">List Genre</h3>
              <div className="divinder" />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <Button onClick={this.handleAddShow}>Add Genre</Button>
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
            {error ? <Alert message="Can't get Genres from server" /> : null}

            <Table bordered responsive>
              <thead>
                <tr>
                  <th width="75%">Name</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((val) => (
                  <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={{
                          pathname: `/genre/${val.name}`,
                          state: { genreId: val.id, name: val.name },
                        }}
                      >
                        Detail
                      </Link>
                      <Button variant="warning mx-2 my-2" onClick={() => this.selectGenre(val.id)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => this.deleteGenre(val.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </section>

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

        {/* Footer */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  genres: state.genres,
});

const mapDispatchToProps = { fetchGenre, postGenre, updateGenre, deleteGenre };

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
