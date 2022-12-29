import "./TaskList.css";
import { Component } from "react";
import PropTypes from "prop-types";

import Task from "../task";

const classNames = require("classnames");

export default class TaskList extends Component {
  static defaultProps = {
    onComplete: () => {},
    onDeleted: () => {},
    onEditingFlagSet: () => {},
  };

  static propTypes = {
    onComplete: PropTypes.func,
    onDeleted: PropTypes.func,
    onEditingFlagSet: PropTypes.func,
  };

  render() {
    const { todos, onComplete, onDeleted, onEditingFlagSet, onEditingTask } = this.props;

    const elements = todos.map((item) => {
      const { id, isComplete, isEditing } = item;

      const action = classNames({
        completed: isComplete,
        editing: isEditing,
      });

      return (
        <li key={id} className={action}>
          <Task
            {...item}
            onComplete={() => onComplete(id)}
            onDeleted={() => onDeleted(id)}
            onEditingFlagSet={() => onEditingFlagSet(id)}
            onEditingTask={(text) => onEditingTask(id, text)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
