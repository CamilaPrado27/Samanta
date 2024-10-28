import style from '../assets/style/pages/Login.module.scss'
import plantilha_logo from '../assets/img/icone-planta-logo.png'
import samanta_logo from '../assets/img/logo-samanta-sem-fundo.png'
const LogoSamanta = () => {
    return (
        <div className={style.welcome}>
            {/* <p className={style.titulo_principal}>
                Samanta
            </p> */}
            <img src={samanta_logo} className={style.samanta_logo_cadastro} alt="Muda de Planta" />
        </div>
    )
}

export default LogoSamanta