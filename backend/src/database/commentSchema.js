'use strict'

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema (
    {
        userID: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        postID: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        commentID: {
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
    },
    {
        timestamps: true
    }
);

export default commentSchema;