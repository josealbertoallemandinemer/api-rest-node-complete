
const validator=require("validator");
const Articulo= require("../modelos/Articulo");




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

    const articulo= new Articulo(parametros);
    // manual=>articulo.titulo=parametros.titulo;

     articulo.save((error,articuloGuardado)=>{

            if (error || !articuloGuardado) {

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
     });


     
}



module.exports={

    prueba,
    curso,
    crear

}