'use strict'

import Hapi from '@hapi/hapi';
import AuthBearer from 'hapi-auth-bearer-token';
import Inert from '@hapi/inert';
import makeAdminAuth from './auth/adminAuth.js';
import makeUserAuth from './auth/userAuth.js';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.join(path.resolve(), './.env')
})

import routesArr from './routes.js';

const init = async () => {

    const server = Hapi.server({
        port: parseInt(process.env.PORT || '3000', 10),
        host: process.env.HOST || 'localhost',
        routes: {
            cors: true,
            validate: {
                failAction: (req, h, err) => {
                    throw err;
                }
            }
        }
    });

    // Сценарий авторизации
   await server.register([ //регистрация плагинов
       AuthBearer,
       Inert,
   ]);

    makeAdminAuth(server);
    makeUserAuth(server);

    server.route(routesArr);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init().then(() => {
    console.log(process.env.HOST);
    console.log(process.env.PORT);
});