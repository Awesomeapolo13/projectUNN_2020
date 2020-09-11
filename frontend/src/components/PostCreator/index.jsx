'use strict'

import React from 'react';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';
import {connect} from 'react-redux';
import {Container, Form, Button} from 'react-bootstrap';

function PostCreator(props) {
    return (
        <>
            <Container>
                <Form>
                    <Form.Group controlId={'newPostTittle'}>
                        <Form.Label>Заголовок публикации</Form.Label>
                        <Form.Control
                            required
                            type={'title'}
                            placeholder={'Введите заголовок'}
                            onChange={(event) => props.actions.createPostTitle(event.target.value)}
                            onFocus={(event) => props.actions.createPostTitle(event.target.value)}
                        />
                        {props.isPostTitleInvalid && <Form.Control.Feedback type={'invalid'}>Введитие заголовок публикации</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group controlId={'newPostType'}>
                        <Form.Label>Тематика публикации</Form.Label>
                        <Form.Control
                            as={'select'}
                            type={'type'}
                            defaultValue={'other'}
                            onChange={(event) => props.actions.createPostType(event.target.value)}
                        >
                            <option value='weather'>Погода</option>
                            <option value='love'>Любовь</option>
                            <option value='sadness'>Грусть</option>
                            <option value='sport'>Спорт</option>
                            <option value='religion'>Вера</option>
                            <option value='holiday'>Праздничные</option>
                            <option value='army'>Армейские</option>
                            <option value='nature'>Природа</option>
                            <option value='life'>Жизнь</option>
                            <option value='folk'>Народное творчество</option>
                            <option value='baby'>Детские</option>
                            <option value='other'>Другие</option>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'newPostText'}>
                        <Form.Label>Текст Вашей публикации</Form.Label>
                        <Form.Control
                            required
                            as={'textarea'}
                            rows={3}
                            onChange={(event) => props.actions.createPostText(event.target.value)}
                        />
                        {props.isPostTextInvalid && <Form.Control.Feedback type={'invalid'}>Введитие текст публикации</Form.Control.Feedback>}
                    </Form.Group>
                    <Button
                    variant={'primary'}
                    type={'button'}
                    disabled={props.isPostTitleInvalid || props.isPostTextInvalid}
                    onClick={() => {props.actions.createPost(props.postTitle, props.postType, props.postText)}}
                    >Опубликовать</Button>
                </Form>
            </Container>
        </>

    )
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);