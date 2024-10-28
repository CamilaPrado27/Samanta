import React, { useEffect, useState } from "react";
import style from '../assets/style/pages/Home.module.scss'
import platinha from '../assets/img/plantar.png'
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { plantasUsuario } from "../services/api";

const Home = () => {

    const token = localStorage.getItem('token')
    const tokenDecode = jwtDecode(token)
    const idUsuario = tokenDecode.Id_Usuario

    const [dadosPlantasUsuario, setDadosPlantasUsuario] = useState([])

    useEffect(() => {
        const dados = async () => {
            try {
                const resp = await plantasUsuario(idUsuario)
                setDadosPlantasUsuario(resp.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        dados()
    }, [idUsuario])
    return (
        <>
            <Header />
            <h1 className={style.titulo_home}>Plantinhas</h1>
            <div className={style.container_main_home}>

                {dadosPlantasUsuario.map(item =>
                    <>
                        <Link key={item.Id_Planta} className={style.link_plantinha} to="/plantinha">
                            <div className={style.container_post}>
                                <div className={style.container_img}>
                                    <img src={platinha} alt="platinha" className={style.img_plantinha} />
                                </div>
                                <div className={style.infos_plantinha}>
                                    <h3  className={style.nome_platinha}>Nome: {item.nome}</h3>
                                    <p className={style.descricao_platinha}>Nome científico: {item.nome_cientifico}</p>
                                </div>

                            </div> 
                        </Link>
                    </>
                )}

                <Link to='/cadastrar-planta' className={style.container_adicionar_post}>
                    <p className={style.p_adicionar_plantinha}>
                        Adicione mais uma <br />plantinha
                    </p>

                    <h2 className={style.h2_plus}>
                        +
                    </h2>

                    <img src="" alt="" />

                </Link>
            </div>
            {console.log(dadosPlantasUsuario)}
        </>

    )
}

export default Home