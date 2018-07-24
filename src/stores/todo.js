/* eslint no-console: 0 */
import { autorun, observable, computed } from 'mobx';
import request from 'common/request';

class TodoStore {
  @observable todos = [];

  @observable pendingRequests = 0;

  constructor() {
    autorun(() => console.log(this.report));
  }

  @computed get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true,
    ).length;
  }

  @computed get report() {
    if (this.todos.length === 0) {
      return '<none>';
    }
    return `Next todo: "${this.todos[0].task}". `
        + `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    if (task) {
      this.todos.push({
        task,
        completed: false,
        assignee: null,
      });
    }
  }
}

const todoStore = new TodoStore();

export default todoStore;
