
const inquirer = require('inquirer');
inquirer.registerPrompt('selectLine');

const firstQuestion = {
    type: 'selectLine',
    message: 'Pick Your Action',
    name: 'line',
    choices: ['View Products', 'Delete Item', 'View Low Inventory', 'Add Stock'],
};

inquirer.prompt([
    firstQuestion
  
]).then(function (answers) {
    console.log('you picked this line', answers.line); // eslint-disable-line no-console
});