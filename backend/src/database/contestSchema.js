'use strict'

import mongoose from 'mongoose';
import uuid from 'uuid';
const uuidv4 = uuid.v4;

const contestSchema = new mongoose.Schema (
    {
        userID: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        tittle: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        conditions: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        participantsIDArray: {
            type: mongoose.Schema.Types.Array,
            default: [],
        },
        startDate: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        endDate: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        image: {
            type: mongoose.Schema.Types.String,
        },
        video: {
            type: mongoose.Schema.Types.String,
        },
       contestID: {
           type: mongoose.Schema.Types.String,
           default: uuidv4,
        },
        contestAvatar: {
            type: mongoose.Schema.Types.String,
            default: 'https://cdn.pixabay.com/photo/2016/09/01/08/25/smiley-1635456_1280.png',
        }
    },
    {
        timestamps: true
    }
);

export default contestSchema;