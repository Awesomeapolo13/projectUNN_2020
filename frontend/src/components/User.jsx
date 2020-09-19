'use strict'

import React from 'react';
import { Nav, Tab, Row, Col,  } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserInfoChange from './UserInfoChange';
import actions from '../actions/user';
import UserCard from './UserCard';

function User(props) {

    return (
        <>
            <Tab.Container id={'user-card-info'} defaultActiveKey={'user-info'}>
                <Row>
                    <Col sm={3}>
                        <Nav variant={'pills'} className={'flex-column'}>
                            <Nav.Item>
                                <Nav.Link eventKey={'user-info'}>Пользователь</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'user-info-change'}>Изменить</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'user-info-posts'}>Публикации</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey={'user-info'}>
                                <UserCard {...props}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'user-info-change'}>
                                <UserInfoChange {...props}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'user-info-posts'}>
                                <h3>Публикации выбранного пользователя</h3>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

const mapStateToProps = state => ({ ...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);