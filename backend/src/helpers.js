'use strict'


import * as crypto from 'crypto'; //модуль для хеширования

export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const BIRTHDATE_REGEXP = /^\d\d\.\d\d\.\d\d\d\d$/;
export const CONTACTPHONE_REGEXP = /^\+\d\(\d\d\d\)\d\d\d\-\d\d\-\d\d$/;
export const mounthArray30 = [4, 6, 9, 11]; // массив месяцев,кроторых 30 дней
export const postTypes = ['weather', 'love', 'sadness', 'sport', 'religion', 'holiday', 'army', 'nature', 'life', 'folk', 'baby', 'other']

//Функция конструктор объекта с информацией о пользователе
export const GetUserInfo = function (user) {
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.birthDate = user.birthDate;
    this.contactPhone = user.contactPhone;
    this.avatar = user.avatar;
}

//Функция конструктор объекта с информацией о публикации
export const GetPostInfo = function (post) {
    this.userID = post.userID;
    this.tittle = post.tittle;
    this.type = post.type;
    this.text = post.text;
    this.image = post.image;
    this.video = post.video;
    this.commentsIDArray = post.commentsIDArray;
}

//Функция конструктор списка пользователей
export const GetPostsInfo = function (postsDataArr) {
    return postsDataArr.map(post => {
        return {
            postID: post.postID,
            userID: post.userID,
            tittle: post.tittle,
            type: post.type,
            text: post.text,
            image: post.image,
            video: post.video,
            commentsIDArray: post.commentsIDArray,
        }
    })
}

//Функция конструктор объекта с информацией о комментарии
export const GetCommentInfo = function (post) {
    this.userID = post.userID;
    this.text = post.text;
    this.image = post.image;
    this.video = post.video;
}

//Функция конструктор списка с комментариев к публикации
export const GetCommentsInfo = function (commentsDataArr) {
    return commentsDataArr.map(comment => {
        return {
            postID: comment.postID,
            userID: comment.userID,
            text: comment.text,
        }
    })
}

//Функция конструктор списка пользователей
export const GetUsersInfo = function (usersDataArr) {
    return usersDataArr.map(user => {
       return {
           userID: user.userID,
           name: user.name,
           surname: user.surname,
           birthDate: user.birthDate,
           contactPhone: user.contactPhone,
           avatar: user.avatar,
       }
    })
}

// Функция для хеширования данных
export const generateHash = data =>
    crypto
        .createHash('md5')
        .update(data)
        .digest('hex');

// Функция преобразующая дату в формат Date
export function getDateFromString(str) {
    const strBirthDate = str.split('.'); //Дата в формате массива типа [21, 01, 2020]
    return new Date(strBirthDate[2], strBirthDate[1] - 1, strBirthDate[0]);
}