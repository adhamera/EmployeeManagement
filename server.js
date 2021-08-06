var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table")

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "a3DjS127",
    database: "employeemanage"
});

connection.connect((err) => {
    if (err) throw err;
    Manage();
});

module.exports = connection;

function Manage() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices:
    ["View employees", "View departments", "View employee roles", "Add an employee", "Add a department", "Add a new role", "Update info", ]

        })
        .then(function (answer) {
            console.log(answer);

            if (answer.choice === "View employees") {
                viewEmployees();
            }
            else if (answer.choice === "View departments") {
                viewDept();

            }
            else if (answer.choice === "View employee roles") {
                viewEmployeeRoles();

            }
            else if (answer.choice === "Add an employee") {
                addEmployee();

            }
            else if (answer.choice === "Add a department") {
                addDept();

            }
            else if (answer.choice === "Add a new role") {
                addRole();

            }
            else if (answer.choice === "Update info") {
                updateInfo();

            } else {
                connection.end();
            }
        });
}

function viewEmployees() {
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
        function (err, result, options) {
            if (err) throw err;
            console.table(result);
            Manage();
        }
    );
};
function viewEmployeeRoles() {
    connection.query(
        "SELECT role.id, role.title, role.salary, role.department_id, department.id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
        function (err, result, options) {
            if (err) throw err;
            console.table(result);
            
            Manage();
        }
    );
};

function viewDept() {
    connection.query("SELECT * FROM department", function (err, result, options) {
        if (err) throw err;
        console.table(result);
        
        Manage();
    }
    );
};

var departmentOptions = [];
var employeeOptions = [];
var roleOptions = [];

function deptManage() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            departmentOptions.push(data[i].id + "-" + data[i].name)
        }
    })
}

function employeeManage() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            employeeOptions.push(data[i].id + "-" + data[i].first_name + " " + data[i].last_name)
        }
    })
}

function roleManage() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleOptions.push(data[i].id + "-" + data[i].title)
        }
    })
}


function addEmployee() {

    roleManage()
    employeeManage()

    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },

        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roleOptions
        },
        {
            name: "managerInfo",
            type: "list",
            message: "Who is the employee's manager?",
            choices: employeeOptions
        }
    ]).then(function (answer) {
        var getId = answer.role.split("-")
        var getManagerInfoId = answer.managerInfo.split("-")
        var query =
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
     VALUES ('${answer.first_name}','${answer.last_name}','${getId[0]}','${getManagerInfoId[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`new employee ${answer.first_name} ${answer.last_name} added!`)
        });
        Manage();
    });
};
function addRole() {

    roleManage()
    employeeManage()
    deptManage()

    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "What is your new role?"
        },

        {
            name: "department",
            type: "list",
            message: "Which department do you belong to?",
            choices: departmentOptions
        },

        {
            name: "salary",
            type: "number",
            message: "What is your current salary?"
        },
    ]).then(function (answer) {
        console.log(`${answer.role}`)
        var getDepartmentId = answer.department.split("-")
        var query =
            `INSERT INTO role (title, salary, department_id)
        VALUES ('${answer.role}','${answer.salary}','${getDepartmentId[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`<br>new role ${answer.role} added!`)
        });
        Manage();
    });
};

function addDept() {
    roleManage()
    employeeManage()
    deptManage()

    inquirer.prompt([
        {
            name: "dept",
            type: "input",
            message: "Which department would you like to add?"
        }
    ]).then(function (answer) {
        var query =
            `INSERT INTO department (name) VALUES ('${answer.department}')`;
        connection.query(query, function (err, res) {
            console.log(`new department added: ${answer.department}`)
        });
        Manage();
    });
};

function updateInfo() {
    connection.query('SELECT * FROM employee', function (err, result) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "What is the name of the employee receiving the role?",
                choices: function () {
                    var arrayEmployees = [];
                    result.forEach(result => {
                        arrayEmployees.push(
                            result.last_name
                        );
                    })
                    return arrayEmployees;
                }
            }
        ])
            .then(function (answer) {
                console.log(answer);
                const name = answer.employeeName;

                connection.query("SELECT * FROM role", function (err, res) {
                    inquirer
                        .prompt([{
                            name: "role",
                            type: "list",
                            message: "What is the new role?",
                            choices: function () {
                                var arrayRoles = [];
                                res.forEach(res => {
                                    arrayRoles.push(
                                        res.title)
                                })
                                return arrayRoles;
                            }
                        }
                        ]).then(function (roleConfirmed) {
                            const role = roleConfirmed.role;
                            console.log(role);
                            connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                                if (err) throw (err);
                                let roleIdentity = res[0].id;

                                let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
                                let values = [parseInt(roleIdentity), name]

                                connection.query(query, values,
                                    function (err, res, options) {
                                        console.log(`You have updated ${name}'s role to: ${role}.`)
                                    })
                                viewAll();
                            })
                        })
                })
            })
    })
}