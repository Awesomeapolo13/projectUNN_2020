'use strict'

import React from 'react';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';
import {connect} from 'react-redux';
import {Container, Row, Col, InputGroup, FormControl, Button, Alert, Spinner, Modal} from 'react-bootstrap';

function CommentChanger(props) {
    console.log('текст комментария по дефолту:', props.text);
    return (
        <>
            <Modal
                show={props.openCommentChanger}
                onHide={() => props.actions.showCommentChanger(false)}
                aria-labelledby={'contained-modal-title-vcenter'}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id={'contained-modal-title-vcenter'}>
                        Редактор комментария
                    </Modal.Title>
                </Modal.Header>
                {props.commentSuccessChanged ?
                    <Modal.Body>
                        <Alert variant={'success'}>{props.commentSuccessChangeMessage}</Alert>
                    </Modal.Body>
                    :
                    <Modal.Body>
                        <InputGroup className={'comment-changer'}>
                            <FormControl
                                placeholder={'Ваш комментарий'}
                                aria-label={'Ваш комментарий'}
                                aria-describedby={'basic-addon2'}
                                defaultValue={props.text}
                                onChange={event => {
                                    props.actions.createCommentText(event.target.value);
                                }}
                                onFocus={event => {
                                    props.actions.createCommentText(event.target.value);
                                }}
                                isInvalid={props.isCommentTextInvalid}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant={'outline-secondary'}
                                    disabled={props.isCommentTextInvalid || !props.commentText}
                                    onClick={() => props.actions.changeComment(props.postID, props.commentID, props.commentText)}
                                >Отправить</Button>
                            </InputGroup.Append>
                            <FormControl.Feedback type={'invalid'}>
                                Введите текст комментария
                            </FormControl.Feedback>
                        </InputGroup>
                    </Modal.Body>
                }
                {props.commentFailChanged &&
                <Modal.Footer>
                    <Alert variant={'danger'}>{props.commentFailChangeMessage}</Alert>
                </Modal.Footer>
                }
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentChanger);