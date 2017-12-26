var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
})
connection.connect(function (err) {
    console.log("connected as id " + connection.threadId/* + "\n"*/);
    if (err) throw err;
    menu();

})
var menu = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " | " + res[i].price);

            console.log("____________________________________________");
            console.log("--------------------------------------------");
        }
        inquirer
            .prompt([
                {
                    type: "checkbox",

                    message: "Scroll Down and Press the Spacebar when you have made your selection",

                    choices: ["View Items", "Add Item", "Look at Low Inventory", "Add Inventory"],
                    name: "userInput"
                },

                {
                    type: "confirm",
                    message: "Are you sure:",
                    name: "confirm",
                    default: true
                }
            ])
            .then(function (inquirerResponse) {
                // for (i = 0; i < res.length; i++) {
                //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " | " + res[i].price);
                    if (inquirerResponse.confirm) {
                        console.log("\nYou Picked  " + inquirerResponse.userInput);
                        var answer = inquirerResponse.userInput;
                        console.log("\nYou Picked  " + inquirerResponse.userInput);
                    }
                    if (answer == "View Item") {
                        console.log("Helloview");
                        var view = answer;
                        console.log(view);
                    }
                    else if (answer == "Add Item") {
                        console.log("Hello Add");
                        var add1 = answer;
                        console.log(add1);
                        add();
                    }

                    else if (answer == "Look at Low Inventory") {
                        console.log("Hello Look");
                        var look = answer;
                        console.log("look");
                        for (i = 0; i < res.length; i++) {
                            if (res[i].stock_quantity < 40) {
                                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
                                look();
                            }
                        }
                    }
                    else if (answer == "Add Inventory") {
                        console.log("Hello add");
                        var view = answer;
                        console.log(view);
                        // addinv();
                    }
                    // else (answer == "zap"); {
                    //     console.log("Hello45");
                    //     var view = answer;
                    //     console.log(view);
                    //     // addinv();
                    // }
                

                // ---------------------------------------------------------------------------------------------------------------------  
                function add() {
                    // prompt for info about the item being put up for auction
                    inquirer
                        .prompt([
                            {
                                name: "item",
                                type: "input",
                                message: "What is the product name you would like to submit?"
                            },
                            {
                                name: "department",
                                type: "input",
                                message: "What department would you like to place your auction in?"
                            },
                            {
                                name: "stock",
                                type: "input",
                                message: "What is the stock quantity you need?"
                            },
                            {
                                name: "price",
                                type: "input",
                                message: "What would you like your selling price to be?",
                                validate: function (value) {
                                    if (isNaN(value) === false) {
                                        return true;
                                    }
                                    return false;
                                }
                            }
                        ])
                        .then(function (answerP) {
                            // when finished prompting, insert a new item into the db with that info
                            connection.query(
                                "INSERT INTO products SET ?",
                                {
                                    product_name: answerP.item,
                                    department_name: answerP.department,
                                    price: answerP.price,
                                    stock_quantity: answerP.stock
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log("Your item was added successfully!");
                                    // add();
                                });
                            });
                        }
                        // end of add item function
// ____________________________________________________________________________________________________________________________



                    });
                });
            }
        
    
