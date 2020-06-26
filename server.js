const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

var PORT = process.env.PORT || 3306;

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
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
            message: "Tap YES to Continue"
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
            name: "mainMenu",
            message: "Select From The Options",
            choices: [
                "Viw All Employees",
                "View All Statuses",
                "View All Departaments",
                "Add An Employee",
                "Add A Status",
                "Add A Departament",
                "Update Employee Status // Assign Manager to Employee"
            ]
        }
    ]).then(function (answer) {
        switch (answer.mainMenu) {
            //for employees
            case "View All Emloyees":
                var query = connection.query("SELECT * FROM employee", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    continuePrompt();
                });
                break;
            //for departament
            case "View All Departaments":
                var query = connection.query("SELECT * FROM departament", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    continuePrompt();
                });
                break;
            //for statuses
            case "View All Statuses":
                var query = connection.query("SELECT * FROM status", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    continuePrompt;
                });
                break;
            //adding a new status to db
            case "Add a Status":
                var query = connection.query("SELECT id, departament", function (err, data) {
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
            //function to add an employee
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
                            console.log("Emloyee added to DB");
                            continuePrompt;
                        });

                    });
                });
                break;
            //adding a departament 
            case "Add A Departament":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "departament",
                        message: "Enter the departament's name:",
                        validate: validateString
                    }
                ]).then(function (data) {
                    var query = connection.query(`INSERT INTO departament (departament) VALUES ('${data.departament}');`, function (err, data) {
                        if (err) throw err;
                        return data;

                    });
                    console.log("Departament been added!")
                    continuePrompt();
                });
                break;

            //update employee
            case "Update Employee Status // Assign Manager to Employee":
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
                            type: "list",
                            name: "employee",
                            message: "Select an employee:",
                            choices: [...choices]
                        }
                    ]).then(function (data) {
                        var arr = data.employee.split(" ");
                        emplo.emploID = parseInt(arr[0]);
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
                                message: "Enter employee last name",
                                validate: validateString
                            }
                        ]).then(function (data) {
                            emplo.first_name = data.firstName;
                            emplo.last_name = data.lastName;
                            var query = connection.query("SELECT id, title FROM status", function (err, data) {
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
                                    var query = connection.query("SELECT id, first_name, last_name FROM employee", function (err, data) {
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
                                            if (data.manager === "This employee does not have a manager") {
                                                emplo.manager_id = null;
                                            } else {
                                                var arr = data.manager.split(" ");
                                                emplo.manager_id = parseInt(arr[0]);
                                            }
                                            var query = connection.query(`UPDATE employee SET first_name = '${emplo.first_name}', last_name = '${emplo.last_name}', role_id = ${emplo.role_id}, manager_id = ${emplo.manager_id} WHERE id = ${emplo.emploID}`, function (err, data) {
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