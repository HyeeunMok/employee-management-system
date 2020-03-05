import React, { useState } from 'react';
import { Row, Col, Form, Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { closeForm } from '../../utils/CloseForm';

const addUrl = 'http://localhost:8080/api/add/employees/';

const colors = [
  '',
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
  '',
  'Brampton',
  'Bolton',
  'Toronto',
  'Oakville',
  'Mississauga',
  'Makham',
  'Ottawa',
];
const branches = ['', 'Abacus', 'Pillsworth', 'Dundas', 'Queen', 'King'];

function AddForm() {
  const [employee, setEmployee] = useState({
    name: '',
    profession: '',
    color: '',
    city: '',
    branch: '',
    assigned: false,
  });
  const [validated, setValidated] = useState(false);

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

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    setEmployee({
      ...employee,
    });

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
              Please fill the form to add an employee and click the submit
              button to complete.
            </H6>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <Card>
              <StyledCardHeader>Add Employee</StyledCardHeader>
              <Card.Body>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Form.Group controlId="validationName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      placeholder="Please enter full name"
                      value={employee.name}
                      onChange={onChangeName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter full name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationProfession">
                    <Form.Label>Profession</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="profession"
                      placeholder="Please enter job title"
                      value={employee.profession}
                      onChange={onChangeProfession}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter profession.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationColor">
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
                    <Form.Control.Feedback type="invalid">
                      Please choose color.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCity">
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
                    <Form.Control.Feedback type="invalid">
                      Please choose city.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationBranch">
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
                    <Form.Control.Feedback type="invalid">
                      Please choose branch.
                    </Form.Control.Feedback>
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
