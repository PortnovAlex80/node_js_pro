import express from 'express';

const port = 8000;
const app = express();

app.get('/hello', () => {
    
})

app.listen(port, () => {
    console.log(`Server is online`)
})