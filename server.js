const express = require('express');
const hbs = require('hbs');
const fs=require('fs')

const port = process.env.PORT||3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})


app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

//app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
//})

app.use((req,res,next)=>{
    var now =new Date().toString();
    var log =now+':'+ req.method+ req.url;
    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();
});//keep track of response

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage:'Helloooo',
        currentYear:new Date().getFullYear()
    })
});
app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle:'AboutPage',
   });
})

app.get('/bad',(req,res)=>{
    res.send({
        error_name:'Unable to get'
    })
})
app.listen(port,()=>{
    console.log('Server started on'+port)
});

