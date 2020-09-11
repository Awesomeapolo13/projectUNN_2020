'use strict'

import React from 'react';
import {Container, Tab, Col, Row, Nav} from 'react-bootstrap';
import './style.css';

import aboutUsImg from '../img/about-us.jpg';
import teamImg from '../img/team.jpg';
import contactsImg from '../img/contacts.jpg';

export default function About(props) {
    return (
        // <div>
        //     <p>Наши конкурсы</p>
        //     <p>Здесь вы можете поучаствовать в конкурсах, которые организовывают наши пользователи или создать свой</p>
        //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias commodi impedit ipsum itaque iusto
        //         laborum minima minus optio quidem repudiandae, ullam vel voluptatibus. Doloribus ex illo nulla officia
        //         unde?</p>
        // </div>
        <Container className={'about-us'}>
            <Tab.Container id={'about-us'} defaultActiveKey={'about-app'}>
                <Row>
                    <Col sm={3}>
                        <Nav variant={'pills'} className={'flex-column mt-5'}>
                            <Nav.Item>
                                <Nav.Link eventKey={'about-app'}>О сайте</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'team'}>Команда</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'contacts'}>Контакты</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className={'about-us'}>
                            <Tab.Pane eventKey={'about-app'}>
                                <img
                                    src={aboutUsImg}
                                    className={'about-us-img'}
                                    alt='about-us'/>
                                <p>Информация про сайт</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Culpa ducimus illo laboriosam perspiciatis quae totam?
                                    Aspernatur aut deleniti enim libero modi sunt tempora tempore ullam.
                                    Consequatur eveniet provident tempora tenetur!
                                </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'team'}>
                                <img
                                    src={teamImg}
                                    className={'about-us-img'}
                                    alt='about-us'/>
                                <p>Информация про комнду поддержки сайта</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Culpa ducimus illo laboriosam perspiciatis quae totam?
                                    Aspernatur aut deleniti enim libero modi sunt tempora tempore ullam.
                                    Consequatur eveniet provident tempora tenetur!
                                </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'contacts'}>
                                <img
                                    src={contactsImg}
                                    className={'about-us-img'}
                                    alt='about-us'/>
                                <p>Контакты для связи по вопросам партнерства, поддержки, релами и т.д.</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Culpa ducimus illo laboriosam perspiciatis quae totam?
                                    Aspernatur aut deleniti enim libero modi sunt tempora tempore ullam.
                                    Consequatur eveniet provident tempora tenetur!
                                </p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>

    );
}