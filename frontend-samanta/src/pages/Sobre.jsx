import Header from "../components/Header"
import React from "react"
import style from '../assets/style/pages/Sobre.module.scss'
// import alunos from '../services/alunos.json'
import Camila from '../assets/img/grupo/Camila.jpg'
import Rodrigo from '../assets/img/grupo/Rodrigo.jpeg'
import Lucas from '../assets/img/grupo/Lucas.png'
import Thiago from '../assets/img/grupo/thiago.png'
import Yanka from '../assets/img/grupo/Yanka.jpeg'
import { BotaoVoltar } from "../components/BotaoVoltar"
import planta from '../assets/img/image.png'
const Sobre = () => {
    // let listaAlunos = alunos.aluno
    return (
        <React.Fragment>
            <Header />
            <BotaoVoltar />
            <div className={style.container}>
                <div className={style.container_texto}>
                    <h3 className={style.titulo}>Sobre o projeto</h3>
                    <p className={style.texto}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className={style.container_img}>
                    <img className={style.planta} src={planta} alt="" />
                </div>
            </div>

            <div className={style.divider}></div>

            <h2 className={style.titulo_equipe}>Orientador</h2>
            <div className={style.container_alunos}>

                <div className={style.info_aluno}>
                    <img src={Rodrigo} className={style.container_img} alt="" />
                    <div className={style.descricao}>
                        <p className={style.nome}>Dr. Rodrigo Soares Moraes</p>
                        <p className={style.sobre}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
            <h2 className={style.titulo_equipe}>Nossa Equipe</h2>

            <div className={style.container_alunos}>
                <div className={style.info_aluno}>
                    <img src={Camila} className={style.container_img} alt="" />
                    <div className={style.descricao}>
                        <p className={style.nome}>Camila Maria do Prado Santos</p>
                        <p className={style.sobre}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className={style.info_aluno}>
                    <img src={Lucas} className={style.container_img} alt="" />
                    <div className={style.descricao}>
                        <p className={style.nome}>Lucas Vinicius Siqueira da Rosa</p>
                        <p className={style.sobre}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>

            <div className={style.container_alunos}>
                <div className={style.info_aluno}>
                    <img src={Thiago} className={style.container_img} alt="" />
                    <div className={style.descricao}>
                        <p className={style.nome}>Thiago Wender Gonsales</p>
                        <p className={style.sobre}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className={style.info_aluno}>
                    <img src={Yanka} className={style.container_img} alt="" />
                    <div className={style.descricao}>
                        <p className={style.nome}>Yanka Beatriz Purificação dos Santos</p>
                        <p className={style.sobre}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Sobre