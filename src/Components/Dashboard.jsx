import React, { Component } from 'react';

import { Form, Select } from 'semantic-ui-react'
import TableComponent from './BaseComponents/TableComponent';


const stateOptions =[1,2,3].map((state, index) => ({
    key: state,
    text: state,
    value: state,
  }))
class Dashboard extends Component{
    render(){
        return(
            <div>
            <div>
            <Form>
                <div style={{display: "flex",flexFlow:'wrap', width: "50%"}}>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        <Form.Field
                            control={Select}
                            label={<label style={{textAlign:"left"}}>State</label>}
                            options={stateOptions}
                            placeholder='State'
                        />
                    </div>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        <Form.Field
                            control={Select}
                            label={<label style={{textAlign:"left"}}>State</label>}
                            options={stateOptions}
                            placeholder='State'
                        />
                    </div>
                </div>
                <div style={{display: "flex",flexFlow:'wrap', width: "50%"}}>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        <Form.Field
                            control={Select}
                            label={<label style={{textAlign:"left"}}>State</label>}
                            options={stateOptions}
                            placeholder='State'
                        />
                    </div>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        <Form.Field
                            control={Select}
                            label={<label style={{textAlign:"left"}}>State</label>}
                            options={stateOptions}
                            placeholder='State'
                        />
                    </div>
                </div>
                </Form>
            </div>
            <div style={{padding: 16}}>
                <TableComponent />
            </div>
            </div>
        );
    }
}

export default Dashboard;
