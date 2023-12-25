import express from 'express';

import auth from './auth.api';
import users from './users.api';
import slides from './slides.api';
import footer from './footer.api';
import orders from './orders.api';
import superAdmin from './superAdmin.api';
import about from './about.api';
import contact from './contact.api';
import product from './product.api';

// import calculationSystem from './calculationSystem.api';

const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/slides', slides);
app.use('/footers', footer);
app.use('/orders', orders);
app.use('/superAdmin', superAdmin);
app.use('/about', about);
app.use('/contact', contact);
app.use('/product', product);

// app.use('/calculation', calculationSystem);

export default app;
