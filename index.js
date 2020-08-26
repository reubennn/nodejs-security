import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import routes from "./src/routes/crmRoutes";
import jsonwebtoken from "jsonwebtoken";

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

//  Apply Express Rate Limiter to all requests
app.use(limiter);

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/nodeSecurity", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
    // If we have all the elements in the request
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
        jsonwebtoken.verify(req.headers.authorization.split(" ")[1], "RESTFULAPIs", (err, decode) => {
            // Error if the token does not match the secret key
            if (err) req.user = undefined; // If an error, ensure we don't pass any data back
            req.user = decode;
            next();
        });
    } else { // The request does not have the authorization
        req.user = undefined;
        next();
    }
});

routes(app);

// serving static files
app.use(express.static("public"));

app.get("/", (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);