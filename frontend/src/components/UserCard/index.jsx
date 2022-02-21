'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Nav, Tab, Row, Col, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';

function UserCard(props) {
    function changeUserDateFormat(date) {
        let newFormatDate = new Date(Date.parse(date));
            if (newFormatDate.getMonth() + 1 <= 9 && newFormatDate.getDate() <= 9) { // если месяц и день от 1 до 9
                newFormatDate = `0${newFormatDate.getDate()}.0${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
            } else if(newFormatDate.getMonth() + 1 <= 9) { // если месяц от 1 до 9
                newFormatDate = `${newFormatDate.getDate()}.0${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
            } else if (newFormatDate.getDate() <= 9) { // если день от 1 до 9
                newFormatDate = `0${newFormatDate.getDate()}.${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
            } else {
                newFormatDate = `${newFormatDate.getDate()}.${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
            }
            return newFormatDate;
    }
    return (
        <>
            <Card>
                <div className={'card-avatar'}>
                    <img src={props.avatar} alt='user.avatar'/>
                </div>
                <Card.Body>
                    <Card.Title><p>{props.name + ' ' + props.surname}</p></Card.Title>
                    <Card.Text>День рождения: {changeUserDateFormat(props.birthDate)}</Card.Text>
                    <Card.Text>Контактный телефон: {props.contactPhone}</Card.Text>
                </Card.Body>

                <Link to={'/'}>На главную</Link>
            </Card>
        </>

        // Карта пользователя без бутстрапа
        // <div className={'user'}>
        //     <div className={'avatar'}>
        //         <img src={props.avatar}/>
        //     </div>
        //     <div>
        //         <span>{props.name + ' ' + props.surname}</span>
        //         <span>{props.birthDate}</span>
        //         <span>{props.contactPhone}</span>
        //     </div>
        // <Link to={'/'}>На главную</Link>
        // </div>

    )
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);