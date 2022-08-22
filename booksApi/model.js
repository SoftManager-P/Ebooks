const db = require("./db")

module.exports = {
    transact: (sql,res,data=[])=>{
        db.getConnection((err,connection)=>{
            if(err) return res.status(504).json({error:"Unable to connect"})
            connection.query(sql,data,(err,rows)=>{
               connection.release()
               if(err) return res.status(504).json({error:err})
               return res.status(200).json(rows)
            })
            
        }) 
   },

}
