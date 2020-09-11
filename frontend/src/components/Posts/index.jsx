'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Col, Row, Media, Spinner} from "react-bootstrap";
import './style.css'
import {connect} from 'react-redux';

function Posts(props) {
    return (
        <>
            <Container className={'m-5'}>
                <Row>
                    <Col md={9}>
                        <h3>Последние публикации</h3>
                        {props.isPostsLoading &&
                        <Spinner animation={'border'} role={'status'} variant={'dark'}/>}
                        {props.isPostsLoading &&
                        <Spinner animation={'border'} role={'status'} variant={'dark'}/>}
                        {props.isPostsLoading &&
                        <Spinner animation={'border'} role={'status'} variant={'dark'}/>}
                        {
                            props.posts.map(post => {
                                for (let user of props.users) {
                                    if (user.userID === post.userID) {
                                        post.name = user.name;
                                        post.surname = user.surname;
                                        post.avatar = user.avatar;
                                    }
                                }
                                return (
                                    <Media key={post.postID}>
                                        <img
                                            width={100}
                                            src={post.avatar}
                                            alt={'post-avatar'}
                                            className={'mr-3'}/>
                                        <Media.Body>
                                            <span>{post.name + ' ' + post.surname}</span>
                                            <h5>{post.tittle}</h5>
                                            <Link to={'/posts/' + post.postID}>Перейти к публикации</Link>
                                            <p>{post.text}</p>
                                        </Media.Body>
                                    </Media>
                                );
                            })
                        }
                    </Col>
                </Row>
            </Container>

            {/*<div>*/}
            {/*    <h3>Последние публикации:</h3>*/}
            {/*    {props.isPostsLoading && <span>Загрузка...</span>}*/}
            {/*    <ul>*/}
            {/*        {*/}
            {/*           props.posts.map(post => {*/}
            {/*                   for (let user of props.users) {*/}
            {/*                           if (user.userID === post.userID) {*/}
            {/*                                   post.name = user.name;*/}
            {/*                                   post.surname = user.surname;*/}
            {/*                                   post.avatar = user.avatar;*/}
            {/*                           }*/}
            {/*                   }*/}
            {/*                return (*/}

            {/*                    <li key={post.postID}>*/}
            {/*                        <div className={'postsInfo'}>*/}
            {/*                            <div className={'avatar'}>*/}
            {/*                                <img src={post.avatar} alt='user.avatar'/>*/}
            {/*                            </div>*/}
            {/*                            <div className={'user'}>*/}
            {/*                                <span>{post.name + ' ' + post.surname}</span>*/}
            {/*                                <h3>{post.tittle}</h3>*/}
            {/*                                <Link to={'/posts/' + post.postID}>Перейти к публикации</Link>*/}
            {/*                                <p>{post.text}</p>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </li>*/}
            {/*                );*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </>
    )
}

const mapStateToProps = state => ({...state.user});

export default connect(mapStateToProps, null)(Posts);