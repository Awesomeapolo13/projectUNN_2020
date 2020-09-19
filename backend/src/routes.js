'use strict'

// import Boom from '@hapi/boom';
import Joi from '@hapi/joi';

import { EMAIL_REGEXP, BIRTHDATE_REGEXP, CONTACTPHONE_REGEXP } from './helpers.js';
import controllers from './controllers.js';

export default [

    {
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {
            const userName = request.query.name || 'Гость';
            return `Привет, ${userName} я сервер. Как у тебя дела?`;
        }
    },

    {
        method: 'POST',
        path: '/register',
        handler: ((request, h) => {
            const userData = request.payload;
            console.log(userData);
            return 'ok';
        })
    },

    {//Регистрация
        method: 'POST',
        path: '/user/register',
        handler: controllers.registration,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    surname: Joi.string().required(),
                    birthDate: Joi.string().pattern(BIRTHDATE_REGEXP).required(),
                    email: Joi.string().pattern(EMAIL_REGEXP).required(),
                    contactPhone: Joi.string().pattern(CONTACTPHONE_REGEXP).required(),
                    password: Joi.string().min(8).required(),
                })
            }
        }
    },
    { //Авторизация
        method: 'POST',
        path: '/user/login',
        handler: controllers.login,
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                })
            },
            cors: {
                origin: ['*'],
            },
        }
    },
        { //Получение информации о пользователе
        method: 'GET',
        path: '/user/info',
        handler: controllers.getUserInformation,
        options: {
            auth: {
                strategies: ['admin', 'user']
            },
            cors: {
                origin: ['*'],
            }
        }
    },
    {//Получение списка пользователей
        method: 'GET',
        path: '/user/list',
        handler: controllers.getUsersList,
        options: {
            // auth: {
            //     strategy: 'user'
            // },
            cors: {
                origin: ['*']
            }
        }
    },
    {//Изменение информации о пользователе
        method: 'PUT',
        path: '/user/info',
        handler: controllers.changeUserInformation,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    surname: Joi.string().required(),
                    birthDate: Joi.string().pattern(BIRTHDATE_REGEXP).required(),
                    email: Joi.string().pattern(EMAIL_REGEXP).required(),
                    contactPhone: Joi.string().pattern(CONTACTPHONE_REGEXP).required(),
                    password: Joi.string().min(8).required(),
                    avatar: Joi.string().optional(),
                    userID: Joi.string().required(),
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {//Удаление пользователя
        method: 'DELETE',
        path: '/user/delete',
        handler: controllers.deleteUserAccount,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    // userID: Joi.string().required(),
                }
            )},
            auth: {
                strategies: ['admin', 'user']
            }
        }
    },
    {//Создание поста
        method: 'POST',
        path: '/post',
        handler: controllers.createNewPost,
        options: {
            validate: {
                payload: Joi.object({
                    userID: Joi.string().required(),
                    tittle: Joi.string().required(),
                    type: Joi.string().required(),
                    text: Joi.string().required(),
                    image: Joi.string().optional(),
                    video: Joi.string().optional(),
                    commentsIDArray: Joi.array().required(),
                    postID: Joi.string().required(),
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {//Получение поста
        method: 'GET',
        path: '/post',
        handler: controllers.getPostInformation,
        options: {
        }
    },
    {//Получение перечня постов
        method: 'GET',
        path: '/post/list',
        handler: controllers.getPostsList,
        options: {
            cors: {
                origin: ['*']
            }
        }
    },
    {//Редактирование поста
        method: 'PUT',
        path: '/user/post',
        handler: controllers.changePost,
        options: {
            validate: {
                payload: Joi.object({
                    userID: Joi.string().required(),
                    tittle: Joi.string().required(),
                    type: Joi.string().required(),
                    text: Joi.string().required(),
                    image: Joi.string().optional(),
                    video: Joi.string().optional(),
                    commentsIDArray: Joi.array().required(),
                    postID: Joi.string().required(),
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {//Удаление поста
        method: 'DELETE',
        path: '/post',
        handler: controllers.deletePost,
        options: {
            validate: {
                payload: Joi.object({
                        userID: Joi.string().required(),
                        postID: Joi.string().required(),
                    }
                )
            },
            auth: {
                strategies: ['admin', 'user']
            }
        }
    },
    {//Создание комментария
        method: 'POST',
        path: '/comment',
        handler: controllers.createNewComment,
        options: {
            validate: {
                payload: Joi.object({
                    userID: Joi.string().required(),
                    postID: Joi.string().required(),
                    commentID: Joi.string().required(),
                    text: Joi.string().required(),
                    image: Joi.string().optional(),
                    video: Joi.string().optional(),
                })
            },
            // auth: {
            //     strategy: 'user'
            // }
        }
    },
    {//Получение комментария
        method: 'GET',
        path: '/comment',
        handler: controllers.getComment,
        options: {
        }
    },

    //Получение перечьня комментариев к публикации
    {
      method: 'GET',
      path: '/comments',
      handler: controllers.getCommentsList,
    },

    {//Редактирование комментария
        method: 'PUT',
        path: '/comment',
        handler: controllers.changeComment,
        options: {
            validate: {
                payload: Joi.object({
                    userID: Joi.string().required(),
                    postID: Joi.string().required(),
                    commentID: Joi.string().required(),
                    text: Joi.string().required(),
                    image: Joi.string().optional(),
                    video: Joi.string().optional(),
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {//Удаление комментария
        method: 'DELETE',
        path: '/comment',
        handler: controllers.deleteComment,
        options: {
            validate: {
                payload: Joi.object({
                        userID: Joi.string().required(),
                        postID: Joi.string().required(),
                        commentID: Joi.string().required()
                    }
                )
            },
            auth: {
                strategies: ['admin', 'user']
            }
        }
    },
    {// Создание конкурса
        method: 'POST',
        path: '/contest',
        handler: controllers.createContest,
        options: {
            validate: {
                payload: Joi.object({
                    userID: Joi.string().required(),
                    tittle: Joi.string().required(),
                    conditions: Joi.string().required(),
                    startDate: Joi.string().required(),
                    endDate: Joi.string().required(),
                    image: Joi.string().optional(),
                    video: Joi.string().optional(),
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    { // Отправление статического файла
        method: 'GET',
        path: '/{file*}', // * означает, что этот файл может отсуствовать
        handler: {
            directory: {
                path: './public',
                    redirectToSlash: true,
                    index: true,
            }
        }
    }
];