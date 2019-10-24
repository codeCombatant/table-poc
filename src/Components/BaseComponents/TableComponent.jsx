import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
 
const data = require('./sample.json');
const columns = [
  {
    name: 'Source',
    selector: 'sourceFields',
    sortable: true,
    maxWidth: '300px',
    wrap: true,
  },
  {
    name: 'Constant',
    selector: 'constantValues',
    sortable: true,
    maxWidth: '300px',
    wrap: true,
  },
  {
    name: 'Function',
    selector: 'functionS',
    sortable: true,
    maxWidth: '300px',
    wrap: true,
  },
  {
    name: 'Target',
    selector: 'targetField',
    sortable: true,
    maxWidth: '300px',
    wrap: true,
  },
];
 
class TableComponent extends Component {
  render() {
    console.log(this.props.tableData)
    return (
      <DataTable
        columns={[...columns]}
        pagination={true}
        data={this.props.tableData}
      />
    )
  }
}

export default TableComponent;

 