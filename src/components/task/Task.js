import { Component } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {

  static defaultProps = {
    onComplete: () => {},
    onDeleted: () => {},
  }

  static propTypes = {
    onComplete: PropTypes.func,
    onDeleted: PropTypes.func,
    timeFromCreation: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
  }

  render () {
    const { onComplete, onDeleted, timeFromCreation, task } = this.props;
    const isChecked = this.props.isComplete;

    let textTimeFromCreation = `created ${timeFromCreation} ago`;
    if (timeFromCreation === 'now') textTimeFromCreation = 'created now';

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onComplete} checked={isChecked} onChange={e => {}}/>
          <label>
              <span className="description">{task}</span>
              <span className="created">{textTimeFromCreation}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        { this.props.isEditing ? <input type="text" className="edit" value="Editing task" /> : null }
      </>
    );
  }
}