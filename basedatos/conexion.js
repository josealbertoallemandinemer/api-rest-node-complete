const mongoose = require("mongoose");


const conexion= async ()=>{
    try{

       await  mongoose.connect("mongodb://localhost:27017/mi_blog")

      console.log("conectados a la base de datos mi_blog");

       // useNewUrlParser:true
// useUniFiedTopology:true
// useCreateIndex:true

    } catch(error){
        console.log(error);
        throw new error("no se ha conectado a la base de datos");
    }
}


module.exports={
    conexion
    
}