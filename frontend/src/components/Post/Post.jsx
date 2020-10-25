'use strict'

import React from 'react';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';
import {connect} from 'react-redux';
import {Container, Row, Col, Media, InputGroup, FormControl, Button, Alert, Spinner, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CommentChanger from '../CommentChanger';
import './style.css'

// class Post extends React.Component {
//     constructor(props) {
//         super(props);
//     };
//
//     componentDidMount() {
//         this.props.actions.fetchComments(this.props.commentsIDArray);
//     }
//
//     render() {
//
//         function getTypeName(postType) {
//             for (let type of this.props.postTypes.keys()) {
//                 if (postType === type) {
//                     return this.props.postTypes.get(type);
//                 }
//             }
//         }
//
//         return (
//             <>
//                 <Container className={'post'}>
//                     <Media>
//                         <Media.Body>
//                             <div>
//                                 <h4>{this.props.tittle}</h4>
//                                 <p>Категория: {getTypeName(this.props.type)}</p>
//                                 <p className={'mt-3'}>{this.props.text}</p>
//                                 <p className={'mt-3'}>Автор: <Link
//                                     to={'/users/' + this.props.userID}>
//                                     {this.props.name + ' ' + this.props.surname}</Link></p>
//                                 {this.props.userID === localStorage.getItem('userID') && <Button>Изменить</Button>}
//                             </div>
//                             <div>
//                                 {
//                                     this.props.comments.map(comment => {
//                                         for (let user of this.props.users) {
//                                             if (user.userID === comment.userID) {
//                                                 comment.name = user.name;
//                                                 comment.surname = user.surname;
//                                                 comment.avatar = user.avatar;
//                                             }
//                                         }
//                                         return (
//                                             <li key={comment.commentID}>
//                                                 <div className={'commentsInfo'}>
//                                                     <div className={'avatar'}>
//                                                         <img src={comment.avatar} alt='comment.avatar'/>
//                                                     </div>
//                                                     <div className={'user'}>
//                                                         <span>{comment.name + ' ' + comment.surname}</span>
//                                                         <Link to={'/users/' + comment.userID}>Перейти к автору
//                                                             комментария</Link>
//                                                         <p>{comment.text}</p>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         )
//                                     })
//                                 }
//                                 <p>Комментарии пользователей к публикации</p>
//                             </div>
//                         </Media.Body>
//                     </Media>
//                 </Container>
//             </>
//         )
//     }
// }

function Post(props) {

    function getTypeName(postType) {
        for (let type of props.postTypes.keys()) {
            if (postType === type) {
                return props.postTypes.get(type);
            }
        }
    }

    return (
        <>
            <Container className={'post'}>
                <Row>
                    <Media>
                        <Media.Body>
                            <h4>{props.tittle}</h4>
                            <p>Категория: {getTypeName(props.type)}</p>
                            <p className={'mt-3'}>{props.text}</p>
                            <p className={'mt-3'}>Автор: <Link
                                to={'/users/' + props.userID}>
                                {props.name + ' ' + props.surname}</Link></p>
                            <Button
                                onClick={() => props.actions.fetchComments(props.commentsIDArray)}>Комментарии</Button>
                            {props.userID === localStorage.getItem('userID') &&
                            <Button variant={'warning'}>Изменить</Button>}
                            {props.userID === localStorage.getItem('userID') &&
                            <Button variant={'danger'}>Удалить</Button>}
                        </Media.Body>
                    </Media>
                </Row>

                <Row>
                    {/*Поле для ввода комментариев*/}
                    {props.userID === localStorage.getItem('userID') &&
                    <InputGroup className={'comment-creator'}>
                        <img src={props.avatar} alt='your avatar' className={'comment-avatar'}/>
                        <FormControl
                            placeholder={'Ваш комментарий'}
                            aria-label={'Ваш комментарий'}
                            aria-describedby={'basic-addon2'}
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
                                onClick={() => props.actions.createComment(props.postID, props.commentText)}
                            >Отправить</Button>
                        </InputGroup.Append>
                        <FormControl.Feedback type={'invalid'}>
                            Введите текст комментария
                        </FormControl.Feedback>
                    </InputGroup>
                    }
                    {props.isCommentCreating &&
                    <Spinner animation={'border'} role={'status'} variant={'dark'}/>
                    }
                    {props.isCommentCreating &&
                    <Spinner animation={'border'} role={'status'} variant={'dark'}/>
                    }
                    {props.isCommentCreating &&
                    <Spinner animation={'border'} role={'status'} variant={'dark'}/>
                    }
                    {props.newComment &&
                    <Alert variant={'success'}>Комментарий успешно отправлен</Alert>
                    }
                    {props.failCommentCreateMessage &&
                    <Alert variant={'danger'}>{props.failCommentCreateMessage}</Alert>
                    }
                </Row>
                {/*Перечнь комментариев к публикации*/}
                {
                    props.comments.map((comment, i) => {
                        for (let user of props.users) {
                            if (user.userID === comment.userID) {
                                comment.name = user.name;
                                comment.surname = user.surname;
                                comment.avatar = user.avatar;
                            }
                        }
                        return (
                            <Row
                                key={i}
                                id={comment.commentID}
                                className={'comment'}>
                                <Col className={'avatar'} md={'auto'}>
                                    <img src={comment.avatar} alt='comment.avatar'/>
                                </Col>
                                <Col className={'user'} xs={6}>
                                    <Row>
                                        <p>{comment.name + ' ' + comment.surname}</p>
                                        <Link to={'/users/' + comment.userID}>Перейти к автору
                                            комментария</Link>
                                        <p>{comment.text}</p>
                                        {/*<CommentChanger {...comment}/>*/}

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
                                                            defaultValue={comment.text}
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
                                                                onClick={() => props.actions.changeComment(comment.postID, comment.commentID, props.commentText)}
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

                                    </Row>
                                    <Row className={'buttons-container'}>
                                        {props.userID === localStorage.getItem('userID') &&
                                        <Button
                                            variant={'warning'}
                                            onClick={() => props.actions.showCommentChanger(true)}>Изменить</Button>
                                        }
                                        {props.userID === localStorage.getItem('userID') &&
                                        <Button variant={'danger'}>Удалить</Button>}
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Container>
        </>
    );
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);