'use strict'
// умный компонент
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './Header/Header';
import Content from './Content';
import Footer from './Footer/Footer';
import UsersContainer from './UsersContainer';
import PostContainer from './PostContainer';
import About from './About';
import NotFound from './NotFound';

// import './style.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    // updateCounter () {
    //     this.setState((state, props) => {
    //         return {
    //             counter: ++state.counter
    //         };
    //     });
    // }

    // setPage(pageId) {
    //     this.setState({
    //         activePageId: pageId,
    //     });
    // }

    // getRegistration() {
    //     this.setState({
    //         userRegister: true,
    //     })
    // }

    // getPageComponent() {
    //     switch (this.state.activePageId) {
    //         case 0:
    //             return(
    //                 <Content
    //                     userName={this.state.userLogin}
    //                     isLoggedIn={this.state.isLoggedIn}
    //                     handleInputLogin={this.onInputLogin}
    //                     handleInputPassword={this.onInputPassword}
    //                     handleLogin={this.onLogin}
    //                     handleLogout={this.onLogout}
    //                 />
    //             );
    //         case 1:
    //             return (
    //                 <UsersList />
    //             );
    //
    //         case 2:
    //             return (
    //                 <Posts
    //                     avatar={'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png'}
    //                     name={'name'}
    //                     surname={'surname'}
    //                     tittle={'Это заголовок первой статьи'}
    //                     text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deleniti eaque non vero? At, commodi eveniet ipsa laborum laudantium minima necessitatibus provident quas quisquam ullam! Laboriosam magnam minus omnis possimus?'}
    //                 />
    //             );
    //         case 3:
    //             return (
    //                 <Contests />
    //             );
    //         default:
    //             return (
    //                 <div>
    //                     <h1>404 Стараница не найдена</h1>
    //                 </div>
    //             )
    //     }
    // }

    // onInputLogin(e) {
    //     console.log(e);
    //     this.setState({
    //         userLogin: e.target.value,
    //     });
    // }
    //
    // onInputPassword(e) {
    //     console.log(e);
    //     this.setState({
    //         userPassword: e.target.value,
    //     });
    // }

    // async onLogin(email, password) {
    //     try {
    //         console.log(email, typeof email, password, typeof password);
    //         const login = await axios.post(
    //             'http://localhost:3000/user/login',
    //             {
    //                 email: email,
    //                 password: password,
    //             },
    //             );
    //         console.log(login);
    //         if (login.status === 200) {
    //             this.setState({
    //                 isLoggedIn: true,
    //             });
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    //
    // onLogout() {
    //     this.setState({
    //         isLoggedIn: false,
    //         userName: '',
    //         userPassword: '',
    //     });
    // }

    render() {
        return (
            <Router>
                <Header
                    userName={this.props.userLogin}
                    isLoggedIn={this.props.isLoggedIn}
                    userOpenLogInForm={this.props.userOpenLogInForm}
                    // handleLogout={this.onLogout}
                    pages={this.props.pages}
                    // setPage={this.setPage}
                />
                <Switch>
                    <Route
                        path={this.props.pages.find(page => page.pageId === 0).path}
                        exact
                        render={() => {
                            return (
                                <Content
                                    // userName={this.state.userLogin}
                                    // userPassword={this.state.userPassword}
                                    // isLoggedIn={this.state.isLoggedIn}
                                    // handleGetRegistration={this.state.getRegistration}
                                    // handleInputLogin={this.onInputLogin}
                                    // handleInputPassword={this.onInputPassword}
                                    // handleLogin={this.onLogin}
                                    // handleLogout={this.onLogout}
                                />
                            )
                        }}/>
                    <Route
                        path={this.props.pages.find(page => page.pageId === 1).path}
                        exact
                        render={() => {
                            return (
                                <UsersContainer/>
                            )
                        }}/>
                    <Route
                        path={this.props.pages.find(page => page.pageId === 2).path}
                        exact
                        render={() => {
                            return (
                                <PostContainer/>
                            )
                        }}/>
                    <Route path={this.props.pages.find(page => page.pageId === 3).path}
                           exact
                           render={() => {
                               return (
                                   <About/>
                               )
                           }}/>
                    <Route
                        path={'*'}
                        exact
                        component={NotFound}/>
                </Switch>
                <Footer/>
            </Router>
        )
    }
}

const mapStateToProps = state => ({...state.user});

export default connect(mapStateToProps, null)(Main);