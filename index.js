
const {conexion} = require ("./basedatos/conexion");
const express = require("express");
const cors=require("cors");




console.log("app de node arrancada");


conexion();
const app= express();
const puerto=3900;


app.use(cors());

app.use(express.json()); //recibir datos con content type app/json
app.use(express.urlencoded({extended:true})); //form urlencoded


const rutas_articulo=require("./rutas/Articulo")
app.use("/api", rutas_articulo);







//rutas pruebas hardcode


app.get("/probando",(req,res)=>{

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

       


    });

    app.get("/",(req,res)=>{


        return res.status(200).send(


            ` <div>
                <h1>probando ruta de node</h1>
                <p>creando api rest con node</p>
             </div>
             `

        )

    });







app.listen(puerto, ()=>{

    console.log("servidor corriendo en el puerto"+puerto);

})

