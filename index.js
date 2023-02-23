import express from 'express';
import { userRouter } from './users/users.js'

const port = 8000;
const app = express();

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

app.all('/hello', (req, res, next) => {
        console.log(`Midlware`);
        next();
});

app.get('/hello', (req, res) => {
        console.log(`Server is online`);
        res.status(201).send('hello')
    }
);

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Server is online on ${port}`)
})