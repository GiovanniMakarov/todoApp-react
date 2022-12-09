import "./App.css";
import AppHeader from "../app-header/AppHeader";
import TaskList from "../task-list";
import AppFooter from "../app-footer/AppFooter";


const App = () => {
    const TodoData = [
        {id: 1, task: 'Completed task', isComplete: true, isEditActive: false, isActive: false},
        {id: 2, task: 'Editing task', isComplete: false, isEditActive: true, isActive: false},
        {id: 3, task: 'Active task', isComplete: false, isEditActive: false, isActive: true},
    ]

    return (
        <section className="todoapp">
            <AppHeader />
            <section className="main">
                <TaskList todos={TodoData}/>
                <AppFooter />
            </section>
        </section>
    )
}

export default App;