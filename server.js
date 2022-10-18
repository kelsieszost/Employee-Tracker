const mysql =require('mysql');
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3001,
    user: 'root',
    password: 'newyork22',
    database: 'employeesDB'

});

db.connect((err) => {
    if (err) {
        console.log("Error with Connection");
    }else{
        console.log("Welcome to the Employee Manager!");
        console.log("MAIN MENU")
        firstPrompt();
    }
  
});

function firstPrompt() {

    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Would you like to do?",
        choices: [
          "View Employees",
          "View Employees by Department",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "End"]
      })
      .then(function ({ task }) {
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
  
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
        
          case "Add Employee":
            addEmployee();
            break;
  
          case "Remove Employees":
            removeEmployees();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "End":
            connection.end();
            break;
        }
      });
  }