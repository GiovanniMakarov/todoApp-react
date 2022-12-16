import { Component } from 'react';
import './TaskFilter.css';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
    
    static defaultProps = {
        onFilterChange: () => {},

    }

    static propTypes = {
        onFilterChange: PropTypes.func,
        filter: PropTypes.string
    }

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'},
    ]

    render () {
        const { filter, onFilterChange } = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'selected' : null;

            return (
                <li key={name}>
                    <button type='button'
                            className={clazz}
                            onClick={() => {onFilterChange(name)}}
                            >
                        {label}
                    </button>
                </li>
            )
        })

        return (
            <ul className="filters">
                {buttons}
            </ul>
        )
    }
    
}

