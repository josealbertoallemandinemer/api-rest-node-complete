const validator=require("validator");


const validarArticulo= (parametros)=>{

    

    let validar_titulo=!validator.isEmpty(parametros.titulo);//&& validator.isLength(parametros.titulo,(min:5,max:15));
    let validar_contenido=!validator.isEmpty(parametros.contenido);


    if (!validar_titulo  ||  !validar_contenido) {
        
         throw new Error("no se ha validado la informacion");
    }

 }

 module.exports={
    validarArticulo
 }









