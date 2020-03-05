import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { closeForm } from '../../utils/CloseForm';

const AddUrl = 'http://localhost:8080/api/add/employees/';

const colors = [
  'Please choose color',
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
  'Please choose city',
  'Brampton',
  'Bolton',
  'Toronto',
  'Oakville',
  'Mississauga',
  'Makham',
  'Ottawa',
];
const branches = [
  'Please choose branch',
  'Abacus',
  'Pillsworth',
  'Dundas',
  'Queen',
  'King',
];

function AddForm(props) {
  const [employee, setEmployee] = useState({
    name: '',
    profession: '',
    color: '',
    city: '',
    branch: '',
    assigned: false,
  });

  const onChangeName = event => {
    setEmployee({
      ...employee,
      name: event.target.value,
    });
  };

  const onChangeProfession = event => {
    setEmployee({
      ...employee,
      profession: event.target.value,
    });
  };

  const onChangeColor = event => {
    setEmployee({
      ...employee,
      color: event.target.value,
    });
  };

  const onChangeCity = event => {
    setEmployee({
      ...employee,
      city: event.target.value,
    });
  };

  const onChangeBranch = event => {
    setEmployee({
      ...employee,
      branch: event.target.value,
    });
  };

  const handleSubmit = () => {
    setEmployee({
      ...employee,
    });
    console.log(employee);

    axios.post(AddUrl, employee).then(res => {
      console.log(res.data.data);
      closeForm();
    });
  };

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={7}>
          <Card>
            <Card.Header>Add Employee</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    placeholder="Please enter full name"
                    value={employee.name}
                    onChange={onChangeName}
                  />
                </Form.Group>
                <Form.Group controlId="formProfession">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    required
                    name="profession"
                    placeholder="Please enter job title"
                    value={employee.profession}
                    onChange={onChangeProfession}
                  />
                </Form.Group>
                <Form.Group controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    required
                    name="color"
                    as="select"
                    value={employee.color}
                    onChange={onChangeColor}
                  >
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
                    value={employee.city}
                    onChange={onChangeCity}
                  >
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
                    value={employee.branch}
                    onChange={onChangeBranch}
                  >
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
                    handleSubmit();
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

export default AddForm;
