'use strict'

import React from 'react';
import userActionsCreator from '../actions/user'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import {Carousel, Modal, Button, Form, Col} from 'react-bootstrap';

import Registration from './Registration';
import PersonalArea from './PersonalArea';

import writeMachineImg from '../img/write-machine.jpg';
import loveBookImg from '../img/love-book.jpg';
import readingImg from '../img/reading.jpg';

class Content extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');
        // this.loginInput = React.createRef();
        // this.passwordInput = React.createRef();
    }

    // componentDidMount() {
    //     this.makeTextInputFocused();
    // }

    // makeTextInputFocused() {
    //     console.log(this.loginInput.current);
    //     this.loginInput.current.focus();
    // }


    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path={'/'}
                        exact
                        render={() => {
                            return (
                                <>
                                    {/*Окно для входа на сайт*/}
                                    <Modal
                                        show={this.props.userOpenLogInForm}
                                        onHide={() => this.props.actions.showLogInWindow(false)}
                                        aria-labelledby={'contained-modal-title-vcenter'}
                                        centered>
                                        {this.props.isLoggedIn ?
                                            <Modal.Header closeButton>
                                                <Modal.Title id={'contained-modal-title-vcenter'}>
                                                    Добро пожаловать {this.props.userLogin}!
                                                </Modal.Title>
                                            </Modal.Header>
                                            :
                                            <Modal.Header closeButton>
                                                <Modal.Title id={'contained-modal-title-vcenter'}>
                                                    Войдите на сайт
                                                </Modal.Title>
                                            </Modal.Header>}
                                        {this.props.isLoggedIn ?
                                            <Modal.Body>
                                                Вы успешно вошли на сайт!
                                            </Modal.Body>
                                            :
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group controlId={'formUserLoginChange'}>
                                                        <Form.Label>Логин</Form.Label>
                                                        <Form.Control
                                                            type={'login'}
                                                            placeholder={'Введите e-mail'}
                                                            onChange={event => {
                                                                this.props.actions.saveUserLoginValue(event.target.value);
                                                            }}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId={'formUserPasswordChange'}>
                                                        <Form.Label>Пароль</Form.Label>
                                                        <Form.Control
                                                            type={'password'}
                                                            placeholder={'Введите пароль'}
                                                            onChange={event => {
                                                                this.props.actions.saveUserPasswordValue(event.target.value);
                                                            }}
                                                        />
                                                    </Form.Group>
                                                    <Link to={'/registration'}>Регистрация</Link>
                                                </Form>
                                            </Modal.Body>
                                        }
                                        {this.props.isLoggedIn ?
                                            <Modal.Footer>
                                                {this.props.isLoggedIn && <Link to={'/personal'}>Личный кабинет</Link>}
                                            </Modal.Footer>
                                            :
                                            <Modal.Footer>
                                                <Button
                                                    variant={'primary'}
                                                    onClick={() => this.props.actions.onLogin(this.props.userLogin, this.props.userPassword)}>
                                                    Войти
                                                </Button>
                                                <Button
                                                    variant={'secondary'}
                                                    onClick={() => this.props.actions.showLogInWindow(false)}>
                                                    Отмена
                                                </Button>
                                            </Modal.Footer>
                                        }
                                    </Modal>
                                    }


                                    {/*Карусель*/}
                                    <Carousel>
                                        <Carousel.Item>
                                            <img
                                                className={'d-block w-100'}
                                                src={writeMachineImg}
                                                alt='write-machine'
                                            />
                                            <Carousel.Caption>
                                                <h3>Создавай свои произведения</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                                                    alias asperiores at consequatur debitis.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className={'d-block w-100'}
                                                src={readingImg}
                                                alt='reading'
                                            />
                                            <Carousel.Caption>
                                                <h3>Открывайте для себя новых авторов</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                                                    alias asperiores at consequatur debitis.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className={'d-block w-100'}
                                                src={loveBookImg}
                                                alt='love-book'
                                            />
                                            <Carousel.Caption>
                                                <h3>Поддерживай любимых авторов</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                                                    alias asperiores at consequatur debitis.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>

                                </>
                            )
                        }}
                    />
                    <Route
                        path={'/registration'}
                        exact
                        render={() => {
                            return (
                                <Registration/>
                            )
                        }}
                    />
                    <Route
                        path={'/personal'}
                        exact
                        render={() => {
                            return (
                                <PersonalArea {...this.props}/>
                            )
                        }}
                    />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    console.log('in mapStateToProps');
    return {
        ...state.user,
    };
};

const mapDispatchToProps = dispatch => {
    console.log('in mapDispatchToProps');
    return {
        actions: bindActionCreators(userActionsCreator, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Content);

export default Wrapped;