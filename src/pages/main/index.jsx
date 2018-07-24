/* eslint-disable no-alert */
import React from 'react';
import { inject, observer } from 'mobx-react';
import TodoView from './TodoView';

@inject(({ todoStore }) => ({
  todoStore,
}))
@observer
class TodoList extends React.Component {
  onNewTodo = () => {
    const { todoStore } = this.props;
    todoStore.addTodo(prompt('Enter a new todo:', 'coffee plz'));
  }

  render() {
    const { todoStore } = this.props;
    return (
      <div>
        { todoStore.report }
        <ul>
          { todoStore.todos.map(
            /* eslint-disable-next-line react/no-array-index-key */
            (todo, idx) => <TodoView id="12" todo={todo} key={idx} />,
          ) }
        </ul>
        { todoStore.pendingRequests > 0 ? (
          <span>
            Loading...
          </span>
        ) : null }
        <button type="submit" onClick={this.onNewTodo}>
          New Todo
        </button>
        <small>
          {' '}
          (double-click a todo to edit)
        </small>
      </div>
    );
  }
}

export default TodoList;
