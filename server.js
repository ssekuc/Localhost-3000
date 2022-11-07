import express from 'express'
const app = express();
const Port = 3000;

app.get('/', (req, res) => {
    res.send('Localhost:3000 project started');
})

app.listen(Port, () => {
    console.log(`Localhost:3000 app listening on port ${Port}`);
})
