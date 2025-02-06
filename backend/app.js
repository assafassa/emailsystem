const express=require('express');
const mongoose=require('mongoose');
const app =express();
app.use(express.json());
const uri = "mongodb+srv://assaf141:1989Taylor@task.cddb0.mongodb.net/taskplanner?retryWrites=true&w=majority&appName=task";
// const authController= require('./controllers/authcontrollers')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err))

