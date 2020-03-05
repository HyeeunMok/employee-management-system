import React from 'react';
import ReactTable from 'react-table';
import Button from 'react-bootstrap/Button';
import 'react-table/react-table.css';

const TableTemplate = ({
  filteredEmployees,
  openEditForm,
  deleteEmployee,
}) => {
  const columns = React.useMemo(
    () => [
      {
        // Code and Assigned will be shown in Admin page which will be implement in the future
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
                    onClick={() => openEditForm(row.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="style-button"
                    variant="danger"
                    size="sm"
                    onClick={() => deleteEmployee(row.id)}
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
      defaultPageSize={10}
      style={{
        borderColor: '#a5a4a4',
        borderRadius: '5px',
        borderStyle: 'outset',
      }}
    />
  );
};

export default TableTemplate;
