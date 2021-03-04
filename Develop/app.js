const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const members = [];
const idArray = [];

function team() {

function createManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the manager's name?",
        },
        {
                type: "input",
                name: 'managerID',
                message: "What is the manager's Id?", 
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the manager's email?",
        },
        {
            type: 'input',
            name: 'managerOfficePhone',
            message: "What is the manager's office phone number?",
        }
    ]).then(response => {
        const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOfficePhone)
        members.push(manager); 
        newMember();
    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: "What is the engineer's name?",
        },
        {
            type: 'input',
            name: 'engineerID',
            message: "What is the engineer's Id?",
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is the engineer's email?",
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: "What is the engineer's github?"
        }
    ]).then(response => {
        const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGithub)
        members.push(engineer); 
        newMember();
    })
}

function createIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: "What is the intern's name?",
        },
        {
            type: 'input',
            name: 'internID',
            message: "What is the intern's Id?",
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "What is the intern's email?",
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "What is the intern's school?",
        },
    ]).then(response => {
        const intern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool)
        members.push(intern); 
        newMember();
    })
}

function newMember() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'newEmployee',
            message: "Which type of member would you like to add to your team?",
            choices: ['Intern', 'Engineer', 'Manager', 'Done'],
        },
    ]).then(response => {
        const teamMembers = response.newEmployee;
        if (teamMembers == 'Intern') {
            createIntern();
        } else if (teamMembers == 'Engineer') {
            createEngineer();
        } else if (teamMembers == 'Manager') {
            createManager();
        } else if (teamMembers == 'Done') {
            writeToFile()
        }
    });
}
    newMember()
}
function writeToFile() {
    return fs.writeFileSync(outputPath, render(members));

}

team();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
