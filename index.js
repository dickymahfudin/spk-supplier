require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('express-flash');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const middleware = require('./src/helpers/middleware');
const supplierRouter = require('./src/routes/supplier');
const criterialRouter = require('./src/routes/criteria');
const loginRouter = require('./src/routes/login');
const dashboardRouter = require('./src/routes/dashboard');
const hitungRouter = require('./src/routes/hitung');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret',
  })
);
app.use(flash());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/index');

// app.use('/login', loginRouter);
// app.use('/supplier', supplierRouter);
// app.use('/criteria', criterialRouter);
// app.use('/dashboard', dashboardRouter);
// app.use('/hitung', hitungRouter);

app.use('/login', loginRouter);
app.use('/supplier', middleware, supplierRouter);
app.use('/criteria', middleware, criterialRouter);
app.use('/dashboard', middleware, dashboardRouter);
app.use('/hitung', middleware, hitungRouter);

app.use('*', middleware, (req, res) => res.redirect('/dashboard'));

app.listen(PORT, () => console.info(`Server Running on : http://localhost:${PORT}`));
