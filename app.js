const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RufusDog2019!",
    database: "employee_tracker_db"
});
function runInquirer() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ['View all employees', 'View all departments ', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update current employee roles', 'EXIT']
        }
    ]).then(answer => {
        console.log(answer.choice);
        if (answer.choice === 'Add an employee') {
            createEmployee();
        }
        if (answer.choice === 'Add a department') {
            createDepartment();
        }
        if (answer.choice === 'Add a role') {
            createRole();
        }
        if (answer.choice === 'View all employees') {
            viewEmployees();
        }
        if (answer.choice === 'View all departments') {
            viewDepartments();
        }
        if (answer.choice === 'View all roles') {
            viewRoles();
        }
        if (answer.choice === 'Update current employees role') {
            updateRole();
        }
    });
}
con.connect(function (err) {
    if (err) {
        console.error("Something went wrong");
        console.log(err);
        return;
    }
    console.log(" ┌───────────────────────────────────────────────────────────────────────────┐");
    console.log(" │                         EMPLOYEE MANAGEMENT SYSTEM                        │");
    console.log(" └───────────────────────────────────────────────────────────────────────────┘");
    console.log("Database connected successfuly!");
    runInquirer();
});

function createEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "input",
            name: "employeeRole",
            message: "What is the employees role?"
        },
    ]).then(res => {
        con.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${res.firstName}", "${res.lastName}", "${res.employeeRole}")`, function (err, results) {
            if (err) throw err;
            console.log("Employee added successfully!");
            console.log(results);
            runInquirer();
        });
    });
};

function createDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department?",
        }
    ]).then(res => {
        con.query(`INSERT INTO department (name) VALUES ("${res.departmentName}")`, function (err, results) {
            console.log("Department added successfully!");
            console.log(results);
            runInquirer();
        });
    });
}


function createRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role?",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this role?",
        }
    ]).then(res => {
        con.query(`INSERT INTO role (title, salary) VALUES ("${res.roleTitle}", "${res.roleSalary}")`, function (err, results) {
            console.log("Role added successfully!");
            console.log(results);
            runInquirer();
        });
    });
}

function viewEmployees() {
    con.query('SELECT * FROM employee', function (err, results, fields) {
        const employeeTable = cTable.getTable([
            { results }
        ]);
        console.log(employeeTable);
        runInquirer();
    });
}

function viewDepartments() {
    con.query('SELECT * FROM department', function (err, results, fields) {
        console.log(results)
        const departmentTable = cTable.getTable(results);
        console.log(departmentTable);
        runInquirer();
    });
}

function viewRoles() {
    con.query('SELECT * FROM role', function (err, results, fields) {
        const roleTable = cTable.getTable([
            { results }
        ]);
        console.log(roleTable);
        runInquirer();
    });
}

function updateRole() {
    con.query('SELECT * FROM employee', function (err, results, fields) {
        inquirer.prompt([
            {
                type: "list",
                name: "first_name",
                message: "Select the employee you would like to alter:",
                choices: results.map(res => res.first_Name),
                askAnswered: true
            },
            {
                type: "input",
                name: "newRole",
                message: "Please enter the employees new role:",
            }
        ]).then(res => {
            const chosenItem = results.find(row.first_name === response.first_name);
            if (response.newRole != chosenItem.role_id) {
                con.query(`UPDATE employee SET role_id = ${res.newRole} WHERE first_name = ${chosenItem.id}`, function (err, results) {
                    console.log("Role updated successfully!");
                    console.log(results);
                });
            }
            else {
                console.log("This is already the employees role!")
            };
        });
    });
}