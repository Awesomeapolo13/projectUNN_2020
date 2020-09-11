'use strict'

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Posts from './Posts';
import Post from './Post/Post';
import {bindActionCreators} from 'redux';
import actions from '../actions/user';
import {connect} from 'react-redux';

class PostContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    // async fetchPosts() {
    //     this.setState({
    //         isPostsLoading: true,
    //     });
    //     try {
    //         //Получаем перечень постов
    //         const responsePosts = await axios.get(
    //             'http://localhost:3000/post/list',
    //             {headers: {'Authorization': 'Bearer d11a2872-36be-4e86-be4a-4620d86e737b'}}
    //         );
    //         this.setState({
    //             posts: responsePosts.data,
    //         });
    //         //Получаем перечень авторов постов
    //         const responseAuthors = await axios.get(
    //             'http://localhost:3000/user/list',
    //             {headers: {'Authorization': 'Bearer d11a2872-36be-4e86-be4a-4620d86e737b'}}
    //         );
    //         this.setState({
    //             users: responseAuthors.data,
    //         });
    //         const result = this.state.posts.map (post => {
    //             for (let user of this.state.users) {
    //                 if (user.userID === post.userID) {
    //                     post.name = user.name;
    //                     post.surname = user.surname;
    //                     post.avatar = user.avatar;
    //                 }
    //             }
    //             return post
    //         })
    //         this.setState({
    //             result: result,
    //         });
    //     } catch (e) {
    //         console.log('error', e);
    //     } finally {
    //         this.setState({
    //             isPostsLoading: false,
    //         })
    //     }
    // }

    componentDidMount() {
        this.props.actions.fetchUsers();
        this.props.actions.fetchPosts();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path={'/posts'}
                        exact
                        render={() => {
                            return (
                                <Posts
                                    {...this.props}
                                />
                            )
                        }}
                    />

                    <Route
                        path={'/posts/:postId'}
                        exact
                        render={(props) => {
                            console.log('here', props);
                            const id = props.match.params.postId;
                            console.log('there', id);
                            console.log(this.props.posts); // undefined
                            const selectedPost = this.props.posts.find(post => post.postID === id);
                            if (selectedPost) {
                                return <Post {...selectedPost} />;
                            } else {
                                console.log('try to redirect');
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

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);