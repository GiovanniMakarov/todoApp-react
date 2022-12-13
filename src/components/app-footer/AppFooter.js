import './AppFooter.css';
import TaskFilter from '../tasks-filter/TaskFilter';

const AppFooter = (props) => {
    const {itemsLeft, filter, onFilterChange, onClearCompleted} = props;

    return (
        <footer className="footer">
          <span className="todo-count">{itemsLeft} items left</span>

          <TaskFilter filter={filter}
                      onFilterChange={onFilterChange} />
          <button className="clear-completed"
                  onClick={onClearCompleted}
          >
            Clear completed
          </button>
        </footer>
    )
}

export default AppFooter;