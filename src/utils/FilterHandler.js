/* eslint-disable import/prefer-default-export */
const filterHandler = (event, employees, changeHandler) => {
  const filterEmployees = employees.filter(employee => {
    const employeeNameLowerCase = employee.name.toLowerCase();
    const queryLowerCase = event.target.value.toLowerCase();
    return employeeNameLowerCase.includes(queryLowerCase);
  });

  changeHandler({ name: 'filterEmployees', value: filterEmployees });
  changeHandler({ name: 'filterValue', value: event.target.value });
};

export { filterHandler };
