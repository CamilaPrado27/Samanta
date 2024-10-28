import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import style from "../assets/style/pages/Plantinha.module.scss";
import img_plantinha from "../assets/img/samanta - Copia.png"
import Lottie from "lottie-react"
import groovyWalkAnimation from "../assets/animation/Teste.json";
import { BotaoVoltar } from "../components/BotaoVoltar";
import { IoWaterSharp, IoSunny } from "react-icons/io5";
import { LuThermometerSun } from "react-icons/lu";
import BasicSpeedDial from "../components/SpecialDial";
import { plantaInvidual } from "../services/api";
import { jwtDecode } from "jwt-decode";

const Principal = () => {


    const [dadosPlantasUsuario, setDadosPlantasUsuario] = useState([])
    const token = localStorage.getItem('token')
    const tokenDecode = jwtDecode(token)
    const idUsuario = tokenDecode.Id_Usuario

    useEffect(() => {
        const dados = async () => {
            try {
                const resp = await plantaInvidual(idUsuario)
                setDadosPlantasUsuario(resp.data.data)
            } catch (err) {

            }
        }
        dados()
    }, [idUsuario])


    const id_vaso = dadosPlantasUsuario.map(item => item.Id_Vaso)


    return (
        <React.Fragment>
            <Header />

            <BotaoVoltar />

            <div className={style.container}>
                <div className={style.esquerda}>
                    <Lottie animationData={groovyWalkAnimation} />
                    <div>
                        {dadosPlantasUsuario.map(item =>
                            <>
                                <h3 className={style.titulo}>{item.nome}</h3>
                                <p className={style.subtitulo}>{item.nome_cientifico}</p>
                            </>
                        )}

                    </div>
                </div>
                <div className={style.centro}>
                    <div className={style.atualizacao}>
                        <p className={style.titulo_atualizacao}>Planta</p>
                        {dadosPlantasUsuario.map(item => {
                            const data = new Date(item.dt_atualizacao);
                            const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            }).format(data);

                            return <p className={style.p_atualizacao_back}>Última atualização: {dataFormatada.replace(':', 'h')}</p>;
                        })}
                    </div>

                    <div className={style.containerInfos}>
                        <div className={style.boxInfos}>
                            <IoWaterSharp size={20} color="#FFFFFF" className={style.icone} />
                            <p className={style.titulo}>Água</p>
                            {dadosPlantasUsuario.map(item => <p className={style.dados}>{Number(item.umidade).toFixed(1)}%</p>)}
                            {/* <p className={style.dados}>70%</p> */}
                        </div>
                        <div className={style.boxInfos}>
                            <LuThermometerSun size={20} color="#FFFFFF" className={style.icone} />
                            <p className={style.titulo}>Temp.</p>
                            {dadosPlantasUsuario.map(item => <p className={style.dados}>{Number(item.temperatura).toFixed(1)}°C</p>)}
                        </div>
                        <div className={style.boxInfos}>
                            <IoSunny size={20} color="#FFFFFF" className={style.icone} />
                            <p className={style.titulo}>Luz</p>
                            {dadosPlantasUsuario.map(item => <p className={style.dados}>{Number(item.luminosidade).toFixed(1)}%</p>)}
                        </div>
                    </div>

                    <div>
                        <h3 className={style.titulo_info}>
                            Informações
                        </h3>

                        {dadosPlantasUsuario.map(item =>
                            <p className={style.conteudo_info}>
                                {item.descricao}
                            </p>
                        )}

                    </div>
                    <BasicSpeedDial id_vaso={id_vaso} />
                </div>

            </div>

            <div className={style.header}>
                <img className={style.img} src={img_plantinha} alt="" />
                <div>
                    <h3 className={style.titulo}>Nome</h3>
                    <p className={style.subtitulo}>Nome científico</p>
                </div>
            </div>
            {/* {console.log(dadosPlantasUsuario)} */}
        </React.Fragment>
    )
}

export default Principal