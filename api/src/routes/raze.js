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
        console.log("hola")

        let razeDB = await Raze.findAll({
            include: Temper
        })

        let listRaze = []
        const { name } = req.query
        const { temperament } = req.query

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
        if (razeDB) {
            razeDB.forEach(element => {
                let dogToShow = {
                    id: element.id,
                    name: element.name,
                    height: element.height,
                    weight: element.weight
                }
                if (element.lifeSpan) dogToShow.lifeSpan = element.lifeSpan
                if (element.img) dogToShow.img = element.img
                if (element.tempers) {
                    let arr = []
                    element.tempers.forEach(e => {
                        arr.push(e.dataValues.name)
                    })
                    dogToShow.temperament = arr.join(", ")
                }

                listRaze.push(dogToShow)
            })
        }


        if (name) {
            let razasQuery = []
            listRaze.forEach(ele => {
                if (ele.name.toLowerCase().includes(name.toLowerCase())) {
                    razasQuery.push(ele);
                }
            })
             if (razasQuery.length === 0) return res.send("NoName")
            return res.json(razasQuery)
        }

        if (temperament) {
            let dogsFilteredByTemper = [];
            listRaze.forEach(ele => {
                if (ele.temperament) {
                    if (ele.temperament.toLowerCase().indexOf(temperament.toLowerCase()) !== -1) dogsFilteredByTemper.push(ele)
                }
            })
            if (dogsFilteredByTemper.length === 0) return res.send("NoTemper")
            return res.json(dogsFilteredByTemper)
        }

        res.json(listRaze);
    } catch (e) {
        next(e)
    }
})
router.post("/sendEmail",async(req,res,next)=>{
    try {
        console.log("hola")
        res.json("hola")
    } catch (e) {
        console.log(e)
    }
})
router.post("/", async (req, res, next) => {
    try {
        const { name, heightMin, heightMax, weightMin, weightMax, lifeSpanFrom, lifeSpanTo, img, temperament } = req.body
        if (!name || !heightMin || !heightMax || !weightMin || !weightMax) return res.status(400).json("Missing information");
        console.log(lifeSpanFrom)
        console.log(lifeSpanTo)
        const result = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        const dogs = result.data
        const searchDbName = await Raze.findOne({where:{name:name}})
        console.log(searchDbName)

        if (searchDbName !== null) return res.status(400).json({ok:false,msg:"This dog name already exist"})

        if (dogs.length) return res.status(400).json({ ok: false, msg: "This dog already exist" })
        const height = heightMin + " - " + heightMax
        const weight = weightMin + " - " + weightMax 
        const lifeSpan = lifeSpanFrom === "" ? " Life span unknown" : lifeSpanFrom + " - " + lifeSpanTo + " years";
        
        const doggy = await Raze.create({
            height, weight, lifeSpan, img, name

        })
        if (temperament) {

            temperament.forEach(async (element) => {
                await Temper.findOrCreate({
                    where: {
                        name: element.toLowerCase()
                    }
                })
                let verificarDB = await Temper.findOne({
                    where: {
                        name: element
                    }
                })

                if (verificarDB) await doggy.setTempers(verificarDB.id)
            })

        }
        return res.status(200).json({ok:true, msg:doggy})
    } catch (e) {
        console.log(e)
        res.status(400).json({ok:false,msg:"you cant create this dog"})
    }
})

router.get("/:idRaza", async (req, res, next) => {
    try {
        const { idRaza } = req.params

        if (idRaza.length < 10 && typeof parseInt(idRaza) === "number") {
            const result = await axios.get('https://api.thedogapi.com/v1/breeds')
            const dogs = result.data;

            dogs.forEach(e => {
                if (e.id == idRaza) {
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
            return res.status(404).send({ error: "There is not any dog with that id" })

        } else {
            const result = await Raze.findByPk(idRaza, {
                include: Temper
            });
            if (result) {
                let joinArrTemper = []
                result.tempers.forEach(ele => {
                    joinArrTemper.push(ele.name)
                })
                let temper = joinArrTemper.join(", ")
                let dogFound = {
                    id: result.id,
                    name: result.name,
                    height: result.height,
                    weight: result.weight,
                    lifeSpan: result.lifeSpan,
                    img: result.img,
                    temperament: temper,
                }
                return res.json(dogFound)
            }
            return res.status(404).json({ error: "There is not any dog with that id" })
        }
    } catch (e) {
        next(e)
    }
})
// router.put("/", async (req,res,next)=>{
//     try{
//     const { name, heightMin, heightMax, weightMin, weightMax, lifeSpanFrom, lifeSpanTo, img, temperament } = req.body
//     let dogChange = await Raze.update({
        
//     })
//     }
// })

router.delete("/", async (req, res, next) =>{
    try {
        const {name} = req.query
        console.log(name)
        if (name){
            let verificarDB = await Raze.destroy({
                where: {
                    name: name
                }
            })
            if (verificarDB===1) res.json("The dog has been succesfully delete")
            if (!verificarDB) res.json("we couldnt find your doggy")
        }
        res.status(404).json("Name is require")
    } catch (error){
        console.log(error)
    }
})

module.exports = router;