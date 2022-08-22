const { transact } = require("./model")


// crud operations

module.exports = {
    getBooks:(req,res)=>{
        transact('SELECT * FROM `books`',res)
       },
    addBook:(req,res)=>{
        let sql = "INSERT INTO `books` SET ?"
        transact(sql,res,req.body)
       },
    updateBook:(req,res)=>{
        let sql = "UPDATE `books` SET ? WHERE `id` = "+req.body.id
        let data  = req.body
        delete data.id
        transact(sql,res,data)
       },   
    deleteBook:(req,res)=>{
        let sql = "DELETE FROM `books` WHERE ?"
        transact(sql,res,req.body)
       }     
}