import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, loginUsuario } from "./api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    console.log("Aqui no AuthProvider!!")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    //inicializando como nulo 
    const [user, setUser] = useState(null);

    useEffect(() => {
        // recarregando e verificando se tem um usuário
        const recoveredUser = localStorage.getItem('token')
        // alert(recoveredUser)

        if (!recoveredUser) {
            localStorage.removeItem('token')
            api.defaults.headers.Authorization = null
            setUser(null)
            navigate("/home")

        }else {
            setUser(recoveredUser)
        }
        setLoading(false)
    }, [])

    const authLogin = async (login, password) => {
        try {
            const resposta_api = await loginUsuario(login, password);

            const token = resposta_api.data.token
            localStorage.setItem("token", token)

            api.defaults.headers.Authorization = `Bearer ${token}`

            setUser(token)
            navigate("/home")
            return resposta_api
        } catch (error) {
            // console.log(error.response.status)
            alert("Usuário ou Senha incorreto")
        }
    }

    const authLogout = () => {
        // console.log("Logout")
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null
        setUser(null)
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>

    )
}

export const dadosAPI = () => {

}