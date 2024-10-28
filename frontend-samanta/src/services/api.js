import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001"
})


export const listarPlantas = () =>{
    return api.get('/listarPlantas')
}

export const cadastroUsuario = async (login, email, senha) => {
    const date = new Date()
    const ano = date.getFullYear()
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const dia = String(date.getDate()).padStart(2, '0')
    console.log(login, email, senha)
    return api.post("/cadastrarUsuario", {
        login: login,
        email: email,
        senha: senha,
        dt_cadastro: `${ano}-${mes}-${dia}`
    })
}
export const loginUsuario = async ( email, senha) => {
    return api.post("/loginUsuario", {
        email: email,
        senha: senha
    })
}
export const cadastroPlanta = async (Id_Usuario, Id_Vaso, Id_Planta) => {
    console.log(Id_Usuario, Id_Vaso, Id_Planta)
    const date = new Date()
    const ano = date.getFullYear()
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const dia = String(date.getDate()).padStart(2, '0')

    return api.post("/cadastrarPlantas", {
        Id_Usuario: Id_Usuario,
        Id_Vaso: Id_Vaso,
        Id_Planta: Id_Planta,
        dt_criacao: `${ano}-${mes}-${dia}`,

    })
}

export const plantasUsuario = async (Id_Usuario) => {
    return api.post("/plantasUsuario", {
        Id_Usuario: Id_Usuario,
    })
}
export const plantaInvidual = async (Id_Usuario) => {
    return api.post("/plantaInvidual", {
        Id_Usuario: Id_Usuario,
    })
}
export const relatorio = async (Id_Vaso) => {
    console.log(Id_Vaso)
    return api.post("/relatorio", {
        Id_Vaso: Id_Vaso,
    })
}

export const dadosSensor = async () =>{
    return api.get('/dadosSensor')
}