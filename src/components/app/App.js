import "./App.css";
import { Component } from "react";
import { formatDistanceToNow } from "date-fns";

import AppHeader from "../app-header/AppHeader";
import TaskList from "../task-list";
import AppFooter from "../app-footer/AppFooter";

export default class App extends Component {
  maxID = 100;

  state = {
    todoData: [
      {
        id: 1,
        task: "Do smth",
        isComplete: false,
        creationDate: new Date(),
        timeFromCreation: "",
        isEditing: false,
      },
      {
        id: 2,
        task: "Drink cofee",
        isComplete: false,
        creationDate: new Date("2022 12 01 15:00"),
        timeFromCreation: "",
        isEditing: false,
      },
      {
        id: 3,
        task: "Check mail",
        isComplete: false,
        creationDate: new Date("2022 12 07 20:00"),
        timeFromCreation: "",
        isEditing: false,
      },
    ],
    filter: "all",
  };

  onDoneClick = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "isComplete"),
      };
    });
  };

  onAddItem = (text) => {
    if (text.length < 1) return;

    this.setState(({ todoData }) => {
      const newTask = {
        id: this.maxID++,
        task: text,
        isComplete: false,
        creationDate: new Date(),
        timeFromCreation: "now",
        isEditing: false,
      };

      const newArray = [...todoData, newTask];

      return {
        todoData: newArray,
      };
    });
  };

  onDeleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  onEditingFlagSet = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "isEditing"),
      };
    });
  };

  onEditingTask = (id, newText) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, task: newText };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onClearCompleted = () => {
    const { todoData } = this.state;

    const idForDeleting = todoData.reduce((acc, cur) => {
      if (cur.isComplete) {
        acc.push(cur.id);
      }
      return acc;
    }, []);

    idForDeleting.forEach((el) => this.onDeleted(el));
  };

  updateTimeFromCreation = () => {
    const { todoData } = this.state;

    if (todoData.length < 1) return;

    const newArray = todoData.map((todo) => {
      const { creationDate } = todo;
      const timeFromCreation = formatDistanceToNow(creationDate);
      return {
        ...todo,
        timeFromCreation,
      };
    });

    this.setState(() => {
      return { todoData: newArray };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.isComplete);
      case "completed":
        return items.filter((item) => item.isComplete);
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleTodos = this.filter(todoData, filter);

    const doneCount = todoData.filter((el) => el.isComplete).length;
    const todoCount = todoData.length - doneCount;

    setInterval(() => this.updateTimeFromCreation(), 1000);

    return (
      <section className="todoapp">
        <AppHeader onAddItem={this.onAddItem} />
        <section className="main">
          <TaskList
            todos={visibleTodos}
            onComplete={this.onDoneClick}
            onDeleted={this.onDeleted}
            onEditingFlagSet={this.onEditingFlagSet}
            onEditingTask={this.onEditingTask}
          />
          <AppFooter
            itemsLeft={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
