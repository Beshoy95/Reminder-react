import React, { Component } from 'react'
import moment from "moment"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { add_Reminder, remove_Reminder, clear_Reminder } from './../actions/index';
import logo from '../images/logo.jpg';

class App extends Component {
    state = {
        text: "",
        date: new Date()
    }

    render_Reminders = () => {
        const { reminders } = this.props
        return (
            <ul className="list-group">
                {
                    reminders.map((reminder) => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div>{reminder.text}</div>
                                <div>{moment(new Date(reminder.date)).fromNow()}</div>
                                <div className="closeIcon btn btn-danger"
                                    onClick={() => this.props.remove_Reminder(reminder.id)}>x</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <>
                <div className="App text-center">
                    <img src={logo} alt="reminder" />
                    <div className="reminder-title">
                        <h2 className="text-white mt-3">What U should do ?</h2>
                    </div>
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={(e) => this.setState({ text: e.target.value })}
                        placeholder="Enter what U think...?"
                        className="form-control mt-3" />

                    <DatePicker
                        className="form-control mt-2"
                        placeholderText="Enter Date"
                        value={this.state.date}
                        selected={this.state.date}
                        onChange={date => { this.setState({ date }) }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />

                    <button
                        onClick={() => {
                            this.props.add_Reminder(this.state.text, this.state.date)
                            this.setState({ text: '', date: '' })
                        }}
                        className="btn btn-primary btn-block addReminder">
                        Add Reminder
                    </button>
                    {this.render_Reminders()}
                    <button
                        onClick={() => this.props.clear_Reminder()}
                        className="btn btn-danger btn-block clearReminder">
                        Clear Reminder
                    </button>

                </div>
            </>);
    }
}

export default connect(state => {
    return {
        reminders: state
    }
}, { add_Reminder, remove_Reminder, clear_Reminder })(App);