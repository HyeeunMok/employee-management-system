/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TableTemplate from '../../components/UI/Tables/TableTemplate';

class UserDashboard extends Component {
  render() {
    return (
      <Container>
        <Row className="show-grid">
          <Col xs={12} sm={12}>
            <div>
              <TableTemplate
                filteredEmployees={this.props.filteredEmployees}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserDashboard;
