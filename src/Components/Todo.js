import React from 'react';
import './Todo.css';
import classnames from 'classnames';

class Todo extends React.Component {
  render () {
    const { todo } = this.props;
    return (
      <div 
      onClick={this.props.onClick}
      className={classnames('todo', {'is-complete': todo.isCompletion})}>
        <div className="content">
          {todo.id < 10? '0': ''}{todo.id}.&nbsp;&nbsp;
          {todo.content}
        </div>
      </div>
    )
  }
}

export default Todo;
