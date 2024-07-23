const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
let booksArray = Object.values(books);

let users = [
    {
        "username":"John Doe",
        "password":123456789
    }
    
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
    if (!username) {
        return res.status(404).json({ message: "Body Empty" });
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: user
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token in session
        req.session.authorization = {
            accessToken
        }
         res.status(200).json({ message: 'User successfully logged in' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Extract email parameter and find users with matching email
    const isbn = req.params.isbn;
    let filtered_books = booksArray.filter((book) => book.isbn === isbn);
    if (filtered_books.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_book = filtered_books[0];
        
         // Extract and update DOB if provided
        
        let review = req.query.review;    
        if (review) {
            filtered_book.review = review;
        }
        
        // Replace old user entry with updated user
        booksArray = booksArray.filter((book) => book.isbn != isbn);
        booksArray.push(filtered_book);
        
        // Send success message indicating the user has been updated
        res.send(`Review of book with ISBN: ${isbn} updated.`);
    } else {
        // Send error message if no user found
        res.send(`Unable to find book! ${filtered_books}`);
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const remainingBooks = booksArray.filter((book) => book.isbn != isbn);
    booksArray = remainingBooks;

    res.send(`Review of book with ISBN: ${isbn} deleted.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
