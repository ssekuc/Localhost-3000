import express from 'express';

import path,{dirname} from 'path';
import {fileURLToPath} from 'url';

import cookieParser from 'cookie-parser';
const __dirname = dirname(fileURLToPath(import.meta.url));




const app = express();
const Port = 3000;

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './node_modules')));


app.get('/', (req, res) => {
    //res.send('Localhost:3000 project started');
    res.render('index', { page: 'home' });
})

app.listen(Port, () => {
    console.log(`Localhost:3000 app listening on port ${Port}`);
})
