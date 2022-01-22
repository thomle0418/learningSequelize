const express = require('express');
const sequelize= require('./config');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./Routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

//connect to the database prior to starting our server
// Force the database to drop/recreate the table
//whenever we start/restart our server
sequelize.sync().then(()=>{
    app.listen(PORT, ()=>console.log(`Server listening on PORT: ${PORT}`));
});