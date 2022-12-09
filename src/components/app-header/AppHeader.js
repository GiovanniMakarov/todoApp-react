import './AppHeader.css';
import SearchPanel from '../new-task-form'

const AppHeader = () => {
    return (
    <header className="header">
        <h1>todos</h1>
        <SearchPanel />
    </header>
    );
}

export default AppHeader;