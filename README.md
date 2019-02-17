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
4. Tools used in building Bamazon
    * MySQL
    * Node.js
    * Javascript
    * Git Bash/Terminal

