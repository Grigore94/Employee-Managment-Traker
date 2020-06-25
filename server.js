const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8080",
    user: "root",
    password: "",
    database: "employee_trakerDB"
});

//Making sure the string response does not come as number
function validateString(answer) {
    if (answer != "" && isNaN(parseInt(answer))) {
        return true;
    }
    return false;
};
// making sure the number response does not come as string
function validateNumber(answer) {
    if (answer != "" && !NaN(parseInt(answer))) {
        return true;
    }
    return false;
};
//function for each swith case to ask user to continue  
function continuePrompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Would you like to coninue?"
        }
    ]).then(function (data) {
        if (data.continue) {
            main();
        }
        else {
            return;
        }
    });
};
//Switch case
function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "mainMeniu",
            message: "Select From The Options",
            choices: [
                "Viw All Employees",
                "View All Statuses",
                "View All Departments",
                "Add An Employee",
                "Add A Status",
                "Add A Department",
                "Update Employee Status // Assign Manager to Employee"
            ]
        }
    ]).then(function (answer) {
        switch (answer.mainMeniu) {
            //for employees
            case "View All Emloyees":
                var query = connection.query("SELECT * FROM employees", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    continuePrompt();
                });
                break;
            //for departament
            case "View All Departaments":
                var query = connection.query("SELECT * FROM departaments", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    continuePrompt();
                });
                break;
            //for statuses
            case "View All Statuses":
                var query = connection.query("SELECT * FROM status", function (err, data) {
                    if (err) throw err;
                    console.table;
                    continuePrompt;
                });
                break;
            //adding a new status to db
            case "Add a Status":
                var qery = connection.query("SELECT id, departament", function (err, data) {
                    if (err) throw err;
                    let choices = data.map(x => `${x.id} - ${x.departament}`);
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "Enter the status:",
                            validate: validateString
                        },
                        {
                            type: "input",
                            name: "salary",
                            message: "Enter salary:",
                            validate: validateNumber
                        },
                        {
                            type: "list",
                            name: "departament",
                            message: "Select the departament",
                            choices: [...choices]
                        }
                    ]).then(function (data) {
                        var arr = data.departament.split(" ");
                        var depID = parseInt(arr[0]);
                        var query = connection.query(`INSERT INTO status (title, salary, departament_id) VALUES ('${data.title}',${data.salary},${depID}`, function (err, data) {
                            if (err) throw err;
                            console.log("Status added!");
                            continuePrompt;
                        });
                    });
                });
                break;
                //funtion to add an employee
                case "Add an Employee":
                var query = connection.query("SELECT id, title FROM status", function (err, data) {
                    if (err) throw err;
                    let choices = data.map(x => `${x.id} - ${x.title}`);
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Please Enter employee first name",
                            validate: validateString
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Please Enter employee last name",
                            validate: validateString
                        },
                        {
                            type: "list",
                            name: "status",
                            message: "Select employee status",
                            choices: [...choices]
                        }
                    ]).then(function (data) {
                        var arr = data.status.split(" ");
                        var statusID = parseInt(arr[0]);
                        var query = connection.query(`INSERT INTO employee (first_name, last_name, status_id, manager_id) VALUES ('${data.firstName}','${data.lastName}','${statusID}',0)`, function (err, data) {
                            if (err) throw err;
                            return data;
                        });
                        console.log("Departament added to DB");
                        continuePrompt;
                    });
                    //break;
                //update employee
                //case "Update Status":
                const emplo = {
                    first_name: "",
                    last_name: "",
                    status_id: 0,
                    manager_id: 0,
                    emploID: 0
                };
                var query = connection.query("SELECT id, first_name, last_name FROM employee", function (err, data) {
                    if (err) throw err;
                    let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter employee first name",
                            validate: validateString
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter yemployee last name",
                            validate: validateString
                        }
                    ]).then(function (data) {
                        emplo.first_name = data.firstName;
                        emplo.last_name = data.lastName;
                        var qery = connection.query("SELECT id, title FROM status", function (err, data) {
                            if (err) throw err;
                            let choices = data.map(x => `${x.id} - ${data.title}`);
                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "title",
                                    message: "Select title",
                                    choices: [...choices]
                                }
                            ]).then(function (data) {
                                var arr = data.title.split(" ");
                                emplo.status_id = parseInt(arr[0]);
                                var qyery = connection.query("SELECT id, first_name, last_name FROM employee", function (err, data) {
                                    if (err) throw err;
                                    let choices = data.map(x => `${x.id} - ${x.firstName} ${x.lastName}`);
                                    choices.push("Emplyee do not have a manager");
                                    inquirer.prompt([
                                        {
                                            type: "list",
                                            name: "manager",
                                            message: "Cosee a manager for this employee",
                                            choices: [...choices]
                                        }
                                    ]).then(function (data) {
                                        if (data.manager === "This employee doe not have a manager") {
                                            emplo.manager_id = null;
                                        } else {
                                            var arr = data.manager.split(" ");
                                            emplo.manager_id = parseInt(arr[0]);
                                        }
                                        var query = connection.query(`UPDATE employee SET first_name = '${emp.first_name}', last_name = '${emp.last_name}', role_id = ${emp.role_id}, manager_id = ${emp.manager_id} WHERE id = ${emp.empID}`, function (err, data) {
                                            if (err) throw err;
                                            continuePrompt;
                                            return data;
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

            });
            break;
        }
    });
}

main();