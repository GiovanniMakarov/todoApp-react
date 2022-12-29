import { Component } from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddItem: () => {},
  };

  static propTypes = {
    onAddItem: PropTypes.func,
  };

  state = {
    text: "",
  };

  onInputChange = (event) => {
    this.setState(() => {
      return {
        text: event.target.value,
      };
    });
  };

  onSubmit = (event) => {
    const { onAddItem } = this.props;
    const { text } = this.state;

    event.preventDefault();

    onAddItem(text);

    this.setState(() => {
      return { text: "" };
    });
  };

  render() {
    const { todos } = this.props;
    const placeHolderText = todos.length > 0 ? "What needs to be done?" : "Add your first task here";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder={placeHolderText}
          onChange={this.onInputChange}
          value={this.state.text}
        />
      </form>
    );
  }
}
