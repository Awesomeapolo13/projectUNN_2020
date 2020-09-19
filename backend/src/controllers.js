'use strict'

import Boom from '@hapi/boom';
import uuid from 'uuid';

const uuidv4 = uuid.v4;
import database from './database/connections.js'
import {
    GetUserInfo,
    GetUsersInfo,
    getDateFromString,
    GetPostInfo,
    GetPostsInfo,
    GetCommentInfo,
    GetCommentsInfo
} from './helpers.js';
import {generateHash} from './helpers.js';
import {mounthArray30, postTypes} from './helpers.js';


export default {
    //Регистрация
    registration: async (request, h) => {
        try {
            const userData = request.payload;
            // Дата рождения
            userData.birthDate = getDateFromString(userData.birthDate);
            const day = userData.birthDate.getDate(); //День
            const month = userData.birthDate.getMonth() + 1; //Месяц
            const year = userData.birthDate.getFullYear(); //год
            const currentDate = new Date();
            if (month <= 0 || month > 12) {
                return Boom.badRequest('Некорректный месяц!');
            } else if (month === 2 && day > 29) {
                return Boom.badRequest('В феврале нет такого числа!');
            } else if (day > 31) {
                return Boom.badRequest('Введите корректное число месяца!');
            } else if (year > currentDate.getFullYear()) {
                return Boom.badRequest('Введите корректный год!');
            } else if (year < currentDate.getFullYear() - 120) {
                return Boom.badRequest('Введите корректный год!');
            }
            for (let month30 of mounthArray30) {
                if (month === month30 && day > 30) {
                    return Boom.badRequest('В данном месяце 30 дней!');
                }
            }

            // Email
            const alreadyRegistered = await database.User.findOne({email: request.payload.email});
            console.log(alreadyRegistered);
            if (alreadyRegistered !== null) {
                return Boom.badRequest('Пользователь с таким логином уже зарегистрирован!');
            }

            //Телефон
            if (userData.contactPhone.match(/\d/g).join('').length !== 11) {
                return Boom.badRequest('Введите корректный телефон!');
            }

            userData.password = generateHash(userData.password);
            const newUser = database.User.create({
                name: userData.name,
                surname: userData.surname,
                birthDate: userData.birthDate,
                email: userData.email,
                contactPhone: userData.contactPhone,
                password: userData.password,
                avatar: userData.avatar,
            });
            newUser.then(function (user) {
                console.log('Пользователь' + user + 'создан');
            });
            return h.response({message: 'Регистрация прошла успешно!'}).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при регистрации пользователя, попробуйте позднее!');
        }
    },

    //Авторизация
    login: async (request, h) => {
        try {
            //req.auth.credentials; - отсюда можно получить все данные о пользователе
            const loginUser = await database.User.findOne({
                email: request.payload.email,
                password: generateHash(request.payload.password)
            });
            console.log(loginUser);
            if (loginUser === null) {
                return Boom.unauthorized('Такого пользователя не существует, пройдите регистрацию');
            }
            return h.response(
                {
                    token: loginUser.token,
                    userID: loginUser.userID,
                }
            ).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при авторизации пользователя, попробуйте позднее!');
        }
    },

    //Получение информации о пользователе
    getUserInformation: async (request, h) => {
        try {
            const foundUser = await database.User.findOne({userID: request.query.userID});
            console.log(foundUser);
            if (foundUser === null) {
                return h.response(null);
            }
            const userInfo = new GetUserInfo(foundUser);
            console.log(userInfo);
            return h.response(userInfo).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при получении информации о пользовател, попробуйте позднее!');
        }
    },

    //Получение списка пользователей
    getUsersList: async (request, h) => {
        try {
            const foundUserAllUsers = await database.User.find();
            // console.log(foundUserAllUsers);
            const userList = new GetUsersInfo(foundUserAllUsers);
            return h.response(userList).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при получении информации о пользовател, попробуйте позднее!');
        }
    },

    //Изменение информации о пользователе
    changeUserInformation: async (request, h) => {
        try {
            const newUserData = request.payload;
            newUserData.password = generateHash(newUserData.password);
            newUserData.birthDate = getDateFromString(newUserData.birthDate);
            const day = newUserData.birthDate.getDate(); //День
            const month = newUserData.birthDate.getMonth() + 1; //Месяц
            const year = newUserData.birthDate.getFullYear(); //год
            const currentDate = new Date();
            if (month <= 0 || month > 12) {
                return Boom.badRequest('Некорректный месяц!');
            } else if (month === 2 && day > 29) {
                return Boom.badRequest('В феврале нет такого числа!');
            } else if (day > 31) {
                return Boom.badRequest('Введите корректное число месяца!');
            } else if (year > currentDate.getFullYear()) {
                return Boom.badRequest('Введите корректный год!');
            } else if (year < currentDate.getFullYear() - 120) {
                return Boom.badRequest('Введите корректный год!');
            }
            for (let month30 of mounthArray30) {
                if (month === month30 && day > 30) {
                    return Boom.badRequest('В данном месяце 30 дней!');
                }
            }
            if (newUserData.contactPhone.match(/\d/g).join('').length !== 11) {
                return Boom.badRequest('Введите корректный телефон!');
            }
            const foundUser = await database.User.findOne({userID: request.payload.userID});
            if (foundUser === null) {
                return Boom.badRequest('Пользователя не существует');
            }
            if (foundUser.userID !== newUserData.userID) {
                return Boom.badRequest('Информацию профиля может поменять только его пользователь');
            }
            await foundUser.updateOne({
                name: newUserData.name,
                surname: newUserData.surname,
                email: newUserData.email,
                contactPhone: newUserData.contactPhone,
                password: newUserData.password,
                birthDate: newUserData.birthDate,
                avatar: newUserData.avatar,
            })
            return h.response('Данные изменены').code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при изменении данных, попробуйте позднее!');
        }
    },

    //Удаление пользователя
    deleteUserAccount: async (request, h) => {
        try {
            const deleteUser = await database.User.findOne({userID: request.payload.userID});
            console.log(deleteUser);
            if (deleteUser === null) {
                return Boom.badRequest('Пользователя не существует');
            }
            await deleteUser.deleteOne(deleteUser);
            return h.response('Данные удалены').code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при удалении аккаунта, попробуйте позднее!');
        }
    },

    //Создание нового поста
    createNewPost: async (request, h) => {
        try {
            let validPostType = false;
            const newPostData = request.payload;
            const foundAuthor = await database.User.findOne({userID: newPostData.userID});
            if (foundAuthor === null) {
                return Boom.badRequest('Пользователь не найден, пройдите регистрацию!');
            }
            for (let type of postTypes) {
                if (newPostData.type === type) {
                    validPostType = true;
                }
            }
            if (validPostType === false) {
                return Boom.badRequest('Не существует такой тематики для публикаций!');
            }
            const newPost = await database.Post.create({
                userID: newPostData.userID,
                tittle: newPostData.tittle,
                type: newPostData.type,
                text: newPostData.text,
                image: newPostData.image,
                video: newPostData.video,
                commentsIDArray: newPostData.commentsIDArray,
                postID: newPostData.postID,
            });
            await database.Post.findOne({
                userID: newPostData.userID,
                postID: newPostData.postID
            })
                .updateOne({postID: newPost._id});
            return h.response({
                postID: newPost._id,
                message: 'Ваша статья опубликована',
            }).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при создании поста, попробуйте позднее');
        }
    },
    //Получение поста
    getPostInformation: async (request, h) => {
        try {
            const foundPost = await database.Post.findOne({postID: request.query.postID});
            console.log(foundPost);
            if (foundPost === null) {
                return h.response(null);
            }
            const postInfo = new GetPostInfo(foundPost);
            console.log(postInfo);
            return h.response(postInfo).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при получении информации о публикации, попробуйте позднее!');
        }
    },
    //Получение перечня постов
    getPostsList: async (request, h) => {
        try {
            const foundAllPosts = await database.Post.find();
            console.log(foundAllPosts);
            const postList = new GetPostsInfo(foundAllPosts);
            return h.response(postList).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при получении информации о пользовател, попробуйте позднее!');
        }
    },

    //Редактирование поста
    changePost: async (request, h) => {
        try {
            const changePostData = request.payload;
            const foundAuthor = await database.User.findOne({userID: changePostData.userID});
            const foundPost = await database.Post.findOne({postID: changePostData.postID});
            if (foundAuthor === null) {
                return Boom.badRequest('Автор публикации не найден!');
            } else if (foundPost === null) {
                return Boom.badRequest('Публикация не найдена!');
            } else if (foundAuthor.userID !== foundPost.userID) {
                return Boom.badRequest('Изменение публикации доступно её автору!');
            }
            await foundPost.updateOne({
                text: changePostData.text,
                tittle: changePostData.tittle,
                image: changePostData.image,
                video: changePostData.video,
                commentsIDArray: changePostData.commentsIDArray,
            })
            return h.response('Пост изменен!').code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при редактировании поста, попробуйте позднее');
        }
    },

    //Удаление поста
    deletePost: async (request, h) => {
        try {
            const foundAuthor = await database.User.findOne({userID: request.payload.userID});
            const foundPost = await database.Post.findOne({postID: request.payload.postID});
            if (foundAuthor === null) {
                return Boom.badRequest('Автор публикации не найден!');
            } else if (foundPost === null) {
                return Boom.badRequest('Публикация не найдена!');
            } else if (foundAuthor.userID !== foundPost.userID) {
                return Boom.badRequest('Удаление публикации доступно её автору!');
            }
            for (let comment of foundPost.commentsIDArray) {
                let foundComment = await database.Comment.findOne({commentID: comment});
                await foundComment.deleteOne({commentID: comment});
            }
            await foundPost.deleteOne(foundPost);
            return h.response('Публикация удалена').code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при удалении аккаунта, попробуйте позднее!');
        }
    },

    //Создание нового комментария
    createNewComment: async (request, h) => {
        try {
            const newCommentData = request.payload; // загружаем данные из запроса
            const foundAuthor = await database.User.findOne({userID: newCommentData.userID}); // ищем автора комментария
            const foundPost = await database.Post.findOne({postID: newCommentData.postID}); // ищем пост к которому комментарий относится
            if (foundAuthor === null) {
                return Boom.badRequest('Автор комментария не найден!');
            } else if (foundPost === null) {
                return Boom.badRequest('Публикация не найдена!');
            }
            const newComment = await database.Comment.create({ // создаем новый комментарий
                userID: newCommentData.userID,
                postID: newCommentData.postID,
                commentID: newCommentData.commentID,
                text: newCommentData.text,
                image: newCommentData.image,
                video: newCommentData.video,
            });
            await database.Comment.findOne({
                userID: newCommentData.userID,
                commentID: newCommentData.commentID
            })
                .updateOne({commentID: newComment._id});
            console.log(foundPost.commentsIDArray);
            const foundNewComment = await database.Comment.findOne({commentID: newComment._id});
            await foundPost // добавляем id  комментария в массив комментариев поста
                .updateOne({$push: {commentsIDArray: foundNewComment.commentID}});
            return h.response({commentID: foundNewComment._id}).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при создании комментария, попробуйте позднее');
        }
    },

    //Получение информации о комментарии
    getComment: async (request, h) => {
        try {
            const foundComment = await database.Post.findOne({commentID: request.query.commentID});
            console.log(foundComment);
            if (foundComment === null) {
                return h.response(null);
            }
            const commentInfo = new GetCommentInfo(foundComment);
            console.log(foundComment);
            return h.response(commentInfo).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при получении информации о публикации, попробуйте позднее!');
        }
    },

    //Получение перечьня комментариев к публикации
    getCommentsList: async (request, h) => {
        try {
            const commentsIDArray = request.query['commentsIDArray[]'];
            console.log(request.query);
            console.log(commentsIDArray);
            let commentsDataArr = [];
            for (let commentID of commentsIDArray) {
                let foundComment = await database.Comment.findOne({commentID: commentID});
                commentsDataArr.push(foundComment);
            }
            commentsDataArr = new GetCommentsInfo(commentsDataArr);
            return h.response(commentsDataArr).code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при получении информации о комментариях к публикации, попробуйте позднее!');
        }
    },

    //Редактирование комментария
    changeComment: async (request, h) => {
        try {
            const changeCommentData = request.payload; // загружаем данные из запроса
            const foundAuthor = await database.User.findOne({userID: changeCommentData.userID}); // ищем автора комментария
            const foundPost = await database.Post.findOne({postID: changeCommentData.postID}); // ищем пост к которому комментарий относится
            const foundComment = await database.Comment.findOne({commentID: changeCommentData.commentID});
            if (foundAuthor === null) {
                return Boom.badRequest('Автор публикации не найден!');
            } else if (foundPost === null) {
                return Boom.badRequest('Публикация не найдена!');
            } else if (foundComment === null) {
                return Boom.badRequest('Комментарий не найден!');
            } else if (foundAuthor.userID !== foundComment.userID) {
                return Boom.badRequest('Изменить комментарий может только его автор!');
            } else if (foundPost.postID !== foundComment.postID) {
                return Boom.badRequest('Комментарий не относится к указанной публикации!');
            }
            await foundComment.updateOne({
                commentID: changeCommentData.commentID,
                text: changeCommentData.text,
                image: changeCommentData.image,
                video: changeCommentData.video,
            });
            return h.response('Данные в комментарии изменены').code(200);
        } catch (e) {
            console.log(e)
            return Boom.badImplementation('Произошла ошибка при создании комментария, попробуйте позднее');
        }
    },

    //Удаление коментария
    deleteComment: async (request, h) => {
        try {
            const foundAuthor = await database.User.findOne({userID: request.payload.userID});
            const foundPost = await database.Post.findOne({postID: request.payload.postID});
            const foundComment = await database.Comment.findOne({commentID: request.payload.commentID});
            if (foundAuthor === null) {
                return Boom.badRequest('Автор публикации не найден!');
            } else if (foundPost === null) {
                return Boom.badRequest('Публикация не найдена!');
            } else if (foundComment === null) {
                return Boom.badRequest('Комментарий не найден!');
            } else if (foundAuthor.userID !== foundComment.userID) {
                return Boom.badRequest('Удалить комментарий может только его автор!');
            } else if (foundPost.postID !== foundComment.postID) {
                return Boom.badRequest('Комментарий не относится к указанной публикации!');
            }
            await foundComment.deleteOne(foundComment); // удаляем комментарий
            await foundPost.updateOne({$pull: {commentsIDArray: foundComment.commentID}})
            return h.response('Комментарий удален').code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при удалении комментария, попробуйте позднее!');
        }
    },

    //Создание конкурса
    createContest: async (request, h) => {
        try {
            const newContestData = request.payload;
            const foundAuthor = await database.User.findOne({userID: newContestData.userID});
            newContestData.startDate = getDateFromString(newContestData.startDate); // получаем даты из строк
            newContestData.endDate = getDateFromString(newContestData.endDate); // получаем даты из строк
            const contestDates = [newContestData.startDate, newContestData.endDate]; // массив с датами
            // поиск автора
            if (foundAuthor === null) {
                return Boom.badRequest('Пользователь не найден, пройдите регистрацию!');
            }
            // Валидация дат конкурса
            for (let date of contestDates) {
                let day = date.getDate(); //День
                let month = date.getMonth() + 1; //Месяц
                let year = date.getFullYear(); //год
                let currentDate = new Date();
                if (month <= 0 || month > 12) {
                    return Boom.badRequest('Некорректный месяц!');
                } else if (month === 2 && day > 29) {
                    return Boom.badRequest('В феврале нет такого числа!');
                } else if (day > 31) {
                    return Boom.badRequest('Введите корректное число месяца!');
                } else if (year < currentDate.getFullYear()) {
                    return Boom.badRequest('Введите корректный год!');
                }
                for (let month30 of mounthArray30) {
                    if (month === month30 && day > 30) {
                        return Boom.badRequest('В данном месяце 30 дней!');
                    }
                }
            }
            const newContest = await database.Contest.create({
                userID: newContestData.userID,
                tittle: newContestData.tittle,
                conditions: newContestData.conditions,
                startDate: newContestData.startDate,
                endDate: newContestData.endDate,
                image: newContestData.image,
                video: newContestData.video,
            });
            console.log(newContest);
            return h.response('Конкурс создан').code(200);
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при создании конкурса, попробуйте позднее');
        }
    },

}