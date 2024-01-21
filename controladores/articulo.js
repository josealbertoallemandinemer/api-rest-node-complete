
const validator=require("validator");
const Articulo= require("../modelos/Articulo");
const{validarArticulo}= require("../helpers/validar");
const fs= require("fs");
const path= require ("path");




const prueba=(req,res)=>{
    
    return res.status(200).json({
        mensaje:"soy una accion de pruebas en el controlador de articulos"
    });
}



const curso = (req,res)=>{

    console.log("se ha ejecutado el endpoint probando");  

    return res.status(200).json([{

     curso:"master react",
     autor:"jose",
     urt:"aintnago.com"



    },
    {

     curso:"master react",
     autor:"jose",
     urt:"aintnago.com"



    }
 ]

       

    );

    


 };


const crear= (req,res)=>{          //async await then...

    let parametros=req.body;

     try{

        let validar_titulo=!validator.isEmpty(parametros.titulo);//&& validator.isLength(parametros.titulo,(min:5,max:15));
        let validar_contenido=!validator.isEmpty(parametros.contenido);


        if (!validar_titulo  ||  !validar_contenido) {
            
             throw new Error("no se ha validado la informacion");
        }

     }catch(error){
             
        return res.status(400).json({
             
            status:"error",
            mensaje:"faltan datos por enviar"

        });

     }

    const articulo=  new Articulo(parametros);
    // manual=>articulo.titulo=parametros.titulo;


    //articulo.save((error,articuloGuardado)=>{

    //if (error || !articuloGuardado) {

     articulo.save().then((articuloGuardado)=>{

            if (!articuloGuardado) {

                return res.status(400).json({
             
                    status:"error",
                    mensaje:"no se ha guardado el"
        
                });
                
            }

            return res.status(200).json({

                mensaje:"articulo creado con exito",
                status:"success",
                articulo: articuloGuardado
                
            })

       


     }).catch(error=>{

        return res.status(500).json({
     
            status:"error servidor",
            mensaje:"no se ha guardado el"

    });

});


     
}

const listar= async(req,res)=>{

    try{ 

let consulta= Articulo.find({});

if (req.params.ultimos) {

    consulta.limit(3);
}



let articulos = await consulta.sort({fecha:-1}).exec();



    
    if (!articulos) {

    return res.status(404).json({
 
        status:"error",
        mensaje:"no se han encontrado articulos"
});




}

return res.status(200).send({
 
status:"success",
parametro:req.params.ultimos,
contador:articulos.length,
articulos

});

}catch(error){

    return res.status(500).json({
 
        status:"error",
        mensaje:"se produjo error",
        error
});

}

}


//const uno=(req,res)=>{

 //   let id= req.params.id;
 
//    Articulo.findById(id, (error,articulo)=>{
 
//     if (error || !articulos) {
 
 //        return res.status(404).json({
                
  //           status:"error",
  //           mensaje:"no articulo"
  //       });
         
  //   }
 
  //   return res.status(200).json({
         
  //       status:"success",
  //           articulo
  //   });
 
 
 
 
  //  });
 
 
 
 
 //}
 const uno=(req,res)=>{

    

    let id= req.params.id;
 
    let articulos=Articulo.findById(id).then((articulo)=>{
 
     if (!articulos) {
 
         return res.status(404).json({
                
             status:"error",
             mensaje:"no articulo"
         });
         
     }
 
     return res.status(200).json({
         
         status:"success",
             articulo
     });
 
 
 
 
    }).catch(error=>{                       

        return res.status(500).json({
     
            status:"error servidor",
            mensaje:"no se ha guardado el"

    });

});
 
 
 
 
 }

 //const borrar=(req,res)=>{

 //   let articulo_id=req.param.id;

 //   Articulo.findOneAndDelete({_id:articulo_id}, (error,articuloBorrado)=>{

 //      if (error || !articuloBorrado){

 //       return res.status(404).json({

 //           status:"error",
 //           articulo: articuloBorrado,
 //           mensaje:"error al borrar"
        
  //        });

 //      }

 //       return res.status(200).json({

  //          status:"success",
  //          articulo: articuloBorrado,
  //          mensaje:"metodo de borrar"
        
  //        });

 //   })

 
 //}

  const borrar= (req,res)=>{                //da error al borrar
    
    

    let articuloId=req.param.id;

    Articulo.findOneAndDelete({ _id : articuloId }).then((articuloBorrado)=>{

       if (!articuloBorrado){

        return res.status(404).json({

            status:"error",
            
            mensaje:"error al borrar"
        
          });

       }

        return res.status(200).json({

            status:"success",
            articulo: articuloBorrado,
            mensaje:"metodo de borrar"
        
       });

    })

 
 }

 


 const editar = (req,res)=>{

   let articuloId= req.params.id;

   let parametros= req.body;

   try{
    validarArticulo(parametros);
    }catch(error){
              
     return res.status(400).json({
          
         status:"error",
         mensaje:"faltan datos por enviar"
 
     });
 }
 

  
 Articulo.findOneAndUpdate({_id: articuloId}, req.body,{new:true}).then( (articuloActualizado)=>{  // no then y error

    if (!articuloActualizado) {         //error

        return res.status(500).json({
            status:"error",
            mensaje:"error al actualizar"
        })
        
    }

       return res.status(200).json({
             
        status:"success",
        articulo: articuloActualizado
       });
 });


 }

const subir=(req,res)=>{


    if (!req.file && !req.files) {
        return res.status(404).json({
            status:"error",
            mensaje:"peticion invalida"
        });
    }


    console.log(req.file);

    let archivo= req.file.originalname;



    let archivo_split= archivo.split("\.");

    
     let extension= archivo_split[1];

      if (extension !="png" && extension !="jpg" && extension !="jpeg" && extension !="gif" ) {
        
           fs.unlink(req.file.path, (error)=>{
            return res.status(400).json({
                status:"error",
                mensaje:"imagen invalida"
            });
           });
      }else{

        let articuloId= req.params.id;

   

  
 

  
 Articulo.findOneAndUpdate({_id: articuloId}, {imagen: req.file.filename},{new:true}).then( (articuloActualizado)=>{  // no then y error

    if (!articuloActualizado) {         //error

        return res.status(500).json({
            status:"error",
            mensaje:"error al actualizar"
        })
        
    }

       return res.status(200).json({
             
        status:"success",
        articulo: articuloActualizado,
        fichero: req.file
       });
 });




      //  return res.status(200).json({
             
       //     status:"success",
       //     files:req.file,
       //     extension,
       //     archivo_split
      //     });

      }



}



const imagen= (req,res)=>{
    let fichero= req.params.fichero;

    let ruta_fisica= "./imagenes/articulos/"+fichero;

    fs.stat(ruta_fisica,(error,existe)=>{                             //access==stat
        if (existe) {
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(404).json({
                status:"error",
                mensaje:"imagen no existe"
            })

        }
    })
}

const buscar= (req,res)=>{
     
    let busqueda= req.params.busqueda;

    Articulo.find({"$or": [

           {"titulo":{"$regex":busqueda,"$options":"i"}},
           {"contenido":{"$regex":busqueda,"$options":"i"}}
    ]})
        .sort({fecha:-1})
        .exec().then((articulosEncontrados)=>{

             if (!articulosEncontrados || articulosEncontrados.length <= 0) {
                return res.status(404).json({
                    status:"error",
                    mensaje:"no se ha encontrado los articulos"
                });
             }

             return res.status(200).json({
                status:"success",
                articulos:articulosEncontrados
             })

        });
}



module.exports={

    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscar

}