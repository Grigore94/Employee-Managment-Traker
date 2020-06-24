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
