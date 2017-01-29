import React, {Component} from 'react';
import { connect } from 'react-redux';
import { decorateActions } from '../../';
import * as actions from './widgets';

class Todos extends Component {
  componentWillMount() {
    this.props.todoActions.fetchData('todos');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.todos.dataExpired && !nextProps.todos.isFetching) {
      this.props.todoActions.fetchData('todos');
    }
  }

  render() {
    const {todos} = this.props;

    if (todos.dataExpired || todos.isLoading) {
      return (<span>Loading todos...</span>);
    }

    return (
      <div className='todos'>{
        todos.payload.map(todo =>
          <label key={todo.id}>
            <input type='checkbox'
              checked={todo.completed || false}
              onClick={() => this.props.todoActions.onSelect(todo.id)}
              />
            {todo.description}
          </label>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  todoActions: decorateActions(actions, dispatch, 'todos')
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
