import './AppHeader.css';
import NewTaskForm from '../new-task-form'
import PropTypes from 'prop-types';

const AppHeader = (props) => {
    return (
    <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddItem={props.onAddItem}/>
    </header>
    );
}

AppHeader.defaultProps = {
    onAddItem: () => {},
}

AppHeader.propTypes = {
    onAddItem: PropTypes.func,
}

export default AppHeader;