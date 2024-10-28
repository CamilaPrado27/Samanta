import React from "react";
import style from "../assets/style/pages/NotFound.module.scss"
import notFound_platinha from "../assets/img/icone-planta-error-page.png"
import { Link } from "react-router-dom";

const NotFound = () =>{
    return(
        <>
            <div className={style.container_main_notFound}>
                <div className={style.div__container_left}>
                    <img className={style.img_notFound_platinha} src={notFound_platinha} alt="Platinha com raízes" />
                </div>
                <div className={style.div__container_right}>
                    <p className={style.p_erro_404}>
                        Erro 404
                    </p>

                    <p className={style.p_erro_mensagem}>
                        Ops! <br/>
                        Não há raízes por aqui.
                    </p>
                    <Link to="/" className={style.link_notFound_voltar_home}>
                        <div className={style.div_notFound_voltar_home}>
                            <p className={style.p_notFound_voltar_home}>
                                Voltar à Home
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound