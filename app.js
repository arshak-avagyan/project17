const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

// options is another http method like the others
app.options('*', cors());

// Serving static files. All the static assets will authomatically be served from the folder called 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers. Helmet good to add at the very beginning
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        'blob:',
        'https://*.mapbox.com',
        'https://js.stripe.com/v3/',
      ],
      scriptSrc: [
        "'self'",
        'https://*.mapbox.com',
        'https://js.stripe.com/v3/',
        "'unsafe-inline'",
        'blob:',
      ],
    },
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // number of request at a certein time
  windowMs: 60 * 60 * 1000, // time window for certain number of requests
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api', limiter);

// app.post(
//   '/webhook-checkout',
//   bodyParser.raw({ type: 'application/json' }),
//   webhookCheckout
// );

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Parsing data from url encoded form
app.use(cookieParser());

// Data sanitization against NoSQL query injection
// example: ({"$gt": ""} using this query instead of email we can log in with just password, because this query always returns true)
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      // this option will allow given field dublicate in req.query
      'duration',
      'ratingsAverage',
      'maxGroupSize',
      'ratingsQuantity',
      'difficulty',
      'price',
    ],
  })
);

app.use(compression());

// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Handling unhandled requests
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler middleware
app.use(globalErrorHandler);

module.exports = app;
