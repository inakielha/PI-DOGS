const { Router } = require('express');
const { Temper } = require("../db");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/",async(req,res,next)=>{
    try{
    let response = await axios(`https://api.thedogapi.com/v1/breeds/`)
    let dogs = response.data

    dogs.forEach(element => {
        if(element.temperament){
            const temps = element.temperament.split(', ').map(ele=>ele.toLowerCase());
                temps.forEach(async (temp)=>{
                    await Temper.findOrCreate({
                        where:{
                            name:temp
                        }
                    })
                })
        }
        
    });
    const temperamentsDb= await Temper.findAll({
    })
    //console.log(temperamentsDb.length)
    res.json(temperamentsDb);
} catch(e){
    res.next(e)
}
})


module.exports = router;