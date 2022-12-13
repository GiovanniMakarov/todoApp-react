import './AppHeader.css';
import NewTaskForm from '../new-task-form'

const AppHeader = (props) => {
    return (
    <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddItem={props.onAddItem}/>
    </header>
    );
}

export default AppHeader;