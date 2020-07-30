const express = require('express');
const path = require('path');

//const helmet = require('helmet');
//const rateLimit = require("express-rate-limit");
const cors = require('cors');

const passport = require('passport');
const logger = require('morgan');

const { logHandler } = require('./middleware/logHandler');
const { errorHandler } = require('./middleware/errorHandler');

const config = require('./config/index');
const connectDB = require('./config/db')

// const userRoute = require('./routes/userRoute');
// const postRoute = require('./routes/postRoute');
const friendReqRoute = require('./routes/friendReqRoute');
const userFaceRoute = require('./routes/userFaceRoute');
const commentRoute = require('./routes/commentRoute');
const userProfileRoute =require('./routes/userProfileRoute');
const app = express();

//console.log(process.env);
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

app.use(logger('dev'))
app.use(logHandler);

connectDB(); 
/*
// connect to local database
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

// connect to Atlast DB
mongoose.connect('mongodb+srv://dbuser02:dbuser02@cluster0-z4eg1.gcp.mongodb.net/codecamp?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}); */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//'./public'
app.use(express.static(path.join(__dirname, 'public')));
//init passport
app.use(passport.initialize());

// app.use('/api/user', userRoute);
// app.use('/api/post', postRoute);
app.use('/signin', userFaceRoute);
app.use('/signup', userProfileRoute);
app.use('/friend', friendReqRoute);
app.use('/comment', commentRoute);

app.use(errorHandler);

app.listen(config.PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.PORT}`));

