var inquirer = require("inquirer");
menuPick()
// Created a series of questions
inquirer.prompt([
  {
    type: "checkbox",
    name: "userInput",
    message: "Thanks for Entering and we will someday take you to this function",
    choices: ["View Items", "Add Item", "Look at Low Inventory", "Add Inventory"]
  }

// After the prompt, store the user's response in a variable called menuPick.
]).then(function(menuPick) {
  var menup = menuPick.userInput;
    console.log(menuPick.userInput);
});
// menuPick();
    // Then use the Google Geocoder to Geocode the address
    // geocoder.geocode(menuPick.userInput, 
  //     function(err, data) {
  
  //     console.log(JSON.stringify(data, null, 2));
  //   });
  // });