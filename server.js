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
                var query = connection.query("SELECT * FROM employees", function(err, data) {
                if (err) throw err;
                console.table(data);
                continuePrompt();
                });
                break;
            //for departament
            case "View All Departaments":
                var query = connection.query("SELECT * FROM departaments", function(err, data) {
                    if (err) throw err;
                    console.table(data);
                    continuePrompt();
                });
                break;
            //for statuses
            case "View All Statuses":
                var query = connection.query("SELECT * FROM status", function(err,data) {
                    if (err) throw err;
                    console.table;
                    continuePrompt;
                });
                break;
            //adding a new status to db
            case "Add a Status":
                var qery = connection.query("SELECT id, departament", function(err, data) {
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
                    ]).then(function(data) {
                        var arr = data.departament.split(" ");
                        var depID = parseInt(arr[0]);
                        var query = connection.query(`INSERT INTO status (title, salary, departament_id) VALUES ('${data.title}',${data.salary},${depID}`,function(err,data) {
                            if (err) throw err;
                            console.log("Status added!");
                            continuePrompt;
                        });
                    });
                });
                break;
                //funtion to add an employee
                case "Add an Employee":
                    var query = connection.query("SELECT id, title FROM status", function(err,data) {
                        if(err) throw err;
                        let choices = data.map(x =>`${x.id} - ${x.title}`);
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "firstName",
                                message: "Please Enter employee first name",
                                validate: validateString
                            },
                        ])
                    })
        }
    })
}