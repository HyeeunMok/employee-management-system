/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import './App.css';
import NavBar from './components/UI/NavBar/NavBar';
import SearchBar from './components/UI/SearchBar/SearchBar';
import Spinner from './components/UI/Spinner/Spinner';

const url = 'http://localhost:8080/api/employees';
class App extends React.Component {
  state = {
    employees: [],
    errorMessage: '',
    loading: true,
    filterValue: '',
    filterEmployees: [],
  };

  componentWillMount = () => {
    fetch(url)
      .then(response => response.json())
      .then(employees => this.setState({ employees, loading: false }))
      .catch(err =>
        this.setState({
          errorMessage: 'Fetch error. API is not available.',
          loading: false,
        }),
      );
  };

  filterHandler = event => {
    const { employees } = this.state;
    const filterEmployees = employees.filter(employee => {
      const employeeNameLowerCase = employee.name.toLowerCase();
      const queryLowerCase = event.target.value.toLowerCase();
      return employeeNameLowerCase.includes(queryLowerCase);
    });
    this.setState({ filterEmployees, filterValue: event.target.value });
  };

  loadingHandler() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    const { employees, filterValue, filterEmployees } = this.state;
    const filteredEmployees =
      filterValue === '' ? employees : filterEmployees;

    console.log(this.state);

    return (
      <div>
        <NavBar title={'Plexxis'} user={'Hyeeun Mok'} />
        <SearchBar
          filterHandler={this.filterHandler.bind(this)}
          value={filterValue}
        />
        <Spinner />
        <div className="app">
          <h1>Employees List</h1>
          {filteredEmployees.map(employee => (
            <div key={employee.id}>
              {Object.keys(employee).map(key => (
                <span key={key}>
                  {key}:{employee[key]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
