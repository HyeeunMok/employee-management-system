/* eslint-disable import/prefer-default-export */
const fetchEmployeesAPI = setState => {
  const url = 'http://localhost:8080/api/employees';
  fetch(url)
    .then(response => response.json())
    .then(employees => setState({ employees }))
    .catch(err =>
      setState({ errorMessage: 'Fetch error. API is not available.' }),
    );
};

export { fetchEmployeesAPI };
