import React from "react"
import { Box, LinearProgress, ThemeProvider, createTheme } from "@mui/material"
import style from '../assets/style/components/Loading.module.scss'
import plantinha_logo from '../assets/img/icone-planta-logo.png'
const theme = createTheme({
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                barColorPrimary: {
                    backgroundColor: '#2a9681'
                }
            }
        }
    }
});

const Loading = () => {

    return (
        <React.Fragment>
            <div className={style.centralizar}>
                <div className={style.container_titulo}>
                    <p className={style.titulo}>Samanta</p>
                    <img src={plantinha_logo} alt="muda de planta" />
                </div>
                <Box sx={{ width: '60%' }}>
                    <ThemeProvider theme={theme}>
                        <LinearProgress color="primary" />
                    </ThemeProvider>
                </Box>
            </div>
        </React.Fragment>
    )
}

export default Loading