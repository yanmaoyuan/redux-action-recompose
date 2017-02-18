import React, {Component} from 'react';
import { connect } from 'react-redux';
import { decorateActions } from '../../';
import * as actions from './widgets';

class Users extends Component {
  componentWillMount() {
    this.props.userActions.fetchData('users');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.users.dataExpired && !nextProps.users.isFetching) {
      this.props.userActions.fetchData('users');
    }
  }

  render() {
    const {users} = this.props;

    if (!users.payload || users.isLoading) {
      return (<span>Loading users...</span>);
    }

    return (
      <div className='users'>{
        users.payload.map(user =>
          <div key={user.id}>{user.name}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  // optionally, you could dispatch the same event with multiple labels
  userActions: decorateActions(actions, dispatch, ['users', 'users2'])
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
