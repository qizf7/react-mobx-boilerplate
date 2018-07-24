/* eslint-disable no-alert, no-console */
import React from 'react';
import { observer } from 'mobx-react';

@observer
class TodoView extends React.Component {
  onToggleCompleted = () => {
    const { todo } = this.props;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const { todo } = this.props;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }

  render() {
    const { todo } = this.props;
    return (
      <li onDoubleClick={this.onRename}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={this.onToggleCompleted}
        />
        { todo.task }
        { todo.assignee
          ? (
            <small>
              { todo.assignee.name }
            </small>
          )
          : null
        }
      </li>
    );
  }
}
