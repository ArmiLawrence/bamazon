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
        choices: ["View Product Sales - ALL" , "View Product Sales by Department", "Create New Department", "Exit"]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Product Sales - ALL":
            viewProductSalesAll();
            break;

        case "View Product Sales by Department":
            viewProductSales();
            break;

        case "Create New Department":
            addDepartment();
            break;
  
        case "Exit":
            connection.end();
            break;
        }
      });
  }    

  function viewProductSalesAll() {
        var query = "SELECT D.department_id, D.department_name, D.over_head_costs, sum(P.product_sales) as product_sales, (P.product_sales - D.over_head_costs) AS total_profit FROM departments as D LEFT JOIN products as P ON D.department_name = P.department_name GROUP BY D.department_id, D.department_name, D.over_head_costs ORDER BY 1";

        connection.query(query , function(err, res) {
            if (err) throw err;
        
            console.log("department_id | department_name | over_head_costs | product_sales | total_profit");
            console.log("------------------------------------------------------------------------");
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].department_id + " | " + res[i].department_name + " | " + res[i].over_head_costs + " | " + res[i].product_sales + " | " + res[i].total_profit  );
            }
            console.log("------------------------------------------------------------------------");
    
            //end connection      
            connection.end();      
        });
}  
  
function viewProductSales() {
    inquirer
      .prompt([
      {
        name: "department_name",
        type: "input",
        message: "What Department would you like to view?",        
      }
      ])
      .then(function(answer) {

        var department = answer.department_name;
        var query = "SELECT D.department_id, D.department_name, D.over_head_costs, sum(P.product_sales) as product_sales, (P.product_sales - D.over_head_costs) AS total_profit FROM departments as D LEFT JOIN products as P ON D.department_name = P.department_name WHERE D.department_name = ? GROUP BY D.department_id, D.department_name, D.over_head_costs ORDER BY 1";

        connection.query(query, [department] , function(err, res) {
            if (err) throw err;
        
            console.log("department_id | department_name | over_head_costs | product_sales | total_profit");
            console.log("------------------------------------------------------------------------");
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].department_id + " | " + res[i].department_name + " | " + res[i].over_head_costs + " | " + res[i].product_sales + " | " + res[i].total_profit  );
            }
            console.log("------------------------------------------------------------------------");
    

            //end connection      
            connection.end();      
        });
    });
}

  function addDepartment() {
    inquirer
      .prompt([
      {
        name: "department_name",
        type: "input",
        message: "What is the new department to add?",        
      },
      {
        name: "over_head_costs",
        type: "input",
        message: "What is the overhead cost?",
      }
      ])
      .then(function(answer) {

        var department = answer.department_name;
        var cost = answer.over_head_costs;

        connection.query(
        
            "INSERT INTO departments SET ? ",
            {
            department_name: department,
            over_head_costs: cost,
            CRUD: "C" 
            },               
            function(err, res) {
                if (err) throw err;

                console.log("New Department has been added: " + department + " | " + cost );
                console.log("------------------------------------------------------------------------");

                //end connection      
                connection.end();
                }
            );
        });      
  }
