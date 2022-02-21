'use strict'

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/user';
import UsersList from './UsersList';
import User from './User';

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.actions.fetchUsers();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path={'/users'}
                        exact
                        render={() => {
                            return (
                                <UsersList
                                    {...this.props}
                                />
                            )
                        }}
                    />

                    <Route
                        path={'/users/:userId'}
                        exact
                        render={(props) => {
                            const id = props.match.params.userId;
                            // console.log(id);
                            const selectedUser = this.props.users.find(user => user.userID === id);
                            if (selectedUser) {
                                return <User {...selectedUser} />;
                            } else {
                                console.log('here');
                                return <Redirect to={'*'}/>;
                            }
                        }}
                    />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => ({ ...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);