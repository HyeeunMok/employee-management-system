import React, { useState } from 'react';
import { Row, Col, Form, Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { closeForm } from '../../utils/CloseForm';

const addUrl = 'http://localhost:8080/api/add/employees/';

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

function AddForm() {
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

  const isInputFieldEmpty = () => {
    return (
      employee.name === '' ||
      employee.profession === '' ||
      employee.color === '' ||
      employee.city === '' ||
      employee.branch === '' ||
      employee.assigned === null
    );
  };

  const handleSubmit = () => {
    axios.post(addUrl, employee).then(res => {
      console.log(res.data.data);
      closeForm();
    });
  };

  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <H6>
              Please fill out the form to add an employee and then click
              the submit button.
            </H6>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <Card>
              <StyledCardHeader>Add Employee</StyledCardHeader>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="addName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      placeholder="Please enter full name"
                      value={employee.name}
                      onChange={onChangeName}
                    />
                  </Form.Group>
                  <Form.Group controlId="addProfession">
                    <Form.Label>Profession</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="profession"
                      placeholder="Please enter job title"
                      value={employee.profession}
                      onChange={onChangeProfession}
                    />
                  </Form.Group>
                  <Form.Group controlId="addColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      required
                      type="text"
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
                  <Form.Group controlId="addCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type="text"
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
                  <Form.Group controlId="addBranch">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control
                      required
                      type="text"
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
                    variant="danger"
                    size="sm"
                    onClick={() => closeForm()}
                  >
                    Cancel
                  </Button>
                  <StyledButton
                    className="style-button"
                    size="sm"
                    type="submit"
                    disabled={isInputFieldEmpty()}
                  >
                    Submit
                  </StyledButton>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;
`;

const H6 = styled.h6`
  margin-bottom: 10px;
  color: #858484;
`;

const StyledCardHeader = styled(Card.Header)`
  background-color: #3277b2;
  color: #ffffff;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-left: 5px;
`;

export default AddForm;
