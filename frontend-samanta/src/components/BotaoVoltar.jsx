import React from "react"
import style from '../assets/style/components/BotaoVoltar.module.scss'
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from 'react-icons/md'
export const BotaoVoltar =() =>{
    return(
        <React.Fragment>
            <div className={style.botao_voltar}>
                <Link className={style.link} to={-1}>
                    <MdOutlineArrowBackIos color="#f5f5f5" size={20} />
                    <p className={style.titulo}>
                        Voltar 
                    </p>
                </Link>
            </div>
        </React.Fragment>
    )
}