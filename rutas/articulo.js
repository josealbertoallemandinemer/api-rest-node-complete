const express=require("express");
//const router=express.Router();

const router=express.Router();

const ArticuloControlador= require("../controladores/Articulo");


router.get("/ruta-de-prueba", ArticuloControlador.prueba );
router.get("/curso", ArticuloControlador.curso );
router.post("/crear", ArticuloControlador.crear );





module.exports= router;