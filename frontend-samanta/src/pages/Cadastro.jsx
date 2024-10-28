import React, { useState } from "react";
import style from '../assets/style/pages/Login.module.scss'
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate, } from "react-router-dom";
import LogoSamanta from "../components/LogoSamanta";
import { cadastroUsuario } from "../services/api";
const Cadastro = () => {
    const buttonSx = {
        ...({
            bgcolor: "#fff",
            color: "#00483d",
            '&:hover': {
                bgcolor: "#d3d3d3",
            },
        }),
    };

    let navigate = useNavigate()

    const [name, setName] = useState('')
    const [login, setlogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit", { login, password });
    }
    const handleButtonClick = async () => {
        setLoading(true)
        try {
            const resp = await cadastroUsuario(name.toLowerCase(), login.toLowerCase(), password)
            console.log(resp)
            if (resp.status === 201) {
                navigate('/')
                setLoading(false);
            }
        } catch (err){
            if(err.response && err.response.status === 401){
                alert(`${err.response.data.message}`)
            }else{
                alert('Ocorreu um erro inesperado. Por favor, tente novamente')
                console.error("Erro inesperado: ", err)
            }
            setLoading(false);
        }
    }

    if (loading) {
        setInterval(function () {
            let valorSegundo = 0
            valorSegundo = +1
        }, 1000)
    }
    return (
        <React.Fragment>
            <div className={style.container_main}>
                <LogoSamanta />
                <div className={style.forms}>

                    <form onSubmit={handleSubmit} className={style.div__input_centralizado}>
                        <h3 className={style.titulo_acesso}>
                            Bem-Vindo!
                        </h3>
                        <div className={style.div__input}>
                            <BiUser className={style.icon} size={21} color="#00483d" />
                            <input className={style.input__login} type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className={style.div__input}>
                            <MdOutlineAlternateEmail className={style.icon} size={21} color="#00483d" />
                            <input className={style.input__login} type="email" placeholder="E-mail" value={login} onChange={(event) => setlogin(event.target.value)} />
                        </div>
                        <div className={style.div__input}>
                            <RiLockPasswordLine className={style.icon} size={21} color="#00483d" />
                            <input className={style.input__login} type="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                sx={buttonSx}
                                disabled={loading}
                                onClick={handleButtonClick}
                            >
                                Criar Cadastro
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: "#215aa7",
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                        <p className={style.new_account} >Se já tem uma conta? <Link className={style.link} to='/'>Entre Agora!</Link> </p>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cadastro