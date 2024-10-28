const express = require('express');
const bodyParser = require('body-parser');


const router = express();
router.use(bodyParser.json())

const samantaController = require('./controllers/samantaController');

router.get('/', async(req, res)=>{
    res.status(200).send("funcionou!!")
})
router.get('/listarPlantas', samantaController.listarPlantas);
router.get('/dadosSensor', samantaController.dadosSensor);
router.post('/cadastrarPlantas', samantaController.cadastroPlanta);

router.post('/cadastrarUsuario', samantaController.cadastroUsuario);
router.post('/loginUsuario', samantaController.loginUsuario);
router.post('/plantasUsuario', samantaController.plantasUsuario);
router.post('/plantaInvidual', samantaController.plantaInvidual);
router.post('/relatorio', samantaController.relatorio);

module.exports = router;



// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx PLANTA X xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// router.get('/planta/:Id_Planta', samantaController.buscarId_Planta);

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx SENSOR xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// router.get('/sensor', samantaController.listarSensor);


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx USUARIOS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// router.get('/usuario', samantaController.listarUsuarios);
// router.get('/planta/:Id_Usuario', samantaController.buscarId_Usuario);

// router.get('/planta/:Id_Usuario', samantaController.buscarId_Usuario);