// Importing the  modules required
var express = require('express');
var mongoose = require('mongoose');
var customerModel = require('./models/customers');
var customers = require("./models/customers")
var app = express();

// Setting the view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))


// Declaring a port for the server
const PORT = 8999;


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/complaintsform', (req, res) => {
    res.render('complaintsform')
})
app.post('/complaintsform', (req, res) => {
    // Saving the form to the database
    console.log(req.body)

    var newCustomer = new customerModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        complaint: req.body.complaint
    });

    newCustomer
        .save()
        .then(doc => {
            res.redirect('/complaintsform')
        })
        .catch(err => {
            res.send(err.message)
        })
})

app.get('/complaindata', (req, res) => {
    customerModel.find((err, customers) => {
        if (err != null) {
            return express.send(err.message)
        }
        res.render("complaindata", {
            customers: customers
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    mongoose.connect("mongodb+srv://acity:webtech@exams.xrbci.mongodb.net/ebube", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
});