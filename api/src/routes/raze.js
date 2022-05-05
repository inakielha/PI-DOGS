const { Router } = require('express');
const { Raze, Temper } = require("../db");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        let response = await axios(`https://api.thedogapi.com/v1/breeds/`)
        let dogs = response.data
        let razeDB = await Raze.findAll()
        let listRaze = []
        const {name} = req.query
        const {temperament} = req.query

        dogs.forEach(e => {
            listRaze.push({
                id: e.id,
                name: e.name,
                height: e.height.metric,
                weight: e.weight.metric,
                lifeSpan: e.life_span,
                img: e.image.url,
                temperament: e.temperament,
                }
                )
        });
        if(razeDB){
        razeDB.forEach(element=>{
            let dogToShow = {
            id: element.id,
            name: element.name,
            height: element.height,
            weight: element.weight
        }
            if (element.lifeSpan) dogToShow.lifeSpan = element.lifeSpan
            if (element.img) dogToShow.img = element.img
            if (element.temperament) dogToShow.temperament= element.temperament
            listRaze.push(dogToShow)
        })
    }
        

        if(name){
            let razasQuery = []
            listRaze.forEach(ele=>{
            if(ele.name.toLowerCase().includes(name.toLowerCase())){
            razasQuery.push(ele);
            }
            })
            if(razasQuery.length===0) return res.status(404).json({error:"Couldn't find your doggy"})
            return res.json(razasQuery)
        }
        
        if(temperament){
            let dogsFilteredByTemper = [];
            listRaze.forEach(ele=>{
                if(ele.temperament){
                    if(ele.temperament.toLowerCase().indexOf(temperament.toLowerCase())!==-1) dogsFilteredByTemper.push(ele)
                }
            })
            if (dogsFilteredByTemper.length===0) return res.status(404).json("There is no dogs with this temperaments")
            return res.json(dogsFilteredByTemper)
        }

        res.json(listRaze);
    } catch (e) {
        next(e)
    }
})
router.post("/", async (req, res, next) => {
    try {
        const {name, height, weight, lifeSpan, img, temperament} = req.body
        if(!name || !height||!weight) res.json("Missing information");

        const result = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        const dogs = result.data

    
        if(dogs.length) return res.status(400).json({error:"This dog already exist"})
        const doggy = await Raze.create({
            height, weight , lifeSpan, img,name
            
        })
        if (temperament){
            let arrayTemperaments = temperament.toLowerCase().split(", ")
        
            arrayTemperaments.forEach(async (element)=>{
                await Temper.findOrCreate({
                    where:{
                        name:element
                    }
                })
                let verificarDB = await Temper.findOne({
                    where:{
                        name: element
                    }
                })
                console.log(verificarDB)
                if (verificarDB) await doggy.setTempers(verificarDB.id)
            })
            
        }
        res.json(doggy)
    }catch (e) {
        next(e)
    }
})

router.get("/:idRaza", async (req, res, next) => {
    try {
        const { idRaza } = req.params

        if(idRaza.length<10 && typeof parseInt(idRaza)==="number"){
            const result = await axios.get('https://api.thedogapi.com/v1/breeds')
            const dogs = result.data;
           
            dogs.forEach(e=>{
                if(e.id == idRaza){
                    const dogFound = {
                        id: e.id,
                        name: e.name,
                        height: e.height.metric,
                        weight: e.weight.metric,
                        lifeSpan: e.life_span,
                        img: e.image.url,
                        temperament: e.temperament,    
                    }
                    return res.json(dogFound)
                }
            })
            return res.status(404).send({error:"There is not any dog with that id"})
            
        }else{
            const result = await Raze.findByPk(idRaza,{
                include: Temper
            });
            if(result){
                let dogFound = {
                    id: result.id,
                    name: result.name,
                    height: result.height,
                    weight: result.weight,
                    lifeSpan: result.lifeSpan,
                    img: result.image,
                    temperament: result.temperament,
                }
                return res.json(dogFound)
            }
            return res.status(404).json({error:"There is not any dog with that id"})
        }
    } catch (e) {
        next(e)
    }
})

module.exports = router;