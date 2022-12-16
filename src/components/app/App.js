import "./App.css";
import { Component } from 'react'
import AppHeader from "../app-header/AppHeader";
import TaskList from "../task-list";
import AppFooter from "../app-footer/AppFooter";

import { formatDistanceToNow } from 'date-fns';


export default class App extends Component {

    maxID = 100;

    state = {
        TodoData: [
            {id: 1, task: 'Completed task', isComplete: false, creationDate: new Date(), timeFromCreation: ''},
            {id: 2, task: 'Editing task', isComplete: false, creationDate: new Date('2022 12 01 15:00'), timeFromCreation: '' },
            {id: 3, task: 'Active task', isComplete: false, creationDate: new Date('2022 12 01 15:00'), timeFromCreation: '' },
        ],
        filter: 'all',
    }

    onDoneClick = (id) => {
        this.setState( ({TodoData}) => {
            const idx = TodoData.findIndex( (el) => el.id === id);
            const newArray = [...TodoData];
            newArray[idx].isComplete = !TodoData[idx].isComplete;

            const oldItem = TodoData[idx];
            const newItem = {...oldItem, isComplete: !oldItem.isComplete};

            return [
              ...TodoData.slice(0, idx), 
              newItem,
              ...TodoData.slice(idx + 1)
            ];
        });
    }

    onAddItem = (text) => {
        if (text.length < 1) return;
        
        this.setState(({ TodoData }) => {
            const newTask = {
                id: this.maxID++,
                task: text,
                isComplete: false,
                creationDate: new Date(),
                timeFromCreation: 'now',
            }

            const newArray = [
                ...TodoData, newTask
            ]

            return {
                TodoData: newArray
            }
        })
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

    filter(items, filter) {
        switch(filter) {
            case 'all' : return items;
            case 'active' : return items.filter((item) => !item.isComplete);
            case 'completed' : return items.filter((item) => item.isComplete);
            default: return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    }

    onClearCompleted = () => {
        const { TodoData } = this.state;

        const idForDeleting = TodoData.reduce((acc, cur) => {
            if (cur.isComplete) {
                acc.push(cur.id);
            }
            return acc;
        }, []);

        idForDeleting.forEach((el) => this.onDeleted(el));
    }

    updateTimeFromCreation = () => {
        const { TodoData } = this.state;

        const newArray = TodoData.map((todo) => {
            const { creationDate } = todo;
            const timeFromCreation = formatDistanceToNow(creationDate);
            return {
                ...todo, timeFromCreation: timeFromCreation
            }
        })

        this.setState( () => {
            return {TodoData: newArray}
        });
    }


    render () {
        const { TodoData, filter } = this.state;

        const visibleTodos = this.filter(TodoData, filter);

        const doneCount = TodoData.filter((el) => el.isComplete).length;
        const todoCount = TodoData.length - doneCount;

        setInterval( () => this.updateTimeFromCreation(), 1000);

        return (
            <section className="todoapp">
                <AppHeader onAddItem={this.onAddItem}/>
                <section className="main">
                    <TaskList todos={visibleTodos}
                              onComplete={this.onDoneClick}
                              onDeleted={this.onDeleted}
                    />
                    <AppFooter itemsLeft={todoCount} 
                               filter={filter}
                               onFilterChange={this.onFilterChange}
                               onClearCompleted={this.onClearCompleted}
                    />
                </section>
            </section>
        )
    }
}