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
    this.setState({
      text: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onAddItem(this.state.text);
    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onInputChange}
          value={this.state.text}
        />
      </form>
    );
  }
}
