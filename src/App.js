/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect } from 'react';
import NavBar from './components/UI/NavBar/NavBar';
import SearchBar from './components/UI/SearchBar/SearchBar';
import Spinner from './components/UI/Spinner/Spinner';
import { fetchEmployeesAPI } from './api/FetchAPI';

const App = () => {
  const [state, setState] = useState({
    employees: [],
    loading: true,
  });

  useEffect(() => {
    fetchEmployeesAPI(setState);
  }, []);

  const { employees, loading } = state;

  return (
    <div>
      <NavBar title={'Plexxis'} user={'Hyeeun Mok'} />
      <SearchBar />
      <Spinner loading={loading} />
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
};

export default App;
