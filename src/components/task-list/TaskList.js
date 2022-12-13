import "./TaskList.css";
import Task from "../task";
import { Component } from "react";

export default class TaskList extends Component {
    
    render () {
        const {todos, onComplete, onDeleted} = this.props;

        const elements = todos.map(item => {
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
                    <Task { ...item } onComplete={() => onComplete(id)} onDeleted={() => onDeleted(id)}/>  
                </li>
            )
        })

        return (
            <ul className="todo-list">
                { elements }
            </ul>
        )
    }

    
}

