'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/user';

class Registration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'register-form'}>
                <h2>Регистрация</h2>
                <p>Чтобы пройти регистрацию заполните поля ввода формы в формате, который в них указан</p>
                <div id={'register'}>
                    <p>Имя: <input
                        type='text'
                        required={true}
                        placeholder='Введите имя'
                        onChange={event => {
                            this.props.actions.saveUserNameValue(event.target.value);
                        }}
                        onFocus={event => {
                            this.props.actions.saveUserNameValue(event.target.value);
                        }}
                    /></p>
                    {this.props.regNameError.error && <p className={'error'}>{this.props.regNameError.message}</p>}
                    <p>Фамилия: <input
                        type='text'
                        required={true}
                        placeholder='Введите фамилию'
                        onChange={event => {
                            this.props.actions.saveUserSurnameValue(event.target.value);
                        }}
                        onFocus={event => {
                            this.props.actions.saveUserSurnameValue(event.target.value);
                        }}
                    /></p>
                    {this.props.regSurnameError.error && <p className={'error'}>{this.props.regSurnameError.message}</p>}
                    <p>Дата рождения: <input
                        type='text'
                        placeholder='01.01.2020'
                        onChange={event => {
                            this.props.actions.saveUserBirthDateValue(event.target.value);
                        }}
                        onFocus={event => {
                            this.props.actions.saveUserBirthDateValue(event.target.value);
                        }}
                    /></p>
                    {this.props.regBirthDateError.error && <p className={'error'}>{this.props.regBirthDateError.message}</p>}
                    <p>Электронная почта: <input
                        type='text'
                        placeholder='e-mail'
                        onChange={event => {
                            this.props.actions.saveUserEmailValue(event.target.value);
                        }}
                        onFocus={event => {
                            this.props.actions.saveUserEmailValue(event.target.value);
                        }}
                    /></p>
                    {this.props.regEmailError.error && <p className={'error'}>{this.props.regEmailError.message}</p>}
                    <p>Контактный телефон: <input
                        type='text'
                        placeholder='+7(ХХХ)ХХХ-ХХ-ХХ'
                        onChange={event => {
                            this.props.actions.saveUserPhoneValue(event.target.value);
                        }}
                        onFocus={event => {
                            this.props.actions.saveUserPhoneValue(event.target.value);
                        }}
                    /></p>
                    {this.props.regPhoneError.error && <p className={'error'}>{this.props.regPhoneError.message}</p>}
                    <p>Пароль: <input
                        type='password'
                        placeholder='Введите пароль'
                        onChange={event => {
                            this.props.actions.saveUserRegPasswordValue(event.target.value);
                        }}
                        onFocus={event => {
                            this.props.actions.saveUserRegPasswordValue(event.target.value);
                        }}
                    /></p>
                    {this.props.regPasswordError.error && <p className={'error'}>{this.props.regPasswordError.message}</p>}
                    <p><button
                        disabled={this.props.regPasswordError.error ||
                        this.props.regNameError.error ||
                        this.props.regSurnameError.error ||
                        this.props.regBirthDateError.error ||
                        this.props.regEmailError.error ||
                        this.props.regPhoneError.error
                        }
                        onClick={() => this.props.actions.onRegister(
                            this.props.registerName,
                            this.props.registerSurname,
                            this.props.registerBirthDate,
                            this.props.registerEmail,
                            this.props.registerPhone,
                            this.props.registerPassword,
                        )
                        }>Зарегистрироваться</button></p>
                    {this.props.isRegistered && <p>Поздравляем! Регистрация прошла успешно!</p>}
                    {this.props.registerMessage && <p>{this.props.registerMessage.message}</p>}
                    {this.props.errMsg && <p>{this.props.errMsg.message}</p>}
                </div>
                {/*<button>Зарегистрироваться</button>*/}


                {/*<div>*/}
                {/*    <span>{props.name + ' ' + props.surname}</span>*/}
                {/*    <span>{props.birthDate}</span>*/}
                {/*    <span>{props.contactPhone}</span>*/}
                {/*</div>*/}
                <Link to={'/'}>На главную</Link>
            </div>
        )
    };
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);