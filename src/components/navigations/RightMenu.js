import React, { Component } from 'react';
// import { Card } from '@blueprintjs/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class RightMenu extends Component {
  render() {
    return(
      <div className="pt-card chat pt-dark" style={{backgroundColor:'rgba(0,0,0,0.2)', height: '85vh'}}>
        <Tabs style={{marginTop:'-15px'}}>
          <TabList className="centeringText">
            <Tab>Chats</Tab>
            <Tab>Contacts</Tab>
          </TabList>

          <TabPanel>
            <MainChat />
          </TabPanel>
          <TabPanel style={{height: '70vh'}}>
            <Contacts />
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  onTabs2Change() {

  }
}

class MainChat extends Component {
  render() {
    return(
      <div>
        Main Chat
      </div>
    )
  }
}

class Contacts extends Component {
  render() {
    return(
      <div>
        Contacts
      </div>
    )
  }
}

export default RightMenu;