import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import scraping from './routes/scrapingRoute.js';

const app = express();

//sett
app.set('port', 4000);

//middl
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rout
app.use('/api', scraping);

export default app;