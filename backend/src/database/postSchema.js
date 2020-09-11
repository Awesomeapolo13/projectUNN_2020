'use strict'

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema (
    {
        userID: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        tittle: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        type: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        text: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        image: {
            type: mongoose.Schema.Types.String,
        },
        video: {
            type: mongoose.Schema.Types.String,
        },
        commentsIDArray: {
            type: mongoose.Schema.Types.Array,
        },
        postID: {
            type: mongoose.Schema.Types.String,
        },
    },
    {
        timestamps: true
    }
);

export default postSchema;