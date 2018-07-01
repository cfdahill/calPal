import React from "react";

class Form extends React.Component {
  state = {
    Watch: [<input name= "watch" key="watch0"></input>] //this is to add multiple watch locations
  }

  //onClick event to add multiple watch locations
  addWatch = event => {
    event.preventDefault();
    const Watch = this.state.Watch;
    this.setState({Watch: Watch.concat(<input name= "watch" key={`watch${Watch.length}`}></input>)});
    console.log(this.state.Watch);
  }


  render() {
  return (
    <div className="Form" id={this.props.id}>
      Event Name: <input name="eventName" />
      Date: <input name="date" />
      Time: <input name="time" />
      Where to Watch? {this.state.Watch}
      <button onClick={this.addWatch}>+ location</button>
      Website: <input name="website" />
      Additional Information:
      <textarea name="addInfo"/>
      <button 
        onClick={(event) => {
          console.log(this.props.id);
          event.preventDefault()
          this.props.deleteEvent(this.props.id)
        }}
      >
          Delete
      </button>
    </div>
    )
  }
}

export default Form;