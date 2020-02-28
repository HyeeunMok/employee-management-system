/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactTable from 'react-table';
import Button from 'react-bootstrap/Button';
import 'react-table/react-table.css';

const TableTemplate = ({ filteredEmployees }) => {
  const columns = React.useMemo(
    () => [
      {
        columns: [
          { Header: 'ID', accessor: 'id', minWidth: 50, maxWidth: 60 },
          { Header: 'Name', accessor: 'name' },
          { Header: 'Code', accessor: 'code', show: false },
          { Header: 'Profession', accessor: 'profession' },
          { Header: 'Color', accessor: 'color' },
          { Header: 'City', accessor: 'city' },
          { Header: 'Branch', accessor: 'branch' },
          { Header: 'Assigned', accessor: 'assigned', show: false },
          {
            Header: '',
            id: 'options',
            width: 140,
            Cell: ({ row }) => {
              return (
                <div>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      console.log(`Edit button is clicked for : ${row}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete-button"
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      console.log(`Delete button is clicked for : ${row}`);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  return (
    <ReactTable
      className="-striped -highlight"
      data={filteredEmployees}
      columns={columns}
    />
  );
};

export default TableTemplate;
