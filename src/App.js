/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import NavBar from './components/UI/NavBar/NavBar';
import SearchBar from './components/UI/SearchBar/SearchBar';
import Spinner from './components/UI/Spinner/Spinner';

const url = 'http://localhost:8080/api/employees';
class App extends React.Component {
  state = {
    employees: [],
    errorMessage: '',
    loading: true,
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

  loadingHandler() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    const { employees } = this.state;

    console.log(this.state);

    return (
      <div>
        <NavBar title={'Plexxis'} user={'Hyeeun Mok'} />
        <SearchBar />
        <h1>Employees List</h1>
        {employees.map(employee => (
          <div key={employee.id}>
            {Object.keys(employee).map(key => (
              <span key={key}>
                {key}:{employee[key]}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
export default App;
