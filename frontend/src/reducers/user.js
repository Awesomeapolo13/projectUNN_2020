'use strict'

import {
    USER_INPUT_LOGIN_CHANGED,
    USER_INPUT_PASSWORD_CHANGED,
    USER_OPEN_LOGIN_FORM,
    USER_CLOSE_LOGIN_FORM,

    CHANGE_USER_DATE_FORMAT,

    USER_INPUT_AVATAR,
    USER_INPUT_NAME_CHANGED,
    USER_INPUT_FAIL_NAME,
    USER_INPUT_SURNAME_CHANGED,
    USER_INPUT_FAIL_SURNAME,
    USER_INPUT_BIRTH_DATE_CHANGED,
    USER_INPUT_FAIL_BIRTH_DATE,
    USER_INPUT_FAIL_MONTH,
    USER_INPUT_FAIL_DATE_FORMAT,
    USER_INPUT_FAIL_FEBRUARY_DAY,
    USER_INPUT_FAIL_MONTH_30,
    USER_INPUT_FAIL_DAY,
    USER_INPUT_FAIL_YEAR,
    USER_INPUT_EMAIL_CHANGED,
    USER_INPUT_FAIL_EMAIL,
    USER_INPUT_FAIL_EMAIL_FORMAT,
    USER_INPUT_PHONE_CHANGED,
    USER_INPUT_FAIL_PHONE,
    USER_INPUT_FAIL_PHONE_FORMAT,
    USER_INPUT_REGPASSWORD_CHANGED,
    USER_INPUT_FAIL_REGPASSWORD,
    USER_INPUT_FAIL_REGPASSWORD_LENGHT,
    USER_INPUT_FAIL_REGPASSWORD_FORMAT,

    USER_TRY_TO_LOG_IN,
    GET_USERS_SUCCESS,
    GET_USERS_LOADING,
    GET_USERS_FAIL,

    GET_PERSONAL_LOADING,
    GET_PERSONAL_SUCCESS,
    GET_PERSONAL_FAIL,

    USER_TRY_TO_LOG_OUT,
    USER_SUCCESS_LOG_IN,
    USER_FAIL_LOG_IN,

    GET_POSTS_LOADING,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    // создание публикации
    POST_INPUT_TITLE,
    POST_TITLE_INVALID,
    POST_INPUT_TYPE,
    POST_INPUT_TEXT,
    POST_TEXT_INVALID,
    POST_TRY_TO_CREATE,
    POST_SUCCESS_CREATE,
    POST_FAIL_CREATE,

    USER_TRY_TO_REGISTER,
    USER_SUCCESS_REGISTER,
    USER_FAIL_REGISTER,

    USER_TRY_TO_CHANGE_INFO,
    USER_SUCCESS_CHANGE_INFO,
    USER_FAIL_CHANGE_INFO,

} from '../constants';

const initialState = {
    userLogin: '',
    userPassword: '',
    userOpenLogInForm: false,
    isLoggedIn: false,
    userRegister: false,
    activePageId: 0,
    token: '',
    newFormatData: '',
    pages: [
        {pageId: 0, name: 'Главная', path: '/'},
        {pageId: 1, name: 'Пользователи', path: '/users'},
        {pageId: 2, name: 'Публикации', path: '/posts'},
        {pageId: 3, name: 'О нас', path: '/about'},
    ],

    // registration: [
    //     {inputId: 0, name: '', error: false, message: ''},
    //     {inputId: 1, surname: '', error: false, message: ''},
    // ],

    //Свойства формы регистрации
    registerName: '',
    regNameError: {
        error: true,
        message: '',
    },
    registerSurname: '',
    regSurnameError: {
        error: true,
        message: '',
    },
    registerBirthDate: '',
    regBirthDateError: {
        error: true,
        message: '',
    },
    registerEmail: '',
    regEmailError: {
        error: true,
        message: '',
    },
    registerPhone: '',
    regPhoneError: {
        error: true,
        message: '',
    },
    registerPassword: '',
    regPasswordError: {
        error: true,
        message: '',
    },
    changeUserAvatar: '',
    isRegistered: false,
    registerMessage: '',

    isChanged: false,
    changeMessage: '',
    errChangeUserInfoMsg: '',

    users: [],

    posts: [],
    changePostMessage: '',
    isPostCreating: false,
    postText: '',
    isPostTextInvalid: false,
    postTitle: '',
    isPostTitleInvalid: false,
    postType: '',

    personalInfo: {},
    isUsersLoading: false,
    isPostsLoading: false,
    isRegistrationLoading: false,
    errMsg: '',
};

export default function userReducer(state = initialState, action) {
    console.log('in userReducer', action);
    switch (action.type) {
//Вход
        case USER_OPEN_LOGIN_FORM:
            return {
                ...state,
                userOpenLogInForm: true,
            };

        case USER_CLOSE_LOGIN_FORM:
            return {
                ...state,
                userOpenLogInForm: false,
            };

        case USER_INPUT_LOGIN_CHANGED:
            return {
                ...state,
                userLogin: action.payload,
            };

        case USER_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                userPassword: action.payload,
            };

        case USER_TRY_TO_LOG_IN:
            const password = state.userPassword;
            return {
                ...state,
                isLoggedIn: (password === 'qwerty'),
            };

        case USER_SUCCESS_LOG_IN:
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
            };

        case USER_FAIL_LOG_IN:
            return {
                ...state,
                errMsg: action.payload,
                isLoggedIn: false,
            };

        case USER_TRY_TO_LOG_OUT:
            return {
                ...state,
                userLogin: '',
                userPassword: '',
                isLoggedIn: false,
            };

// Регистрация
        case USER_INPUT_NAME_CHANGED:
            return {
                ...state,
                registerName: action.payload,
                regNameError: {
                    error: false,
                    message: '',
                }
            };

        case USER_INPUT_FAIL_NAME:
            return {
                ...state,
                regNameError: {
                    error: true,
                    message: 'Введите имя',
                },
            };

        case USER_INPUT_SURNAME_CHANGED:
            return {
                ...state,
                registerSurname: action.payload,
                regSurnameError: {
                    error: false,
                    message: '',
                },
            };

        case USER_INPUT_AVATAR:
            return {
                ...state,
                changeUserAvatar: action.payload,
            };

        case USER_INPUT_FAIL_SURNAME:
            return {
                ...state,
                regSurnameError: {
                    error: true,
                    message: 'Введите фамилию',
                },
            };

        case USER_INPUT_BIRTH_DATE_CHANGED:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: false,
                    message: ''
                },
            };

        case USER_INPUT_FAIL_BIRTH_DATE:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: true,
                    message: 'Введите дату рождения'
                },
            };

        case USER_INPUT_FAIL_DATE_FORMAT:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: true,
                    message: 'Введите корректную дату рождения'
                },
            };

        case USER_INPUT_FAIL_MONTH:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: true,
                    message: 'Введите корректный месяц',
                },
            };

        case USER_INPUT_FAIL_FEBRUARY_DAY:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: true,
                    message: 'В феврале нет такого дня',
                },
            };

        case USER_INPUT_FAIL_DAY:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: true,
                    message: 'Введите корректный день',
                },
            };

        case USER_INPUT_FAIL_MONTH_30:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: true,
                    message: 'В этом месяце только 30 дней',
                },
            };

        case USER_INPUT_FAIL_YEAR:
            return {
                ...state,
                registerBirthDate: action.payload,
                regBirthDateError: {
                    error: true,
                    message: 'Введите корректный год',
                },
            };

        case USER_INPUT_EMAIL_CHANGED:
            return {
                ...state,
                registerEmail: action.payload,
                regEmailError: {
                    error: false,
                    message: ''
                },
            };

        case USER_INPUT_FAIL_EMAIL:
            return {
                ...state,
                registerEmail: action.payload,
                regEmailError: {
                    error: true,
                    message: 'Введите адрес электронной почты',
                },
            };

        case USER_INPUT_FAIL_EMAIL_FORMAT:
            return {
                ...state,
                registerEmail: action.payload,
                regEmailError: {
                    error: true,
                    message: 'Введите корректный адрес электронной почты',
                },
            };

        case USER_INPUT_PHONE_CHANGED:
            return {
                ...state,
                registerPhone: action.payload,
                regPhoneError: {
                    error: false,
                    message: ''
                },
            };

        case USER_INPUT_FAIL_PHONE:
            return {
                ...state,
                registerPhone: action.payload,
                regPhoneError: {
                    error: true,
                    message: 'Введите номер телефона',
                },
            };

        case USER_INPUT_FAIL_PHONE_FORMAT:
            return {
                ...state,
                registerPhone: action.payload,
                regPhoneError: {
                    error: true,
                    message: 'Введите корректный номер телефона',
                },
            };

        case USER_INPUT_REGPASSWORD_CHANGED:
            return {
                ...state,
                registerPassword: action.payload,
                regPasswordError: {
                    error: false,
                    message: ''
                },
            };

        case USER_INPUT_FAIL_REGPASSWORD:
            return {
                ...state,
                registerPassword: action.payload,
                regPasswordError: {
                    error: true,
                    message: 'Введите пароль',
                },
            };

        case USER_INPUT_FAIL_REGPASSWORD_LENGHT:
            return {
                ...state,
                registerPassword: action.payload,
                regPasswordError: {
                    error: true,
                    message: 'Длина пароля должна быть не менее 8 символов',
                },
            };

        case USER_INPUT_FAIL_REGPASSWORD_FORMAT:
            return {
                ...state,
                registerPassword: action.payload,
                regPasswordError: {
                    error: true,
                    message: 'Пароль не должен содержать пробелы',
                },
            };

        case USER_TRY_TO_REGISTER:
            return {
                ...state,
            };

        case USER_SUCCESS_REGISTER:
            return {
                ...state,
                registerMessage: action.payload,
                isRegistered: true,
            };

        case USER_FAIL_REGISTER:
            return {
                ...state,
                errMsg: action.payload,
                isRegistered: false,
            }

//Вход

//Загрузка данных для личного кабинета

        case GET_PERSONAL_LOADING:
            return {
                ...state,
                isUsersLoading: true
            };

        case GET_PERSONAL_SUCCESS:
            return {
                ...state,
                personalInfo: action.payload,
                isUsersLoading: false,
            };

        case GET_PERSONAL_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isUsersLoading: false,
            };



//Загрузка информации о пользователях

        case GET_USERS_LOADING:
            return {
                ...state,
                isUsersLoading: true,
            };

        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isUsersLoading: false,
            };

        case GET_USERS_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isUsersLoading: false,
            };

        // case CHANGE_USER_DATE_FORMAT:
        //     return {
        //         ...state,
        //         newFormatData: action.payload,
        //     }

        // Изменение информации о пользователе
        case USER_TRY_TO_CHANGE_INFO:
            return {
                ...state,
            };

        case USER_SUCCESS_CHANGE_INFO:
            return {
                ...state,
                changeMessage: action.payload,
                isChanged: true,
            };

        case USER_FAIL_CHANGE_INFO:
            return {
                ...state,
                errChangeUserInfoMsg: action.payload,
                isChanged: false,
            }

        //Публикации
        case GET_POSTS_LOADING:
            return {
                ...state,
                isPostsLoading: true,
            };

        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isPostsLoading: false,
            };

        case GET_POSTS_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isPostsLoading: false,
            };

        // создание новой публикации
        case POST_INPUT_TITLE:
            return {
                ...state,
                postTitle: action.payload,
                isPostTitleInvalid: false,
            };

        case POST_TITLE_INVALID:
            return {
                ...state,
                postTitle: action.payload,
                isPostTitleInvalid: true,
            };

        case POST_INPUT_TYPE:
            return {
                ...state,
                postType: action.payload,
            };

        case POST_INPUT_TEXT:
            return {
                ...state,
                postText: action.payload,
                isPostTextInvalid: false,
            };

        case POST_TEXT_INVALID:
            return {
                ...state,
                postText: action.payload,
                isPostTextInvalid: true,
            }

        case POST_TRY_TO_CREATE:
            return {
                ...state,
                isPostCreating: true
            };

        case POST_SUCCESS_CREATE:
            return {
                ...state,
                changePostMessage: action.payload,
                isPostCreating: false
            };

        case POST_FAIL_CREATE:
            return {
                ...state,
                changePostMessage: action.payload,
                isPostCreating: false
            }

        default:
            return state;
    }
}