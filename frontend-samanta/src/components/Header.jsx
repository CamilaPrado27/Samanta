import React from "react";
import style from  '../assets/style/components/Header.module.scss'
import logo_samanta from '../assets/img/logo-samanta-sem-fundo.png'
import { Link } from 'react-router-dom'
const Header = () =>{
    return(
        <header className={style.container_header}>
            <div>
                <Link to="/home">
                    <img className={style.header_logo} src={logo_samanta} alt="" />
                </Link>
            </div>
            <nav>
                <ul>
                    <Link className={style.link} to='/sobre'>Sobre</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header
