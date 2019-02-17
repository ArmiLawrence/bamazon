//required stuff
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Junior07!",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;

    runSearch();
  });

 

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Items", "Exit"]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Items":
          allItems();
          break;
  
        case "Exit":
          connection.end();
          break;
        }
      });
  }  

  function allItems() {
    connection.query("SELECT item_id, product_name, product_sales, department_name, price, stock_quantity FROM products;",  function(err, res) {
        console.log("ItemId | Product Name | No of Items Sold | Department | Price | Stock");
        console.log("------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].product_sales + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity );
        }
        console.log("------------------------------------------------------------------------");

      buyItems();  
      });

} 

function buyItems() {
    inquirer
      .prompt([
      {
        name: "ItemId",
        type: "input",
        message: "What Item ID would you like to purchase?",        
      },
      {
        name: "Stock",
        type: "input",
        message: "How many units would you like to purchase?",
      }
      ])
      .then(function(answer) {

        var item = answer.ItemId;
        var stock = answer.Stock;
        var query = "SELECT item_id, product_name, product_sales, department_name, price, stock_quantity FROM products WHERE item_id = ?";

        connection.query(query, [item] , function(err, res) {
            if (err) throw err;
        
            //put results in an array
            var product = res[0];


            if ( stock <= parseInt(product.stock_quantity)){
                  
                var updateDB =  "UPDATE products SET ? WHERE ?";

                connection.query(updateDB,
                        [
                          {
                            stock_quantity: (parseInt(product.stock_quantity) - parseInt(stock))
                            ,product_sales: (parseInt(product.product_sales) + parseInt(stock))
                            ,CRUD: "U"
                          }
                          , 
                          {
                            item_id: item
                          }
                        ],
                        function(err, res) {
                          if (err) throw err;

                          console.log("Your order has been placed. You owe: $" + product.price * stock + ".");
                          console.log("------------------------------------------------------------------------");

                      //end connection      
                      connection.end();
                    }
                  );
                }
            else{
              console.log("We are sorry, we have insufficient inventory for your order!")
              console.log("would you like to purchase something else?")
              console.log("------------------------------------------------------------------------");
              //show inventory of store
              allItems();
            }     
        });        
      });

  }



 