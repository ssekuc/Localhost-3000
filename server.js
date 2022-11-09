import express from 'express';

import path,{dirname} from 'path';
import {fileURLToPath} from 'url';

import cookieParser from 'cookie-parser';
const __dirname = dirname(fileURLToPath(import.meta.url));

import userRouter from './app/user/user.route.js';
import gameRouter from './app/game/game.route.js';

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/tournament');
const db = mongoose.connection;

db.on('open', () => console.log(`Connected to MongoDB`));
db.on('error', () => console.error('Connection Error'));


const app = express();
const Port = 3000;

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.use('/user', userRouter);
app.use('/game', gameRouter);

app.get('/', (req, res) => {
    //res.send('Localhost:3000 project started');
    res.render('index', { page: 'home' });
})

app.listen(Port, () => {
    console.log(`Localhost:3000 app listening on port ${Port}`);
})
