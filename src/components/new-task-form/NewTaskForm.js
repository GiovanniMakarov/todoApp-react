import { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {

    state = {
        text: ''
    }

    onInputChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }
    
    onSubmit = (event) => {
        event.preventDefault();

        this.props.onAddItem(this.state.text);
        this.setState({
            text: ''
        })
    }
    
    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <input className="new-todo" placeholder="What needs to be done?" autoFocus
                        onChange={this.onInputChange}
                        value={this.state.text}
                />
            </form>
            
        )
    }
    
}
