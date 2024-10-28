import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Loading from "./components/Loading"
import Cadastro from "./pages/Cadastro"
import Principal from "./pages/Principal"
import Sobre from "./pages/Sobre"
import Relatorio from "./pages/Relatorio"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "./services/auth"
import { CadastroPlanta } from "./pages/CadastroPlantas"


export default function AppRoute() {
    
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <Loading />
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }
        return children
    }


    //Verificando se o usuário já está autenticado
    const IsAuthenticated = () => {
        const token = localStorage.getItem('token') 
        console.log(token)
        if (token === null) {
            return <Navigate to="/login" />
        } else {
            return <Navigate to="/home" />
        }
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<IsAuthenticated />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path='/home' element={ <Private><Home /></Private>} />
                    <Route path='/plantinha' element={<Private><Principal /></Private>} />
                    <Route path='/sobre' element={<Private><Sobre /></Private>} />
                    <Route path='/relatorio' element={<Private><Relatorio /></Private>} />
                    <Route path='/cadastrar-planta' element={<Private><CadastroPlanta /></Private>} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>

    )
}