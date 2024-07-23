const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const booksArray = Object.values(books);
const axios = require('axios');

public_users.post("/register", (req,res) => {
    users.push({
        "username": req.query.username,
        "password": req.query.password,
    });
    res.send("The user " + req.query.username + " has been added!");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({books}, null, 4));
});

// Get the book list available in the shop
/*public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('https://info12345283-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/');
        const books = response.data;
        res.send(JSON.stringify({ books }, null, 4));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});*/

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_books = booksArray.filter((book) => book.isbn === isbn);
    res.send(JSON.stringify({filtered_books}, null, 4));
 });

 /*public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`https://info12345283-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn?isbn=${isbn}`);
        const booksArray = response.data;
        let filtered_books = booksArray.filter((book) => book.isbn === isbn);
        res.send(JSON.stringify({ filtered_books }, null, 4));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});*/
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filtered_books = booksArray.filter((book) => book.author === author);
    res.send(JSON.stringify({filtered_books}, null, 4));
});

/*public_users.get('/author/:author',async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`https://info12345283-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author?author=${author}`);
        const booksArray = response.data;
        let filtered_books = booksArray.filter((book) => book.author === author);
        res.send(JSON.stringify({ filtered_books }, null, 4));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});*/

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = booksArray.filter((book) => book.title === title);
  res.send(JSON.stringify({filtered_books}, null, 4));
});

/*public_users.get('/title/:title',async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`https://info12345283-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title?title=${title}`);
        const booksArray = response.data;
        let filtered_books = booksArray.filter((book) => book.title === title);
        res.send(JSON.stringify({ filtered_books }, null, 4));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const review = req.params.isbn;
    let filtered_books = booksArray.filter((book) => book.review === review);
    res.send(JSON.stringify({filtered_books}, null, 4));
});

module.exports.general = public_users;
