/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { closeForm } from '../../utils/CloseForm';

const url = 'http://localhost:8080/api/employees';
const editUrl = 'http://localhost:8080/api/edit/employees';

const colors = [
  'White',
  'Yellow',
  'Orange',
  'Red',
  'Green',
  'Blue',
  'Brown',
  'Purple',
  'Black',
];
const cities = [
  'Brampton',
  'Bolton',
  'Toronto',
  'Oakville',
  'Mississauga',
  'Makham',
  'Ottawa',
];
const branches = ['Abacus', 'Pillsworth', 'Dundas', 'Queen', 'King'];

class EditForm extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    id: '',
    name: '',
    profession: '',
    color: '',
    city: '',
    branch: '',
    assigned: '',
  };

  componentDidMount = () => {
    axios
      .get(`${url}/${this.props.match.params.id}`)
      .then(response =>
        this.setState({
          name: response.data.data.name,
          profession: response.data.data.profession,
          color: response.data.data.color,
          city: response.data.data.city,
          branch: response.data.data.branch,
          assigned: response.data.data.assigned,
        }),
      )
      .catch(err =>
        this.setState({
          errorMessage: 'Fetch error. API is not available.',
        }),
      );
  };

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onChangeProfession = event => {
    this.setState({ profession: event.target.value });
  };

  onChangeColor = event => {
    this.setState({ color: event.target.value });
  };

  onChangeCity = event => {
    this.setState({ city: event.target.value });
  };

  onChangeBranch = event => {
    this.setState({ branch: event.target.value });
  };

  onChangeAssigned = event => {
    this.setState({ assigned: event.target.value });
  };

  onClickSubmit = () => {
    const employee = {
      name: this.state.name,
      profession: this.state.profession,
      color: this.state.color,
      city: this.state.city,
      branch: this.state.branch,
      assigned: this.state.assigned,
    };
    console.log(employee);

    axios
      .patch(`${editUrl}/${this.props.match.params.id}`, employee)
      .then(response => console.log(response.data.data));
    closeForm();
  };

  render() {
    return (
      <div>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={7}>
            <Card>
              <Card.Header>Edit Employee</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      name="name"
                      placeholder="Please enter full name"
                      value={this.state.name}
                      onChange={this.onChangeName.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formProfession">
                    <Form.Label>Profession</Form.Label>
                    <Form.Control
                      required
                      name="profession"
                      placeholder="Please enter job title"
                      value={this.state.profession}
                      onChange={this.onChangeProfession.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      required
                      name="color"
                      as="select"
                      value={this.state.color}
                      onChange={this.onChangeColor.bind(this)}
                    >
                      <option disabled selected>
                        Please choose color
                      </option>
                      {colors.map(color => (
                        <option key={color}>{color}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      name="city"
                      as="select"
                      value={this.state.city}
                      onChange={this.onChangeCity.bind(this)}
                    >
                      <option disabled selected>
                        Please choose city
                      </option>
                      {cities.map(city => (
                        <option key={city}>{city}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBranch">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control
                      required
                      name="branch"
                      as="select"
                      value={this.state.branch}
                      onChange={this.onChangeBranch.bind(this)}
                    >
                      <option disabled selected>
                        Please choose branch
                      </option>
                      {branches.map(branch => (
                        <option key={branch}>{branch}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Button
                    className="style-button"
                    variant="danger"
                    size="sm"
                    onClick={() => closeForm()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="style-button"
                    variant="success"
                    size="sm"
                    onClick={() => {
                      this.onClickSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditForm;
