import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import tokenAuthenticater from './_utilities/tokenAuthenticater.js';
import errorHandler from './_utilities/error-handler.js';
import users from './user/user.controller.js';
import accountBook from './accountBook/accountBook.controller.js';
import record from './record/record.controller.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(tokenAuthenticater());

// api routes
app.use('/user', users);
app.use('/accountBook', accountBook);
app.use('/record', record);

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is listening on port http://localhost:${process.env.PORT}/.`));