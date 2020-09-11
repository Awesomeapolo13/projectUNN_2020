'use strict'

import * as constants from '../constants';
import axios from 'axios';

export default {
    saveUserLoginValue(value) {
        console.log('in action creator', value);
        return {
            type: constants.USER_INPUT_LOGIN_CHANGED,
            payload: value,
        };
    },

    saveUserPasswordValue(value) {
        console.log('in action creator', value);
        return {
            type: constants.USER_INPUT_PASSWORD_CHANGED,
            payload: value,
        }
    },

    saveUserAvatarValue(value) {
        return {
            type: constants.USER_INPUT_AVATAR,
            payload: value,
        }
    },

    showLogInWindow(boolean) {
        if (boolean === true) {
            return {
                type: constants.USER_OPEN_LOGIN_FORM,
            }
        }

        if (boolean === false) {
            return {
                type: constants.USER_CLOSE_LOGIN_FORM,
            }
        }
    },

    saveUserNameValue(value) {
        if (!value) {
            return {
                type: constants.USER_INPUT_FAIL_NAME,
                payload: value,
            };
        }
        return {
            type: constants.USER_INPUT_NAME_CHANGED,
            payload: value,
        };
    },

    saveUserSurnameValue(value) {
        if (!value) {
            return {
                type: constants.USER_INPUT_FAIL_SURNAME,
                payload: value,
            };
        }
        return {
            type: constants.USER_INPUT_SURNAME_CHANGED,
            payload: value,
        };
    },

    saveUserBirthDateValue(value) {

        const BIRTHDATE_REGEXP = /^\d\d\.\d\d\.\d\d\d\d$/;
        const day = value[0] + value[1];
        const month = value[3] + value[4];
        const year = value[6] + value[7] + value[8] + value[9];
        const monthArray30 = [4, 6, 9, 11];
        const currentDate = new Date();

        if (!value) {
            return {
                type: constants.USER_INPUT_FAIL_BIRTH_DATE,
                payload: value,
            };
        }

        if (BIRTHDATE_REGEXP.test(value) === false) {
            return {
                type: constants.USER_INPUT_FAIL_DATE_FORMAT,
                payload: value,
            };
        }

        if (+month <= 0 || +month > 12) {
            return {
                type: constants.USER_INPUT_FAIL_MONTH,
                payload: value,
            };
        }

        if (+month === 2 && +day > 29) {
            return {
                type: constants.USER_INPUT_FAIL_FEBRUARY_DAY,
                payload: value,
            };
        }

        if (+day > 31) {
            return {
                type: constants.USER_INPUT_FAIL_DAY,
                payload: value,
            };
        }

        for (let i of monthArray30) {
            if (+month === i && +day > 30) {
                return {
                    type: constants.USER_INPUT_FAIL_MONTH_30,
                    payload: value,
                };
            }
        }

        if (+year > currentDate.getFullYear() || +year < currentDate.getFullYear() - 100) {
            return {
                type: constants.USER_INPUT_FAIL_YEAR,
                payload: value,
            };
        }

        return {
            type: constants.USER_INPUT_BIRTH_DATE_CHANGED,
            payload: value,
        };
    },

    saveUserEmailValue(value) {
        const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!value) {
            return {
                type: constants.USER_INPUT_FAIL_EMAIL,
                payload: value,
            };
        }

        if (EMAIL_REGEXP.test(value) === false) {
            return {
                type: constants.USER_INPUT_FAIL_EMAIL_FORMAT,
                payload: value,
            };
        }

        return {
            type: constants.USER_INPUT_EMAIL_CHANGED,
            payload: value,
        };
    },

    saveUserPhoneValue(value) {
        const CONTACTPHONE_REGEXP = /^\+\d\(\d\d\d\)\d\d\d\-\d\d\-\d\d$/;
        if (!value) {
            return {
                type: constants.USER_INPUT_FAIL_PHONE,
                payload: value,
            };
        }

        if (CONTACTPHONE_REGEXP.test(value) === false) {
            return {
                type: constants.USER_INPUT_FAIL_PHONE_FORMAT,
                payload: value,
            };
        }

        return {
            type: constants.USER_INPUT_PHONE_CHANGED,
            payload: value,
        };
    },

    saveUserRegPasswordValue(value) {
        if (!value) {
            return {
                type: constants.USER_INPUT_FAIL_REGPASSWORD,
                payload: value,
            };
        }

        if (value.search(/\s/g) !== -1) {
            return {
                type: constants.USER_INPUT_FAIL_REGPASSWORD_FORMAT,
                payload: value,
            };
        }

        if (value.match(/\S/g).join('').length < 8) {
            return {
                type: constants.USER_INPUT_FAIL_REGPASSWORD_LENGHT,
                payload: value,
            };
        }

        return {
            type: constants.USER_INPUT_REGPASSWORD_CHANGED,
            payload: value,
        };
    },

    onRegister(name, surname, birthDate, email, phone, password) {
        return async (dispatch) => {
            dispatch({
                type: constants.USER_TRY_TO_REGISTER,
            });
            try {
                const response = await axios.post(
                    'http://localhost:3000/user/register',
                    {
                        name: name,
                        surname: surname,
                        email: email,
                        contactPhone: phone,
                        password: password,
                        birthDate: birthDate,
                    });
                if (response.status === 200) {
                    dispatch({
                        type: constants.USER_SUCCESS_REGISTER,
                        payload: response.data,
                    });
                } else {
                    dispatch({
                        type: constants.USER_FAIL_REGISTER,
                        payload: response.data,
                    });
                }
            } catch (e) {
                console.log(e);
                dispatch({
                    type: constants.USER_FAIL_REGISTER,
                    payload: e.message,
                });
            }
        }
    },

    onLogin(login, password) {
        return async (dispatch) => {
            dispatch({
                type: constants.USER_TRY_TO_LOG_IN,
            });
            try {
                const response = await axios.post(
                    'http://localhost:3000/user/login',
                    {
                        email: login,
                        password: password,
                    });
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userID', response.data.userID);
                    alert(localStorage.getItem('token'));
                    dispatch({
                        type: constants.USER_SUCCESS_LOG_IN,
                        payload: response.data,
                    });
                } else {
                    dispatch({
                        type: constants.USER_FAIL_LOG_IN,
                        payload: response.data,
                    });
                }
            } catch (e) {
                console.log(e);
                dispatch({
                    type: constants.USER_FAIL_LOG_IN,
                    payload: e.message,
                });
            }
        }
        // return {
        //     type: constants.USER_TRY_TO_LOG_IN,
        // };
    },

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        alert(localStorage.getItem('token'));
        return {
            type: constants.USER_TRY_TO_LOG_OUT,
        }
    },

    fetchPersonalInfo() {
        return async (dispatch) => {
            dispatch({
                type: constants.GET_PERSONAL_LOADING,
            });
            try {
                const responsePersonal = await axios.get(
                    `http://localhost:3000/user/info`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        params: {
                            userID: localStorage.getItem('userID')
                        }
                    },
                );
                if (responsePersonal.status === 200) {
                    dispatch({
                        type: constants.GET_PERSONAL_SUCCESS,
                        payload: responsePersonal.data,
                    });
                } else {
                    dispatch({
                        type: constants.GET_PERSONAL_FAIL,
                        payload: responsePersonal.data,
                    });
                }
            } catch (e) {
                console.log(e);
                dispatch({
                    type: constants.GET_PERSONAL_FAIL,
                    payload: e.message,
                });
            }
        }
    },

    changeUserInfo(name, surname, birthDate, email, phone, avatar, password) {
        return async (dispatch) => {
            dispatch({
                type: constants.USER_TRY_TO_CHANGE_INFO,
            });
            try {
                const response = await axios.put(
                    'http://localhost:3000/user/info',
                    {
                        userID: localStorage.getItem('userID'),
                        name: name,
                        surname: surname,
                        email: email,
                        contactPhone: phone,
                        password: password,
                        birthDate: birthDate,
                        avatar: avatar,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    },
                );

                if (response.status === 200) {
                    dispatch({
                        type: constants.USER_SUCCESS_CHANGE_INFO,
                        payload: response.data,
                    });
                } else {
                    console.log('Не получилось!', response);
                    dispatch({
                        type: constants.USER_FAIL_CHANGE_INFO,
                        payload: response.data,
                    });
                }
            } catch (e) {
                console.log('Ошибка!', e);
                dispatch({
                    type: constants.USER_FAIL_CHANGE_INFO,
                    payload: e.message,
                });
            }
        }
    },

    fetchUsers() {
        return async (dispatch) => {
            dispatch({
                type: constants.GET_USERS_LOADING,
            });
            try {
                const responseUsers = await axios.get(
                    'http://localhost:3000/user/list',
                    {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
                );
                dispatch({
                    type: constants.GET_USERS_SUCCESS,
                    payload: responseUsers.data,
                });
            } catch (e) {
                console.log(e);
                dispatch({
                    type: constants.GET_USERS_FAIL,
                    payload: e.message,
                })
            }

        };
    },

    // changeUserDateFormat(date) {
    //     let newFormatDate = new Date(Date.parse(date));
    //     if (newFormatDate.getMonth() + 1 <= 9 && newFormatDate.getDate() <= 9) { // если месяц и день от 1 до 9
    //         newFormatDate = `0${newFormatDate.getDate()}.0${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
    //     } else if(newFormatDate.getMonth() + 1 <= 9) { // если месяц от 1 до 9
    //         newFormatDate = `${newFormatDate.getDate()}.0${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
    //     } else if (newFormatDate.getDate() <= 9) { // если день от 1 до 9
    //         newFormatDate = `0${newFormatDate.getDate()}.${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
    //     } else {
    //         newFormatDate = `${newFormatDate.getDate()}.${newFormatDate.getMonth() + 1}.${newFormatDate.getFullYear()}`;
    //     }
    //     return {
    //         type: constants.CHANGE_USER_DATE_FORMAT,
    //         payload: newFormatDate,
    //     }
    // },

    fetchPosts() {
        return async (dispatch) => {
            dispatch({
                type: constants.GET_POSTS_LOADING,
            });
            try {
                const responsePosts = await axios.get(
                    'http://localhost:3000/post/list',
                    {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
                );
                dispatch({
                    type: constants.GET_POSTS_SUCCESS,
                    payload: responsePosts.data,
                });
            } catch (e) {
                console.log(e);
                dispatch({
                    type: constants.GET_POSTS_FAIL,
                    payload: e.message,
                })
            }
        };
    },

    createPostText(value) {
        if (!value) {
            return {
                type: constants.POST_TEXT_INVALID,
                payload: value,
            };
        } else {
            return {
                type: constants.POST_INPUT_TEXT,
                payload: value,
            };
        }
    },

    createPostType(value) {
        return {
            type: constants.POST_INPUT_TYPE,
            payload: value,
        };
    },

    createPostTitle(value) {
        if (!value) {
            return {
                type: constants.POST_TITLE_INVALID,
                payload: value,
            };
        } else {
            return {
                type: constants.POST_INPUT_TITLE,
                payload: value,
            };
        }
    },

    createPost(tittle, type, text) {
        return async (dispatch) => {
            dispatch({
                type: constants.POST_TRY_TO_CREATE,
            });
            try {
                const response = await axios.post(
                    'http://localhost:3000/post',
                    {
                        userID: localStorage.getItem('userID'),
                        tittle: tittle,
                        type: type,
                        text: text,
                        commentsIDArray: [],
                    },
                    {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}},
                    );
                if (response.status === 200) {
                    dispatch({
                        type: constants.POST_SUCCESS_CREATE,
                        payload: response.data,
                    });
                } else {
                    dispatch({
                        type: constants.POST_FAIL_CREATE,
                        payload: response.data,
                    });
                }
            } catch (e) {
                console.log(e);
                dispatch({
                    type: constants.POST_FAIL_CREATE,
                    payload: e.message,
                });
            }
        }
    }

}
