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
        promptUser();
    } 
});

function promptUser(){
    
    inquirer.prompt([
        { 
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Update an employee manager",
                "Delete an employee",
                "Delete a department",
                "Delete a role",
                "Exit application"
            ]
        }
    ]).then(function(choice){
        switch(choice.action){
            case "View all departments":
                viewDepartment();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateRole();
                break;
            case "Update an employee manager":
                updateManager();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "Delete a department":
                deleteDepartment();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "Exit application":
                exitApp();

        }
    });
};

function viewDepartment(){
    let query = "SELECT * FROM department";
    db.query(query, function(err, results){
        if(err){
            console.log(err)
        }else{
            console.table(results)
            promptUser();
        };
        
    });
};

  function viewEmployee() {
    console.log("Viewing employees\n");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      promptUser();
    });
  
  }
  
  // Make department array
  function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n");
  
    var query =
      `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
      }));
  
      console.table(res);
      console.log("Department view succeed!\n");
  
      promptDepartment(departmentChoices);
    });
  }

  function promptDepartment(departmentChoices) {

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Select a department",
          choices: departmentChoices
        }
      ])
      .then(function (answer) {
        console.log("answer ", answer.departmentId);
  
        var query =
          `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    WHERE d.id = ?`
  
        connection.query(query, answer.departmentId, function (err, res) {
          if (err) throw err;
  
          console.table("response ", res);
          console.log(res.affectedRows + "Employees are viewed\n");
  
          promptUser();
        });
      });
  }

//employee array
function addEmployee() {
    console.log("Adding an employee")
  
    var query =
      `SELECT r.id, r.title, r.salary 
        FROM role r`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
      console.log("RoleToInsert!");
  
      promptInsert(roleChoices);

    });
  }

  function promptInsert(roleChoices) {

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
      ])
      
      .then(function (answer) {
        console.log(answer);

        var query = `INSERT INTO employee SET ?`
        connection.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.insertedRows + "Added successfully\n");
  
            firstPrompt();
          });
      });
  }

  function removeEmployees() {
    console.log("Delete an employee");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name
        FROM employee e`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
  
      console.table(res);
      console.log("ArrayToDelete!\n");
  
      promptDelete(deleteEmployeeChoices);
    });
  }
  
  function promptDelete(deleteEmployeeChoices) {

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeChoices
        }
      ])
      .then(function (answer) {
  
        var query = `DELETE FROM employee WHERE ?`;
        connection.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;
  
          console.table(res);
          console.log(res.affectedRows + "Deleted\n");
  
          promptUser();
        });
      });
  }
  
  function updateEmployeeRole() { 
    employeeArray();
  }
  
  function employeeArray() {
    console.log("Update an employee");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r
      ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`      
      }));
  
      console.table(res);
      console.log("employeeArray To Update\n")
  
      roleArray(employeeChoices);
    });
  }
  
  function roleArray(employeeChoices) {
    console.log("Updating a role");
  
    var query =
      `SELECT r.id, r.title, r.salary 
    FROM role r`
    let roleChoices;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`      
      }));
  
      console.table(res);
      console.log("roleArray to Update\n")
  
      promptEmployeeRole(employeeChoices, roleChoices);
    });
  }

  function promptEmployeeRole(employeeChoices, roleChoices) {

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to set with the role?",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to update?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
  
        var query = `UPDATE employee SET role_id = ? WHERE id = ?`
        connection.query(query,
          [ answer.roleId,  
            answer.employeeId
          ],
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.affectedRows + "Updated successfully");
  
            firstPrompt();
          });
      });
  }
  
  








