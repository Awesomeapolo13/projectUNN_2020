'use strict'

import React from 'react';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';
import {connect} from 'react-redux';
import {Container, Media, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './style.css'

function Post(props) {

    return (
        <>
            <Container className={'post'}>
                <Media>
                    <Media.Body>
                        <h4>{props.tittle}</h4>
                        <p className={'mt-3'}>{props.text}</p>

                        {/*<h5>{post.tittle}</h5>*/}
                        {/*<Link to={'/posts/' + post.postID}>Перейти к публикации</Link>*/}

                        <span className={'mt-3'}>Автор: <Link to={'/users/' + props.userID}>{props.name + ' ' + props.surname}</Link></span>
                    </Media.Body>
                    {props.userID === localStorage.getItem('userID') && <Button>Изменить</Button>}
                </Media>
            </Container>
        </>

        //     <article>
        //         <div className={'avatar'}>
        //             <img src={props.avatar} alt="user.avatar"/>
        //             <span>{props.name + ' ' + props.surname}</span>
        //         </div>
        //         <div className={'postContent'}>
        //             <h3>{props.tittle}</h3>
        //             <p>{props.text}</p>
        //         </div>
        //     </article>

    );
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);