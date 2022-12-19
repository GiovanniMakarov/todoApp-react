import "./AppFooter.css";
import PropTypes from "prop-types";

import TaskFilter from "../tasks-filter/TaskFilter";

function AppFooter(props) {
  const { itemsLeft, filter, onFilterChange, onClearCompleted } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>

      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

AppFooter.defaultProps = {
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

AppFooter.propTypes = {
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
  itemsLeft: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
};

export default AppFooter;
