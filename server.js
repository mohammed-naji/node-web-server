const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('vew engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use( (req, res, next) => {
        var now = new Date().toString();
        var log = `${now}: ${req.method} ${req.url}`;
        console.log(log);
        fs.appendFile('server.log', log + '\n', () => {

        });
        next();
});

// app.use( (req, res, next) => {
//         res.render('maintain.hbs', {
//                 pageTitle: 'Maintinance Mode ',
//                 welcomeMessage: 'We will back very soon :)'
//         })
// });

hbs.registerHelper('getYear', () => {
        return new Date().getFullYear();
})

hbs.registerHelper('scremit',(text) => {
        return text.toUpperCase();
}) 

app.get('/', (req, res) => {
        //res.send('<h1>Hello Express!</h1>');
        // res.send({
        //         name: 'Mohammed',
        //         likes: [
        //                 'football',
        //                 'sqm'
        //         ]
        // })
 
        res.render('home.hbs',{
                pageTitle: 'Home ',
                welcomeMessage: 'Welcone to my new website'
        });
});


app.get('/about', (req, res) => {
        //res.send('<h1>About Page</h1>');
        res.render('about.hbs', {
                pageTitle: 'About Page'
        });
})

app.get('/bad', (req, res) => {
        res.send({
                errorMessaga: 'Error, Bad request!'
        })
});

 
 
app.listen(port, () => {
        console.log(`Server is up on port ${port}`);
});