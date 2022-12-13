import "./App.css";
import { Component } from 'react'
import AppHeader from "../app-header/AppHeader";
import TaskList from "../task-list";
import AppFooter from "../app-footer/AppFooter";


export default class App extends Component {

    state = {
        TodoData: [
            {id: 1, task: 'Completed task', isComplete: false, isEditActive: false, isEditing: false },
            {id: 2, task: 'Editing task', isComplete: false, isEditActive: false, isEditing: false },
            {id: 3, task: 'Active task', isComplete: false, isEditActive: false, isEditing: false },
        ]
    }

    onDoneClick = (id) => {
        this.setState( ({ TodoData }) => {
            const idx = TodoData.findIndex( (el) => el.id === id);
            const newArray = [...TodoData];
            newArray[idx].isComplete = !TodoData[idx].isComplete;

            return {
                TodoData: newArray
            };
        });
    }

    onDeleted = (id) => {
        this.setState(({ TodoData }) => {
            const idx = TodoData.findIndex( (el) => el.id === id);
            const newArray = [...TodoData.slice(0, idx), ...TodoData.slice(idx + 1)];

            return {
                TodoData: newArray
            }
        })
    }
   
    render () {
        return (
            <section className="todoapp">
                <AppHeader />
                <section className="main">
                    <TaskList todos={this.state.TodoData} onComplete={this.onDoneClick} onDeleted={this.onDeleted}/>
                    <AppFooter />
                </section>
            </section>
        )
    }
}