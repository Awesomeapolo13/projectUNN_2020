'use strict'

import database from '../database/connections.js';

export default function userAuth (server) {
//Пользователя
    server.auth.strategy('user', 'bearer-access-token', {
        allowChaining: true,
        validate: async (req, token, h) => {
            console.log('in validate', token);
            const user = await database.User.findOne({ token }); //ищем пользователя с полученным в запросе токеном
            if (user) {
                return {
                    isValid: true,
                    credentials: user,
                    artifacts: {},
                };
            }
            return {
                isValid: false,
                credentials: {},
                artifacts: {},
            };
        },
    });
}