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
                if (inquirerResponse.confirm) {
                    console.log("\nYou Picked  " + inquirerResponse.userInput);
                    var answer = inquirerResponse.userInput;
                    console.log("\nYou Picked  " + inquirerResponse.userInput);
                        if (answer=="View Item");{
                            console.log("Hello");
                            var view=answer;
                            console.log(view);
                            for (i = 0; i < res.length; i++) {
                                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " | " + res[i].price);
                            }                  
                        }              
                        if (answer=="Add Items");{
                            console.log("Hello Add");
                            var add1=answer;
                            console.log(add1);
                            
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
                                      validate: function(value) {
                                        if (isNaN(value) === false) {
                                          return true;
                                        }
                                        return false;
                                      }
                                    }
                                  ])
                                  .then(function(answerP) {
                                    // when finished prompting, insert a new item into the db with that info
                                    connection.query(
                                      "INSERT INTO products SET ?",
                                      {
                                        product_name: answerP.item,
                                        departmant_name: answerP.department,
                                        price: answerP.price,
                                        stock_quantity: answerP.stock
                                      },
                                      function(err) {
                                        if (err) throw err;
                                        console.log("Your item was added successfully!");       
                                        add();
                                      }
                                    );
                                  });
                              }

                        }
                        if (answer=="Look at Low Inventory");{
                            console.log("Hello Look");
                            var look=answer;
                            console.log(look);
                            for (i = 0; i < res.length; i++)
                                if ( res[i].stock_quantity<40){
                                    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
                                }                       
                        }
                        if (answer=="Add Inventory");{
                            console.log("Hello");
                            var view=answer;
                            console.log(view);
                        }
                }
            });
        });
    }




//                 console.log("\nYou Picked ID # " + inquirerResponse.id);
//                 var itemNum = inquirerResponse.Count;
//                 var itemID = inquirerResponse.id;
//                 var prodPrice = res[0].price;
//                 if (itemNum > 2) {
//                     console.log("you picked count  " + itemNum);
//                     console.log("you picked id  " + itemID);
//                     console.log("the price is  " + prodPrice);
//                     var totalPrice = (itemNum * prodPrice);

//                 }
//                 console.log("you picked count  " + itemNum);
//                 console.log("you picked id  " + itemID);

//                 function readProducts() {
//                     console.log("Select picked  product...\n");
//                     connection.query("SELECT * FROM products WHERE item_id=" + itemID, function (err, res) {
//                         if (err) throw err;
//                         // Log all results of the SELECT statement
//                         console.log(res);

//                         console.log("The Current Quantity in Stock is " + res[0].stock_quantity);
//                         if (res[0].stock_quantity < itemNum) {
//                             console.log("too bad - not enough in stock!");
//                         }
//                         //   reduce stock and enter new stock
//                         else {
//                             var newStockQuantity = (res[0].stock_quantity - itemNum);
//                             console.log("New Stock Calculation is " + newStockQuantity);
//                             console.log("Your Total Bill is $" + totalPrice);
//                             console.log("Updating In Stock quantities...\n");
//                         }
//                 // testing scope
//                         console.log("Your Total Bill is $" + totalPrice);
//                         connection.query("UPDATE products SET stock_quantity = "+newStockQuantity+" WHERE item_id = "+itemID);
//                     });                    
//                 }    
//                 readProducts();           
//             });
//         });
// }