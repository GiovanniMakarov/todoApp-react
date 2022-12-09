import './Task.css';

const Task = ( {task} ) => {
  
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
          <span className="description">{task}</span>
          <span className="created">created 17 seconds ago</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
}

export default Task;