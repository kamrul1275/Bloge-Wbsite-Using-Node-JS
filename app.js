const express = require('express');
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const subcategoryRoute = require('./routes/subcategory');
const postRoute = require('./routes/post');

const sequelize = require('./config/db');

const app = express();

app.use(express.json());

app.use('/api', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/subcategory', subcategoryRoute);

app.use('/api/post', postRoute);


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error syncing with the database:', err);
});