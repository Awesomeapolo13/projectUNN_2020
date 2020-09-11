'use strict'

import mongoose from 'mongoose';
import userSchema from './userSchema.js';
import postSchema from './postSchema.js';
import commentSchema from './commentSchema.js';
import contestSchema from './contestSchema.js';

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const dbName = 'mySite'

const uri = `mongodb://${host}:${port}/${dbName}`;

mongoose.connect(uri, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Произошла ошибка при подключении к Монге', err)
});

db.once('open', () => {
    console.log('Успешно подключились к Монге')
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Contest = mongoose.model('Contest', contestSchema);

export default {
    User,
    Post,
    Comment,
    Contest,
}