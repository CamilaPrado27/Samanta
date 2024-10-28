const samantaService = require('../services/samantaService');



const listarPlantas = async (req, res) => {
    try {
        const result = await samantaService.listarPlantas();
        return res.status(result.status).json({
            message: result.message,
            data: result.data || null
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Erro interno do servidor",
            error: error.error || null
        });
    }
}
const dadosSensor = async (req, res) => {
    try {
        const result = await samantaService.dadosSensor();
        return res.status(result.status).json({
            message: result.message,
            data: result.data || null
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Erro interno do servidor",
            error: error.error || null
        });
    }
}

const cadastroUsuario = async (req, res) => {

    try {
        const {login, email, senha, dt_cadastro} = req.body
        const response = await samantaService.cadastroUsuario(login, email, senha, dt_cadastro);
        console.log(response)
        res.status(response.status).json(response);
    } catch (error) {
        console.error(error); 
        res.status(error.status || 500).json({
            message: error.message || 'Erro interno no servidor',
            error: error.error || {}
        });
    }

}
const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body
        const response = await samantaService.loginUsuario(email, senha);
        console.log(response)
        res.status(response.status).json(response);
    } catch (error) {
        console.error(error); 
        res.status(error.status || 500).json({
            message: error.message || 'Erro interno no servidor',
            error: error.error || {}
        });
    }

}

const cadastroPlanta = async (req, res) => {
    try {
        const {Id_Usuario, Id_Vaso, Id_Planta, dt_criacao } = req.body
        const result = await samantaService.cadastroPlanta(Id_Usuario, Id_Vaso, Id_Planta, dt_criacao);
        return res.status(result.status).json({
            message: result.message,
            data: result.data || null
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Erro interno do servidor",
            error: error.error || null
        });
    }
}

const plantasUsuario = async (req, res) =>{
    try{
        const {Id_Usuario } = req.body
        const result = await samantaService.plantasUsuario(Id_Usuario);
        return res.status(result.status).json({
            message: result.message,
            data: result.data || null
        });
    } catch(error){
        
    }
}

const plantaInvidual = async (req, res) =>{
    try{
        const {Id_Usuario } = req.body
        const result = await samantaService.plantaInvidual(Id_Usuario);
        return res.status(result.status).json({
            message: result.message,
            data: result.data || null
        });
    } catch(error){
        
    }
}
const relatorio = async (req, res) =>{
    try{
        const {Id_Vaso } = req.body
        // console.log(Id_Vaso)
        const result = await samantaService.relatorio(Id_Vaso);
        return res.status(result.status).json({
            message: result.message,
            data: result.data || null
        });
    } catch(error){
        
    }
}

module.exports = { listarPlantas, cadastroUsuario, cadastroPlanta, loginUsuario, dadosSensor, plantasUsuario, plantaInvidual, relatorio }

// module.exports = {
//     // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx PLANTA X xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//     listarPlantas: async (req, res) => {
//         let json = { error: '', result: [] };
//         let planta = await samantaService.listarPlantas();

//         for (let i in planta) {
//             json.result.push({
//                 Id_Planta: planta[i].Id_Planta,
//                 Id_Usuario: planta[i].Id_Planta,
//                 nome: planta[i].nome,
//                 nome_cientifico: planta[i].nome_cientifico,
//                 descricao: planta[i].descricao,
//                 dt_criacao: planta[i].dt_criacao
//             });
//         };

//         res.json(json);
//     },

//     buscarId_Planta: async (req, res) => {
//         let json = { error: '', result: {} };
//         let Id_Planta = req.params.Id_Planta;
//         let planta = await samantaService.buscarId_planta(Id_Planta);

//         if (planta) {
//             json.result = planta;
//         }

//         res.json(json);

//     },
//     // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx SENSOR xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//     listarSensor: async (req, res) => {
//         let json = { error: '', result: [] };
//         let sensor = await samantaService.listarSensor();

//         for (let i in sensor) {
//             json.result.push({
//                 Id_Sensor: sensor[i].Id_Sensor,
//                 Id_Planta: sensor[i].Id_Planta,
//                 Temperatura: sensor[i].Temperatura,
//                 Umidade: sensor[i].Umidade,
//                 Luminosidade: sensor[i].Luminosidade,
//                 dt_atualizacao: sensor[i].dt_atualizacao
//             });
//         };

//         res.json(json);
//     },

//     // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx USUARIOS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//     listarUsuarios: async (req, res) => {
//         let json = { error: '', result: [] };
//         let usuario = await samantaService.listarUsuarios();

//         for (let i in usuario) {
//             json.result.push({
//                 Id_Usuario: usuario[i].Id_Usuario,
//                 login: usuario[i].login,
//                 email: usuario[i].email,
//                 senha: usuario[i].senha,
//                 dt_cadastro: usuario[i].dt_cadastro
//             });
//         };

//         res.json(json);
//     },

//     buscarId_Usuario: async (req, res) => {
//         let json = { error: '', result: {} };
//         let Id_Usuario = req.params.Id_Usuario;
//         let usuario = await samantaService.buscarUma(Id_Usuario);

//         if (usuario) {
//             json.result = usuario;
//         }

//         res.json(json);
//     },
//     cadastroUsuario: async (req, res) => {
//         let json = { error: '', result: {} };
//         let Id_Usuario = req.body.Id_Usuario;
//         let login = req.body.login;
//         let email = req.body.email;
//         let senha = req.body.senha;
//         let dt_cadastro = req.body.dt_cadastro;

//         console.log(req.body);
//         console.log(Id_Usuario, login, email, senha, dt_cadastro);

//         let planta = await samantaService.cadastroUsuario(Id_Usuario, login, email, senha, dt_cadastro);

//         if (planta) {
//             json.result = planta;
//         }

//         res.json(json);
//     },
//     cadastroPlanta: async (req, res) => {
//         let json = { error: '', result: {} };
//         let Id_Usuario = req.body.Id_Usuario;
//         let login = req.body.login;
//         let email = req.body.email;
//         let senha = req.body.senha;
//         let dt_cadastro = req.body.dt_cadastro;

//         console.log(req.body);
//         console.log(Id_Usuario, login, email, senha, dt_cadastro);

//         let planta = await samantaService.cadastroUsuario(Id_Usuario, login, email, senha, dt_cadastro);

//         if (planta) {
//             json.result = planta;
//         }

//         res.json(json);
//     },


// };