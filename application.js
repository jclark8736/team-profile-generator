const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {



  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([ 
      {

        //manager questions in inquirer
        type: "input",
        name: "managerName",
        message: "Please enter the name of the manager of this team.",
      },
      {
        type: "input",
        name: "managerId",
        message: "Please enter the ID number of the manager of this team."
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Please enter the email address of the manager of this team."
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter the office number of the manager of this team."
      },

    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
      //need to check managername - should probably be Name.
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([

        {

            //Engineer questions in inquirer
            type: "input",
            name: "Name",
            message: "Please enter the name of this engineer employee.",
          },
          {
            type: "input",
            name: "Id",
            message: "Please enter the ID of this engineer employee."
          },
          {
            type: "input",
            name: "Email",
            message: "Please enter the email address of this engineer employee"
          },
          {
            type: "input",
            name: "OfficeNumber",
            message: "Please enter the office number of this engineer employee."
          },
        




      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      // 
 
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE INTERN CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
      // 

      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
