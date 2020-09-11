'use strict'

import mongoose from 'mongoose';
import uuid from 'uuid';
const uuidv4 = uuid.v4;

const schema = new mongoose.Schema (
    {
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        surname: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        birthDate: {
            type: mongoose.Schema.Types.Date,
            required: true,
        },
        contactPhone: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        avatar: {
            type: mongoose.Schema.Types.String,
            default: 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png',
        },
        userID: {
            type: mongoose.Schema.Types.String,
            default: uuidv4,
        },
        token: {
            type: mongoose.Schema.Types.String,
            default: uuidv4,
            }
    },
    {
        timestamps: true
    }
);

export default schema;