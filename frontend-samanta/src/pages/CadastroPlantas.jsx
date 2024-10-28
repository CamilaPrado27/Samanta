import Header from "../components/Header"
import style from '../assets/style/pages/CadastroPlantas.module.scss'
import { useEffect, useState } from "react"
import { cadastroPlanta, listarPlantas } from "../services/api"
import { jwtDecode } from "jwt-decode";
export const CadastroPlanta = () => {
    const [idVaso, setIdVaso] = useState('')
    const [idPlantaSelecionada, SetIdPlantaSelecionada] = useState(null)
    const [listaPlanta, setListaPlanta] = useState([])

    const token = localStorage.getItem('token')
    const tokenDecode = jwtDecode(token)
    const idUsuario = tokenDecode.Id_Usuario

    useEffect(() => {
        const dados = async () => {
            try {
                const resp = await listarPlantas()
                setListaPlanta(resp.data.data)

            } catch (err) {
                console.log(err)
            }
        }
        dados()
    }, [])

    const handlePlantaSelecionada = (id) => {
        // console.log(id)
        SetIdPlantaSelecionada(id)
    }

    const handleCadastrarVaso = async (idUsuario, idVaso, idPlantaSelecionada) => {
        // console.log(idUsuario, idVaso, idPlantaSelecionada)
        if (!idUsuario || !idVaso || !idPlantaSelecionada) {
            alert('Todos os campos são obrigatórios')
        } else {
            try {
                const resp = await cadastroPlanta(idUsuario, Number(idVaso), idPlantaSelecionada)
                if (resp.status === 201) {
                    alert('Planta cadastrada com sucesso!')
                    setIdVaso('')
                    SetIdPlantaSelecionada('')

                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    alert(`${err.response.data.message}`)
                    setIdVaso('')
                    SetIdPlantaSelecionada('')

                } else {
                    alert('Ocorreu um erro inesperado. Por favor, tente novamente')
                    console.error("Erro inesperado: ", err)
                }
            }
        }
    }
    return (
        <>
            <Header />
            <div className={style.container_main}>
                <div className={style.container_form}>
                    <h2 className={style.text}>Cadastre seu vaso de planta</h2>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Coloque o número do seu vaso"
                        value={idVaso}
                        onChange={(event) => setIdVaso(event.target.value)}
                    />

                    <h3 className={style.text}>Selecione a sua Plantinha: </h3>

                    <div className={style.container_plantas}>
                        {listaPlanta.map(item =>
                            <>
                                <button
                                    key={item.id_planta}
                                    className={`${style.bloco_planta} ${idPlantaSelecionada === item.id_planta ? style.selecionado : ''}`}
                                    onClick={() => handlePlantaSelecionada(item.id_planta)}>

                                    <img className={style.img} src={`/${item.url_imagem}`} alt="" />
                                    <p className={style.text}>{item.nome}</p>
                                    <p className={style.text}>{item.nome_cientifico}</p>
                                </button>
                            </>
                        )}
                    </div>

                    <button className={style.cadastrar_vaso} onClick={() => handleCadastrarVaso(idUsuario, idVaso, idPlantaSelecionada)}>
                        cadastrar vaso
                    </button>
                </div>
            </div>
            
        </>
    )
}