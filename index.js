import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

// Helmet setup - helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// Setup rate limiter
const limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes (mins * seconds * milliseconds)
    max: 100, // Limit number of requests per IP
    delayMs: 0 // Disables delays
});

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeSecurity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);