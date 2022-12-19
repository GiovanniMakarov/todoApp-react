import "./AppHeader.css";
import PropTypes from "prop-types";

import NewTaskForm from "../new-task-form";

function AppHeader(props) {
  const { onAddItem } = props;

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAddItem={onAddItem} />
    </header>
  );
}

AppHeader.defaultProps = {
  onAddItem: () => {},
};

AppHeader.propTypes = {
  onAddItem: PropTypes.func,
};

export default AppHeader;
