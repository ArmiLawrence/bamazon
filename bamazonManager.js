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
  password: "",
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
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product" ,"Exit"]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
            allItems();
            break;

        case "View Low Inventory":
            lowInventory();
            break;
        
        case "Add to Inventory":
            addInventory();
            break;

        case "Add New Product":
            addProduct();
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

      });

} 

function lowInventory() {
    connection.query("SELECT item_id, product_name, product_sales, department_name, price, stock_quantity FROM products WHERE stock_quantity < 5;",  function(err, res) {
        console.log("ItemId | Product Name | No of Items Sold | Department | Price | Stock");
        console.log("------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].product_sales + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity );
        }
        console.log("------------------------------------------------------------------------");
      });

} 

function addInventory() {
    inquirer
      .prompt([
      {
        name: "ItemId",
        type: "input",
        message: "To which Item Id will we add more inventory?",        
      },
      {
        name: "Stock",
        type: "input",
        message: "How many units are we adding?",
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
                 
            var updateDB =  "UPDATE products SET ? WHERE ?";

                connection.query(updateDB,
                        [
                          {
                            stock_quantity: (parseInt(product.stock_quantity) + parseInt(stock))
                            ,CRUD: "I"
                          }
                          , 
                          {
                            item_id: item
                          }
                        ],
                        function(err, res) {
                          if (err) throw err;

                          console.log("New inventory has been added for " + product.product_name + ". Stock Quantity has increased by " + stock + ".");
                          console.log("------------------------------------------------------------------------");

                      //end connection      
                      connection.end();
                    }
                  );
                //show inventory of store
                allItems();
            });
   
        });        
  }


function addProduct() {
    inquirer
      .prompt([
      {
        name: "product_name",
        type: "input",
        message: "What is the new product to add in the inventory?",        
      },
      {
        name: "department_name",
        type: "input",
        message: "To which department does new product belong?",
      }
      ,
      {
        name: "price",
        type: "input",
        message: "How much is the new product per piece?",
      }
      ,
      {
        name: "stock_quantity",
        type: "input",
        message: "How many are we adding to inventory?",
      }
      ])
      .then(function(answer) {

        var name = answer.product_name;
        var department = answer.department_name;
        var price = answer.price;
        var stock = answer.stock_quantity;

        connection.query(
        
            "INSERT INTO products SET ? ",
            {
            product_name: name,
            product_sales: 0,
            department_name: department,
            price: price,
            stock_quantity: stock,
            CRUD: "C" 
            },               
            function(err, res) {
                if (err) throw err;

                console.log("New Product has been added to the Inventory: " + name + " | " + department + " | " + price + " | " + stock );
                console.log("------------------------------------------------------------------------");

                //end connection      
                connection.end();
                }
            );
            //show inventory of store
            allItems();
        });
        
  }
