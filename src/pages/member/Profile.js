/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Select from 'react-select';
import Store from 'store2';
import Swal from 'sweetalert2';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

// Service
import { connect } from 'react-redux';
import { selectProfile, updateProfile } from '../../redux/actions/profileActions';

// Assets
import icon from '../../assets/img/icon.png';

// Component
import Navbar from '../../components/organisms/navbar';
import Footer from '../../components/organisms/footer';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: null,
      email: null,
      birthday: null,
      gender: null,
      bio: null,
      error: false,
    };
    if (!Store('login')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      await this.props.selectProfile({
        id: Store('userId'),
        apikey: Store('apikey'),
      });
      const { result } = this.props.profile;
      this.setState({
        fullname: result.fullname,
        email: result.email,
        birthday: result.birthdate,
        gender: result.gender,
        bio: result.bio,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  changeGender = (e) => {
    this.setState({ gender: e });
  };

  changeBirthday = (e) => {
    this.setState({ birthday: e });
  };

  updateProfile = async () => {
    try {
      const { fullname, birthday, gender, bio } = this.state;
      this.props.updateProfile({
        userId: Store('userId'),
        fullname,
        birthday,
        gender: gender.value,
        bio,
        apikey: Store('apikey'),
      });
      Swal.fire('Update profile success', 'successfully update profile', 'success');
      this.setState({ error: false });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.updateProfile();
  };

  render() {
    const { fullname, email, birthday, gender, bio, error } = this.state;
    return (
      <>
        {/* Navbar */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Navbar {...this.props} />

        <section>
          <Container>
            <div className="profile animate__animated animate__fadeIn mb-5">
              <img
                src={icon}
                className="rounded-circle img-thumbnail d-block mx-auto"
                alt="Profile Name"
              />
              <h2 className="font-weight-bold text-center mt-4">{fullname}</h2>
              <p className="text-center">{email}</p>
            </div>
            <div className="head-title text-center">
              <h3 className="main-title font-weight-bold">Profile Data</h3>
              <div className="divinder mx-auto" />
            </div>
            <Row>
              <Col lg={6} className="mx-auto">
                {error ? <Alert variant="warning">Update profile failed</Alert> : null}
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => this.setState({ fullname: e.target.value })}
                      defaultValue={fullname}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                      defaultValue={email}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicBirthday">
                    <Form.Label className="d-block">Bithday</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => this.setState({ birthday: e.target.value })}
                      defaultValue={birthday}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Select
                      value={gender}
                      onChange={this.changeGender}
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other' },
                      ]}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={(e) => this.setState({ bio: e.target.value })}
                      rows="3"
                      defaultValue={bio}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = { selectProfile, updateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
