const inquirer = require('inquirer');
const consoleTable = ('console.table');
const mysql = require('mysql');

var db = mysql.createConnection(
    { 
    host: '127.0.0.1',
    port: '3005',
    datbase: 'employees_db',
    user: 'root',
    password: 'newyork22',
    }
);

db.connect((err) => {
    if (err) {
        console.log('Connection Failed');
    } else {
        console.log('Employee Manager Main Menu');
        firstsprompt
    }
}
)