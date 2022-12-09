import "./TaskList.css";
import Task from "../task";

const TaskList = ({ todos }) => {
    const elements = todos.map( item => {
        const { id, isComplete, isEditActive, isActive } = item;
        let action;
        if (isComplete) {
          action = 'completed';
        } else if (isEditActive) {
          action = 'editing';
        } else if (isActive) {
          action = null;
        }

        return (
            <li key={id} className={ action }>
                <Task { ...item } /> 
                { action === 'editing' ? <input type="text" className="edit" value="Editing task" /> : null }   
            </li>
        )
    })

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    )
}

export default TaskList;