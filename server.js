import express from 'express';
import session from 'express-session';
import path,{dirname} from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import cors from 'cors';
import User from './app/user/user.model.js';
import userRouter from './app/user/user.route.js';
import gameRouter from './app/game/game.route.js';
import adminRouter from './app/admin/admin.route.js';
import homeRouter from './app/home/home.route.js'
import mongoose from 'mongoose';
import {Secret} from './app/config/config.js'
const __dirname = dirname(fileURLToPath(import.meta.url));



import URI from "./app/config/db.js"
mongoose.connect(URI);
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
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/node_modules')));

app.use(cors());



let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;


app.use(session({
    secret: Secret,
    saveUninitialized: false, 
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Secret
}

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err, false)
        });
});

passport.use(strategy);


app.use('/', homeRouter);
app.use('/', adminRouter);
app.use('/', userRouter);
app.use('/', gameRouter);










app.listen(Port, () => {
    console.log(`Localhost:3000 app listening on port ${Port}`);
})
