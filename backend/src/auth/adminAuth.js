'use strict'

import database from '../database/connections.js';

export default function adminAuth (server) {
    //Администратора
    server.auth.strategy('admin', 'bearer-access-token', {
        allowChaining: true,
        validate: async (req, token, h) => {
            console.log('in validate', token);
            const isValid = process.env.ADMIN_TOKEN === token;

            return {
                isValid,
                credentials: {},
                artifacts: {},
            };
        },
    });
}