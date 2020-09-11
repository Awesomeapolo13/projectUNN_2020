'use strict'

import React from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';
import './style.css';

function UserInfoChange(props) {
    return (
        <>
            <h3>Изменение информации пользователя</h3>
            <p>Для изменения информации о себе заполните все поля</p>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId={'formUserNameChange'}>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type={'name'}
                            placeholder={'Введите имя'}
                            onChange={event => {
                                props.actions.saveUserNameValue(event.target.value);
                            }}
                            onFocus={event => {
                                props.actions.saveUserNameValue(event.target.value);
                            }}
                        />
                        {props.regNameError.error &&
                        <Form.Text className={'error'}>{props.regNameError.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group as={Col} controlId={'formUserSurnameChange'}>
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type={'surname'}
                            placeholder={'Введите фамилию'}
                            onChange={event => {
                                props.actions.saveUserSurnameValue(event.target.value);
                            }}
                            onFocus={event => {
                                props.actions.saveUserSurnameValue(event.target.value);
                            }}
                        />
                        {props.regSurnameError.error &&
                        <Form.Text className={'error'}>{props.regSurnameError.message}</Form.Text>}
                    </Form.Group>
                </Form.Row>


                <Form.Group controlId={'formUserBirthDateChange'}>
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control
                        type={'birthDate'}
                        placeholder={'01.01.2020'}
                        onChange={event => {
                            props.actions.saveUserBirthDateValue(event.target.value);
                        }}
                        onFocus={event => {
                            props.actions.saveUserBirthDateValue(event.target.value);
                        }}
                    />
                    {props.regBirthDateError.error &&
                    <Form.Text className={'error'}>{props.regBirthDateError.message}</Form.Text>}
                </Form.Group>
                <Form.Group controlId={'formUserEmailChange'}>
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'e-mail'}
                        onChange={event => {
                            props.actions.saveUserEmailValue(event.target.value);
                        }}
                        onFocus={event => {
                            props.actions.saveUserEmailValue(event.target.value);
                        }}
                    />
                    {props.regEmailError.error &&
                    <Form.Text className={'error'}>{props.regEmailError.message}</Form.Text>}
                </Form.Group>
                <Form.Group controlId={'formUserPhoneChange'}>
                    <Form.Label>Контактный телефон</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'+7(ХХХ)ХХХ-ХХ-ХХ'}
                        onChange={event => {
                            props.actions.saveUserPhoneValue(event.target.value);
                        }}
                        onFocus={event => {
                            props.actions.saveUserPhoneValue(event.target.value);
                        }}
                    />
                    {props.regPhoneError.error &&
                    <Form.Text className={'error'}>{props.regPhoneError.message}</Form.Text>}
                </Form.Group>
                <Form.Group controlId={'formUserAvatarChange'}>
                    <Form.Label>Изображение</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png'}
                        onChange={event => {
                            props.actions.saveUserAvatarValue(event.target.value);
                        }}
                        // onFocus={event => {
                        //     props.actions.saveUserPhoneValue(event.target.value);
                        // }}
                    />
                    <Form.Text className={'error'}>Введите URL фотографии, которую хотите использовать как свое изображение</Form.Text>
                </Form.Group>
                <Form.Group controlId={'formUserPasswordChange'}>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type={'password'}
                        placeholder={'Введите пароль'}
                        onChange={event => {
                            props.actions.saveUserRegPasswordValue(event.target.value);
                        }}
                        onFocus={event => {
                            props.actions.saveUserRegPasswordValue(event.target.value);
                        }}
                    />
                    {props.regPasswordError.error &&
                    <Form.Text className={'error'}>{props.regPasswordError.message}</Form.Text>}
                </Form.Group>
                <Button
                    variant={'primary'}
                    type={'button'}
                    disabled={props.regPasswordError.error ||
                    props.regNameError.error ||
                    props.regSurnameError.error ||
                    props.regBirthDateError.error ||
                    props.regEmailError.error ||
                    props.regPhoneError.error
                    }
                    onClick={() => {
                        props.actions.changeUserInfo(
                            props.registerName,
                            props.registerSurname,
                            props.registerBirthDate,
                            props.registerEmail,
                            props.registerPhone,
                            props.changeUserAvatar,
                            props.registerPassword,
                        )
                    }}
                >Изменить</Button>
            </Form>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoChange);