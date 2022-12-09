import './AppFooter.css';
import TaskFilter from '../tasks-filter/TaskFilter';

const AppFooter = () => {
    return (
        <footer className="footer">
          <span className="todo-count">1 items left</span>

          <TaskFilter />
          <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default AppFooter;