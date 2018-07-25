import React, { Component } from 'react'
import { Header, Tab, Loader, Divider } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import NotificationSettings from './NotificationSettings'
import SettingsForm from './SettingsForm'
import UserEvents from './UserEvents'
import styled from 'styled-components'
import ProfilePage from './ProfilePage';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 5em;
`

class Profile extends Component {
  state = { rsvps: [] }
  
  // The components that will be loaded from the semantic ui tabs
  panes = [
    { 
      menuItem: 
        'My Events', 
        render: () => 
          <Tab.Pane attached={false}>
            <UserEvents 
              rsvps={this.state.rsvps} 
              events={this.props.events} 
              account={this.props.account} 
            />
          </Tab.Pane> 
    },
    { 
      menuItem: 'Account Information', render: () => <Tab.Pane attached={false}><SettingsForm /></Tab.Pane> 
    },
    { 
      menuItem: 'Notification Settings', render: () => <Tab.Pane attached={false}><NotificationSettings /></Tab.Pane> 
    },
    { 
      menuItem: 'Delete Account', render: () => <Tab.Pane attached={false}>Delete Account</Tab.Pane> 
    },
  ]

  componentDidMount() {
    // Grab the rsvps
    axios.get('/api/rsvps')
      .then( res => {
        this.setState({ rsvps: res.data })
    }).catch(err => {
        alert(`There was an error: ${err}`)
    })
  }

  render() {
    return (
      <StyledContainer>
        <Divider horizontal><Header as='h1'>Profile</Header></Divider>
          <ProfilePage user={this.props.account} />
          <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />
      </StyledContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    account: state.user
  }
}

export default connect(mapStateToProps)(Profile)
