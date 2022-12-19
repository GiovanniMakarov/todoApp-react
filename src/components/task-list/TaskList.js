import "./TaskList.css";
import { Component } from "react";
import PropTypes from "prop-types";

import Task from "../task";

export default class TaskList extends Component {
  static defaultProps = {
    onComplete: () => {},
    onDeleted: () => {},
  };

  static propTypes = {
    onComplete: PropTypes.func,
    onDeleted: PropTypes.func,
    todos: PropTypes.isRequired,
  };

  render() {
    const { todos, onComplete, onDeleted } = this.props;

    const elements = todos.map((item) => {
      const { id, isComplete, isEditing, isActive } = item;

      let action;
      if (isComplete) {
        action = "completed";
      } else if (isEditing) {
        action = "editing";
      } else if (isActive) {
        action = null;
      }

      return (
        <li key={id} className={action}>
          <Task {...item} onComplete={() => onComplete(id)} onDeleted={() => onDeleted(id)} />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
