import { Component } from 'react';
import './Task.css';

export default class Task extends Component {
  
  render () {
    const { onComplete, onDeleted } = this.props
    const isChecked = this.props.isComplete;

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onComplete} checked={isChecked} onChange={e => {}}/>
          <label>
              <span className="description">{this.props.task}</span>
              <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        { this.props.isEditing ? <input type="text" className="edit" value="Editing task" /> : null }
      </>
    );
  }
}