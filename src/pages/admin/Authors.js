/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Store from 'store2';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Container, Table, Dropdown, Alert, Button, Modal, Form } from 'react-bootstrap';

// Service
import { connect } from 'react-redux';
import {
  fetchAuthor,
  postAuthor,
  updateAuthor,
  deleteAuthor,
} from '../../redux/actions/authorActions';

// Component
import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

export class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      error: false,
      showAddModal: false,
      authorName: null,
      authorId: null,
      edit: false,
      sort: 1,
    };

    if (!Store('login') && !Store('adminLogin') && !Store('pin')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  getAllAuthors = async () => {
    try {
      await this.props.fetchAuthor();
      const { result } = this.props.authors;
      this.setState({ authors: result, error: false });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  onSort = (sort) => {
    const { authors } = this.state;
    if (parseInt(sort, 10) === 2) {
      // DESC
      authors.sort((a, b) => {
        return a - b;
      });
      this.setState({ authors, sort: 2 });
    } else {
      // ASC
      authors.sort((a, b) => {
        return a - b;
      });
      this.setState({ authors, sort: 1 });
    }
  };

  selectAuthors = async (id) => {
    try {
      await this.props.fetchAuthor({ id });
      const { result } = this.props.authors;
      this.setState({
        showAddModal: true,
        authorName: result[0].name,
        authorId: result[0].id,
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

  deleteAuthors = async (id) => {
    try {
      this.props.deleteAuthor({ id, apikey: Store('apikey') });
      Swal.fire({
        title: 'Delete Success',
        text: '',
        icon: 'success',
      }).then(() => this.getAllAuthors());
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
      const { authorId, authorName } = this.state;
      await this.props.updateAuthor({
        id: authorId,
        name: authorName,
        apikey: Store('apikey'),
      });
      Swal.fire({
        title: 'Edit authors Success',
        text: '',
        icon: 'success',
      }).then(() => {
        this.getAllAuthors();
        this.setState({
          showAddModal: false,
          edit: false,
        });
      });
    } catch (error) {
      Swal.fire({
        title: 'Edit authors Failed',
        text: '',
        icon: 'error',
      });
    }
  };

  addNew = async () => {
    try {
      const { authorName } = this.state;
      await this.props.postAuthor({ name: authorName, apikey: Store('apikey') });
      Swal.fire({
        title: 'Add authors Success',
        text: '',
        icon: 'success',
      }).then(() => {
        this.getAllAuthors();
        this.setState({
          showAddModal: false,
        });
      });
    } catch (error) {
      Swal.fire({
        title: 'Add authors Failed',
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
    this.getAllAuthors();
  };

  render() {
    const { authors, error, sort, showAddModal } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        <section>
          <Container>
            <div className="head-title">
              <h3 className="main-title font-weight-bold">List Authors</h3>
              <div className="divinder" />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <Button onClick={this.handleAddShow}>Add Authors</Button>
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
            {error ? <Alert message="Can't get authors from server" /> : null}

            <Table bordered responsive>
              <thead>
                <tr>
                  <th width="75%">Name</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((val) => (
                  <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>
                      <Link
                        className="btn btn-primary disabled"
                        to={{
                          pathname: `/authors/${val.name}`,
                          state: { authorId: val.id, name: val.name },
                        }}
                      >
                        Detail
                      </Link>
                      <Button
                        variant="warning mx-2 my-2"
                        onClick={() => this.selectAuthors(val.id)}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => this.deleteAuthors(val.id)}>
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
            <Modal.Title>Authors</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.onSubmit}>
            <Modal.Body>
              <Form.Group controlId="bookName">
                <Form.Label>Authors Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state.authorName}
                  onChange={(e) => this.setState({ authorName: e.target.value })}
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
  authors: state.authors,
});

const mapDispatchToProps = { fetchAuthor, postAuthor, updateAuthor, deleteAuthor };

export default connect(mapStateToProps, mapDispatchToProps)(Authors);
