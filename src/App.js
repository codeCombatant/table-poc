import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Label } from 'semantic-ui-react'

import Dashboard from './Components/Dashboard'
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar.Pushable as={Segment}>
        <Sidebar
         color="blue"
          as={Menu}
          animation='uncover'
          icon='labeled'
          inverted
          vertical
          visible
          width='wide'
        >
          <Menu.Item as='a'>
            Mapping Documents
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher style={{marginLeft: "-80px"}}>
          <Segment basic>
            <Dashboard />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

export default App;
