
import './App.css';
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Loading from "./components/Loading"
import Cadastro from "./pages/Cadastro"
import Principal from "./pages/Principal"
import Sobre from "./pages/Sobre"
import Relatorio from "./pages/Relatorio"
import Router from './routes'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <Login />},
  { path: "/home", element: <Home />},
  { path: "/loading", element: <Loading />},
  { path: "/cadastro", element: <Cadastro />},
  { path: "/plantinha", element: <Principal />},
  { path: "/sobre", element: <Sobre />},
  { path: "/relatorio", element: <Relatorio />},
  { path: "*", element: <NotFound />},
]);

function App() {
  return (
    // <RouterProvider router={router} />
    <Router />
  );
}

export default App;
