import React from "react";
import { Dropdown, Checkbox, Button, Icon, Popup } from 'semantic-ui-react';
import './Sidebar.css';
import teams from "../../utils/teams";
import {Redirect} from 'react-router-dom'


class Sidebar extends React.Component {

  state = {
    dropdownOptions: [
      {text: 'NFL', value: 'NFL'},
      {text: 'MLB', value: 'MLB'},
      {text: 'NBA-currently unavailable', value: 'NBA'},
      {text: 'NHL', value: 'NHL'},
      {text: 'Users Created Content', value: 'UCC'}
    ],
    dropdownPicked: '',
    redirectTo: null,
    checkBox: []
  }

  onChange= (e, res) => {
    const dropdownPicked = res.value;
    this.setState({dropdownPicked});
  }

  redirect=(e) => {
    e.preventDefault();
    this.setState({
			redirectTo: `/create`
    });
  }

  render() {
    if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
  return (
    <div className="sidebar">
      <h2 className='sidebarH2'>My schedules</h2>

    <div className="checkBoxField">
      {this.props.checkBox.map(item => (
        <div key={`checkBox${item.name}`}>
        {item.name.length > 20 ?
        <Popup
          trigger={<Checkbox 
            label={item.name.slice(0,19)}  
            defaultChecked = {true}
            onChange = {e => this.props.handleCheckBox(item._id)}
          />}
          content={item.name}
          className='popup'
        /> :
        <Checkbox 
          label={item.name.slice(0,19)}  
          defaultChecked = {true}
          onChange = {e => this.props.handleCheckBox(item._id)}
        />}
        <Icon name='trash alternate outline' className='delete' /*onClick = {e =>this.props.removeSchedule(item._id)}*//>
        </div>
        ))
      }
    </div>
      <h2 className='sidebarH2'>Find schedules</h2>
    <Dropdown placeholder='Schedules' fluid search selection options={this.state.dropdownOptions} onChange = {this.onChange} />
      {this.state.dropdownPicked ==='NFL' ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NFLTeams} onChange={this.props.handleNFLSelection}/>)
      : this.state.dropdownPicked=== `MLB` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.MLBTeams} onChange={this.props.handleMLBSelection}/>)
      : this.state.dropdownPicked=== `NBA` ? (<Dropdown placeholder='Teams' fluid search selection 
      // options={teams.NBATeams} onChange={this.props.handleNBASelection}
      />)
      : this.state.dropdownPicked===`NHL` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NHLTeams} onChange={this.props.handleNHLSelection}/>)
      : this.state.dropdownPicked===`UCC` ? (<Dropdown placeholder='Schedules' fluid search selection options={this.props.titles} onChange={this.props.handleCreatedContentSelection} />)
      : <div />
    }
    <Button onClick={this.props.clicked} 
      className="saveSchedule">Add to calendar</Button>
    <Button onClick={this.redirect} className="toCreate">Create a schedule</Button>
 
    </div>
  )
  }
}

export default Sidebar;