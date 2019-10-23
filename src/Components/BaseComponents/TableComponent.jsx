import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
 
const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];
 
class TableComponent extends Component {
  render() {
    return (
      <DataTable
        columns={[...columns,...columns,...columns,...columns,]}
        pagination={true}
        data={[...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data]}
      />
    )
  }
}

export default TableComponent;

 