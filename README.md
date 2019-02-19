# bamazon

Bamazon is a CLI App that is an Amazon-like storefront. The app will take in orders from customers and deplete stock from the store's inventory.

#Bamazon features: 
1. MySQL database and its CRUD functions
    * CRUD Definitions in SQL table
        * C = Initial insert (or create) into Products Table
        * U = Update to item, most likely a purchase, as Product Sales and Stock Quantity will vary
        * I = Additional insert to stock_quantity. If there is a need to increase inventory, the CRUD will be updated to note that we inserted more of the same item.
        * R = Read, this is the regular viewing of the table, this is NOT USED in the CRUD column.
        * D = Delete, this is for deleting a product from the table, this is NOT USED in a function.
2. Node packages downloaded for use in this app:
    * [Inquirer](https://www.npmjs.com/package/inquirer)
    * [mySQL](https://www.npmjs.com/package/mysql)
3. Instructions on how to use Bamazon
    * Open Git Bash or Terminal
    * Navigate to the folder with bamazon and its components
    * Check and make sure the bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor.js files exist
    * Check and make sure package.json exists/node_modules folder
        * If node_modules folder does not exist, run npm install in Git Bash/Terminal and node_modules will be downloaded
        * If package.json does not exist, let me know and that means I missed a big part of the assignment :)
    * cd into the folder with bamazon: 
    * To get purchase items as a customer of bamazon, type: node bamazonCustomer.js and prompts will show up
        * See screenshot in Images/Customer 
            * 1_Inivital View.PNG - shows the initial view of what a user will see upon opening the app
            * 2_Prompt for Purchase.PNG - shows all of the items available for purchase in bamazon
            * 3_Entering Item ID and Amount_Total Purchase.PNG - shows prompt on how to complete purchase and shows customer money owed. 
    * To get reports and add items to inventory/products as a manager of bamazon, type: node bamazonManager.js and prompts will show up
        * See in Images/Manager
            * 1_Initial View.PNG - shows the initial view of what a user will see upon opening the app
            * 2_View All Products for Sale.PNG - shows all products for sale
            * 3_View Low Inventory.PNG - shows all products with inventory items that are under 5 units
            * 4_Add to Inventory_2 Added to X-Men (item 5).PNG - Allows to add more inventory to items already in the database
            * 5_Add to Products_See Chess added (item 13).PNG - Allows to add more products in database
    * To get reports and add records to department, by department as a supervisor of bamazon, type: node bamazonManager.js and prompts will show up
        * See screenshot in Images/Supervisor
            * 1_Initial View.PNG - shows the initial view of what a user will see upon opening the app
            * 2_Viewing All Products.PNG - shows all products by department with profitability/costs
            * 3_Viewing Products by Department.PNG - shows only products by department with profitability/costs
            * 4_Add a new Department.PNG - allows to add more department in database
            * 5_Check new department SQL table.PNG - check to see if department is added in database
4. Tools used in building Bamazon
    * MySQL
    * Node.js
    * Javascript
    * Git Bash/Terminal

