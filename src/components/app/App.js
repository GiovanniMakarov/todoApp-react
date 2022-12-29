import "./App.css";
import { Component } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import AppHeader from "../app-header/AppHeader";
import TaskList from "../task-list";
import AppFooter from "../app-footer/AppFooter";

export default class App extends Component {
  state = {
    todoData: [],
    filter: "all",
  };

  componentDidMount() {
    const todoDataLS = JSON.parse(localStorage.getItem("todoData"));

    if (todoDataLS) {
      this.setState({
        todoData: todoDataLS,
      });
    }
  }

  onDoneClick = (id) => {
    let todoDataLS = JSON.parse(localStorage.getItem("todoData"));

    todoDataLS = this.toggleProperty(todoDataLS, id, "isComplete");

    localStorage.setItem("todoData", JSON.stringify(todoDataLS));

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "isComplete"),
      };
    });
  };

  onAddItem = (text) => {
    if (text.length < 1) return;

    const newTask = {
      id: uuidv4(),
      task: text,
      isComplete: false,
      creationDate: new Date(),
      timeFromCreation: "now",
      isEditing: false,
    };

    let tasks = JSON.parse(localStorage.getItem("todoData"));

    if (!tasks) {
      tasks = [];
    }

    tasks.push(newTask);
    localStorage.setItem("todoData", JSON.stringify(tasks));

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newTask];

      return {
        todoData: newArray,
      };
    });
  };

  onDeleted = (id) => {
    const tasks = JSON.parse(localStorage.getItem("todoData"));
    const newTasks = tasks.filter((el) => el.id !== id);
    localStorage.setItem("todoData", JSON.stringify(newTasks));

    this.setState(() => {
      return {
        todoData: newTasks,
      };
    });
  };

  onEditingFlagSet = (id) => {
    const todoDataLS = JSON.parse(localStorage.getItem("todoData"));
    const newData = this.toggleProperty(todoDataLS, id, "isEditing");
    localStorage.setItem("todoData", JSON.stringify(newData));

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "isEditing"),
      };
    });
  };

  onEditingTask = (id, newText) => {
    const todoDataLS = JSON.parse(localStorage.getItem("todoData"));
    const idx = todoDataLS.findIndex((el) => el.id === id);
    todoDataLS[idx] = { ...todoDataLS[idx], task: newText };

    localStorage.setItem("todoData", JSON.stringify(todoDataLS));

    this.setState(() => {
      return {
        todoData: todoDataLS,
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
      let { creationDate } = todo;
      if (typeof creationDate === "string") {
        creationDate = parseISO(creationDate);
      }

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
    const filters = {
      all: "all",
      active: "active",
      completed: "completed",
    };

    switch (filter) {
      case filters.all:
        return items;
      case filters.active:
        return items.filter((item) => !item.isComplete);
      case filters.completed:
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
        <AppHeader onAddItem={this.onAddItem} todos={todoData} />
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
