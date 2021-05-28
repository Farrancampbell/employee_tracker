const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',

    password: 'Porsche911',
    database: 'employees',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    firstOption();
});

const firstOption = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choose_type',
                message: 'Would you like to do?',
                choices: ['Add a Department', 'Add a Role', 'Add an Employee', 'View all Departments', 'View all Roles', 'View all Employees', 'Update Employee Roles', 'Update employee managers', 'View employees by manager', 'View Dept Budget', 'Remove Employee', 'Remove Department', 'Remove Role', 'Exit'],
            }
        ])
        .then((answer) => {
            if (answer.choose_type === "Add a Department") {
                addDept();
            } else if (answer.choose_type === "Add a Role") {
                addRole();
            } else if (answer.choose_type === "Add an Employee") {
                addNewEmployee();
            } else if (answer.choose_type === "View all Departments") {
                viewDepts();
            } else if (answer.choose_type === "View all Roles") {
                viewAllRoles();
            } else if (answer.choose_type === "View all Employees") {
                viewAllEmployees();
            } else if (answer.choose_type === "Update Employee Roles") {
                updateEmployeeInfo();
            } else if (answer.choose_type === "Update employee managers") {
                updateEmployeeManager();
            } else if (answer.choose_type === "View employees by manager") {
                viewManagerSubordinates();
            } else if (answer.choose_type === "View Dept Budget") {
                DeptBudget();
            } else if (answer.choose_type === "Remove Employee") {
                removeEmployee();
            } else if (answer.choose_type === "Remove Department") {
                removeDepartment();
            } else if (answer.choose_type === "Remove Role") {
                removeRole();
            } else {
                quit();
            }
        })
};

const addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: 'What department would you like to add?',
            }
        ])
        .then((answer) => {
            let dept_name = answer.dept_name;
            connection.query(`INSERT INTO department (name) VALUES ("${dept_name}");`, (err, res) => {
                if (err) throw err;
                console.log(`${dept_name} was added!`);
                firstOption();
            })
        })
}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Which role should be added?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the Annual Salary for this Role ?',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID for this role ?',
            },
            
        ])
        
// The Answer.(id) Correlate to the corresponding name in the database, I.E. title, salary and Department_id are all titles in the Schema

        .then((answer) => {
            let title = answer.title;
            let salary = answer.salary;
            let department_id = answer.department_id;
            let dept_name = answer.dept_name;
            connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`, (err, res) => {
                if (err) throw err;
                console.log(`${title} has been added!`);
                firstOption();
            })
        })
}

const addNewEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the new employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the new employee's last name?",
            },
            {
                type: 'input',
                name: 'role_id',
                message: "What is the new Employee's ID",
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "ID of Employee's Supervisor or Manager ? (ENTER 0 if no manager)",
            },
        ])
        .then((answer) => {
            let first_name = answer.first_name;
            let last_name = answer.last_name;
            let role_id = answer.role_id;
            let manager_id = parseInt (answer.manager_id);

            console.log(manager_id);

            if (manager_id === 0) {
                connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', ${role_id})`, (err, res) => {
                    if (err) throw err;
                    console.log(`${first_name} was added without a manager!`);
                    firstOption();
                })
                // If the employee has a manager, the console will say that the above named employee has a manager
            } else {
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`, (err, res) => {
                    if (err) throw err;
                    console.log(`${first_name} was added with a manager!`);
                    firstOption();
                })
            }
        }
        )
}

const updateEmployeeInfo = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Update employees first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Update employee's last name?",
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the updated Employee Role ID ?',
            },
        ])
        .then((answer) => {
            let first_name = answer.first_name;
            let last_name = answer.last_name;
            let role_id = answer.role_id;

            connection.query(`UPDATE employee SET role_id = '${role_id}' WHERE first_name = '${first_name}' AND last_name = '${last_name}'`, (err, res) => {
                if (err) {
                    console.log("Sorry, we were unable to update that employee.");
                };
                console.log(`${first_name} was updated!`);
                firstOption();
            })
        })
}

const updateEmployeeManager = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the first name of the employee who's manager you would like to update?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the last name of the employee who's manager you would like to update?",
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "What is the ID of this employee's new manager?",
            },
        ])
        .then((answer) => {
            let first_name = answer.first_name;
            let last_name = answer.last_name;
            let manager_id = answer.manager_id;

            connection.query(`UPDATE employee SET manager_id = '${manager_id}' WHERE first_name = '${first_name}' AND last_name = '${last_name}'`, (err, res) => {
                if (err) {
                    console.log(err);
                    console.log("Sorry, we were unable to update that employee.");
                    return;
                };
                console.log(`${first_name}'s manager was updated!`);
                firstOption();
            })
        })
}

const viewDepts = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        firstOption();
    })
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        firstOption();
    })
}

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        firstOption();
    })
}

const viewManagerSubordinates = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'manager_id',
                message: "Please enter the id of the manager to view their Subordinates?",
            },
        ])
        .then((answer) => {
            connection.query(`SELECT first_name, last_name FROM employee WHERE manager_id='${answer.manager_id}'`, (err, res) => {
                if (err) throw err;
                const table = cTable.getTable(res);
                console.log(table);
                firstOption();
            })
        })
}

const DeptBudget = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the ID of the department would you like to get the budget for?',
            }
        ])
        .then((answer) => {
            connection.query(`SELECT sum(salary)
            FROM role
            JOIN employee
            ON role.id = employee.role_id
            WHERE department_id = ${answer.department_id}`, (err, res) => {
                if (err) throw err;
                console.log(res);
                firstOption();
            })
        })
}

const removeEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "First name of the employee you would like to remove?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Last name of the employee you would like to remove?",
            }
        ])
        .then((answer) => {
            connection.query(`DELETE FROM employee WHERE (first_name = '${answer.first_name}' AND last_name = '${answer.last_name}')`, (err, res) => {
                if (err) throw err;
                console.log(`${answer.first_name} was successfully removed.`)
                firstOption();
            })
        })
}

const removeDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: "Which department you would like to remove?",
            }
        ])
        .then((answer) => {
            connection.query(`DELETE FROM department WHERE dept_name = '${answer.dept_name}'`, (err, res) => {
                if (err) throw err;
                console.log(`${answer.dept_name} was removed.`)
                firstOption();
            })
        })
}

const removeRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_title',
                message: "Which role you would like to remove?",
            }
        ])
        .then((answer) => {
            connection.query(`DELETE FROM role WHERE title = '${answer.role_title}'`, (err, res) => {
                if (err) throw err;
                console.log(`${answer.role_title} was removed.`)
                firstOption();
            })
        })
}
const quit = () => {
    console.log('Bye!');
    connection.end();
}
