'use strict'

import React from 'react';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';
import {connect} from 'react-redux';
import {Container, Media, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
                <Media>
                    <Media.Body>
                        <div>
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
                        </div>
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
                        {props.newComment &&
                        <Alert variant={'success'}>Комментарий успешно отправлен</Alert>
                        }
                        {props.failCommentCreateMessage &&
                        <Alert variant={'danger'}>{props.failCommentCreateMessage}</Alert>
                        }
                        {/*Перечнь комментариев к публикации*/}
                        <div className={'comments-container'}>
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
                                        <div
                                            key={i}
                                            id={comment.commentID}
                                            className={'comment'}>
                                            <div className={'avatar'}>
                                                <img src={comment.avatar} alt='comment.avatar'/>
                                            </div>
                                            <div className={'user'}>
                                                <span>{comment.name + ' ' + comment.surname}</span>
                                                <Link to={'/users/' + comment.userID}>Перейти к автору
                                                    комментария</Link>
                                                <p>{comment.text}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Media.Body>
                </Media>
            </Container>
        </>
    );
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);