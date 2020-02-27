import React, { useState, useEffect } from 'react';
import { fetchEmployeesAPI } from './api/FetchAPI';

const App = () => {
  const [state, setState] = useState({
    employees: [],
  });

  useEffect(() => {
    fetchEmployeesAPI(setState);
  }, []);

  const { employees } = state;

  return (
    <div>
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
