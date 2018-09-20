import React, { Component } from 'react';
import '../App.css';
import { Form, FormControl, Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder } from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			dueDate: new Date()
		}		
	}

	handleChange = (event) => {
		this.setState({
			text: event.target.value
		})
	}

	handleChangeDate = dueDate => {
		this.setState({
			dueDate 
		})
	}	

	addReminder() {
		this.props.addReminder(this.state.text, this.state.dueDate);
	}

	deleteReminder(id) {
		this.props.deleteReminder(id);
	}

	renderReminders() {
		const { reminders } = this.props;
		return (
			<ListGroup>
			{
				reminders.map( reminder => {
					return (
						<div className="List-input" key={reminder.id}>
						<ListGroupItem>
						    {reminder.text}
						<Glyphicon className="Delete-button" glyph="remove" onClick={() => this.deleteReminder(reminder.id)}/>
                        </ListGroupItem>                        
                        </div>
						)
				})
			}                
            </ListGroup>
			)
	}


  render() {
  	const {date, format, mode, inputFormat} = this.state;
    return (
      <div className="App">        
        <div className="App-title">Reminder Pro</div>
        <Form>
            <FormControl className="Reminder-input" placeholder="I have to..." onChange={(event) => this.handleChange(event)}/>
        </Form>
        <DateTimePicker className="Date-input" value={this.state.dueDate} onChange={this.handleChangeDate}/>
        <Button bsStyle="success" bsSize="large" onClick={() => this.addReminder()}>Add Reminder</Button>         
        { this.renderReminders() }
       </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		reminders: state
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({addReminder, deleteReminder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
