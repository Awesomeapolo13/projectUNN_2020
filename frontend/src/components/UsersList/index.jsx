'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {connect} from 'react-redux';
import {Container, CardDeck, Spinner, Media} from 'react-bootstrap';


function UsersList(props) {

    function changeUserDateFormat(date) {
        let newFormatDate = new Date(Date.parse(date));
        if (newFormatDate.getMonth() + 1 <= 9 && newFormatDate.getDate() <= 9) { // если месяц и день от 1 до 9
            newFormatDate = `0${newFormatDate.getDate()}.0${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
        } else if(newFormatDate.getMonth() + 1 <= 9) { // если месяц от 1 до 9
            newFormatDate = `${newFormatDate.getDate()}.0${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
        } else if (newFormatDate.getDate() <= 9) { // если день от 1 до 9
            newFormatDate = `0${newFormatDate.getDate()}.${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
        } else { // если месяц и день больше 9
            newFormatDate = `${newFormatDate.getDate()}.${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
        }
        return newFormatDate;
    }

    return (
        <>
            <Container>
                <h3 className={'text-center m-4'}>Пользователи сайта:</h3>
                {props.isUsersLoading &&
                <Spinner animation={'border'} role={'status'} variant={'dark'}/>}
                {props.isUsersLoading &&
                <Spinner animation={'border'} role={'status'} variant={'dark'}/>}
                {props.isUsersLoading &&
                <Spinner animation={'border'} role={'status'} variant={'dark'}/>}
                <CardDeck>
                    {
                        props.users.map(user => {
                            return (

                                <Media key={user.userID}>
                                    <img
                                        width={100}
                                        src={user.avatar}
                                        alt={'user-avatar'}
                                        className={'mr-3'}/>
                                    <Media.Body>
                                        <h5>{user.name + ' ' + user.surname}</h5>
                                        <Link to={'/users/' + user.userID}>Перейти в профиль</Link>
                                        <p>Дата рождения: {changeUserDateFormat(user.birthDate)}</p>
                                        <p>Электронная почта: {user.email}</p>
                                        <p>Телефон: {user.contactPhone}</p>
                                    </Media.Body>
                                </Media>

                        )
                        })
                    }
                </CardDeck>
            </Container>

            {/*<div>*/}


            {/*    <ul>*/}
            {/*        {*/}
            {/*            props.users.map(user => {*/}
            {/*                return (*/}
            {/*                    <li key={user.userID}>*/}
            {/*                        <div className={'usersInfo'}>*/}
            {/*                            <div className={'avatar'}>*/}
            {/*                                <img src={user.avatar} alt='user.avatar'/>*/}
            {/*                            </div>*/}
            {/*                            <div className={'user'}>*/}
            {/*                                <span>{user.name + ' ' + user.surname}</span>*/}
            {/*                                <Link to={'/users/' + user.userID}>Перейти в профиль</Link>*/}
            {/*                                <span>Birthday: {user.birthDate}</span>*/}
            {/*                                <span>Email: {user.email}</span>*/}
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

export default connect(mapStateToProps, null)(UsersList);