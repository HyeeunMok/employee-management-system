import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
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

function EditForm(props) {
  const [employee, setEmployee] = useState({
    name: '',
    profession: '',
    color: '',
    city: '',
    branch: '',
    assigned: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${url}/${props.match.params.id}`)
      .then(response =>
        setEmployee({
          ...employee,
          name: response.data.data.name,
          profession: response.data.data.profession,
          color: response.data.data.color,
          city: response.data.data.city,
          branch: response.data.data.branch,
          assigned: response.data.data.assigned,
        }),
      )
      .catch(err => setErrorMessage('Fetch error. API is not available.'));
    console.log(errorMessage);
  }, []);

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

  const onClickSubmit = () => {
    axios
      .patch(`${editUrl}/${props.match.params.id}`, employee)
      .then(response => console.log(response.data.data));
    closeForm();
  };

  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <H6>
              Please change the information below to update employee
              details then click the submit button.
            </H6>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <Card>
              <StyledCardHeader>Edit Employee</StyledCardHeader>
              <Card.Body>
                <Form>
                  <Form.Group controlId="editName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      name="name"
                      placeholder="Please enter full name"
                      value={employee.name}
                      onChange={onChangeName}
                    />
                  </Form.Group>
                  <Form.Group controlId="editProfession">
                    <Form.Label>Profession</Form.Label>
                    <Form.Control
                      required
                      name="profession"
                      placeholder="Please enter job title"
                      value={employee.profession}
                      onChange={onChangeProfession}
                    />
                  </Form.Group>
                  <Form.Group controlId="editColor">
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
                  <Form.Group controlId="editCity">
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
                  <Form.Group controlId="editBranch">
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
                    variant="danger"
                    size="sm"
                    onClick={() => closeForm()}
                  >
                    Cancel
                  </Button>
                  <StyledButton
                    size="sm"
                    onClick={() => onClickSubmit()}
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
  background-color: #eea33b;
  color: #ffffff;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-left: 5px;
`;

export default EditForm;
