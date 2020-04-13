const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//create data static
app.use(express.static(__dirname+'/public'));
app.set('view engine' , 'hbs');

app.use((req , res , next)=>{
    const now = new Date().toString();
    const log = `${now} : ${req.method} ${req.url}`;
    fs.writeFileSync('server.log' , log);
    next();
})

app.use((req , res , next)=>{
    res.render('offline.hbs');
})

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear' , ()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('upercase' , (val)=>{
    return val.toUpperCase();
})

app.get('/' , (req , res)=>{
    res.render('home.hbs' , {
        title: "آموزش نود جی اس",
        pageHeader:"صفحه اصلی",
        welcomeMessage:'welcome to my toturial. please share if you like it.',
    });
})

app.get('/about' , (req , res)=>{
    res.render('about.hbs' , {
        title : 'صفحه درباره ما',
        pageHeader: 'صفحه درباره ما',
    });
})

app.listen(3000 , ()=>{
    console.log('start server on port 3000');
}); 