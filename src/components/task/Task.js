import { Component } from "react";
import PropTypes from "prop-types";

import "./Task.css";

export default class Task extends Component {
  static defaultProps = {
    onComplete: () => {},
    onDeleted: () => {},
    onEditingFlagSet: () => {},
    onEditingTask: () => {},
  };

  static propTypes = {
    onComplete: PropTypes.func,
    onDeleted: PropTypes.func,
    timeFromCreation: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    onEditingFlagSet: PropTypes.func,
    onEditingTask: PropTypes.func,
  };

  state = {
    text: this.props.task,
  };

  onEditInputChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  onSubmitEdit = (event) => {
    event.preventDefault();

    this.props.onEditingTask(this.state.text);
    this.props.onEditingFlagSet();
  };

  onExit = (event) => {
    if (event.code === "Escape") {
      event.preventDefault();
      this.props.onEditingFlagSet();
      this.setState({
        text: this.props.task,
      });
    }
  };

  render() {
    const { onComplete, onDeleted, onEditingFlagSet, timeFromCreation, task, isEditing } = this.props;
    const isChecked = this.props.isComplete;

    let textTimeFromCreation = `created ${timeFromCreation} ago`;
    if (timeFromCreation === "now") textTimeFromCreation = "created now";

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onComplete} checked={isChecked} onChange={() => {}} />
          <label>
            <span className="description">{task}</span>
            <span className="created">{textTimeFromCreation}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditingFlagSet} aria-label="edit-button" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="delete-button" />
        </div>
        {isEditing && (
          <form onSubmit={this.onSubmitEdit} onBlur={this.onSubmitEdit}>
            <input
              type="text"
              className="edit"
              value={this.state.text}
              onChange={this.onEditInputChange}
              onKeyDown={this.onExit}
              autoFocus
            />
          </form>
        )}
      </>
    );
  }
}
