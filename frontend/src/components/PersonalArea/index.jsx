'use strict'

import React from 'react';
import {Container, Nav, Tab, Row, Col,} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserInfoChange from '../UserInfoChange';
import actions from '../../actions/user';
import UserCard from '../UserCard';
import PostCreator from '../PostCreator';

import './style.css';

class PersonalArea extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        console.log('загрузил посты и личные данные');
        this.props.actions.fetchPersonalInfo();
        this.props.actions.fetchPosts();
    }

    render() {
        return (
            <>
                <Container className={'personal-area'}>
                    {this.props.isUsersLoading && <p>Загрузка...</p>}
                    <Tab.Container id={'user-card-info'} defaultActiveKey={'personal-info'}>
                        <Row>
                            <Col sm={3}>
                                <Nav variant={'pills'} className={'flex-column'}>
                                    <Nav.Item>
                                        <Nav.Link eventKey={'personal-info'}>Мои данные</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={'personal-info-change'}>Изменить</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={'create-post'}>Создать публикацию</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={'personal-posts'}>Мои публикации</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey={'personal-info'}>
                                        <UserCard {...this.props.personalInfo}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={'personal-info-change'}>
                                        <UserInfoChange {...this.props}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={'create-post'}>
                                        <PostCreator {...this.props}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={'personal-posts'}>
                                        <h3>Мои публикации</h3>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </>
        )
    }
}

// function PersonalArea(props) {
//
//     return (
//
//         <>
//             <Tab.Container id={'user-card-info'} defaultActiveKey={'user-info'}>
//                 <Row>
//                     <Col sm={3}>
//                         <Nav variant={'pills'} className={'flex-column'}>
//                             <Nav.Item>
//                                 <Nav.Link eventKey={'personal-info'}>Информация о Вас</Nav.Link>
//                             </Nav.Item>
//                             <Nav.Item>
//                                 <Nav.Link eventKey={'personal-info-change'}>Изменить</Nav.Link>
//                             </Nav.Item>
//                             <Nav.Item>
//                                 <Nav.Link eventKey={'personal-posts'}>Ваши публикации</Nav.Link>
//                             </Nav.Item>
//                         </Nav>
//                     </Col>
//                     <Col sm={9}>
//                         <Tab.Content>
//                             <Tab.Pane eventKey={'personal-info'}>
//                                 <UserCard {...props}/>
//                             </Tab.Pane>
//                             <Tab.Pane eventKey={'personal-info-change'}>
//                                 <UserInfoChange {...props}/>
//                             </Tab.Pane>
//                             <Tab.Pane eventKey={'personal-posts'}>
//                                 <h3>Ваши публикации</h3>
//                             </Tab.Pane>
//                         </Tab.Content>
//                     </Col>
//                 </Row>
//             </Tab.Container>
//         </>
//     )
// }

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalArea);